import React, { useState } from "react";

const LongestSubstring = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  // Function to find the longest substring without repeating characters
  const findLongestSubstring = (s) => {
    let maxLength = 0;
    let start = 0;
    let charIndexMap = new Map();

    for (let end = 0; end < s.length; end++) {
      const currentChar = s[end];

      // If the character is already in the map and its index is within the current window
      if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= start) {
        start = charIndexMap.get(currentChar) + 1;
      }

      charIndexMap.set(currentChar, end);
      maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const length = findLongestSubstring(input);
    setResult(length);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Longest Substring Without Repeating Characters</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a string"
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Find</button>
      </form>
      <h3>Result: {result}</h3>
    </div>
  );
};

export default LongestSubstring;
