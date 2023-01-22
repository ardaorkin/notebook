import { Card } from "antd";
import * as React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { INoteCardProps } from "../types";
import { useDrag } from "react-dnd";

const CardExtra = ({ onClick }: { onClick: () => void }): React.ReactElement => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick();
  };
  return <DeleteOutlined style={{ color: "#f5222d", marginLeft: 10 }} onClick={handleClick} />;
};

export default function NoteCard({ title, note, date, id, onClickNote, onDelete, searchParam }: INoteCardProps) {
  const [{ isDragging, opacity }, drag, dragPreview]: [any, any, any] = useDrag(() => ({
    type: "CARD",
    item: { id },
    collect(monitor) {
      return {
        opacity: monitor.isDragging() ? 0 : 1,
      };
    },
  }));

  return (
    <Card
      id={"card-" + id}
      {...(isDragging ? { ref: dragPreview } : { ref: drag })}
      bordered
      bodyStyle={{ overflowY: "auto", height: "80%" }}
      hoverable
      title={title}
      extra={<CardExtra onClick={() => onDelete(id)} />}
      style={{ opacity }}
      className="card"
      onClick={() => onClickNote({ title, note, date, id })}
    >
      <Highlighter searchWords={[searchParam]} autoEscape={true} textToHighlight={note} />
    </Card>
  );
}
