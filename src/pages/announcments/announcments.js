import React, { useEffect, useState } from 'react';
import './announcments.css';

const departments = ["bca", "bsc", "bms", "bbi", "baf"];

function AnnouncementsPage() {
  const [selectedDept, setSelectedDept] = useState("bca");
  const [announcements, setAnnouncements] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async (dept) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/announce/get/${dept}/`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const sorted = data.reverse(); // Show latest first
      setAnnouncements((prev) => ({ ...prev, [dept]: sorted }));
    } catch (error) {
      console.error("Error fetching announcements for", dept, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!announcements[selectedDept]) {
      fetchAnnouncements(selectedDept);
    }
  }, [selectedDept]);

  return (
    <div className="announce-page">
      <h2>Department Announcements</h2>

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
        <p>Loading announcements...</p>
      ) : (
        <div className="announcement-list">
  {(announcements[selectedDept] || []).map((announcement, index) => (
    <div className="announcement-card" key={announcement.id || index}>
      <p>{announcement.text}</p>
      <small>{new Date(announcement.created_at).toLocaleString()}</small>
    </div>
  ))}
</div>
      )}
    </div>
  );
}

export default AnnouncementsPage;
