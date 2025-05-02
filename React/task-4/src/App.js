import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  
  // Load data from session storage on component mount
  useEffect(() => {
    const storedData = sessionStorage.getItem("crudData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  
  // Save data to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("crudData", JSON.stringify(data));
  }, [data]);

  // Handle input changes 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for create or update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {

      // Update operation
      setData(
        data.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
      setIsEditing(false);
    } else {
      
      // Add operation (LIFO)
      setData([
        { id: Date.now(), name: formData.name, email: formData.email },
        ...data,
      ]);
    }
    setFormData({ id: null, name: "", email: "" });
  };

  // Edit operation
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  // Delete operation
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>CRUD Application</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} style={{ margin: "10px" }} required />
        <input type="email" name="email"placeholder="Email" value={formData.email} onChange={handleInputChange} style={{ margin: "10px" }} required />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
