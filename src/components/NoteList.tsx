import * as React from "react";
import { Note, NoteData, NoteListProps } from "../types";
import { Button, Card, Col, Row, Skeleton } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CardExtra = ({
  onClick,
}: {
  onClick: () => void;
}): React.ReactElement => {
  return <DeleteOutlined style={{ fontSize: 18 }} onClick={onClick} />;
};

export default function NoteList({
  notes,
  onDelete,
  onClickNote,
  searchParam,
  onAddNewNote,
}: NoteListProps): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    notes && setIsLoading(false);
  }, [notes]);

  if (isLoading) return <Skeleton />;
  return (
    <Row gutter={24}>
      <Col>
        <Card
          bordered
          onClick={onAddNewNote}
          hoverable
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <h1>+</h1>
        </Card>
      </Col>
      {[...notes].map(({ title, note, date }, id) => (
        <Col key={id}>
          <Card
            bordered
            bodyStyle={{ overflowY: "auto", height: "80%" }}
            hoverable
            title={title}
            extra={<CardExtra onClick={() => onDelete(id)} />}
            className="card"
            onClick={() => onClickNote({ title, note, date, id })}
          >
            {note}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
