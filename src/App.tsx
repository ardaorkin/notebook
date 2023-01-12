import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { INoteRow } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { Button, FormInstance } from "antd";
import SearchBar from "./components/SearchBar";
import { reducer } from "./reducers";
import {
  addNoteAction,
  deleteNoteAction,
  updateNoteAction,
} from "./reducers/actions";

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
    };

    isUpdate
      ? updateNoteAction({ ...noteData, index: updateIndex }, dispatchNotes)
      : addNoteAction(noteData, dispatchNotes);

    toggleVisible();
    setIsUpdate(false);
    formRef.current?.resetFields();
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
        style={{ marginBottom: 5, marginRight: 5 }}
      >
        Add New Note
      </Button>
      <SearchBar onSearch={setSearchParam} />
      <NoteList
        searchParam={searchParam}
        notes={notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchParam.toLowerCase()) ||
            note.note.toLowerCase().includes(searchParam.toLowerCase())
        )}
        onDelete={(id) => deleteNoteAction(id, dispatchNotes)}
        onClickRow={handleClickRow}
      />
    </>
  );
};

export default App;
