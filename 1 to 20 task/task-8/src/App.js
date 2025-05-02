import React, { useState } from "react";

const CustomSortExample = () => {
  const [array, setArray] = useState([5, 2, 8, 3, 1]);

  // Custom sort function using bubble sort
  const customSort = (arr) => {
    const sortedArray = [...arr]; // Create a copy of the array to avoid mutation
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length - i - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap the elements
          const temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }
    return sortedArray;
  };

  const handleSort = () => {
    const sortedArray = customSort(array);
    setArray(sortedArray);
  };

  return (
    <div>
      <h3>Array Sorting Example</h3>
      <p>Original Array: {array.join(", ")}</p>
      <button onClick={handleSort}>Sort Array</button>
      <p>Sorted Array: {array.join(", ")}</p>
    </div>
  );
};

export default CustomSortExample;
