export default interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created: string;
}

export interface isCLicked {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NoteProps {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  target: Todo;
}

export interface Completed {
  id: number;
  newState: boolean;
}

export interface Data {
  title: string;
  description: string;
  id?: number;
}
