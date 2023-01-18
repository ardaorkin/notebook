import { Dispatch, Note } from "../types";
import { ADD_NOTE, DELETE_NOTE, DROP_NOTE, UPDATE_NOTE } from "./actionTypes";

export const addNoteAction = (data: Note, dispatch: Dispatch) =>
  dispatch({
    type: ADD_NOTE,
    payload: data,
  });

export const updateNoteAction = (data: Note & { index: number | undefined }, dispatch: Dispatch) =>
  dispatch({
    type: UPDATE_NOTE,
    payload: data,
  });

export const deleteNoteAction = (id: number, dispatch: Dispatch) =>
  dispatch({
    type: DELETE_NOTE,
    payload: id,
  });

export const dropNoteAction = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }, dispatch: Dispatch) =>
  dispatch({
    type: DROP_NOTE,
    payload: { oldIndex, newIndex },
  });
