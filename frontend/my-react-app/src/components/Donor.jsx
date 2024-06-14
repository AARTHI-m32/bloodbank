import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Donor = () => {
    const [donors, setDonors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        async function fetchAllDonors() {
            try {
                const response = await fetch('https://bloodbank-exwj.onrender.com/req-donor');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch donors');
                }
                const data = await response.json();
                console.log('Fetched donors:', data);  // Log the fetched data
                setDonors(data);
            } catch (error) {
                console.error('Error fetching donors:', error);
            }
        }
        fetchAllDonors();
    }, []);

    const filteredDonors = donors.filter(donor => 
        donor.bloodgroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('Filtered donors:', filteredDonors);  // Log the filtered donors

    return (
        <div id="donors">
            <Nav/><br/>
            <h2 id="donorheading">Donors</h2>
            <Link to={`/donate/${userId}`}><button className="donatebutton">Donate</button></Link><br/><br/>

            <input 
                type="text" 
                placeholder="Search by Blood Group or Location" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                id="searchbar"
            />
            
          
            
            <div className="donor-div">
                {filteredDonors.map(donor => (
                    <div key={donor._id} className="donor-info">
                        <p><strong>Name :</strong> {donor.donorname}</p>
                        <p><strong>Age :</strong> {donor.age}</p>
                        <p><strong>Email :</strong> {donor.email}</p>
                        <p><strong>Blood Group :</strong> {donor.bloodgroup}</p>
                        <p><strong>Gender :</strong> {donor.gender}</p>
                        <p><strong>Address :</strong> {donor.address}</p>
                        <p><strong>Phone No :</strong> {donor.phoneno}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Donor;
