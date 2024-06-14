import { useState, useEffect } from "react";
import Nav from "./Nav";

const Details = () => {
    const [donorDetails, setDonorDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDonorDetails() {
            try {
                const response = await fetch('https://bloodbank-exwj.onrender.com/donor-details');
                if (!response.ok) {
                    throw new Error('Failed to fetch donor details');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the fetched data for debugging
                setDonorDetails(data);
            } catch (error) {
                console.error('Error fetching donor details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDonorDetails();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extract date part and return
    };

    if (loading) {
        return <div id="display">Loading...</div>;
    }

    if (error) {
        return <div id="display">Error: {error}</div>;
    }

    return (
        <div>
            <Nav />
            <h2 id="deth">Donated Details</h2>
            <div className="donor-div">
                {donorDetails.length === 0 ? (
                    <div>No donor details available</div>
                ) : (
                    donorDetails.map((details, index) => (
                        <div key={index} className="detail">
                            {details.donor.map((donor, donorIndex) => (
                                <div key={donorIndex}>
                                    <p><strong>Name :</strong> {donor.donorname}</p>
                                    <p><strong>Age :</strong> {donor.age}</p>
                                    <p><strong>Email :</strong> {donor.email}</p>
                                    <p><strong>Blood Group :</strong> {donor.bloodgroup}</p>
                                    <p><strong>Gender :</strong> {donor.gender}</p>
                                    <p><strong>Address :</strong> {donor.address}</p>
                                    <p><strong>Phone No :</strong> {donor.phoneno}</p>
                                </div>
                            ))}
                            <p><strong>Amount of Blood (in ml) :</strong> {details.donatedDetail?.amount || 'N/A'}</p>
                            <p><strong>Hospital Name :</strong> {details.donatedDetail?.hospitalname || 'N/A'}</p>
                            <p><strong>Hospital Address :</strong> {details.donatedDetail?.hospitaladdress || 'N/A'}</p>
                            <p><strong>Date :</strong> {details.donatedDetail?.date ? formatDate(details.donatedDetail.date) : 'N/A'}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Details;
