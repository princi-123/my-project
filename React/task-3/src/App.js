import React, { useState } from "react";

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState(""); 

  const options = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"];

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Simple Dropdown</h2>
      <label htmlFor="NumberDropdown">Choose a Number: </label>
      <select
        id="NumberDropdown"
        value={selectedValue}
        onChange={handleChange}
        style={{
          marginLeft: "5px",
          padding: "5px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="" disabled>
           Select an option 
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selectedValue && (
        <p style={{ marginTop: "10px" }}>
          You selected: <strong>{selectedValue}</strong>
        </p>
      )}
    </div>
  );
};

export default Dropdown;
