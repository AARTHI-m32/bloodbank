import Nav from "./Nav"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Camp = () => {
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCamps();
    }, []);

    const fetchCamps = async () => {
        try {
            const response = await fetch('https://bloodbank-exwj.onrender.com/get-camp');
            if (!response.ok) {
                throw new Error('Failed to fetch camps');
            }
            const data = await response.json();
            setCamps(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div>
                <Nav />
                <div id="display">Loading.... {error}</div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <Nav />
                <div id="display">Error fetching Camp details. {error}</div>
            </div>
        )
    }

    return (
        <div>
            <Nav />
            <h1 id="hcamp">Blood Donation Camps</h1>
            {!loading && !error && (
                <div id="camp-1div">
                    {camps.map(camp => (
                        <div key={camp._id} id="camp-div">
                            <h2 id="hc"> {camp.organisation} </h2>
                            <p><strong>Date: </strong> {new Date(camp.date).toLocaleDateString()}</p>
                            <p><strong>Location: </strong> {camp.location}</p>
                            <p><strong>Description: </strong> {camp.description}</p>
                            <p><strong>Start Time: </strong> {new Date(camp.startTime).toLocaleTimeString()}  <strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time: </strong> {new Date(camp.endTime).toLocaleTimeString()} </p>
                           
                            <Link to={`/volunteerform/${camp._id}`}><button id="cbut">Volunteer</button></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Camp;
