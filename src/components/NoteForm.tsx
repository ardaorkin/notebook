import { useEffect, useRef } from "react";
import * as React from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
} from "antd";
import { INoteFormProps } from "../types/note";

function NoteForm(
  { onFinish, isVisible, onCancel }: INoteFormProps,
  ref: React.ForwardedRef<FormInstance>
) {
  const { Item } = Form;
  const noteRef = useRef<InputRef>(null);

  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  return (
    <Modal
      onCancel={onCancel}
      open={isVisible}
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
        ref={ref}
        id="newNoteForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: "5%" }}
      >
        <Item name="title">
          <Input ref={noteRef} maxLength={144} />
        </Item>
        <Item name="note">
          <Input.TextArea
            maxLength={255}
            rows={6}
            spellCheck
            style={{ resize: "none" }}
          />
        </Item>
        <Item name="date">
          <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
        </Item>
      </Form>
    </Modal>
  );
}

export default React.forwardRef(NoteForm);
