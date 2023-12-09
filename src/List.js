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
  const firstRowOfMemos = memos.map(({ id, content }) => ({
    id: id,
    value: content.split("\n")[0],
  }));

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  function handleAddMemo(e) {
    e.preventDefault(); // フォームのデフォルト動作を防止
    const nextMemos = [...memos, { id: nextId++, content: answer }];
    setMemos(nextMemos);
    setAnswer("");
  }

  return (
    <div class="container">
      <h1>メモ一覧</h1>
      <Form
        value={answer}
        handleAnswerChange={handleAnswerChange}
        handleAddMemo={handleAddMemo}
      />
      <ul>
        {firstRowOfMemos.map((memo) => (
          <li key={memo.id}>{memo.value}</li>
        ))}
        +
      </ul>
    </div>
  );
}
