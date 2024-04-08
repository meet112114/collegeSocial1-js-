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

    return (
        <div className='container'>
            <div className='left-div'>
                <h2>Sports Application</h2>
                {sportsData.map((sport, index) => (
                    <div className='obj' key={index}>
                        <p className='name'><b>Name : </b>{sport.name}</p>
                        <p className='id'><b>Enrollment ID : </b>{sport.enrollmentId}</p>
                        <p className='yd'><b>Year and Dept : </b> {sport.yearAndDept}</p>
                        <p  className='sport'><b>Sports Applied : </b> {sport.sport}</p>
                    </div>
                ))}
            </div>
            <div className='right-div'>
                <h2>Complaints Data</h2>
                {complaintsData.map((complaint, index) => (
                    <div className='obj' key={index}>
                        <p className='name'><b>Name : </b>{complaint.name}</p>
                        <p className='id'> <b>Enrollment ID : </b>{complaint.enrollmentId}</p>
                        <p className='yd'><b>Year and Dept : </b>{complaint.yearAndDept}</p>
                        <p className='complaint'><b>Complaint : </b> {complaint.Complaint}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;