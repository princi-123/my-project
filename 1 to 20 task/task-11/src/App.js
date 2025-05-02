const customFilter = (arr, fn) => {
  const filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      filteredArr.push(arr[i]);
    }
  }
  return filteredArr;
};

// Example usage in a React component
const App = () => {
  const array = [1, 2, 3, 4, 5];
  
  // Define your filtering function
  const isEven = (num, index) => num % 2 === 0;

  const filteredArray = customFilter(array, isEven);

  
  return (
    <div>
      <h1>Filtered Array</h1>
      <p>Original Array: {JSON.stringify(array)}</p>
      <p>Filtered Array: {JSON.stringify(filteredArray)}</p>
    </div>
  );
};

export default App;
