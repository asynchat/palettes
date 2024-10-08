import { Conf } from "@/misc/conf";
import { request } from "@umijs/max";
import { message } from "antd";
import { useState } from "react";

export default function Page() {
  const [palettesData, setPalettesData] = useState([]);

  const executeFlow = async (
    flowId: string,
    params: any,
    messages: any,
    callback: (data: any) => void
  ) => {
    const endpoint = Conf.endpoint(flowId);
    return await request(endpoint, {
      method: "POST",
      data: {
        flow_id: flowId,
        params: params,
        messages: messages,
      },
    }).then(callback);
  };

  const executePalettesRetrievalFlow = async (msg: any) => {
    executeFlow(
      "fa61c7d3-9478-4179-b395-afddacbce2e8",
      {},
      [{ role: "user", content: msg }],
      (data) => {
        if (data.status === 200) {
          const result = data.data;
          for (const item of result) {
            if (item.dock === "metadata") {
              setPalettesData(item.value);
              break;
            }
          }
        } else {
          message.error("检索失败!");
        }
      }
    );
  };
  return { executeFlow, executePalettesRetrievalFlow, palettesData };
}
