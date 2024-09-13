import { ColorBar } from "@/components/bar";
import { NGraphXAIChat } from "@/components/chat";
import { useModel } from "@umijs/max";
import { Col, Row } from "antd";

export default function HomePage() {
  const { executePalettesRetrievalFlow, palettesData } = useModel("flows");
  const colors = [];
  if (palettesData) {
    for (const row of palettesData) {
      colors.push(JSON.parse(row["colors"]));
    }
  }
  return (
    <div>
      <Row>
        <Col
          flex={"auto"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ColorBar items={colors} />
        </Col>
        <Col flex="30%">
          <NGraphXAIChat
            flowId="b5e98da6-4fa5-423e-a03c-1dfa3b1f3121"
            onMessageReceivedCallback={(data) => {
              console.log(data);
              executePalettesRetrievalFlow(data);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
