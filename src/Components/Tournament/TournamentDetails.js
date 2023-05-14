import {useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarFan from "../Navbar/NavbarFan";
import NavbarOrg from "../Navbar/NavbarOrg";
import NavbarPlayer from "../Navbar/NavbarPlayer";
import { useState,useEffect } from "react";
function TournamentDetails() {
    const userType = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).Type : null;
    const navigate=useNavigate();
    const [result,setResult] =useState();   
    const [rankings,setRankings] =useState();
    const [Participants,setParticipants] =useState();
    const [matches,setMatches] =useState();
  const { id } = useParams();
  if(!localStorage.getItem('user-info')){
    navigate('/login');
  }
  const url = "http://localhost:51753/api/tournaments/"+id;
  useEffect(()=>{ 
    async function getResult(){
        let result = await fetch(url,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        result = await result.json();
        setResult(result);
        setRankings(result.Rankings);
        setParticipants(result.Participants);
        setMatches(result.Matches);
    }
    getResult();
},[url]);
  return(
    <>
     {userType==="Organizer"?<NavbarOrg/>:userType==="Fan"?<NavbarFan/>:<NavbarPlayer/>}
    <div class='content-wrapper'>
    <div class='container-fluid tournament-container'>
    <h1>point Table</h1>
     <table>
    <thead>
    <tr>
      <th>Rank</th>
      <th>Participant ID</th>
      <th>Matches Played</th>
      <th>Matches Won</th>
      <th>Matches Lost</th>
      <th>Total Points</th>
    </tr>
  </thead>
  <tbody>
    {result?rankings.map((ranking,index) => (
      <tr key={ranking.ranking_id}>
        <td>{index + 1}</td>
        <td>{ranking.participant_id}</td>
        <td>{ranking.Match_palyed}</td>
        <td>{ranking.Match_won}</td>
        <td>{ranking.Match_lost}</td>
        <td>{ranking.Total_point}</td>
      </tr>
    )):null} 
  </tbody>
</table>
<h1>Match List</h1>
<div class="large-table">
<table>
  <thead>
    <tr>
      <th>Match ID</th>
      <th>Match Number</th>
      <th>Start Time</th>
      <th>End Time</th>
      <th>Winner Team ID</th>
      <th>Loser Team ID</th>
      <th>Winner Score</th>
      <th>Loser Score</th>
      <th>Participant 1</th>
      <th>Participant 2</th>
      <th>Tournament ID</th>
    </tr>
  </thead>
  <tbody>
    {result ? matches.map((match) => (
      <tr key={match.Match_id}>
        <td>{match.Match_id}</td>
        <td>{match.Match_number}</td>
        <td>{match.Match_start_time}</td>
        <td>{match.Match_end_time}</td>
        <td>{match.Match_winner_team_id}</td>
        <td>{match.Match_loser_team_id}</td>
        <td>{match.w_score}</td>
        <td>{match.l_score}</td>
        <td>{match.participant_name_1}</td>
        <td>{match.participant_name_2}</td>
        <td>{match.Tournament_id}</td>
      </tr>
    )) : null}
  </tbody>
</table>

</div>

<h1>Participant List</h1>
     <table>
    <thead>
    <tr>
      <th>Id</th>
      <th>Team Name</th>
      <th>Team id</th>
    </tr>
  </thead>
  <tbody>
  {result?Participants.map((item) => (
      <tr key={item.participant_id}>
        <td>{item.participant_id}</td>
        <td>{item.team_name}</td> 
        <td>{item.team_id}</td> 
      </tr>
    )):null}
  </tbody>
</table>
</div>
</div>
    </>
  )

  // Use the ID to fetch the details of the item from the API and display them
  // ...
}
export default TournamentDetails;