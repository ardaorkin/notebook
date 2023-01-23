import { DropTargetMonitor } from "react-dnd";
import { Dispatch, Note, sizes } from "../types";
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

export const reduceSizes = (sizes: sizes, reducePx: number): {} =>
  Object.entries(sizes).reduce((prev, [key, value]) => {
    if (!prev) {
      return { [key]: value - reducePx };
    }
    return { ...prev, [key]: value - reducePx };
  }, {});
