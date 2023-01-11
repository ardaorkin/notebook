import * as React from "react";
import { INoteListProps } from "../types";
import { Button, Table } from "antd";

export default function NoteList({
  notes,
  onDelete,
  onClickRow,
}: INoteListProps): React.ReactElement {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
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
        <Button
          danger
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={notes}
      columns={columns}
      bordered
      rowKey={"title"}
      onRow={(record, rowIndex) => {
        return { onClick: () => onClickRow({ record, rowIndex }) };
      }}
    />
  );
}
