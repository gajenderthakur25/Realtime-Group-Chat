import "./Join.css";
import logo from "../../images/group.png";
import {Link} from "react-router-dom";
import { useState } from "react";

let user;
const sendUser=()=>{
    user=document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
}

const Join = () => {

    const [name, setname] = useState("");

  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt='logo '></img>
            <h1>Group Chat App</h1>
            <input onChange={(e)=>{setname(e.target.value)}} placeholder='Enter Your Name' type='text' id='joinInput'></input>
           <Link onClick={(e)=>!name ? e.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link>
        </div>
        </div>
  )
}

export default Join
export {user}