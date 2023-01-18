import * as React from "react";
import { NoteListProps } from "../types";
import { Card, Col, Row, Skeleton } from "antd";
import NoteCard from "./NoteCard";

function NoteList({ notes, onDelete, onClickNote, searchParam, onAddNewNote }: NoteListProps, ref: React.ForwardedRef<any>): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, [notes]);

  if (isLoading) return <Skeleton />;
  return (
    <Row gutter={24} ref={ref}>
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
          <NoteCard
            {...{
              title,
              note,
              id,
              date,
              onClickNote,
              onDelete,
              searchParam,
            }}
          />
        </Col>
      ))}
    </Row>
  );
}

export default React.forwardRef(NoteList);
