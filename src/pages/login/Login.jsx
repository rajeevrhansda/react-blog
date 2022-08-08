import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { Context } from '../../context/Context';
import axios from 'axios'
export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { isFetching, dispatch } = useContext(Context);
    console.log(isFetching.isFetching);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("https://react-blog01.herokuapp.com/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    };



    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label >Username</label>
                <input className='loginInput' type="text" placeholder='Enter your Username...' ref={userRef} />
                <label >Password</label>
                <input className='loginInput' type="password" placeholder='Enter your password...' autoComplete='on' ref={passwordRef} />
                <button className="loginButton" type="submit" disabled={isFetching.isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className='loginRegisterButtonLink' to='/register' >Register</Link>
            </button>
        </div>
    )
}
