import React, { useState } from 'react';

const BinarySearchComponent = () => {
  const [array] = useState([34, 7, 23, 32, 5, 62,55,12,98]);
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');

  
  const customSort = (arr) => {
    let sortedArray = [...arr];
    for (let i = 0; i < sortedArray.length - 1; i++) {
      for (let j = 0; j < sortedArray.length - i - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          
          let temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }
    return sortedArray;
  };

  
  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return mid; 
      } else if (arr[mid] < target) {
        left = mid + 1; 
      } else {
        right = mid - 1;
      }
    }
    return -1; 
  };

  
  const handleSearch = () => {
    const numberArray = array.map(Number);
    const sortedArray = customSort(numberArray);
    const targetNumber = Number(target);
    const index = binarySearch(sortedArray, targetNumber);

    if (index !== -1) {
      setResult(`Target ${targetNumber} found at index ${index} in sorted array.`);
    } else {
      setResult(`Target ${targetNumber} not found.`);
    }
  };

  return (
    <div>
      <h1>Binary Search in React</h1>
      <div>
        <p>Array: {array.join(', ')}</p>
        <input
          type="text"
          placeholder="Enter target number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {result && <p>{result}</p>}
    </div>
  );
};

export default BinarySearchComponent;
