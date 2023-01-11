import * as React from "react";
import { INoteListProps } from "../types/note";
import { Button, Table } from "antd";

export default function NoteList({
  notes,
  onDelete,
}: INoteListProps): React.ReactElement {
  const columns = [
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (
        text: string,
        record: any,
        index: number
      ): React.ReactElement => (
        <Button danger type="primary" onClick={() => onDelete(index)}>
          Delete
        </Button>
      ),
    },
  ];

  return <Table dataSource={notes} columns={columns} bordered />;
}
