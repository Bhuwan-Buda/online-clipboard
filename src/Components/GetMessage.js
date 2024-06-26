import React, { useState } from "react";
import { supabase } from "../Utils/supabase";
import { SendHorizontal } from "lucide-react";
import confettiSound from "../assets/sound.mp3";

const GetMessage = ({ fetchedMessage, setFetchedMessage }) => {
  const [secretKey, setSecretKey] = useState("");

  const handleGetMessage = async () => {
    setFetchedMessage("");
    try {
      if (secretKey !== "") {
        const { data } = await supabase
          .from("messages")
          .select("message")
          .eq("uniqueId", secretKey);
        if (data?.length > 0) {
          const newAudio = new Audio(confettiSound);
          await newAudio.play();
          setFetchedMessage(data[0]?.message);
        } else {
          alert("Invalid secret key.");
        }
        setSecretKey("");
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
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-4 w-100">
        <input
          type="text"
          autoFocus
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
