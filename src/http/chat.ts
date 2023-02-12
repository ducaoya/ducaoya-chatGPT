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
  baseURL: "https://ducaoya-chat-gpt-koa-2646.vercel.app",
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
 * @param msg 发送的消息
 * @param opt 参数
 * @returns
 */
export async function sendMessage(msg: string, opt?: SendMsgOption) {
  return instance.post("/message", {
    msg,
    opt,
  });
}
