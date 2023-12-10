export default function Input({ value, handleAnswerChange }){

  return (
    <>
      <form>
        <textarea
          placeholder="メモ内容"
          value={value}
          onChange={handleAnswerChange}
        />
      </form>
    </>
  );
}
