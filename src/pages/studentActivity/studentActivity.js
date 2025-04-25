import React, { useState } from 'react';
import './studentActivity.css';

function StudentActivityPage() {
  const [sportsForm, setSportsForm] = useState({
    name: '',
    enrollmentId: '',
    yearAndDept: '',
    sport: ''
  });

  const [complaintForm, setComplaintForm] = useState({
    name: '',
    enrollmentId: '',
    yearAndDept: '',
    Complaint: ''
  });

  const handleChange = (e, formSetter) => {
    formSetter(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e, url, data, resetFunc) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/${url}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Submission failed');
      alert('Submitted successfully!');
      resetFunc();
    } catch (err) {
      alert('Error submitting form');
      console.error(err);
    }
  };

  return (
    <div className="student-activity-container">
      <div className="activity-card">
        <h2>Sports Application</h2>
        <form onSubmit={(e) =>
  handleSubmit(e, 'sports/create', sportsForm, () =>
    setSportsForm({ name: '', enrollmentId: '', yearAndDept: '', sport: '' })
  )
}>

          <input type="text" name="name" value={sportsForm.name} onChange={(e) => handleChange(e, setSportsForm)} placeholder="Name" required />
          <input type="number" name="enrollmentId" value={sportsForm.enrollmentId} onChange={(e) => handleChange(e, setSportsForm)} placeholder="Enrollment ID" required />
          <input type="text" name="yearAndDept" value={sportsForm.yearAndDept} onChange={(e) => handleChange(e, setSportsForm)} placeholder="Year & Dept" required />
          <select name="sport" value={sportsForm.sport} onChange={(e) => handleChange(e, setSportsForm)} required>
  <option value="">Select Sport</option>
  <option value="Kabbadi">Kabbadi</option>
  <option value="Kho-Kho">Kho-Kho</option>
  <option value="Running">Running</option>
  <option value="Cricket">Cricket</option>
</select>
          <button className='button1' type="submit">Apply</button>
        </form>
      </div>

      <div className="activity-card">
        <h2>Submit Complaint</h2>
        <form onSubmit={(e) =>
  handleSubmit(e, 'complaint/create', complaintForm, () =>
    setComplaintForm({ name: '', enrollmentId: '', yearAndDept: '', Complaint: '' })
  )
}>
          <input type="text" name="name" value={complaintForm.name} onChange={(e) => handleChange(e, setComplaintForm)} placeholder="Name" required />
          <input type="number" name="enrollmentId" value={complaintForm.enrollmentId} onChange={(e) => handleChange(e, setComplaintForm)} placeholder="Enrollment ID" required />
          <input type="text" name="yearAndDept" value={complaintForm.yearAndDept} onChange={(e) => handleChange(e, setComplaintForm)} placeholder="Year & Dept" required />
          <textarea name="Complaint" value={complaintForm.Complaint} onChange={(e) => handleChange(e, setComplaintForm)} placeholder="Your Complaint..." rows="4" required />
          <button className='button1' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default StudentActivityPage;
