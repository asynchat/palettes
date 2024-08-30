import { request } from "@umijs/max";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState();

  const doLoginAction = async (userName: string, passwd: string) => {
    return await request("/base/auth/logon", {
      method: "POST",
      data: {
        identity: userName,
        password: passwd,
      },
    });
  };

  return {
    setData,
    doLoginAction,
  };
}
