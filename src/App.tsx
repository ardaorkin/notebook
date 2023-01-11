import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { INote, INoteAction } from "./types/note";
import { Dayjs } from "dayjs";
import { Button, FormInstance } from "antd";

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
  const formRef = useRef<FormInstance>(null);
  const [isVisible, toggleVisible] = useReducer((state) => !state, false);
  const [notes, dispatchNotes] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
  }, [notes]);

  const onFinish = (data: {
    title: string;
    note: string;
    date: Dayjs;
  }): void => {
    const { title, note, date } = data;
    const formattedDate = date.format("YYYY-MM-DD").toString();
    const noteData = {
      title,
      note,
      date: formattedDate,
    };
    dispatchNotes({
      type: "ADD_NOTE",
      payload: noteData,
    });
    localStorage.setItem("notes", JSON.stringify([...notes, noteData]));
    toggleVisible(); //gonna update isVisible state as false
    formRef.current?.resetFields();
  };

  const onDelete = (id: number) => {
    dispatchNotes({
      type: "DELETE_NOTE",
      payload: id,
    });
  };

  return (
    <>
      <NoteForm
        onFinish={onFinish}
        isVisible={isVisible}
        onCancel={toggleVisible}
        ref={formRef}
      />
      <Button
        type="primary"
        onClick={toggleVisible}
        style={{ marginBottom: 5 }}
      >
        Add New Note
      </Button>
      <NoteList notes={notes} onDelete={onDelete} />
    </>
  );
};

export default App;
