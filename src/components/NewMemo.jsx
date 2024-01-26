import { useState } from "react";
import Input from "./Input";
import "../css/list.css";

export default function NewMemo({ onAdd }) {
  const [answer, setAnswer] = useState("");

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  function handleAdd() {
    const newMemoContent = answer;
    setAnswer("");
    onAdd(newMemoContent);
  }

  return (
    <div class="container">
      <h1>新規メモ</h1>
      <Input value={answer} handleAnswerChange={handleAnswerChange} />
      <button type="submit" onClick={handleAdd}>
        add
      </button>
    </div>
  );
}
