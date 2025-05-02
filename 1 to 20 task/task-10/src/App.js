// Import React if needed
import React from "react";

// Validation function
function validatePasswords(first, second) {
  // Check if passwords are equal
  return first === second;
}

// Example usage in a React component
function PasswordValidationComponent() {
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isValid, setIsValid] = React.useState(null);

  const handleValidation = () => {
    const result = validatePasswords(password1, password2);
    setIsValid(result);
  };

  return (
    <div>
      <h1>Password Validation</h1>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleValidation}>Validate</button>
      {isValid === true && <p style={{ color: "green" }}>Passwords match!</p>}
      {isValid === false && (
        <p style={{ color: "red" }}>Passwords do not match!</p>
      )}
    </div>
  );
}

export default PasswordValidationComponent;
