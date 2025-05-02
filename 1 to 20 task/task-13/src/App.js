import React, { useState } from "react";

function FibonacciSeries() {
  const [number, setNumber] = useState("");
  const [fibonacci, setFibonacci] = useState([]);

  const generateFibonacci = (num) => {
    if (num < 0) return []; // Return empty array for negative numbers
    const series = [0, 1];
    for (let i = 2; i <= num; i++) {
      series.push(series[i - 1] + series[i - 2]);
    }
    return series.slice(0, num + 1); // Slice to return up to the input number
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(number, 10);
    if (!isNaN(num) && num >= 0) {
      setFibonacci(generateFibonacci(num));
    } else {
      setFibonacci([]);
      alert("Please enter a valid positive number!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Fibonacci Series Generator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a positive number:{" "}
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Generate</button>
      </form>
      {fibonacci.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Fibonacci Series:</h3>
          <p>{fibonacci.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default FibonacciSeries;
