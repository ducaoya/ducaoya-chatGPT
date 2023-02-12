import { useEffect, useRef, useState } from "react";
import { sendMessage, ChatMessage, SendMsgOption } from "../../http/chat";
import { Input, Button, message } from "antd";
import Msgitem from "../MsgItem";
import loadingSVG from "../../assets/loading.svg";

interface Props {
  hasApi: boolean;
}

function Chat({ hasApi }: Props) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ChatMessage[]>([]);
  const [lastMsg, setLastMsg] = useState<ChatMessage | undefined>();
  const [msg, setMsg] = useState<string>("");

  const listRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);

  /**
   * 发送消息
   */
  const sendMsg = () => {
    if (!hasApi) {
      message.error("请设置key");
      return;
    }
    if (!loading && msg) {
      let opt: SendMsgOption | undefined = undefined;
      if (lastMsg) {
        opt = {
          conversationId: lastMsg.conversationId,
          parentMessageId: lastMsg.id,
        };
      }

      const userMsg: ChatMessage = {
        id: Date().toString(),
        text: msg,
        role: "user",
        parentMessageId: lastMsg?.id,
        conversationId: lastMsg?.conversationId,
      };
      list.push(userMsg);
      setList(list);
      setMsg("");

      setLoading(true);

      sendMessage(msg, opt)
        .then((res) => {
          setLoading(false);
          const { status, data } = res;

          if (status === 200 && data.result === "ok") {
            list.push(data);
            setLastMsg(data);
            setList(list);
          } else {
            message.error("发送消息失败");
          }
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          message.error("发送消息失败");
        });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      setMsg(msg + "\n");
      return;
    }

    if (e.key === "Enter" && hasApi) {
      sendMsg();
      e.preventDefault();
      return;
    }
  };

  const focus = () => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [list.length]);

  return (
    <div className="chat">
      <div className="list">
        <div ref={listRef}>
          {list.map((item) => (
            <Msgitem key={item.id} msg={item} />
          ))}
          {loading && (
            <div className="msg_item assistant">
              <div className="role">🤖</div>
              <div className="msg">
                <div className="msg_box">
                  <img className="loading" src={loadingSVG} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="input_box" onClick={focus}>
        <Input.TextArea
          ref={ref}
          className="input"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button
          disabled={!hasApi || loading || !msg}
          className="btn"
          onClick={sendMsg}
        >
          {loading ? (
            <img className="loading" src={loadingSVG} alt="" />
          ) : (
            "发送"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Chat;
