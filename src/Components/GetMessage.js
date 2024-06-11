import React, { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { supabase } from "../Utils/supabase";
import { SendHorizontal } from "lucide-react";

const GetMessage = () => {
  const { width, height } = useWindowSize();
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
        setSecretKey("");
        setFetchedMessage("");
      }
    } catch (error) {
      if (error) {
        alert("Invalid secret key.");
        setSecretKey("");
        setFetchedMessage("");
      }
    }
  };

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
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-4 w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your secret key here..."
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value.trim())}
        />
        <button type="button" className="btn btn-md" onClick={handleGetMessage}>
          <SendHorizontal size={16} /> Submit
        </button>
        {fetchedMessage !== "" && (
          <p className="text-center">
            " <i className="fw-bold">{fetchedMessage}</i> "
          </p>
        )}
      </div>
    </>
  );
};

export default GetMessage;
