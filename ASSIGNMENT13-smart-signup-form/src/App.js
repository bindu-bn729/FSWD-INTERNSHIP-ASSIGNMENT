import React, { useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const validateEmail = (value) => {

    setEmail(value);

    if (!value.includes("@")) {
      setEmailMsg("Invalid Email Address");
    } 
    else {
      setEmailMsg("Valid Email");
    }
  };

  const checkPassword = (value) => {

    setPassword(value);

    if (value.length < 6) {
      setPasswordMsg("Weak Password");
    }
    else if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      setPasswordMsg("Medium Password");
    }
    else {
      setPasswordMsg("Strong Password");
    }
  };

  const handleSubmit = () => {

    if(emailMsg === "Valid Email" && passwordMsg === "Strong Password"){
      alert("Signup Successful!");
    } else {
      alert("Please enter valid details");
    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Smart Signup Form</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>validateEmail(e.target.value)}
        />

        <p style={{color: emailMsg==="Valid Email" ? "green" : "red"}}>
          {emailMsg}
        </p>

        <input
          style={styles.input}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>checkPassword(e.target.value)}
        />

        <p style={{
          color:
          passwordMsg==="Strong Password"
          ? "green"
          : passwordMsg==="Medium Password"
          ? "orange"
          : "red"
        }}>
          {passwordMsg}
        </p>

        <button style={styles.button} onClick={handleSubmit}>
          Sign Up
        </button>

      </div>

    </div>

  );
}

const styles = {

  container:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"linear-gradient(135deg,#74ebd5,#ACB6E5)"
  },

  card:{
    background:"white",
    padding:"30px",
    borderRadius:"10px",
    width:"300px",
    textAlign:"center",
    boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
  },

  input:{
    width:"100%",
    padding:"10px",
    margin:"10px 0",
    borderRadius:"5px",
    border:"1px solid #ccc"
  },

  button:{
    width:"100%",
    padding:"10px",
    border:"none",
    background:"#4b6cb7",
    color:"white",
    borderRadius:"5px",
    cursor:"pointer"
  }

};

export default App;