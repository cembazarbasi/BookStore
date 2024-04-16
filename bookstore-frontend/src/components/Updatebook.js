import React, { useState } from "react";
import axios from "axios";

export const Updatebook = ({ bookId, onUpdate }) => {
  const [bookData, setBookData] = useState({
    book: "",
    author: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState(false); 
  const [error, setError] = useState('');



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'          
        }
      };
      const formData = new FormData();
      formData.append("book", bookData.book);
      formData.append("author", bookData.author);
      formData.append("description", bookData.description);
      await axios.put(`http://localhost:8080/api/admin/books/update/${bookId}`, formData, config);
      setSuccessMessage(true);
      onUpdate();
    } catch (error) {
        setError('Error updating.');

    }
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#updateModal-${bookId}`}>
        Update
      </button>
      <div className="modal fade text-start" id={`updateModal-${bookId}`} tabIndex="-1" aria-labelledby={`updateModalLabel-${bookId}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
          { successMessage && <div class="alert alert-success" role="alert">You have successfully updated the book!</div>}
                {error && <div class="alert alert-danger" role="alert">Update failed!</div>}
            <div className="modal-header">
              <h5 className="modal-title" id={`updateModalLabel-${bookId}`}>Update Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="book" className="form-label">Book Name</label>
                  <input type="text" className="form-control" id="book" name="book" value={bookData.book} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author Name</label>
                  <input type="text" className="form-control" id="author" name="author" value={bookData.author} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Book Description</label>
                  <textarea className="form-control" id="description" name="description" value={bookData.description} onChange={handleInputChange} required rows="3"></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Update Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
