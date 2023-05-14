import { useState,useEffect } from "react";
import NavbarFan from "../Navbar/NavbarFan";
import NavbarOrg from "../Navbar/NavbarOrg";
import NavbarPlayer from "../Navbar/NavbarPlayer";
import { useNavigate } from "react-router-dom";
import './Tournament.css';
import CreateTournament from "./CreateTournaments";
function Tournament(){
    const navigate=useNavigate();
    const userType = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).Type : null;
    const userID = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).reg_id : null;
    if(!localStorage.getItem('user-info')){
        navigate('/login');
      }
      const [result,setResult] =useState();
      const [show,setShow] =useState(false);
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
    function handleFilterChange() {
        const filteredresult= result.filter(obj => obj.Organizer_Id===userID);
        setResult(filteredresult); 
        setShow(false);
      }

      function handleCreateShow() {
        
        setShow(true);
      }
    return(
        <>
            {userType==="Organizer"?<NavbarOrg/>:userType==="Fan"?<NavbarFan/>:<NavbarPlayer/>}
            <div class='content-wrapper'>
                <div class="t-header">
                <h1>Tournaments</h1>
                {userType==='Player'?<button class='btn btn-primary'>Show Registerd tournaments</button>:userType==='Organizer'?
                <div class="t-header-btn-grp">
                <button onClick={handleCreateShow}class='btn btn-primary'>Create New tournaments</button>
                <button onClick={handleFilterChange} class='btn btn-primary'>Show Created tournaments</button>
                </div>
                :null}
                </div>
                <div class='container-fluid tournament-container'>
                    <div class='row'>
                        {!show && result ? result.map((item)=>
                        <div class='col-lg-4 gy-4' key={item.tournament_id} >
                            <div class='card'>
                                <div class='card-header'>
                                    <h3>{item.tournament_name}</h3>
                                </div>
                                <div class='card-body'>
                                    <div class='tournament-body'>
                                        <h6>{item.tournament_description}</h6>
                                        <h2> Prizepool: {item.Prize} $</h2>
                                        <h6>Start Date:{new Date(item.start_date).toLocaleDateString()}</h6>
                                        <h6>End Date: {new Date(item.end_date).toLocaleDateString()}</h6>
                                        <h6>Deadline: {new Date(item.registration_deadline).toLocaleDateString()}</h6>
                                        <h6>Organized By: {item.Registration.UserName}</h6>
                                    </div>
                                    <div class='card-button'>
                                        {userType==='Player'?
                                        <div class='button-group' >
                                                <button class='btn btn-primary'>View</button>
                                                <button class='btn btn-primary'>Register</button>
                                        </div>
                                        :<button onClick={() => navigate(`/view/${item.tournament_id}`)} class='btn btn-primary'>View</button>}
                                    </div>
                                </div>
                            </div>
                        </div>):null
                    }
                    {show ? <CreateTournament/>:null}
                    </div>
                </div>
            </div>
            
        </>
    )   
}
export default Tournament;