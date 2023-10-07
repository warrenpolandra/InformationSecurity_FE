import "../styles/home.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import $ from "jquery";
import "datatables.net-dt";

export const Home = () => {
  const [allData, setAllData] = useState([]);

  // TODO: CHANGE TOKEN FROM LOCAL STORAGE
  const token = "";

  useEffect(() => {
    const getData = async () => {
      const url = "http://localhost:8888/api/user/getAllMedia";
      const query = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const response = await query.json();
      setAllData(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const existingTable = $("#filesTable").DataTable();

    if (existingTable) {
      existingTable.destroy();
    }

    const table = $("#filesTable").DataTable({
      data: allData.data,
      columns: [
        {},
        { data: "name" },
        { data: "filename" },
        {
          orderable: false,
          data: null,
          render: function (data, type, row) {
            const media = JSON.stringify(data);
            return `<button onclick='
              event.preventDefault();
              const mediaData = ${media};
              const token = "${token}";
              var isOk = true;
  
              fetch(mediaData.path, {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
                .then((response) => {
                  if (response.ok) {
                    return response.blob();
                  } else {
                    alert("Request Failed: " + response.statusText);
                    isOk = false;
                  }
                })
                .then((blob) => {
                  if (isOk){
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = mediaData.filename;
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
    
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  }
                });
            '>Download</button>`;
          },
        },
      ],
      lengthChange: false,
      columnDefs: [
        {
          targets: 0,
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
      ],
    });
  }, [allData]);

  return (
    <div className="home">
      <h1>List of All Available Files</h1>
      <table id="filesTable" className="row-border">
        <thead>
          <tr>
            <th>Number</th>
            <th>Owner</th>
            <th>Filename</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
