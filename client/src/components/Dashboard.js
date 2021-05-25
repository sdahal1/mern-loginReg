import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {navigate} from "@reach/router";

const Dashboard = () => {

    const [loggedinuser, setloggedinuser] = useState(null)


    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials:true})
            .then(res=>{
                console.log(res)
                setloggedinuser(res.data.user)
            })
            .catch(err=>{
                console.log("errrrrrrr",err)
                navigate("/")
            })
    }, [])


    const logout = (e)=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                console.log(res)
                navigate("/")
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        
        <div>
            
            {loggedinuser? 
            <div>
                <h1>Welcome {loggedinuser.username}</h1>
                <button onClick={logout}>Logout</button>
            </div>
            
            
            
            
            :
            <h1>Please log in first</h1>}
            
        </div>
       
    );
};


export default Dashboard;