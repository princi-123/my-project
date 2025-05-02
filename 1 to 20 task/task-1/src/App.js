import React, { useState } from 'react';

function VowelCounter() {
  const [inputText, setInputText] = useState('');
  const [vowelCount, setVowelCount] = useState(0);

  const countVowels = (text) => {
    const vowels = 'aeiouAEIOU';
    return [...text].filter((char) => vowels.includes(char)).length;
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    setVowelCount(countVowels(text));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Vowel Counter</h2>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here"
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      <p>Number of vowels: {vowelCount}</p>
    </div>
  );
}

export default VowelCounter;
