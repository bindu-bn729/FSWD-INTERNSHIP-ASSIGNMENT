import React, { useState, useEffect } from "react";
import studentsData from "../data/students";

function StudentList() {

  // Load from localStorage OR default data
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : studentsData;
  });

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add or Update student
  const addStudent = () => {
    if (name === "" || course === "") return;

    if (editId !== null) {
      const updated = students.map((s) =>
        s.id === editId ? { ...s, name, course } : s
      );
      setStudents(updated);
      setEditId(null);
    } else {
      const newStudent = {
        id: students.length + 1,
        name,
        course,
      };
      setStudents([...students, newStudent]);
    }

    setName("");
    setCourse("");
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Edit student
  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditId(student.id);
  };

  return (
    <div>

      <h2>Student List</h2>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Course Dropdown */}
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        <option value="CSE">CSE</option>
        <option value="ISE">ISE</option>
        <option value="ECE">ECE</option>
        <option value="ME">ME</option>
        <option value="CIVIL">CIVIL</option>
      </select>

      <br />

      {/* Add / Update Button */}
      <button onClick={addStudent}>
        {editId ? "Update" : "Add"}
      </button>

      {/* Student Cards */}
      {students.map((student) => (
        <div key={student.id} className="card">

          <p><b>{student.name}</b></p>
          <p>{student.course}</p>

          <button onClick={() => editStudent(student)}>
            Edit
          </button>

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default StudentList;