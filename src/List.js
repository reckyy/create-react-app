import { useState } from "react";
import { useEffect } from "react";
import Input from "./Input";
import './list.css'

let initialMemos = JSON.parse(localStorage.getItem("memos")) || [];

export default function List() {
  const [memos, setMemos] = useState(initialMemos);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState('index');
  const [editingMemoId, setEditingMemoId] = useState(null);

  const index = status === 'index';
  const isAdding = status === 'add';
  const isEditing = status === 'edit';

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

  function handleChangeStatusToAdd(){
    setStatus('add');
  }

  async function handleAddMemo(e) {
    e.preventDefault();
    const nextId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 0;
    const nextMemos = [...memos, { id: nextId, content: answer }];
    await setMemos(nextMemos);
    await setAnswer("");
    setStatus('index');
  }

  async function handleSaveMemo(e) {
    e.preventDefault();
    const nextMemos = memos.map((memo) => {
      if (memo.id === editingMemoId) {
        return { id: memo.id, content: answer };
      } else {
        return memo;
      }
    });
    await setMemos(nextMemos);
    await setAnswer("");
    await setEditingMemoId(null);
    setStatus('index');
  }

  function handleMemoEditable(memo) {
    const targetMemo = memos.find((m) => m.id === memo.id);
    setAnswer(targetMemo.content);
    setEditingMemoId(targetMemo.id);
    setStatus('edit');
  }

  function handleDeleteMemo(memo) {
    setMemos(memos.filter((memo) => memo.id !== editingMemoId));
    setAnswer("");
    setStatus('index');
    setEditingMemoId(null);
  }

  if (index) {return(
    <div class="container">
    <h1>メモ一覧</h1>
    <ul>
      {firstRowOfMemos.map((memo) => (
        <li key={memo.id} onClick={() => handleMemoEditable(memo)}>
          {memo.value}
        </li>
      ))}
      <li onClick={handleChangeStatusToAdd}>+</li>
    </ul>
  </div>
  );
  } else if(isAdding) {return(
    <div class="container">
      <h1>新規メモ</h1>
      <Input
      value={answer}
      handleAnswerChange={handleAnswerChange}
      />
      <button type="submit" onClick={handleAddMemo}>add</button>
    </div>
  );
  } else if(isEditing) {
    return(
      <div class="container">
      <h1>メモ詳細</h1>
      <Input
        value={answer}
        handleAnswerChange={handleAnswerChange}
      />
      <button onClick={handleSaveMemo}>save</button>
      <button onClick={handleDeleteMemo}>delete</button>
    </div>
    );
  }
}
