import React, { useState, useEffect } from 'react';
import '../css/admin.css';

function AdminPage() {
    const [sportsData, setSportsData] = useState([]);
    const [complaintsData, setComplaintsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const sportsResponse = await fetch('http://localhost:8000/sports/get/');
            const sportsData = await sportsResponse.json();
            setSportsData(sportsData);

            const complaintsResponse = await fetch('http://localhost:8000/complaint/get/');
            const complaintsData = await complaintsResponse.json();
            setComplaintsData(complaintsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteSport = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/sports/delete/${id}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete sport application');
            alert('Sport application deleted successfully');
            fetchData();  // Refresh after delete
        } catch (error) {
            console.error('Error deleting sport application:', error);
        }
    };

    const deleteComplaint = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/complaint/delete/${id}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete complaint');
            alert('Complaint deleted successfully');
            fetchData();  // Refresh after delete
        } catch (error) {
            console.error('Error deleting complaint:', error);
        }
    };

    return (
        <div className='container'>
            <div className='left-div'>
                <h2>Sports Applications</h2>
                {sportsData.map((sport) => (
                    <div className='obj' key={sport.id}>
                        <p className='name'><b>Name: </b>{sport.name}</p>
                        <p className='id'><b>Enrollment ID: </b>{sport.enrollmentId}</p>
                        <p className='yd'><b>Year and Dept: </b>{sport.yearAndDept}</p>
                        <p className='sport'><b>Sports Applied: </b>{sport.sport}</p>
                        <button className='delete-btn' onClick={() => deleteSport(sport.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className='right-div'>
                <h2>Complaints</h2>
                {complaintsData.map((complaint) => (
                    <div className='obj' key={complaint.id}>
                        <p className='name'><b>Name: </b>{complaint.name}</p>
                        <p className='id'><b>Enrollment ID: </b>{complaint.enrollmentId}</p>
                        <p className='yd'><b>Year and Dept: </b>{complaint.yearAndDept}</p>
                        <p className='complaint'><b>Complaint: </b>{complaint.Complaint}</p>
                        <button className='delete-btn' onClick={() => deleteComplaint(complaint.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
