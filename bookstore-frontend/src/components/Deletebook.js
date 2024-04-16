import React from "react";
import axios from "axios";

export const Deletebook = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/books/delete/${bookId}`);
      
      onDelete();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};
