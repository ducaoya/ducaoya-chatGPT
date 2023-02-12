import { useState } from "react";
import { Input, Button, message } from "antd";
import { createAPI } from "../../http/chat";

interface Props {
  setHasApi: (hasApi: boolean) => void;
}

function InputKey({ setHasApi }: Props) {
  const [value, setValue] = useState("");

  const setKey = () => {
    if (value) {
      console.log(value);

      createAPI(value)
        .then((res) => {
          if (res.status === 200 && res.data.result === "ok") {
            setHasApi(true);
            message.success("创建 API 成功！");
          } else {
            setHasApi(false);
            message.error("创建 API 失败！" + res.data.msg);
          }
        })
        .catch((e) => {
          setHasApi(false);
          message.error("创建 API 失败！");
        });
    }
  };

  return (
    <div className="input_key">
      <Input
        className="input"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="primary" onClick={setKey}>
        设置key
      </Button>
    </div>
  );
}

export default InputKey;
