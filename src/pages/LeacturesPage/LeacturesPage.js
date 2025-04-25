import React, { useEffect, useState } from 'react';
import './LecturesPage.css';

const departments = ["bca", "bsc", "bms", "bbi", "baf"];

function LecturesPage() {
  const [selectedDept, setSelectedDept] = useState("bca");
  const [lectures, setLectures] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchLectures = async (dept) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/lecture/get/${dept}/`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const sorted = data.reverse(); // Latest first
      setLectures((prev) => ({ ...prev, [dept]: sorted }));
    } catch (error) {
      console.error("Error fetching lectures for", dept, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lectures[selectedDept]) {
      fetchLectures(selectedDept);
    }
  }, [selectedDept]);

  return (
    <div className="lectures-page">
      <h2>Lecture Schedule</h2>

      <select
        className="dept-select"
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept.toUpperCase()}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="loading">Loading lectures...</p>
      ) : (
        <div className="lecture-list">
          {(lectures[selectedDept] || []).map((lecture, index) => (
            <div className="lecture-item" key={lecture.id || index}>
              <h4>{lecture.title}</h4>
              <p><strong>Time:</strong> {lecture.time}</p>
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href={lecture.link.startsWith("http") ? lecture.link : `https://${lecture.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lecture.link}
                </a>
              </p>
              <p><strong>Password:</strong> {lecture.password}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LecturesPage;
