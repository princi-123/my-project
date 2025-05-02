import React, { useState } from "react";

function PalindromeChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const isPalindrome = (str) => {
    const cleaned = str.toLowerCase()
    return cleaned === cleaned.split("").reverse().join("");
  };

  const handleCheck = () => {
    if (isPalindrome(input)) {
      setResult(`"${input}" is a palindrome!`);
    } else {
      setResult(`"${input}" is not a palindrome.`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Palindrome Checker</h1>
      <input
        type="text"
        placeholder="Enter a word or phrase"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <button
        onClick={handleCheck}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Check
      </button>
      <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
        {result}
      </p>
    </div>
  );
}

export default PalindromeChecker;
