import { useState } from "react";
import Input from "./Input";
import "./list.css";
import { useContext } from "react";
import { isLoggedInContext } from "./IsLoggedInContext";

export default function EditMemo({ memo, onSave, onDelete }) {
  const [answer, setAnswer] = useState(memo ? memo.content : "");
  const { isLoggedIn } = useContext(isLoggedInContext);

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
      {isLoggedIn && (
        <>
          <button onClick={handleSave}>save</button>
          <button onClick={handleDelete}>delete</button>
          </>
      )}
    </div>
  );
}
