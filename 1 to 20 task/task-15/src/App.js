import React, { useState, useCallback } from "react";

function debounce(func, delay) {
    let timeoutId;
  
    return function (...args) {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleSearch = useCallback(
    debounce((value) => {
      setDebouncedValue(value);
      console.log("API call or operation with value:", value);
    }, 500), // Delay of 500ms
    []
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Debounce Example</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Type something..."
        style={{ padding: "10px", width: "300px" }}
      />
      <p>Search Term: {searchTerm}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export default App;
