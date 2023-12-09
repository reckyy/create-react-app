import { useState } from "react";
import Form from "./Form";
import './list.css'

let initialMemos = [
  { id: 0, content: "最初のメモ" },
  { id: 1, content: "改行ありのメモ\nです" },
  { id: 2, content: "二個改行\nがある\nメモです。" },
];

let nextId = 3;

export default function List() {
  const [memos, setMemos] = useState(initialMemos);
  const [answer, setAnswer] = useState("");
  const [editable, setEditable] = useState(false);
  const [editingMemoId, setEditingMemoId] = useState(null);

  const firstRowOfMemos = memos.map(({ id, content }) => ({
    id: id,
    value: content.split("\n")[0],
  }));

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  function handleAddMemo(e) {
    e.preventDefault();
    const nextMemos = [...memos, { id: nextId++, content: answer }];
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

  return editable ? (
    <>
      <h1>メモ詳細</h1>
      <Form
        value={answer}
        handleAnswerChange={handleAnswerChange}
        handleAddMemo={handleSaveMemo}
        buttonText={"save"}
      />
    </>
  ) : (
    <>
      <h1>メモ一覧</h1>
      <Form
        value={answer}
        handleAnswerChange={handleAnswerChange}
        handleAddMemo={handleAddMemo}
        buttonText={"add"}
      />
      <ul>
        {firstRowOfMemos.map((memo) => (
          <li key={memo.id} onClick={() => handleMemoEditable(memo)}>
            {memo.value}
          </li>
        ))}
        +
      </ul>
    </>
  );
}
