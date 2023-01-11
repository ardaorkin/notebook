import * as React from "react";
import { INoteListProps } from "../types/note";
import { Table } from "antd";

export default function NoteList({
  notes,
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
  ];

  return <Table dataSource={notes} columns={columns} />;
}
