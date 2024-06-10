import React, { useState } from "react";
import { supabase } from "../Utils/supabase";

const GetMessage = () => {
  const [secretKey, setSecretKey] = useState("");
  const [fetchedMessage, setFetchedMessage] = useState("");

  const handleGetMessage = async () => {
    try {
      if (secretKey !== "") {
        const { data } = await supabase
          .from("messages")
          .select("message")
          .eq("uniqueId", secretKey);
        setFetchedMessage(data[0]?.message);
      } else {
        alert("Enter secret key.");
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
        placeholder="Enter your secret key here..."
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value.trim())}
      />
      <button type="button" className="btn btn-md" onClick={handleGetMessage}>
        Get Message
      </button>
      {fetchedMessage !== "" && (
        <p className="text-center">Message:- {fetchedMessage}</p>
      )}
    </div>
  );
};

export default GetMessage;
