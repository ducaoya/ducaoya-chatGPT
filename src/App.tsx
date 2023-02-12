import { useState } from "react";
import "./App.css";
import Chat from "./component/Chat";
import InputKey from "./component/InputKey";
import "antd/dist/reset.css";

function App() {
  const [hasApi, setHasApi] = useState(false);

  return (
    <div className="App">
      <div className="main">
        <InputKey setHasApi={setHasApi} />
        <Chat hasApi={hasApi} />
      </div>
    </div>
  );
}

export default App;
