export type Note = {
  title: string;
  note: string;
  date: string;
};

export type NoteRow = {
  record: Note;
  rowIndex: number | undefined;
};
export type NoteListProps = {
  notes: Note[];
  onDelete: (id: number) => void;
  onClickRow: (data: NoteRow) => void;
  searchParam?: string;
};

export type NoteFormProps = {
  onFinish: (data: any) => void;
  isVisible: boolean;
  onCancel: (data: any) => void;
};

export type NoteAction = {
  type: string;
  payload: any;
};

export type SearchBarProps = {
  onSearch: (value: string) => void;
};

export type Dispatch = (action: NoteAction) => void;
