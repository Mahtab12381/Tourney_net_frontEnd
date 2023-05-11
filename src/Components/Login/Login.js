import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
function Login(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
          navigate('/homepage/player');
        }
    });

    async function handleLogin(){
        let item={username,password};
        let result = await fetch("http://localhost:51753/api/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        if(result.Token_key!=null){
            localStorage.setItem("user-info",JSON.stringify(result));
            navigate('/homepage/player');
        }  
    }

return(
    <>
     <Navbar/>
    <div className="container">
        <div className="login-div">
            <h3>Login</h3>
            <br/>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" className="form-control"></input>
            <br/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="form-control"></input>
            <br/>
            <button onClick={handleLogin} className='btn btn-primary'>Login</button>
        </div>
    </div>
    </>
);
}
export default Login;   