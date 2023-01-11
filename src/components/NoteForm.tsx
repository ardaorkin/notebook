import { useEffect, useRef } from "react";
import * as React from "react";
import { Button, DatePicker, Form, Input, InputRef } from "antd";
import { Dayjs } from "dayjs";
import { INoteFormProps } from "../types/note";

export default function NoteForm({
  onFinish,
}: INoteFormProps): React.ReactElement {
  const { Item } = Form;
  const noteRef = useRef<InputRef>(null);
  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  return (
    <Form onFinish={onFinish} layout="inline">
      <Item name="note">
        <Input ref={noteRef} />
      </Item>
      <Item name="date">
        <DatePicker format={"YYYY-MM-DD"} />
      </Item>
      <Item>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Item>
    </Form>
  );
}
