import "./list.css";

export default function IndexMemo({
  memos,
  firstRowOfMemos,
  setStatus,
  setAnswer,
  setEditingMemoId,
}) {
  function handleChangeStatusToAdd() {
    setStatus("isAdding");
  }

  function handleMemoEditable(memo) {
    const targetMemo = memos.find((m) => m.id === memo.id);
    setAnswer(targetMemo.content);
    setEditingMemoId(targetMemo.id);
    setStatus("isEditing");
  }
  return (
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
}
