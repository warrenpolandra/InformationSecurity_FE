"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/popup.css";

interface PopupProps {
  token: string | null;
  filename: string;
  downKey: string;
  onClosePopup: () => void;
}

export const Popup: React.FC<PopupProps> = ({
  token,
  downKey,
  filename,
  onClosePopup,
}) => {
  const [ciphertext, setCiphertext] = useState("");
  const [initialValue, setInitialValue] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    var isOk = true;
    fetch(downKey, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        key: ciphertext,
        initial: initialValue,
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success(response.headers.get("Time"));
          onClosePopup();
          return response.blob();
        } else {
          toast.error("Request Failed: " + response.statusText);
          isOk = false;
          onClosePopup();
        }
      })
      .then((blob) => {
        if (isOk) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      });
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          Enter Key to Download {filename}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={onClosePopup}
        />
      </div>
      <form id="textInputForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Enter The Ciphertext Key</label>
          <input
            className="form-control"
            id="textInput"
            placeholder="Ciphertext Key"
            onChange={(e) => setCiphertext(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Enter The Encrypted Initial Value
          </label>
          <input
            type="text"
            className="form-control"
            id="textInput"
            placeholder="Initial Value"
            onChange={(e) => setInitialValue(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Download
        </button>
      </form>
    </div>
  );
};
