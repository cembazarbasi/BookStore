import axios from "axios";
import React, { useState } from "react"

export const Newbook = () => {

    const [book, setBook] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState('');

    const handleAddBook = async (e) => {
        e.preventDefault();

        try {
            if (img !== null) {
                const formData = new FormData();
                formData.append("book", book);
                formData.append("author", author);
                formData.append("img", img);
                formData.append("description", description);

                const response = await axios.post("http://localhost:8080/api/admin/newBook", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Book has been added successfully:", response.data);
                setSuccessMessage(true);
            } else {
                console.error("Please select an image.");
            }
        } catch (error) {
            setError('Password cannot contain spaces');
        }
    };

    return (
        <div className="">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                New Book +
            </button>
            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        {successMessage && <div class="alert alert-success" role="alert">You have successfully added a new book!</div>}
                        {error && <div class="alert alert-danger" role="alert">Adding book has been failed!</div>}
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel1">New Book</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAddBook}>
                            <div class="modal-body text-start mb-3">
                                <div class="mb-3 text-start">
                                    <label for="exampleFormControlInput1" class="form-label">Book Name</label>
                                    <input type="text" value={book} onChange={(e) => setBook(e.target.value)} required class="form-control" id="exampleFormControlInput12" />
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="exampleFormControlInput1" class="form-label">Author Name</label>
                                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required class="form-control" id="exampleFormControlInput12" />
                                </div>
                                <div class="text-start mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Book Image</label>
                                    <input type="file" onChange={(e) => setImg(e.target.files[0])} required class="form-control" id="inputGroupFile01" />
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="exampleFormControlTextarea1" class="form-label">Book Description</label>
                                    <textarea class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required id="exampleFormControlTextarea12" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Add Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}