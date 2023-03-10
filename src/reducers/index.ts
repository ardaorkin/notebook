import { Note, NoteAction } from "../types";
import { ADD_NOTE, DELETE_NOTE, DROP_NOTE, UPDATE_NOTE } from "./actionTypes";

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
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];
    case DROP_NOTE:
      const { oldIndex, newIndex } = action.payload;
      const oldElement = { ...state[oldIndex] };
      const nearestElement = { ...state[newIndex] };
      const newState = [...state];
      newState[oldIndex] = nearestElement;
      newState[newIndex] = oldElement;
      return newState;
    default:
      return state;
  }
};
