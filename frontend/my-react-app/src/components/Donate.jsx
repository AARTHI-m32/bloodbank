import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Donate = () => {
    const [formData, setFormData] = useState({
        donorname: '',
        age: '',
        email: '',
        bloodgroup: '',
        gender: '',
        address: '',
        phoneno: '',
        donated: false,
    });
    const { userId } = useParams(); // Use 'id' to match your route parameter
   console.log(userId)

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        async function fetchInitialValues(userId) {
            try {
                const response = await fetch (`https://bloodbank-exwj.onrender.com/get-donor?_id=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                    setIsEdit(true);
                } else {
                    setIsEdit(false);
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching initial values:', error);
            }
        }
        fetchInitialValues(userId);
    }, [userId]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEdit 
                ? `https://bloodbank-exwj.onrender.com/edit-donor?_id=${userId}`
                : `https://bloodbank-exwj.onrender.com/add-donor?_id=${userId}`;
            const method = isEdit ? 'PUT' : 'POST';
    
            const requestData = { ...formData, userId }; // Include id for both add and edit
    
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
    
            if (response.ok) {
                alert(`Donor ${isEdit ? 'updated' : 'added'} successfully!`);
                window.location = "/donor";
            } else {
                alert(`Error ${isEdit ? 'updating' : 'adding'} donor. Please try again later.`);
            }
        } catch (error) {
            console.error(`Error ${isEdit ? 'updating' : 'adding'} donor:`, error);
            alert(`Error. Please try again later.`);
        }
    };
    

    return (
        <div id="donate-form-overlay">
            <div id="dform">
                <h2 id="hform">Donation Form</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="donorname" className='label'>Name</label>
                    <input type="text" id="donorname" name="donorname" value={formData.donorname} onChange={handleChange} required /><br /><br />
                    <label htmlFor="age" className='label'>Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required /><br /><br />
                    <label htmlFor="email" className='label'>E-mail</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />
                    <label htmlFor="bloodgroup" className='label'>Blood Group</label>
                    <input type="text" id="bloodgroup" name="bloodgroup" value={formData.bloodgroup} onChange={handleChange} required /><br /><br />
                    <label htmlFor="gender" className='label'>Gender</label>
                    <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} required /><br /><br />
                    <label htmlFor="address" className='label'>Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required /><br /><br />
                    <label htmlFor="phoneno" className='label'>Phone Number</label>
                    <input type="tel" id="phoneno" name="phoneno" value={formData.phoneno} onChange={handleChange} required /><br /><br />
                    <button type="submit" id="butform">{isEdit ? "Edit" : "Submit"}</button>
                </form>
            </div>
        </div>
    );
};

export default Donate;
