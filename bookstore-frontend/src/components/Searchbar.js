import axios from "axios";
import React, { useState } from "react"

export const Searchbar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [bookResults, setBookResults] = useState([]);
    const [authorResults, setAuthorResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const bookResponse = await axios.get(`http://localhost:8080/api/admin/books/${searchQuery}`);
            setBookResults(bookResponse.data);

            const authorResponse = await axios.get(`http://localhost:8080/api/admin/author/${searchQuery}`);
            setAuthorResults(authorResponse.data);
        } catch (error) {
            console.error("Error searching:", error);
        }
    }

    return (
        <div className="">
            <form className="d-flex" onSubmit={handleSearch}>
                <input className="form-control me-2" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search book or author" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div>
                <div className="d-flex flex-wrap gap-5 justify-content-center">
                    {bookResults.map((book) => (
                        <div key={book.id} className="card mt-5" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${book.img}`} className="card-img-top" alt={book.book} />
                            <div className="card-body">
                                <h5 className="card-title">{book.book}</h5>
                                <h5>{book.author}</h5>
                                <div className="d-flex justify-content-center gap-5">
                                    <a href="#" className="btn btn-danger">Delete</a>
                                    <a href="#" className="btn btn-info">Update</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex flex-wrap gap-5 justify-content-center">
                    {authorResults.map((author) => (
                        <div key={author.id} className="card mt-5" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${author.img}`} className="card-img-top" alt={author.book} />
                            <div className="card-body">
                                <h5 className="card-title">{author.book}</h5>
                                <h5>{author.author}</h5>
                                <div className="d-flex justify-content-center gap-5">
                                    <a href="#" className="btn btn-danger">Delete</a>
                                    <a href="#" className="btn btn-info">Update</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}