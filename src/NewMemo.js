import Input from "./Input";
import "./list.css";

export default function NewMemo({
  memos,
  setMemos,
  setStatus,
  answer,
  setAnswer,
}) {
  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  async function handleAddMemo(e) {
    e.preventDefault();
    const nextId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 0;
    const nextMemos = [...memos, { id: nextId, content: answer }];
    await setMemos(nextMemos);
    await setAnswer("");
    setStatus("index");
  }

  return (
    <div class="container">
      <h1>新規メモ</h1>
      <Input value={answer} handleAnswerChange={handleAnswerChange} />
      <button type="submit" onClick={handleAddMemo}>
        add
      </button>
    </div>
  );
}
