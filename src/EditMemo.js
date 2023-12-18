import Input from "./Input";
import "./list.css";

export default function EditMemo({
  memos,
  setMemos,
  setStatus,
  editingMemoId,
  setEditingMemoId,
  answer,
  setAnswer,
}) {
  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }

  async function handleSaveMemo(e) {
    e.preventDefault();
    const targetIndex = memos.findIndex((memo) => memo.id === editingMemoId);
    const nextMemos = [...memos];
    nextMemos[targetIndex] = { ...nextMemos[targetIndex], content: answer };
    await setMemos(nextMemos);
    await setAnswer("");
    await setEditingMemoId(null);
    setStatus("index");
  }

  function handleDeleteMemo(memo) {
    setMemos(memos.filter((memo) => memo.id !== editingMemoId));
    setAnswer("");
    setStatus("index");
    setEditingMemoId(null);
  }

  return (
    <div class="container">
      <h1>メモ詳細</h1>
      <Input value={answer} handleAnswerChange={handleAnswerChange} />
      <button onClick={handleSaveMemo}>save</button>
      <button onClick={handleDeleteMemo}>delete</button>
    </div>
  );
}
