import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBox from "./components/SearchBox";

function App() {
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleImageClick = (book, event) => {
    setSelectedBook(book);

    const rect = event.target.getBoundingClientRect();

    const documentWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    const centerX = documentWidth / 2;
    const centerY = documentHeight / 2;

    const popupLeft = centerX - rect.width / 2;
    const popupTop = centerY - rect.height / 2;

    setPopupPosition({
      top: popupTop + window.scrollY,
      left: popupLeft + window.scrollX,
    });
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredBooks = apiData.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filteredBooks);
  };

  return (
    <div className="App">
      <img
        src="./src/logo.png"
        alt="Logo"
        className="logo"
      />
      <SearchBox onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="main">
          <div className="books-container">
            {filteredData.map((item) => (
              <div key={item.id} className="book">
                <div className="container">
                  <div className="img-container">
                    <h3>{item.title}</h3>
                    <img
                      src={item.imageLinks.smallThumbnail}
                      alt={item.title}
                      onClick={(event) => handleImageClick(item, event)}
                      style={{ width: "200px", height: "300px" }}
                    />
                    <div className="author">{item.authors}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedBook && (
        <div
          className="popup"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="popup-content">
            <h2>{selectedBook.title}</h2>
            <p>{selectedBook.description}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
