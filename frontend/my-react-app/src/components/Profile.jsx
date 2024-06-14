import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({ donorDetails: [], donationDetails: [] ,volunteerDetails:[] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [donors, setDonors] = useState([]);
    
    const userId = localStorage.getItem('userId');
   
    const deletedonor = async (id) => {
        try {
          const response = await fetch(`https://bloodbank-exwj.onrender.com/delete-donor?_id=${id}`, {
            method: 'DELETE'
          });
          if (response.status === 200) {
            alert("Donor details deleted!!");
            const updatedDonors = donors.filter(donor => donor._id !== id);
            setDonors(updatedDonors);
          } else {
            alert("Failed to delete donor details");
          }
        } catch (error) {
          alert("Error deleting details");
          console.error('There was an error deleting the donor details!', error);
        }
        finally{
            window.location.reload();
        }
      };



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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://bloodbank-exwj.onrender.com/profile?_id=${userId}`);
                if (!response.ok) {
                    throw new Error('No Profile Details Found!!');
                }
                const data = await response.json();
                console.log("Fetched data:", data);
    
                // Check if donationDetails exist and flatten them if they do
                const flattenedDonationDetails = data.donationDetails ? data.donationDetails.flat() : [];
    
                // Update the profile state with the flattened donationDetails (if any) and other profile data
                setProfile({ ...data, donationDetails: flattenedDonationDetails });
            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
    
        if (userId) {
            fetchProfile();
        } else {
            setLoading(false);
            setError('User ID not found in localStorage');
        }
    }, [userId]);
    

    if (loading) {
        return (
            <div>
        <Nav/>
        <div id="display">Loading.... {error}</div>
        </div>
        )
    }

    if (error) {
        return (
            <div>
        <Nav/>
        <div id="display">Error fetching profile data: {error}</div>
        </div>
        )
    }

    const { donorDetails, donationDetails } = profile;

    const getDonationsForDonor = (donorId) => {
        return donationDetails.filter(donation => donation.id === donorId);
    };

    const handleLogout = () => {      
        localStorage.removeItem('username');
        
        window.location = "/login";
      };

    return (
        <div>
            <Nav/>
            <br/>
            <button className="donatebutton" onClick={handleLogout}>Logout</button>
            <h1 id="phead">Profile</h1>
           
            <h2 className='pdonor'>Donor Details and Donation History</h2>
          
            {donorDetails && donorDetails.length > 0 ? (
                
                <div className='donor-div'>
                    
                    {donorDetails.map((donor) => (
                        <div key={donor._id} className='donor-info'>
                            <h3>Donor History</h3>
                            <p><strong>Name : </strong> {donor.donorname ?? 'N/A'}</p>
                            <p><strong>Email : </strong>{donor.email ?? 'N/A'}</p>
                            <p><strong>Blood Type : </strong>{donor.bloodgroup ?? 'N/A'}</p>
                            <p><strong>Age : </strong> {donor.age ?? 'N/A'}</p>
                            <p><strong>Gender : </strong> {donor.gender ?? 'N/A'}</p>
                            <p><strong>Address : </strong> {donor.address ?? 'N/A'}</p>
                            <p><strong>Phone Number : </strong> {donor.phoneno ?? 'N/A'}</p>
                            <p><strong>Donated : </strong> {donor.donated ? 'Yes' : 'No'}</p>
                            <div className='donation-history'>
                                
                                {getDonationsForDonor(donor._id).length > 0 ? (
                                    getDonationsForDonor(donor._id).map((donation) => (
                                        <div key={donation._id} className='donation-info'>
                                            <h3>Donation History</h3>
                                            <p><strong>Amount of Blood (in ml):</strong> {donation.amount ?? 'N/A'}</p>
                                            <p><strong>Hospital Name:</strong> {donation.hospitalname ?? 'N/A'}</p>
                                            <p><strong>Hospital Address:</strong> {donation.hospitaladdress ?? 'N/A'}</p>
                                            <p><strong>Date:</strong> {donation.date ? new Date(donation.date).toLocaleDateString() : 'N/A'}</p>
                                            <p><strong>Quantity:</strong> {donation.amount}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                    <Link to={`/donate/${donor._id}`}><button className="dbut">Edit</button></Link>
                                    <Link to={`/donated/${donor._id}`}><button className="dbut">Donated</button></Link>
                                    <button className="dbut" onClick={() => deletedonor(donor._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ color: 'white' }}>No donor details available.</div>
            )}


<h2 id="pvhead">Volunteer Registration</h2>
   
            {profile.volunteerDetails.length > 0 ? (
                <div className="donor-div">
                    {profile.volunteerDetails.map(volunteer => (
                        <div key={volunteer._id} className="donor-info">
                            <h3>Volunteering details</h3>
                            <p><strong>Camp : </strong> {volunteer.camp.organisation}</p>
                            <p><strong>Name : </strong>{volunteer.fullName}</p>
                            <p><strong>Role : </strong> {volunteer.role}</p>
                            <p><strong>Date of Birth : </strong> {new Date(volunteer.dob).toLocaleDateString()}</p>
                            <p><strong>Phone Number : </strong> {volunteer.phoneNumber}</p>
                            <p><strong>Email : </strong> {volunteer.email}</p>
                            <p><strong>Date of Camp : </strong> {new Date(volunteer.camp.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                    </div>
                
            ) : (
                <div style={{ color: 'white' }}>No volunteer registrations yet.</div>
                
            )}


        </div>
    );
};

export default Profile;
