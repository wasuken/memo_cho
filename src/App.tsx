import { useState } from "react";
import Memo from "./components/Memo";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

type Memo = {
  id: number;
  contents: string;
  tags: string[];
};

function App() {
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const updateMemo = (id: number, s: string) => {
    const nlist = [...memoList];
    for (let i = 0; i < nlist.length; i++) {
      if (nlist[i].id === id) {
        nlist[i].contents = s;
        break;
      }
    }
    setMemoList([...nlist]);
  };
  const handleDeleteMemo = (id: number) => {
    const memo = memoList.find((m) => m.id === id);
    if (!memo) {
      console.log("error", `not found: ${id}`);
      return;
    }
    setMemoList([...memoList.filter((m) => m.id !== id)]);
  };
  const handleAddMemo = () => {
    setMemoList([...memoList, { id: Date.now(), contents: "", tags: [] }]);
  };
  const handleTagInputChange = (id: number, s: string) => {
    const nlist = [...memoList];
    for (let i = 0; i < nlist.length; i++) {
      if (nlist[i].id === id) {
        const ts = Array.from(
          new Set(
            [...nlist[i].tags, ...s.split(" ")].filter((x) => x.length > 1)
          )
        );
        nlist[i].tags = ts;
        break;
      }
    }
    setMemoList([...nlist]);
  };
  const handleTagAllDelete = (id: number) => {
    const nlist = [...memoList];
    for (let i = 0; i < nlist.length; i++) {
      if (nlist[i].id === id) {
        nlist[i].tags = [];
        break;
      }
    }
    setMemoList([...nlist]);
  };
  const clearMoved = () => {
    setMemoList(
      [...memoList].map((m) => {
        return { ...m, isMoved: false };
      })
    );
  };
  const moveMemoToTopByTag = (tag: string) => {
    const mList = [...memoList];
    const idList = mList
      .filter((memo) => memo.tags.includes(tag))
      .map((x) => x.id);
    for (const id of idList) {
      const memoIndex = mList.findIndex((m) => m.id === id);
      if (memoIndex !== -1) {
        const memo = mList[memoIndex];
        mList.splice(memoIndex, 1);
        mList.unshift(memo);
      }
      setTimeout(() => {
        clearMoved();
      }, 5000);
    }

    setMemoList(mList);
  };

  return (
    <Container>
      <div>
        <Button variant="primary" onClick={handleAddMemo}>
          Create
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        {memoList.map((memo) => (
          <Memo
            key={memo.id}
            id={memo.id}
            tags={memo.tags}
            contents={memo.contents}
            onChange={(s) => updateMemo(memo.id, s)}
            onDelete={handleDeleteMemo}
            onTagInputChange={(s) => handleTagInputChange(memo.id, s)}
            onTagAllDeleteClick={() => handleTagAllDelete(memo.id)}
            onTagClick={moveMemoToTopByTag}
          />
        ))}
      </div>
    </Container>
  );
}

export default App;
