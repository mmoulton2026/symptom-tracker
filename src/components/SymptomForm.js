import React, { useState } from "react";
import "./SymptomForm.css";

const SymptomForm = ({ onAddLog, disabled = false }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (disabled) return;
    
    if (date && time && notes) {
      onAddLog({ date, time, notes });
      setDate("");
      setTime("");
      setNotes("");
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="symptom-form">
      <h2>Log a Symptom</h2>
      <div className="form-group">
        <label>Date:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="form-group">
        <label>Time:</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="form-group">
        <label>Notes:</label>
        <textarea
          placeholder="Describe symptoms, mood, pain, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={disabled}
        />
      </div>
      <button 
        className="submit-button" 
        onClick={handleSubmit}
        disabled={disabled}
      >
        {disabled ? 'Adding...' : 'Add Log'}
      </button>
    </div>
  );
};

export default SymptomForm;