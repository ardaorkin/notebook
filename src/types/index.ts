export type Note = {
  title: string;
  note: string;
  date: string;
};

export type NoteData = Note & { id: number };
export type NoteListProps = {
  notes: Note[];
  onDelete: (id: number) => void;
  onClickNote: (data: NoteData) => void;
  onAddNewNote: () => void;
  searchParam: string | "";
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
