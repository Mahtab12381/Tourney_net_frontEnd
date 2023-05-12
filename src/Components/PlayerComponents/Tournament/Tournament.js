import { useState,useEffect } from "react";
import NavbarFan from "../../Navbar/NavbarFan";
import NavbarOrg from "../../Navbar/NavbarOrg";
import NavbarPlayer from "../../Navbar/NavbarPlayer";
import { useNavigate } from "react-router-dom";
import './Tournament.css';
function Tournament(){
    const navigate=useNavigate();
    const userType = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).Type : null;
    if(!localStorage.getItem('user-info')){
        navigate('/login');
      }
      const [result,setResult] =useState();
      useEffect(()=>{ 
        async function getResult(){
            let result = await fetch("http://localhost:51753/api/tournaments",{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            result = await result.json();
            var revresult = result.reverse();
            setResult(revresult);
        }
        getResult();
    },[]);
    return(
        <>
            {userType==="Organizer"?<NavbarOrg/>:userType==="Fan"?<NavbarFan/>:<NavbarPlayer/>}
            <div class='content-wrapper'>
                <div class="t-header">
                <h1>Suggested Tournament</h1>
                {userType==='Player'?<button class='btn btn-primary'>Show Registerd tournaments</button>:userType==='Organizer'?<button class='btn btn-primary'>Show Created tournaments</button>:null}
                </div>
                <div class='container-fluid tournament-container'>
                    <div class='row'>
                        {result?result.map((item)=>
                        <div class='col-lg-4 gy-4' key={item.id} >
                            <div class='card'>
                                <div class='card-header'>
                                    <h3>{item.tournament_name}</h3>
                                </div>
                                <div class='card-body'>
                                    <div class='tournament-body'>
                                        <h6>{item.organizer_name}</h6>
                                        <h6>{item.tournament_description}</h6>
                                        <h6>Start Date:{new Date(item.start_date).toLocaleDateString()}</h6>
                                        <h6>End Date: {new Date(item.end_date).toLocaleDateString()}</h6>
                                        <h6>Deadline: {new Date(item.registration_deadline).toLocaleDateString()}</h6>
                                    </div>
                                    <div class='card-button'>
                                        {userType==='Player'?
                                        <div class='button-group' >
                                                <button class='btn btn-primary'>View</button>
                                                <button class='btn btn-primary'>Register</button>
                                        </div>
                                        :<button class='btn btn-primary'>View</button>}
                                    </div>
                                </div>
                            </div>
                        </div>):null
                    }
                    </div>
                </div>
            </div>
            
        </>
    )   
}
export default Tournament;