import React, { useState } from 'react';

const InsertionSort = () => {
  const [array, setArray] = useState([8, 3, 5, 2, 9, 1]); // Initial unsorted array
  const [sorted, setSorted] = useState(false);

  const handleSort = () => {
    let arr = [...array]; // Create a copy of the array
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]); // Update state to reflect changes dynamically
    }
    setSorted(true);
  };

  const resetArray = () => {
    setArray([8, 3, 5, 2, 9, 1]);
    setSorted(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Insertion Sort</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Array: {array.join(', ')}</h2>
      </div>
      <button onClick={handleSort} disabled={sorted} style={{ marginRight: '10px' }}>
        {sorted ? 'Sorted' : 'Sort Array'}
      </button>
      <button onClick={resetArray}>Reset Array</button>
    </div>
  );
};

export default InsertionSort;