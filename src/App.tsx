import { useReducer } from "react";
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
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [notes, dispatchNotes] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

  const onFinish = (data: { note: string; date: Dayjs }): void => {
    const formattedDate = data.date.format("YYYY-MM-DD").toString();
    const noteData = { note: data.note, date: formattedDate };
    dispatchNotes({
      type: "ADD_NOTE",
      payload: noteData,
    });
    localStorage.setItem("notes", JSON.stringify([...notes, noteData]));
  };

  return (
    <div className="App">
      <NoteForm onFinish={onFinish} />
      <NoteList notes={notes} />
    </div>
  );
};

export default App;
