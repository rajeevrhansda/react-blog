import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import { Context } from '../../context/Context'
import axios from 'axios';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const { user } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const UpdateUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            UpdateUser.profilePic = fileName;
            try {
                for (var key of data.entries()) {
                    console.log(key[0] + ', ' + key[1]);
                }
                await axios.post("/upload/", data);
                
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.put("users/"+user._id, UpdateUser);
            setSuccess(true);

        } catch (err) {

        }

    }


    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : user.profilePic}
                            alt="" />
                        <label htmlFor="fileInput" >
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input 
                        type="file" 
                        id='fileInput' 
                        style={{ display: "none" }} 
                        onChange={(e) => setFile(e.target.files[0]) }/>
                    </div>
                    <label>Username</label>
                    <input 
                    type="text" 
                    placeholder={user.username} 
                    onChange={(e) => setUsername(e.target.value) }/>
                    <label>Email</label>
                    <input 
                    type="email" 
                    placeholder={user.email} 
                    onChange={(e) => setEmail(e.target.value) }/>
                    <label>Password</label>
                    <input 
                    type="password" 
                    placeholder='password' 
                    onChange={(e) => setPassword(e.target.value) }/>
                    <button 
                    className="settingsSubmit"
                    type='submit'>Update</button>
                    {success && <span>Profile has been updated </span>}

                </form>
            </div>
            <Sidebar />
        </div>
    )
}
