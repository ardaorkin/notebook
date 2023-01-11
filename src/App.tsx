import { useEffect, useRef } from "react";
import "./App.css";
import { Button, Form, Input, InputRef } from "antd";

const App: React.FC = () => {
  const { Item } = Form;
  const noteRef = useRef<InputRef>(null);

  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  const handleFinish = (data: any) => console.log(data);

  return (
    <div className="App">
      <Form onFinish={handleFinish} layout="inline">
        <Item name="note">
          <Input ref={noteRef} />
        </Item>
        <Item>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default App;
