import { useState } from "react";
import { useEffect } from "react";
import IndexMemo from "./IndexMemo";
import NewMemo from "./NewMemo";
import EditMemo from "./EditMemo";
import "./list.css";

const initialMemos = JSON.parse(localStorage.getItem("memos")) || [];

export default function List() {
  const [memos, setMemos] = useState(initialMemos);
  const [status, setStatus] = useState("index");
  const [answer, setAnswer] = useState("");
  const [editingMemoId, setEditingMemoId] = useState(null);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const firstRowOfMemos = memos.map(({ id, content }) => ({
    id: id,
    value: content.split("\n")[0],
  }));

  const viewForStatus = () => {
    switch (status) {
      case "index": {
        return (
          <IndexMemo
            memos={memos}
            firstRowOfMemos={firstRowOfMemos}
            setStatus={setStatus}
            setAnswer={setAnswer}
            setEditingMemoId={setEditingMemoId}
          />
        );
      }
      case "isAdding": {
        return (
          <NewMemo
            memos={memos}
            setMemos={setMemos}
            setStatus={setStatus}
            answer={answer}
            setAnswer={setAnswer}
          />
        );
      }
      case "isEditing": {
        return (
          <EditMemo
            memos={memos}
            setMemos={setMemos}
            setStatus={setStatus}
            editingMemoId={editingMemoId}
            setEditingMemoId={setEditingMemoId}
            answer={answer}
            setAnswer={setAnswer}
          />
        );
      }
      default: {
        // do nothing
      }
    }
  };

  return <>{viewForStatus()}</>;
}
