import React, { useState } from "react";

const MissingNumberFinder = () => {
  const [array, setArray] = useState([]);
  const [n, setN] = useState("");
  const [missingNumber, setMissingNumber] = useState(null);

  const findMissingNumber = () => {
    const parsedArray = array.map(Number);
    const totalSum = (n * (n + 1)) / 2; // Sum of numbers from 1 to n
    const arraySum = parsedArray.reduce((sum, num) => sum + num, 0);
    const missing = totalSum - arraySum;
    setMissingNumber(missing);
  };

  const handleArrayChange = (e) => {
    setArray(e.target.value.split(",").map((num) => num.trim()));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find the Missing Number</h2>
      <div>
        <label>
          Enter n (upper range):
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Enter array (comma-separated):
          <input
            type="text"
            value={array.join(", ")}
            onChange={handleArrayChange}
          />
        </label>
      </div>
      <button onClick={findMissingNumber} style={{ marginTop: "10px" }}>
        Find Missing Number
      </button>
      {missingNumber !== null && (
        <div style={{ marginTop: "10px" }}>
          <strong>Missing Number:</strong> {missingNumber}
        </div>
      )}
    </div>
  );
};

export default MissingNumberFinder;
