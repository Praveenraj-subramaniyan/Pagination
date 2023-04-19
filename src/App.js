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
    <div className="container mt-3 table-responsive">
      <div id="MainDiv">
        <table id="table" className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map((detail) => (
              <tr>
                <td>{detail.id}</td>
                <td>{detail.name}</td>
                <td>{detail.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  <div id="buttons" className="d-flex justify-content-center">
      <ul className="pagination">
        <button
          id="previous"
          className="d-flex justify-content-center page-link"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            id={`${index === 0 ? "first" : "last"}`}
            className={`d-flex justify-content-center page-link ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          id="next"
          className="d-flex justify-content-center page-link"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </ul>
      </div>
    </div>
  );
}

export default App;
