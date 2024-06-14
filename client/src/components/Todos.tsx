import { useEffect, useState } from "react";
import { useTodos } from "../services/queries";
import Note from "./Note";
import Todo, { Completed } from "../interfaces/Todo";
import { useCompletedState, useDeleteTodo } from "../services/mutations";

function todos({ isEdit }: { isEdit: boolean }) {
  const { data, isLoading } = useTodos();
  const { mutate } = useCompletedState();
  const [clicked, setClicked] = useState(false);
  const [target, setTarget] = useState<Todo>();
  const deletemutation = useDeleteTodo();

  if (isLoading) {
    return (
      <span>
        <img className="loading" src="spinner2.gif" alt="" />
      </span>
    );
  }

  return (
    <>
      <div className="container">
        {clicked ? <Note setClicked={setClicked} target={target!} /> : <></>}
        {data?.map((td) => (
          <div key={td.id} className="td-wrapper">
            {isEdit ? (
              <img
                src="delete.png"
                alt="delete"
                className="delete"
                onClick={() => deletemutation.mutate(td)}
              />
            ) : (
              <></>
            )}
            <div
              className="td-con"
              onClick={() => {
                setClicked(!clicked);
                if (!clicked) setTarget(td);
              }}
            >
              <h3 className="title">{td.title}</h3>
              <p className="description">{td.description}</p>
              <p className="timestamps">{td.created}</p>
            </div>
            <div
              className="completed"
              onClick={() => {
                td.completed = !td.completed;
                mutate({ id: td.id, newState: td.completed });
              }}
              style={{
                backgroundColor: td.completed ? "#00ff00" : "transparent",
              }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default todos;
