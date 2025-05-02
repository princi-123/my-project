import React from "react";

const GroupByCategory = ({ data }) => {
  // Function to group objects by category
  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      const { category } = item;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  // Sample array of objects
  const groupedData = groupByCategory(data);

  return (
    <div>
      <h1>Grouped by Category</h1>
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Example usage with sample data
const sampleData = [
  { id: 1, category: "Fruits", name: "Apple" },
  { id: 2, category: "Fruits", name: "Banana" },
  { id: 3, category: "Vegetables", name: "Carrot" },
  { id: 4, category: "Vegetables", name: "Broccoli" },
  { id: 5, category: "Dairy", name: "Milk" },
];

const App = () => {
  return <GroupByCategory data={sampleData} />;
};

export default App;
