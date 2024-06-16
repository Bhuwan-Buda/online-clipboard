import React, { useState } from "react";
import { supabase } from "../Utils/supabase";
import { Copy, SendHorizontal } from "lucide-react";

const GetSecretKey = () => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const handleSecretKey = async () => {
    try {
      if (message !== "") {
        const { data } = await supabase
          .from("messages")
          .insert({
            message: message,
          })
          .select("uniqueId");
        if (data !== null) {
          setUniqueId(data[0]?.uniqueId);
          setMessage("");
        }
      } else {
        alert("Enter message.");
      }
    } catch (error) {
      if (error) {
        alert("Data not found.");
        setMessage("");
        setUniqueId("");
      }
    }
  };

  const handleCopy = async () => {
    const value = document.getElementById("uniqueId").innerHTML;
    navigator.clipboard.writeText(value);
    const copiedText = await navigator.clipboard.readText();
    if (copiedText === uniqueId) {
      setCopied(true);
    } else {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-4 w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your message here..."
          value={message}
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button" className="btn btn-md" onClick={handleSecretKey}>
          <SendHorizontal size={16} /> Submit
        </button>

        {uniqueId !== "" && (
          <div className="d-flex flex-md-row flex-column align-items-center justify-content-center gap-4">
            <p className="fw-normal m-0 p-0">
              Retrieve your message via secret key:- "
              <span className="fw-bold" id="uniqueId">
                {uniqueId}
              </span>
              "
            </p>
            <button
              className="copy-button"
              onClick={handleCopy}
              disabled={copied}
            >
              <Copy size={12} />
              {copied ? " copied" : " copy"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GetSecretKey;
