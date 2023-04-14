import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [detailList, setdetailList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function FetchDetailsData() {
      try {
        let listData = await axios.get(
          `https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json`
        );
        setdetailList(listData.data);
      } catch (error) {
        console.log(error);
      }
    }
    FetchDetailsData();
  }, []);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(detailList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentList = detailList.slice(startIndex, endIndex);

  return (
    <div className="container mt-3">
      <div id="MainDiv">
        {currentList.map((detail) => (
          <div>
            <p>
              <strong>Id:</strong> {detail.id}
            </p>
            <p>
              <strong>Name:</strong> {detail.name}
            </p>
            <p>
              <strong>Email:</strong> {detail.email}
            </p>
          </div>
        ))}
      </div>
      <ul className="pagination">
        <button
          className="page-link"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="page-link"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </ul>
    </div>
  );
}

export default App;
