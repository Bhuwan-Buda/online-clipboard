import React, { useState } from "react";
import { supabase } from "../Utils/supabase";

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
      {uniqueId !== "" && <p>Save your secret key:- {uniqueId}</p>}
    </div>
  );
};

export default GetSecretKey;
