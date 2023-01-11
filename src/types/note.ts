import { Dayjs } from "dayjs";

export interface INote {
  note: string;
  date: string;
}

export interface INoteListProps {
  notes: INote[];
  onDelete: (id: number) => void;
}

export interface INoteFormProps {
  onFinish: (data: any) => void;
  isVisible: boolean;
  onCancel: (data: any) => void;
}

export interface INoteAction {
  type: string;
  payload: any;
}
