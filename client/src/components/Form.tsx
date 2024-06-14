import { SubmitHandler, useForm } from "react-hook-form";
import Todo, { isCLicked } from "../interfaces/Todo";
import { useCreateTodo } from "../services/mutations";
import { useEffect, useRef } from "react";

function Form({ setClicked }: isCLicked) {
  const { mutate } = useCreateTodo();
  const container = useRef<HTMLDivElement>(null);
  const { register, handleSubmit } = useForm<Todo>();

  const handleTodoSubmit: SubmitHandler<Todo> = (data) => {
    mutate(data);
    setClicked(false);
  };

  useEffect(() => {
    const mouseLeave = (e: MouseEvent) => {
      if (e.target === container.current) setClicked(false);
    };

    window.addEventListener("mousedown", mouseLeave);

    return () => window.removeEventListener("mousedown", mouseLeave);
  });

  return (
    <div ref={container} className="form-placer">
      <div className="form-con">
        <div className="form-header">
          <h2 className="create-todo">Create new To Do</h2>
          <div className="exit" onClick={() => setClicked(false)}>
            x
          </div>
        </div>
        <form
          className="form-section"
          onSubmit={handleSubmit(handleTodoSubmit)}
        >
          <input type="text" placeholder="title" {...register("title")} />
          <textarea
            placeholder="description"
            {...register("description")}
          ></textarea>
          <button className="create">create</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
