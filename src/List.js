import { useState } from "react";
import { useEffect } from "react";
import Input from "./Input";
import './list.css'

let initialMemos = JSON.parse(localStorage.getItem("memos")) || [];

export default function List() {
  const [memos, setMemos] = useState(initialMemos);
  const [answer, setAnswer] = useState("");
  const [editable, setEditable] = useState(false);
  const [editingMemoId, setEditingMemoId] = useState(null);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const firstRowOfMemos = memos.map(({ id, content }) => ({
    id: id,
    value: content.split("\n")[0],
  }));

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  function handleAddMemo(e) {
    e.preventDefault();
    const nextId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 0;
    const nextMemos = [...memos, { id: nextId, content: answer }];
    setMemos(nextMemos);
    setAnswer("");
  }

  function handleSaveMemo(e) {
    e.preventDefault();
    const nextMemos = memos.map((memo) => {
      if (memo.id === editingMemoId) {
        return { id: memo.id, content: answer };
      } else {
        return memo;
      }
    });
    setMemos(nextMemos);
    setAnswer("");
    setEditable(false);
    setEditingMemoId(null);
  }

  function handleMemoEditable(memo) {
    const targetMemo = memos.find((m) => m.id === memo.id);
    setAnswer(targetMemo.content);
    setEditingMemoId(targetMemo.id);
    setEditable(true);
  }

  function handleDeleteMemo(memo) {
    setMemos(memos.filter((memo) => memo.id !== editingMemoId));
    setAnswer("");
    setEditable(false);
    setEditingMemoId(null);
  }

  return editable ? (
    <div class="container">
      <h1>メモ詳細</h1>
      <Input
        value={answer}
        handleAnswerChange={handleAnswerChange}
        handleAddMemo={handleSaveMemo}
      />
      <button type="submit">save</button>
      <button onClick={handleDeleteMemo}>delete</button>
    </div>
  ) : (
    <div class="container">
      <h1>メモ一覧</h1>
      <Input
        value={answer}
        handleAnswerChange={handleAnswerChange}
        handleAddMemo={handleAddMemo}
      />
      <button type="submit">add</button>
      <ul>
        {firstRowOfMemos.map((memo) => (
          <li key={memo.id} onClick={() => handleMemoEditable(memo)}>
            {memo.value}
          </li>
        ))}
        +
      </ul>
    </div>
  );
}
