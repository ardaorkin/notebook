import { Note, NoteAction } from "../types";
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "./actionTypes";

export const reducer = (state: Note[], action: NoteAction): Note[] => {
  switch (action.type) {
    case ADD_NOTE:
      return [action.payload, ...state];
    case UPDATE_NOTE:
      const copy = [...state];
      const { index, ...rest } = action.payload;
      copy[index] = rest;
      return copy;
    case DELETE_NOTE:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    default:
      return state;
  }
};
