import { useState } from "react";
import Input from "./Input";
import "../css/list.css";
import { useLoggedInValue } from "../contexts/LoggedInContext";

export default function EditMemo({ memo, onSave, onDelete }) {
  const [answer, setAnswer] = useState(memo ? memo.content : "");
  const { loggedIn } = useLoggedInValue();

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
      {loggedIn && (
        <>
          <button onClick={handleSave}>save</button>
          <button onClick={handleDelete}>delete</button>
        </>
      )}
    </div>
  );
}
