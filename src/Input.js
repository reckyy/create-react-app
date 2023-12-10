export default function Input({ value, handleAnswerChange }){

  return (
    <>
      <form>
        <textarea
          rows={10}
          cols={40}
          placeholder="メモ内容"
          value={value}
          onChange={handleAnswerChange}
        />
      </form>
    </>
  );
}
