import { useEffect, useRef, useState } from "react";
import { Data, NoteProps } from "../interfaces/Todo";
import { useCompletedState, useEditTodo } from "../services/mutations";
import { SubmitHandler, useForm } from "react-hook-form";

function Note({ setClicked, target }: NoteProps) {
  const container = useRef<HTMLDivElement>(null);
  const [data, setTargetData] = useState<Data>({
    title: target.title,
    description: target.description,
    id: target.id,
  });
  const state = useCompletedState();
  const { register, handleSubmit } = useForm<Data>();
  const editState = useEditTodo();

  const handleEditSubmit: SubmitHandler<Data> = (data: Data) => {
    data.id = target.id;
    editState.mutate(data);
  };

  useEffect(() => {
    const mouseLeave = (e: MouseEvent) => {
      if (e.target === container.current) setClicked(false);
    };

    window.addEventListener("mousedown", mouseLeave);

    return () => window.removeEventListener("mousedown", mouseLeave);
  }, []);

  return (
    <div ref={container} className="note">
      <form
        className="note-container"
        onSubmit={handleSubmit(handleEditSubmit)}
      >
        <input
          type="text"
          value={data.title}
          {...register("title")}
          onChange={(e) =>
            setTargetData({
              title: e.target.value,
              description: data.description,
              id: target.id,
            })
          }
        />
        <textarea
          value={data.description}
          {...register("description")}
          onChange={(e) =>
            setTargetData({
              title: data.title,
              description: e.target.value,
              id: target.id,
            })
          }
        ></textarea>
        <p className="timestamps">{target.created}</p>
        <input type="submit" className="update" value={"update"} />
        <div
          onClick={() => {
            target.completed = !target.completed;
            state.mutate({ id: target.id, newState: target.completed });
          }}
          className="completed"
          style={{
            backgroundColor: target.completed ? "#00ff00" : "transparent",
          }}
        ></div>
      </form>
    </div>
  );
}

export default Note;
