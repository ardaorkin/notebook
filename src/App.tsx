import { useEffect, useReducer } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { INote, INoteAction } from "./types/note";
import { Dayjs } from "dayjs";

const reducer = (state: INote[], action: INoteAction): INote[] => {
  switch (action.type) {
    case "GET_NOTES":
      return action.payload;
    case "ADD_NOTE":
      return [action.payload, ...state];
    case "DELETE_NOTE":
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [notes, dispatchNotes] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
  }, [notes]);

  const onFinish = (data: { note: string; date: Dayjs }): void => {
    const formattedDate = data.date.format("YYYY-MM-DD").toString();
    const noteData = { note: data.note, date: formattedDate };
    dispatchNotes({
      type: "ADD_NOTE",
      payload: noteData,
    });
    localStorage.setItem("notes", JSON.stringify([...notes, noteData]));
  };

  const onDelete = (id: number) => {
    dispatchNotes({
      type: "DELETE_NOTE",
      payload: id,
    });
  };

  return (
    <div className="App">
      <NoteForm onFinish={onFinish} />
      <br></br>
      <NoteList notes={notes} onDelete={onDelete} />
    </div>
  );
};

export default App;
