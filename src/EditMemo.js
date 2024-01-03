import { useState } from "react";
import Input from "./Input";
import "./list.css";

export default function EditMemo({ memo, onSave, onDelete }) {
  const [answer, setAnswer] = useState(memo ? memo.content : "");

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  function handleSave() {
    const updatedMemo = { ...memo, content: answer };
    setAnswer("");
    onSave(updatedMemo);
  }

  function handleDelete() {
    setAnswer("");
    onDelete(memo);
  }

  return (
    <div class="container">
      <h1>メモ詳細</h1>
      <Input value={answer} handleAnswerChange={handleAnswerChange} />
      <button onClick={handleSave}>save</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
