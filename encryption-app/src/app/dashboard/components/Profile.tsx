import React from "react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "../styles/profile.css";

export const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const hasRun = useRef(false);

  // TODO: CHANGE TOKEN FROM LOCAL STORAGE
  const token = "";

  useEffect(() => {
    if (!hasRun.current) {
      const getData = async () => {
        const url = "http://localhost:8888/api/user/me";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserData(data);

        const imageResponse = await fetch(data.data.ktp_path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const imageBlob = await imageResponse.blob();
        const blobUrl = URL.createObjectURL(imageBlob);
        setImageSrc(blobUrl);

        // Show toast message after fetching data
        toast.success(imageResponse.headers.get("Time"));
      };
      getData();
      hasRun.current = true;
    }
  }, []);

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <hr />
      {userData.data ? (
        <div className="profile-container">
          <div className="profile-ktp">
            <img src={imageSrc} alt="KTP" />
          </div>
          <div className="profile-detail">
            <table>
              <tr>
                <td>
                  <h3>ID:</h3>
                </td>
                <td>
                  <h3>{userData.data.id}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Name:</h3>
                </td>
                <td>
                  <h3>{userData.data.name}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Email:</h3>
                </td>
                <td>
                  <h3>{userData.data.email}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Unique Key:</h3>
                </td>
                <td>
                  <h3>{userData.data.key}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Role:</h3>
                </td>
                <td>
                  <h3>{userData.data.role}</h3>
                </td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
