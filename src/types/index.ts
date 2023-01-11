export interface INote {
  title: string;
  note: string;
  date: string;
}

export interface INoteRow {
  record: INote;
  rowIndex: number | undefined;
}
export interface INoteListProps {
  notes: INote[];
  onDelete: (id: number) => void;
  onClickRow: (data: INoteRow) => void;
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
