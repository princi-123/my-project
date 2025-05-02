import React from "react";

const App = () => {
  const data = [
    { user: { name: "Alice", age: 25 } },
    { user: { name: "Bob", age: 30 } },
    { user: { name: "Charlie", age: 25 } }
  ];

  const filteredData = data.filter((item) => item.user.age === 25);

  return (
    <div>
      <h1>Filtered Data</h1>
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    </div>
  );
};

export default App;
