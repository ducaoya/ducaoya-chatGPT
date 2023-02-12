import axios from "axios";

type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  text: string;
  role: Role;
  parentMessageId?: string;
  conversationId?: string;
}

/**
 * 发送消息选项
 * @param conversationId 会话id
 * @param parentMessageId 父级消息id
 */
export interface SendMsgOption {
  conversationId?: string;
  parentMessageId?: string;
}

const instance = axios.create({
  baseURL: "http://127.0.0.1:7788",
});

/**
 * 创建 chatgpt api
 * @param key open ai key
 * @returns
 */
export async function createAPI(key: string) {
  return instance.get("/create", {
    params: {
      key,
    },
  });
}

/**
 * 发送信息
 * @param key api key
 * @param msg 发送的消息
 * @param opt 参数
 * @returns
 */
export async function sendMessage(
  key: string,
  msg: string,
  opt?: SendMsgOption
) {
  return instance.post("/message", {
    key,
    msg,
    opt,
  });
}
