import { DropTargetMonitor } from "react-dnd";
import { Dispatch, Note } from "../types";
import { dropNoteAction } from "../reducers/actions";

export const handleDrop = (item: { id: number }, monitor: DropTargetMonitor, notes: Note[], dispatcher: Dispatch) => {
  const { id } = item;
  const defaultOffsetObject = { x: 0, y: 0 };
  const { x } = monitor.getDifferenceFromInitialOffset() || defaultOffsetObject;
  if (Math.abs(x) > 10) {
    const newIndex = Math.round(x / 345) + id;
    if (notes[newIndex]) {
      dropNoteAction({ oldIndex: id, newIndex }, dispatcher);
    }
  }
};
