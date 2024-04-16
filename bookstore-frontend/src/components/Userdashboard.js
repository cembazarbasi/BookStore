import React, { useEffect, useState } from "react";
import axios from "axios";
import { Searchbar } from "./Searchbar";


export const Userdashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearchResults = async (results) => {
    setSearchResults(results);
  };  

  return (
    <div className="">
      <div className="mt-3 ms-2 me-2 text-nowrap d-flex justify-content-center gap-3">
        <Searchbar className="" onSearch={handleSearchResults} />
      </div>      
      <div className="d-flex flex-wrap gap-5 justify-content-center">
        {(books).map((book) => (
          <div key={book.id} className="card mt-5" style={{ width: "18rem" }}>
            <img src={`data:image/jpeg;base64,${book.img}`} className="card-img-top" alt={book.book} />
            <div className="card-body">
              <h5 className="card-title">{book.book}</h5>
              <h5>{book.author}</h5>
              <h6 className="text-start">{book.description}</h6>
              <div className="d-flex justify-content-center gap-5">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
