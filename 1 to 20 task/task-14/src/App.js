import React, { useState } from 'react';

const findSubsets = (nums, target) => {
  const results = [];

  // Helper function to generate all subsets with + or - signs for each element
  const backtrack = (index, currentSubset, currentSum) => {
    // Base case: if we've considered all elements
    if (index === nums.length) {
      if (currentSum === target) {
        results.push([...currentSubset]);
      }
      return;
    }

    // Include the current element with a positive sign
    currentSubset.push(nums[index]);
    backtrack(index + 1, currentSubset, currentSum + nums[index]);
    currentSubset.pop();

    // Include the current element with a negative sign
    currentSubset.push(-nums[index]);
    backtrack(index + 1, currentSubset, currentSum - nums[index]);
    currentSubset.pop();
  };

  backtrack(0, [], 0);
  return results;
};

const App = () => {
  const [nums, setNums] = useState([1, 2, 3]);
  const [target, setTarget] = useState(3);
  const [result, setResult] = useState([]);

  const handleCalculate = () => {
    const subsets = findSubsets(nums, target);
    setResult(subsets);
  };

  return (
    <div>
      <h1>Find Subsets With Target Sum or Difference</h1>
      <div>
        <label>
          Numbers (comma separated):
          <input style={{margin: '10px'}}
            type="text"
            value={nums.join(',')}
            onChange={(e) =>
              setNums(e.target.value.split(',').map(Number))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Target Sum:
          <input style={{margin: '10px'}}
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Find Subsets</button>

      <h3>Results:</h3>
      <ul>
        {result.length === 0 ? (
          <li>No subsets found</li>
        ) : (
          result.map((subset, index) => (
            <li key={index}>{`Subset ${index + 1}: [${subset.join(', ')}]`}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
