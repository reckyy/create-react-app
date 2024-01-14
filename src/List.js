import { useState } from "react";
import { useEffect } from "react";
import LoginButton from "./LoginButton";
import IndexMemo from "./IndexMemo";
import NewMemo from "./NewMemo";
import EditMemo from "./EditMemo";
import "./list.css";
import LoggedInProvider from "./LoggedInContext";

const initialMemos = JSON.parse(localStorage.getItem("memos")) || [];

export default function List() {
  const [memos, setMemos] = useState(initialMemos);
  const [status, setStatus] = useState("index");
  const [editingMemoId, setEditingMemoId] = useState(null);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  async function handleSaveMemo(updatedMemo) {
    const targetIndex = updatedMemo.id;
    const nextMemos = [...memos];
    nextMemos[targetIndex] = updatedMemo;
    await setMemos(nextMemos);
    await setEditingMemoId(null);
    setStatus("index");
  }

  function handleDeleteMemo(memo) {
    setMemos(memos.filter((memo) => memo.id !== editingMemoId));
    setStatus("index");
    setEditingMemoId(null);
  }

  function handleMemoEditable(memo) {
    const targetMemo = memos.find((m) => m.id === memo.id);
    setEditingMemoId(targetMemo.id);
    setStatus("isEditing");
  }

  function handleChangeStatusToAdd() {
    setStatus("isAdding");
  }

  async function handleAddMemo(content) {
    const nextId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 0;
    const nextMemos = [...memos, { id: nextId, content: content }];
    await setMemos(nextMemos);
    setStatus("index");
  }

  const viewForStatus = () => {
    switch (status) {
      case "index": {
        return (
          <>
            <LoggedInProvider>
              <LoginButton />

              <IndexMemo
                memos={memos}
                toEdit={handleMemoEditable}
                toAdd={handleChangeStatusToAdd}
              />
            </LoggedInProvider>
          </>
        );
      }
      case "isAdding": {
        return <NewMemo memos={memos} onAdd={handleAddMemo} />;
      }
      case "isEditing": {
        const editingMemo = memos.find((memo) => memo.id === editingMemoId);
        return (
          <>
            <LoggedInProvider>
              <LoginButton />

              <EditMemo
                memo={editingMemo}
                onSave={handleSaveMemo}
                onDelete={handleDeleteMemo}
              />
            </LoggedInProvider>
          </>
        );
      }
      default: {
        // prettierに引っかかるため、あえなく用意。
      }
    }
  };

  return <>{viewForStatus()}</>;
}
