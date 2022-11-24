import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 15;
  const pagesVisited = pageNumber * userPerPage;


  useEffect(() => {
    const getData = async () => {
      const response = await axios("https://api.jikan.moe/v4/characters");
      //   console.log(response.data.data);
      setData(response.data.data);
    };
    getData();
  }, []);

  const displayUsers = data
    .slice(pagesVisited, pagesVisited + userPerPage)
    .filter((value) => {
      if (input === "") {
        return value;
      } else {
        // console.log(value.name);
        return value.name.toLowerCase().includes(input);
      }
    })
    .map((item) => {
      return (
        <ul key={item.mal_id} className="user">
          <img src={item.images.jpg.image_url} alt="anime" width="5%" />
          <h3>Name: {item.name}</h3>
        </ul>
      );
    });

  const pageCount = Math.ceil(data.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <h2>Search Anime Characters</h2>
      <div className="w-72">
        <TextField
          variant="filled"
          color="primary"
          type="text"
          label="Search"
          placeholder="Search Anime Character"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <br />
        <br />
        Total {displayUsers.length} matching anime characters found
        <hr />
        <br />
      </div>
      <div>
        {displayUsers}
        {displayUsers.length === 0 && <h2>No result found </h2>}
        <br />
        <ReactPaginate
          previousLabel={"Back"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default Search;
