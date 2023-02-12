import { useState } from "react";
import "./App.css";
import Chat from "./component/Chat";
import InputKey from "./component/InputKey";
import "antd/dist/reset.css";

function App() {
  const [opt, setOpt] = useState({
    hasApi: false,
    key: "",
  });

  return (
    <div className="App">
      <div className="main">
        <InputKey setOpt={setOpt} />
        <Chat apiKey={opt.key} hasApi={opt.hasApi} />
      </div>
    </div>
  );
}

export default App;
