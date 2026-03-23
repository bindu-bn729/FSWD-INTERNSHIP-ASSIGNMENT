import React, { useState } from "react";
import "./App.css";

function App() {

  const [mood, setMood] = useState("🙂 Neutral");

  return (
    <div className="container">

      <div className="card">

        <h1>Mood Tracker</h1>

        <h2>Your Mood: {mood}</h2>

        <button className="happy" onClick={() => setMood("😊 Happy")}>
          Happy
        </button>

        <button className="sad" onClick={() => setMood("😢 Sad")}>
          Sad
        </button>

        <button className="angry" onClick={() => setMood("😡 Angry")}>
          Angry
        </button>

        <button className="tired" onClick={() => setMood("😴 Tired")}>
          Tired
        </button>

      </div>

    </div>
  );
}

export default App;