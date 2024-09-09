import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  AiChat,
  MessageReceivedCallback,
  MessageReceivedEventDetails,
  StreamSend,
  StreamingAdapterObserver,
  useAsStreamAdapter,
} from "@nlux/react";
import _ from "lodash";
import { useCallback, useState } from "react";
import { highlighter } from "@nlux/highlighter";
import "@nlux/highlighter/light-theme.css";
import "@nlux/themes/nova.css";
import { Conf } from "@/misc/conf";

export interface NGraphXAIChatProps {
  flowId: string;
  resultCallback?: (data: any) => void;
  params?: any;
  initMessages?: any;
  conversationSize?: number;
  width?: number | string;
  height?: number | string;
}

export function NGraphXAIChat(props: NGraphXAIChatProps) {
  const [historyMessages, setHistoryMessages] = useState<any>([]);
  const messageReceivedCallback = useCallback<MessageReceivedCallback>(
    (received: MessageReceivedEventDetails) => {
      console.log(received, "Chat Received.");
    },
    []
  );
  const chatMessage: StreamSend = async (
    prompt: string,
    observer: StreamingAdapterObserver
  ) => {
    const body = {
      flow_id: props.flowId,
      messages: _.concat(historyMessages, [{ role: "user", content: prompt }]),
      params: props.params ?? {},
    };
    await fetchEventSource(Conf.endpoint(props.flowId), {
      method: "POST",
      body: JSON.stringify(body),
      openWhenHidden: true,
      headers: {
        "Content-Type": "application/json",
      },
      onmessage: (event: any) => {
        let msg = event.data.replaceAll("data: ", "");
        msg = msg.replace(/^\s/, "");
        if (msg.startsWith("@__Result__: ")) {
          if (props.resultCallback) {
            props.resultCallback(JSON.parse(msg.replace("@__Result__: ", "")));
          }
        } else {
          observer.next(event.data);
        }
      },
      onerror: (err: any) => {
        console.log(err);
        observer.error(new Error(err));
        throw err;
      },
      onclose: () => {
        observer.complete();
      },
    });
    const limit = props.conversationSize ?? 20;
    if (body.messages.length % limit > 0) {
      setHistoryMessages([]);
    } else {
      setHistoryMessages(body.messages);
    }
  };
  const adapter = useAsStreamAdapter(chatMessage, []);
  return (
    <AiChat
      events={{ messageReceived: messageReceivedCallback }}
      adapter={adapter}
      displayOptions={{
        colorScheme: "light",
        width: props.width,
        height: props.height,
      }}
      messageOptions={{ syntaxHighlighter: highlighter }}
      conversationOptions={{
        showWelcomeMessage: false,
      }}
      composerOptions={{
        placeholder: "Type your prompt here",
        autoFocus: true,
      }}
      initialConversation={props.initMessages ?? []}
      className="aichat-container-custom"
    />
  );
}
