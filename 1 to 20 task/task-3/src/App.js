import React, { useState } from "react";

const Counter = () => {
  // State to store the counter value
  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => setCount(count + 1);

  // Decrement function
  const decrement = () => setCount(count - 1);

  // Reset function
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={increment} style={{ margin: "5px" }}>
        Increment
      </button>
      <button onClick={decrement} style={{ margin: "5px" }}>
        Decrement
      </button>
      <button onClick={reset} style={{ margin: "5px" }}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
