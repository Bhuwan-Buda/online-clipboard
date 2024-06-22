import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import GetSecretKey from "./Components/GetSecretKey";
import GetMessage from "./Components/GetMessage";

function App() {
  const { width, height } = useWindowSize();
  const [value, setValue] = useState(0);
  const [fetchedMessage, setFetchedMessage] = useState("");

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
    <>
      {fetchedMessage && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          gravity={0.5}
          numberOfPieces={700}
          tweenDuration={6000}
        />
      )}
      <div className="App">
        <div className="wrapper">
          <div>
            <h2 className="text-center px-1"> - Message Encrypter -</h2>
            <p className="text-center px-1">
              Encrypt your message with unique id and share it to closed ones.
            </p>
          </div>
          <div className="online-clipboard-wrapper">
            <div className="d-flex align-item-center justify-content-center">
              <ul
                className="nav nav-tabs"
                id="online-clipboard-tab"
                role="tablist"
              >
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
                    Get Key
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
                <GetMessage
                  fetchedMessage={fetchedMessage}
                  setFetchedMessage={setFetchedMessage}
                />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
