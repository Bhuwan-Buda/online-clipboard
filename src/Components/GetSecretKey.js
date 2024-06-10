import React, { useState } from "react";
import { supabase } from "../Utils/supabase";
import { Copy } from "lucide-react";

const GetSecretKey = () => {
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
      alert(error);
    }
  };

  const handleCopy = () => {
    const value = document.getElementById("uniqueId").innerHTML;
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-4 w-100">
      <input
        type="text"
        className="form-control"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" className="btn btn-md" onClick={handleSecretKey}>
        Get Secret Key
      </button>

      {uniqueId !== "" && (
        <p>
          Save your secret key:- <span id="uniqueId">{uniqueId}</span>
        </p>
      )}
      {uniqueId !== "" && (
        <button className="copy-button" onClick={handleCopy}>
          <Copy size={12} />
          &nbsp;copy
        </button>
      )}
    </div>
  );
};

export default GetSecretKey;
