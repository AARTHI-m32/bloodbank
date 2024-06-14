import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Donated = () => {
          const[data,setData]=useState({                   
            amount:'',
            hospitalname:'',
            hospitaladdress:'',
            date:''
          })
          const userId = localStorage.getItem('userId');
          const { _id } = useParams();
          
          const handleChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }
         
          const handleSubmit=async e => {
              e.preventDefault();
        try{         
            const response=await fetch('https://bloodbank-exwj.onrender.com/add-donated',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ ...data, id: _id })
        })
        if(response.ok){
            alert('Detail Updated!')
            setData({              
                amount:'',
                hospitalname:'',
                hospitaladdress:'',
                date:''
            })
            window.location = "/details";
        }else{
            alert('Error updating the details')
        }
    }
        catch(error){
            alert('Error.Please try again')
            console.log(error)
        }
    }
    
    
    return(
        <div>
            <div id="donform">
                
            <h2 id="donh">Update Details</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="amount" class="donlabel">Amount(in ml)  </label>
            <input type="number" name="amount" value={data.amount} onChange={handleChange} id="damount" required/><br/><br/>
            <label htmlFor="hospital" class="donlabel">Hospital Name  </label>
            <input type="text" name="hospitalname" value={data.hospitalname} onChange={handleChange} id="dhospital" required/><br/><br/>
            <label htmlFor="hospital" class="donlabel">Hospital Address  </label>
            <textarea type="textarea" name="hospitaladdress" value={data.hospitaladdress} onChange={handleChange} id="dhospitaladd" required></textarea><br/><br/>
            <label htmlFor="date" class="donlabel">Date  </label>
            <input type="text" name="date" value={data.date} onChange={handleChange} id="ddate" required/><br/><br/>
            <button id="donbut">Update</button>
            </form>
        </div>
        </div>
    )
}
export default Donated;