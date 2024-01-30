// import { useState, useEffect} from 'react';


// const Searchbox = () => {
//     const [inputText, setinputText] = useState('');
     
    
//     const SearchBox = () => {
//       const [inputText, setInputText] = useState('');
//       const [suggestions, setSuggestions] = useState([]);
//       const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
//       useEffect(() => {
//         if (inputText.trim() === '') {
//           setSuggestions([]);
//           setIsDropdownVisible(false);
//           return;
//         }
    
//         const filteredSuggestions = countryData.filter(entry =>
//           entry.name.toLowerCase().includes(inputText.toLowerCase())
//         );
    
//         setSuggestions(filteredSuggestions);
//         setIsDropdownVisible(true);
//       }, [inputText]);
    
//       const handleInputChange = (event) => {
//         setInputText(event.target.value);
//       };
    
    
//       };
    
//       useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//           window.removeEventListener('keydown', handleKeyDown);
//         };
//       }, []);
    
//       return (
//         <div>
//           <input className='input'
//             type="text"
//             value={inputText}
//             onChange={handleInputChange}
            
//           />
//           {isDropdownVisible && (
//             <ul>
//               {suggestions.map((entry, index) => (
//                 <li key={index}>{entry.name} - {entry.code}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       );
//     };
    
//     export default Search;
    
