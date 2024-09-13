import { ColorBar } from "@/components/bar";
import { NGraphXAIChat } from "@/components/chat";
import { Conf } from "@/misc/conf";
import { useModel } from "@umijs/max";
import { Col, Row } from "antd";
import { useEffect } from "react";

export default function HomePage() {
  const { executePalettesRetrievalFlow, palettesData } = useModel("flows");
  useEffect(() => {
    Conf.load();
  });
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
            flowId="f734be60-b514-40d5-9bae-fc8d5b8cc4c1"
            onMessageReceivedCallback={(data) => {
              executePalettesRetrievalFlow(data);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
