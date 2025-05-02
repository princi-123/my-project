// Function to check if two arrays have the same elements
function haveSameElements(array1, array2) {
    // If lengths are different, arrays cannot have the same elements
    if (array1.length !== array2.length) {
      return false;
    }
  
    // Create frequency maps for both arrays
    const frequencyMap1 = {};
    const frequencyMap2 = {};
  
    // Populate frequency map for array1
    for (let element of array1) {
      frequencyMap1[element] = (frequencyMap1[element] || 0) + 1;
    }
  
    // Populate frequency map for array2
    for (let element of array2) {
      frequencyMap2[element] = (frequencyMap2[element] || 0) + 1;
    }
  
    // Compare both frequency maps
    for (let key in frequencyMap1) {
      if (frequencyMap1[key] !== frequencyMap2[key]) {
        return false;
      }
    }
  
    return true;
  }
  
  // Example usage in a React component
  function App() {
    const array1 = [1, 2, 3, 4];
    const array2 = [4, 3, 2, 1];
    const array3 = [1, 2, 2, 3];
  
    return (
      <div>
        <h1>Array Comparison</h1>
        <p>Array1: {JSON.stringify(array1)}</p>
        <p>Array2: {JSON.stringify(array2)}</p>
        <p>Array3: {JSON.stringify(array3)}</p>
        <p>
          Array1 and Array2 have the same elements:{" "}
          {haveSameElements(array1, array2).toString()}
        </p>
        <p>
          Array1 and Array3 have the same elements:{" "}
          {haveSameElements(array1, array3).toString()}
        </p>
      </div>
    );
  }
  
  export default App;
  