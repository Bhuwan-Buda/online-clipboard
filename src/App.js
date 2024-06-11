import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import GetSecretKey from "./Components/GetSecretKey";
import GetMessage from "./Components/GetMessage";

function App() {
  const [value, setValue] = useState(0);

  function TabPanel(props) {
    const { children, value, index, tab, ...other } = props;
    return (
      <div
        className="tab-pane show active"
        id={tab}
        role="tabpanel"
        aria-labelledby={`${tab}-tab`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  return (
    <div className="App">
      <h2 className="text-center"> - Online Clipboard -</h2>
      <div className="online-clipboard-wrapper">
        <div className="d-flex align-item-center justify-content-center">
          <ul className="nav nav-tabs" id="online-clipboard-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={value === 0 ? "nav-link active" : "nav-link"}
                id="get-secret-key-tab"
                onClick={() => {
                  setValue(0);
                }}
                data-toggle="tab"
                data-target="#get-secret-key"
                type="button"
                role="tab"
                aria-controls="get-secret-key"
                aria-selected="true"
              >
                Save Message
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={value === 1 ? "nav-link active" : "nav-link"}
                id="get-message-tab"
                onClick={() => {
                  setValue(1);
                }}
                data-toggle="tab"
                data-target="#get-message"
                type="button"
                role="tab"
                aria-controls="get-message"
                aria-selected="false"
              >
                Get Message
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="online-clipboard-tabContent">
          <TabPanel value={value} index={0} tab="get-secret-key">
            <GetSecretKey />
          </TabPanel>
          <TabPanel value={value} index={1} tab="get-message">
            <GetMessage />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
