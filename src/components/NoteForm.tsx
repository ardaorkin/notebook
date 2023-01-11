import { useEffect, useRef } from "react";
import * as React from "react";
import { Button, DatePicker, Form, Input, InputRef, Modal } from "antd";
import { INoteFormProps } from "../types/note";

export default function NoteForm({
  onFinish,
  isVisible,
  onCancel,
}: INoteFormProps): React.ReactElement {
  const { Item } = Form;
  const noteRef = useRef<InputRef>(null);

  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  return (
    <Modal
      onCancel={onCancel}
      visible={isVisible}
      footer={[
        <Button
          form="newNoteForm"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        id="newNoteForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: "5%" }}
      >
        <Item name="header">
          <Input ref={noteRef} />
        </Item>
        <Item name="note">
          <Input.TextArea />
        </Item>
        <Item name="date">
          <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
        </Item>
      </Form>
    </Modal>
  );
}
