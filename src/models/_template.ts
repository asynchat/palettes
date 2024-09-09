import { Conf } from "@/misc/conf";
import { request } from "@umijs/max";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState({});

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
        messages: messages
      },
    }).then(callback);
  };

  const executeSomeFlow = async (messages: any) => {
    executeFlow("xxx-xxx-xxx-xx", {}, messages, (data) => {
      setData(data);
    });
  };
  return { executeFlow, executeSomeFlow, data };
}
