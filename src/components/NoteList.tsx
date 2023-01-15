import * as React from "react";
import { NoteListProps } from "../types";
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
  onClickRow,
  searchParam,
}: NoteListProps): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    notes && setIsLoading(false);
  }, [notes]);

  if (isLoading) return <Skeleton />;
  return (
    <Row justify={"start"} align={"middle"} gutter={12}>
      <Col offset={1}>
        <Card
          hoverable
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>+</h1>
        </Card>
      </Col>
      {[...notes].map(({ title, note, date }, idx) => (
        <Col key={idx} offset={1}>
          <Card
            hoverable
            title={title}
            extra={<CardExtra onClick={() => onDelete(idx)} />}
            className="card"
          >
            {note}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
