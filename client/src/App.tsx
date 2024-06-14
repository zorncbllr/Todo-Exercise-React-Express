import Todos from "./components/Todos";
import Form from "./components/Form";
import Note from "./components/Note";
import { useState } from "react";

function App() {
  let [clicked, setClicked] = useState(false);
  let [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="app">
      <h1>TODO APP</h1>
      <div className="tools-con">
        <button className="add" onClick={handleClick}>
          +
        </button>
        <img
          src="edit.png"
          alt="edit"
          className="edit"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        />
      </div>
      {clicked ? <Form setClicked={setClicked} /> : <></>}
      <Todos isEdit={isEdit} />
    </div>
  );
}

export default App;
