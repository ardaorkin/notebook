import * as React from "react";
import { NoteListProps } from "../types";
import { Button, Table } from "antd";

export default function NoteList({
  notes,
  onDelete,
  onClickRow,
  searchParam,
}: NoteListProps): React.ReactElement {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => {
        const regex = searchParam && new RegExp(searchParam, "g");
        const content = regex
          ? text.replace(regex, `<mark>${searchParam}</mark>`)
          : text;
        return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
      },
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
      render: (text: string) => {
        const regex = searchParam && new RegExp(searchParam, "g");
        const content = regex
          ? text.replace(regex, `<mark>${searchParam}</mark>`)
          : text;
        return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
      },
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
