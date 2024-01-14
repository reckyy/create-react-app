import { useLoggedInValue } from "./LoggedInContext";
import "./list.css";

export default function IndexMemo({ memos, toEdit, toAdd }) {
  const { loggedIn } = useLoggedInValue();

  return (
    <div class="container">
      <h1>メモ一覧</h1>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id} onClick={() => toEdit(memo)}>
            {memo.content.split("\n")[0]}
          </li>
        ))}
      </ul>
      {loggedIn && <p onClick={toAdd}>+</p>}
    </div>
  );
}
