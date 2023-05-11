import {useEffect, useState} from 'react';
import NavbarPlayer from '../Navbar/NavbarPlayer';
function HomepagePlayer(){
    const [user,setUser]=useState();

    useEffect(()=>{ 
        async function getUser(){
            let result = await fetch("http://localhost:51753/api/FanPosts",{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            result = await result.json();
            setUser(result);
        }
        getUser();
    },[]);

    return(
        <>
        <NavbarPlayer/>
          <h1>
            {user?user.map((item)=>
                <div key={item.id}>
                    <h1>{item.PostContent}</h1>
                    <h1>{item.PostDate}</h1>
                </div>
            ):null}     
          </h1>
        </> 
    )
}
export default HomepagePlayer;