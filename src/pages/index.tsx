import { NGraphXAIChat } from "@/components/chat";
import { Col, Row } from "antd";

export default function HomePage() {
  return (
    <div>
      <Row>
        <Col flex={"auto"}></Col>
        <Col flex="30%">
          <NGraphXAIChat
            flowId="bd95a15d-e115-40a4-be83-524fd7bc4bfd"
            resultCallback={(data) => {
              console.log(data);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
