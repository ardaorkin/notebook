import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./App.css";
import "./resizable.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { NoteData } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { FormInstance } from "antd";
import SearchBar from "./components/SearchBar";
import { reducer } from "./reducers";
import { addNoteAction, deleteNoteAction, dropNoteAction, updateNoteAction } from "./reducers/actions";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { handleDrop } from "./helpers";

const App = () => {
  const formRef = useRef<FormInstance>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateIndex, setUpdateIndex] = useState<number | undefined>(0);
  const [isVisible, toggleVisible] = useReducer((state) => !state, false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [notes, dispatchNotes] = useReducer(reducer, JSON.parse(localStorage.getItem("notes") || "[]"));

  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item: { id: number }, monitor: DropTargetMonitor) => handleDrop(item, monitor, notes, dispatchNotes),
  }));

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
  }, [notes]);

  const handleFinish = useCallback(
    (data: { title: string; note: string; date: Dayjs }): void => {
      const { date, ...rest } = data;
      const formattedDate = date.format("YYYY-MM-DD").toString();

      const noteData = {
        ...rest,
        date: formattedDate,
      };

      isUpdate ? updateNoteAction({ ...noteData, index: updateIndex }, dispatchNotes) : addNoteAction(noteData, dispatchNotes);

      toggleVisible();
      setIsUpdate(false);
      formRef.current?.resetFields();
    },
    [notes, isUpdate]
  );

  const togglePromise = () =>
    new Promise((resolve) => {
      resolve(toggleVisible());
    });

  const handleClickNote = async (data: NoteData) => {
    await togglePromise();
    setIsUpdate(true);
    const { date, id, ...rest } = data;
    setUpdateIndex(id);
    const dateObj = dayjs(date, "YYYY-MM-DD");
    formRef.current?.setFieldsValue({ ...rest, date: dateObj });
  };

  const handleCancel = useCallback(() => {
    toggleVisible();
    formRef.current?.resetFields();
  }, []);

  const filteredNotes = useMemo(() => {
    const filteredResult = notes.filter((note) => {
      const searchRegex = new RegExp(searchParam, "ig");
      const noteTitle = note.title.toLowerCase();
      const noteContent = note.note.toLowerCase();
      return [noteTitle, noteContent].filter((text) => text.match(searchRegex)).length > 0 && note;
    });
    return filteredResult;
  }, [searchParam, notes]);

  return (
    <>
      <div style={{ width: 345, marginBottom: 50 }}>
        <SearchBar onSearch={setSearchParam} />
      </div>
      <NoteForm onFinish={handleFinish} isVisible={isVisible} onCancel={handleCancel} ref={formRef} />
      <NoteList
        ref={drop}
        onAddNewNote={toggleVisible}
        searchParam={searchParam}
        notes={filteredNotes}
        onDelete={(id) => deleteNoteAction(id, dispatchNotes)}
        onClickNote={handleClickNote}
      />
    </>
  );
};

export default App;
