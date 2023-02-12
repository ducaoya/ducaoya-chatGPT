import { ChatMessage } from "../../http/chat";

interface Props {
  msg: ChatMessage;
}

function Msgitem({ msg }: Props) {
  return msg.role === "user" ? (
    <div className="msg_item user">
      <div className="role">😲</div>
      <div className="msg">
        <div className="msg_box">{msg.text}</div>
      </div>
    </div>
  ) : (
    <div className="msg_item assistant">
      <div className="role">🤖</div>
      <div className="msg">
        <div className="msg_box">{msg.text}</div>
      </div>
    </div>
  );
}

export default Msgitem;
