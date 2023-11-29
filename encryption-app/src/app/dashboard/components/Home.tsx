import "../styles/home.css";
import { useEffect, useState } from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import "datatables.net-dt";
import { Popup } from "./Popup";

export const Home = () => {
  const [allData, setAllData] = useState([]);

  const token = sessionStorage.getItem("token");

  const [showPopup, setShowPopup] = useState(false);

  const [currentFilename, setCurrentFileName] = useState("");

  const [currentDownKey, setCurrentDownKey] = useState("");

  if (token === null) {
    redirect("/");
  }

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
        {
          data: "name",
          render: function (data, type, row) {
            if (type === "display" && data.length > 30) {
              return (
                '<span title="' +
                data +
                '">' +
                data.substr(0, 30) +
                "...</span>"
              );
            }
            return data;
          },
        },
        {
          data: "filename",
          render: function (data, type, row) {
            if (type === "display" && data.length > 40) {
              return (
                '<span title="' +
                data +
                '">' +
                data.substr(0, 40) +
                "...</span>"
              );
            }
            return data;
          },
        },
        {
          orderable: false,
          data: null,
          defaultContent:
            "<button class='downloadBtn'>Download</button><button class='requestButton'>Request</button>",
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
    table.off("click", ".downloadBtn");
    table.off("click", ".requestButton");

    table.on("click", ".requestButton", function (e) {
      let data = table.row(e.target.closest("tr")).data();
      console.log(data);
      let requestUrl = data.request_url;

      fetch(requestUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      toast.success("Access request sent to owner's email");
    });

    table.on("click", ".downloadBtn", function (e) {
      let data = table.row(e.target.closest("tr")).data();
      let path = data.path;
      let filename = data.filename;
      var isOk = true;
      console.log(path);
      fetch(path, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response.ok) {
            toast.success(response.headers.get("Time"));
            return response.blob();
          } else {
            setCurrentFileName(data.filename);
            setCurrentDownKey(data.downkey);
            setShowPopup(true);
            isOk = false;
          }
        })
        .then((blob) => {
          if (isOk) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
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
      {showPopup && (
        <Popup
          token={token}
          downKey={currentDownKey}
          filename={currentFilename}
          onClosePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
