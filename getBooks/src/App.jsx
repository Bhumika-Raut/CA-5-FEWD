import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState([]);
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

    // Calculate the position of the popup based on the clicked image's coordinates
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY,
      left: rect.right + window.scrollX,
    });
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  return (
    <div className="App">
      <input className="Search-Books" type="text" placeholder="Search Books" />
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="main">
          {apiData.map((item) => (
            <div key={item.id}>
              <div className="container">
                <div className="img-container">
                  <h3>{item.title}</h3>
                  <img
                    src={item.imageLinks.smallThumbnail}
                    alt={item.title}
                    onClick={(event) => handleImageClick(item, event)}
                  />
                  <div className="author">{item.authors}</div>
                </div>
                <hr />
              </div>
            </div>
          ))}
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
