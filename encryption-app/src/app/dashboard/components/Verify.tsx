"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/popup.css";

interface VerifyProps {
  filename: string;
  publicKey: string;
  onCloseVerify: () => void;
}

export const Verify: React.FC<VerifyProps> = ({
  filename,
  publicKey,
  onCloseVerify,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let url = "http://localhost:8888/api/user/verify/" + publicKey;
    const formData = new FormData();
    formData.append("file", selectedFile);

    if (selectedFile) {
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            onCloseVerify();
            return response.json();
          } else {
            toast.error("Verification Failed: " + response.statusText);
            onCloseVerify();
          }
        })
        .then((data) => {
          if (data) {
            const message = data.message;
            toast.success("Verification Success: " + message);
          }
        });
    } else {
      toast.error("File cannot be empty!");
    }
  };

  return (
    <div className="verify">
      <div className="popup-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          {filename} Signature Verification
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={onCloseVerify}
        />
      </div>
      <form id="textInputForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Enter The Downloaded File</label>
          <input
            type="file"
            className="form-control"
            required
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Verify
        </button>
      </form>
    </div>
  );
};
