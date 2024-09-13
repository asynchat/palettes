import { Col, message, Row } from "antd";
import _ from "lodash";
interface ColorBarProps {
  items: Array<Array<string>>;
}

interface ColorBarItemProps {
  items: Array<string>;
}

function ColorBarItem(props: ColorBarItemProps) {
  return (
    <Row
      style={{ marginTop: "5px" }}
      onClick={() => {
        navigator.clipboard.writeText(_.join(props.items, ", "));
        message.info("已复制.");
      }}
    >
      {props.items.map((color, index) => {
        return (
          <Col
            style={{ backgroundColor: color, width: 64, height: 64 }}
            key={`color-bar-item-color-${index}`}
          ></Col>
        );
      })}
    </Row>
  );
}

export function ColorBar(props: ColorBarProps) {
  return (
    <div>
      {props.items.map((value, index) => {
        return <ColorBarItem items={value} key={`color-bar-item-${index}`} />;
      })}
    </div>
  );
}
