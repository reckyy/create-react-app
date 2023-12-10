export default function Input({ answer, handleAnswerChange, handleAddMemo }){

  return (
    <>
      <form onSubmit={handleAddMemo}>
        <textarea
          placeholder="メモ内容"
          value={answer}
          onChange={handleAnswerChange}
        />
      </form>
    </>
  );
}
