import { Card } from "antd";
import * as React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { INoteCardProps } from "../types";
import { useDrag } from "react-dnd";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { reduceSizes } from "../helpers";
import { cardSizePx, resizeDiffPx } from "../constants";

const CardExtra = ({ onClick }: { onClick: () => void }): React.ReactElement => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick();
  };
  return <DeleteOutlined style={{ color: "#f5222d", marginLeft: 10 }} onClick={handleClick} />;
};

export default function NoteCard({ title, note, date, id, onClickNote, onDelete, searchParam }: INoteCardProps) {
  const [width, setWidth] = React.useState<number>(cardSizePx.width + resizeDiffPx);
  const [height, setHeight] = React.useState<number>(cardSizePx.height + resizeDiffPx);

  const [{ isDragging, opacity }, drag, dragPreview]: [any, any, any] = useDrag(() => ({
    type: "CARD",
    item: { id },
    collect(monitor) {
      return {
        opacity: monitor.isDragging() ? 0 : 1,
      };
    },
  }));

  const onResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
    event.stopPropagation();
    const {
      size: { height, width },
    } = data;
    setHeight(height);
    setWidth(width);
  };

  return (
    <Resizable height={height} width={width} onResize={onResize} className="box">
      <div style={{ width, height }}>
        <Card
          id={"card-" + id}
          {...(isDragging ? { ref: dragPreview } : { ref: drag })}
          bordered
          bodyStyle={{ overflowY: "auto", height: "80%" }}
          hoverable
          title={title}
          extra={<CardExtra onClick={() => onDelete(id)} />}
          style={{ opacity, ...reduceSizes({ width, height }, resizeDiffPx) }}
          className="card"
          onClick={() => onClickNote({ title, note, date, id })}
        >
          <Highlighter searchWords={[searchParam]} autoEscape={true} textToHighlight={note} />
        </Card>
      </div>
    </Resizable>
  );
}
