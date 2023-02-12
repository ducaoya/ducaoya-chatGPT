import { useState } from "react";
import { Input, Button, message } from "antd";
import { createAPI } from "../../http/chat";

interface Props {
  setOpt: (opt: { hasApi: boolean; key: string }) => void;
}

function InputKey({ setOpt }: Props) {
  const [value, setValue] = useState("");

  const setKey = () => {
    const opt = {
      hasApi: false,
      key: "",
    };
    if (value) {
      createAPI(value)
        .then((res) => {
          if (res.status === 200 && res.data.result === "ok") {
            opt.hasApi = true;
            opt.key = value;
            message.success("创建 API 成功！");
          } else {
            opt.hasApi = false;
            message.error("创建 API 失败！" + res.data.msg);
          }
        })
        .catch((e) => {
          opt.hasApi = false;
          message.error("创建 API 失败！");
        })
        .finally(() => {
          setOpt(opt);
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
