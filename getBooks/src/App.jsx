import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBox from "./components/SearchBox";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

// imported required stuff like files, installed route

function App() {
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // the description for the books is temporirily hidden.
  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        const data = response.data.books;
        setApiData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data.error : "Unknown error");
        setLoading(false);
      });
  }, []);
  // fetched books

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredBooks = apiData.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filteredBooks);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleRegister = (formData) => {
    console.log("Registration Data:", formData);
    setShowRegisterForm(false);
  };

  // events for Registration, search
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
        </Routes>
      </div>
    </Router>
  );
  // to link registration form

  function Main() {
    return (
      <div className="main">
        <div className="header">
          <b>KALVIUM BOOKS</b>
          <div className="search-container">
            <SearchBox onSearch={handleSearch} />
            <Link to="/register" className="register-button">Register</Link>
          </div>
        </div>
        {loading ? <p>Loading...</p> : null}
        {error ? <p className="error-message">{error}</p> : null}
        {!loading && !error && (
          <div className="books-container">
            {filteredData.map((item) => (
              <div key={item.id} className="book">
                <div className="container">
                  <div className="img-container">
                    <h3>{item.title}</h3>
                    <img
                      src={item.imageLinks.smallThumbnail}
                      alt={item.title}
                      style={{ width: "200px", height: "300px" }}
                    />
                    <div className="author">{item.authors}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBook && (
          <div
            className="popup"
            style={{
              top: popupPosition.top,
              left: popupPosition.left,
            }}
          >
            <div className="popup-content">
              <h2>{selectedBook.title}</h2>
              <p>{selectedBook.description}</p>
               </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
