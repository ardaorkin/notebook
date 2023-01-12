import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { INote, INoteAction, INoteRow } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { Button, FormInstance } from "antd";
import SearchBar from "./components/SearchBar";

const reducer = (state: INote[], action: INoteAction): INote[] => {
  switch (action.type) {
    case "GET_NOTES":
      return action.payload;
    case "ADD_NOTE":
      return [action.payload, ...state];
    case "UPDATE_NOTE":
      const copy = [...state];
      const { index, ...rest } = action.payload;
      copy[index] = rest;
      return copy;
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
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateIndex, setUpdateIndex] = useState<number | undefined>(0);
  const [isVisible, toggleVisible] = useReducer((state) => !state, false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [notes, dispatchNotes] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
  }, [notes]);

  const handleFinish = (data: {
    title: string;
    note: string;
    date: Dayjs;
  }): void => {
    const { date, ...rest } = data;
    const formattedDate = date.format("YYYY-MM-DD").toString();

    const noteData = {
      ...rest,
      date: formattedDate,
      ...(isUpdate ? { index: updateIndex } : {}),
    };

    dispatchNotes({
      type: isUpdate ? "UPDATE_NOTE" : "ADD_NOTE",
      payload: noteData,
    });

    toggleVisible(); //gonna update isVisible state as false
    setIsUpdate(false);
    formRef.current?.resetFields();
  };

  const handleDelete = (id: number) => {
    dispatchNotes({
      type: "DELETE_NOTE",
      payload: id,
    });
  };

  const togglePromise = () =>
    new Promise((resolve) => {
      resolve(toggleVisible());
    });

  const handleClickRow = async (data: INoteRow) => {
    await togglePromise();
    setIsUpdate(true);
    const { date, ...rest } = data.record;
    setUpdateIndex(data.rowIndex);
    const dateObj = dayjs(date, "YYYY-MM-DD");
    formRef.current?.setFieldsValue({ ...rest, date: dateObj });
  };

  const handleCancel = () => {
    toggleVisible();
    formRef.current?.resetFields();
  };

  return (
    <>
      <NoteForm
        onFinish={handleFinish}
        isVisible={isVisible}
        onCancel={handleCancel}
        ref={formRef}
      />
      <Button
        type="primary"
        onClick={toggleVisible}
        style={{ marginBottom: 5 }}
      >
        Add New Note
      </Button>
      <SearchBar onSearch={setSearchParam} />
      <NoteList
        notes={notes.filter((note) => note.title.includes(searchParam))}
        onDelete={handleDelete}
        onClickRow={handleClickRow}
      />
    </>
  );
};

export default App;
