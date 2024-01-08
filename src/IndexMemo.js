import "./list.css";
import { useContext } from "react";
import { isLoggedInContext } from "./IsLoggedInContext";

export default function IndexMemo({ memos, toEdit, toAdd }) {
  const { isLoggedIn } = useContext(isLoggedInContext);

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
      {isLoggedIn && <p onClick={toAdd}>+</p>}
    </div>
  );
}
