import React, { useState } from 'react';

const App = () => {
  const [array1] = useState([1, 2, 3, 4]);
  const [array2] = useState([4, 3, 2, 1]);

  const haveSameElements = (array1, array2) => {
    if (array1.length !== array2.length) {
      return false;
    }

    // Sorting both arrays and checking if they are the same
    const sortedArray1 = [...array1].sort();
    const sortedArray2 = [...array2].sort();

    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false;
      }
    }

    return true;
  };

  return (
    <div>
      <h1>Array Comparison</h1>
      <p>Array 1: {JSON.stringify(array1)}</p>
      <p>Array 2: {JSON.stringify(array2)}</p>
      <p>
        Do they have the same elements?{' '}
        {haveSameElements(array1, array2) ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default App;
