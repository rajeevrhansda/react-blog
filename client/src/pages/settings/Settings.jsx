import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
export default function Settings() {
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm">
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img 
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="" />
                    <label htmlFor="fileInput" >
                    <i class="settingsPPIcon fa-regular fa-circle-user"></i>
                    </label>
                    <input type="file" id='fileInput' style={{display: "none"}}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder='Rajeev'/>
                <label>Email</label>
                <input type="email" placeholder='username@domain.com'/>
                <label>Username</label>
                <input type="password" placeholder='password'/>
                <button className="settingsSubmit">Update</button>
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}
