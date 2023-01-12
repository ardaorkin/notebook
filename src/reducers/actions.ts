import { Dispatch, INote } from "../types";
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "./actionTypes";

export const addNoteAction = (data: INote, dispatch: Dispatch) =>
  dispatch({
    type: ADD_NOTE,
    payload: data,
  });

export const updateNoteAction = (
  data: INote & { index: number | undefined },
  dispatch: Dispatch
) =>
  dispatch({
    type: UPDATE_NOTE,
    payload: data,
  });

export const deleteNoteAction = (id: number, dispatch: Dispatch) =>
  dispatch({
    type: DELETE_NOTE,
    payload: id,
  });
