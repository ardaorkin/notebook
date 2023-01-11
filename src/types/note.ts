import { Dayjs } from "dayjs";

export interface INote {
  note: string;
  date: string;
}

export interface INoteListProps {
  notes: INote[];
}

export interface INoteFormProps {
  onFinish: (data: any) => void;
}

export interface INoteAction {
  type: string;
  payload: any;
}
