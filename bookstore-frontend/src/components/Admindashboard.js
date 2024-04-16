import React, { useEffect, useState } from "react";
import { Newbook } from "./Newbook";
import axios from "axios";
import { Searchbar } from "./Searchbar";
import { Deletebook } from "./Deletebook";
import { Updatebook } from "./Updatebook";

export const Admindashboard = () => {
  const jwtToken = localStorage.getItem("jwt");
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

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/books/delete/${bookId}`);
      
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  
  const handleUpdate = async (updatedBook) => {
    try {
      console.log("Updated book:", updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="">
      <div className="mt-3 ms-2 me-2 text-nowrap d-flex justify-content-center gap-3">
        <Newbook className="" />
        <Searchbar className="" onSearch={handleSearchResults} />
      </div>      
      <div className="d-flex flex-wrap gap-5 justify-content-center">
        {(books).map((book) => (
          <div key={book.id} className="card mt-5" style={{ width: "18rem" }}>
            <img src={`data:image/jpeg;base64,${book.img}`} className="card-img-top" alt={book.book} />
            <div className="card-body">
              <h5 className="card-title">{book.book}</h5>
              <h5>{book.author}</h5>
              <div className="card-footer d-flex justify-content-center gap-5">
              <Deletebook bookId={book.id} onDelete={() => handleDelete(book.id)} />
              <Updatebook bookId={book.id} onUpdate={handleUpdate} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
