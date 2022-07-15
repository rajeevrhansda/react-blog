import React from 'react'
import './write.css'
export default function Write() {
  return (
    <div className='write'>
      <img 
      className='writeImg'
      src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      alt="" />
      <div className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor='fileInput'>
          <i class="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id='fileInput' style={{display: "none"}}/>
          <input className='writeInput' type="text" placeholder='Title' autoFocus={true} />
        </div>
        <div className="writeFormGroup">
          <textarea
          className='writeInput writeText'
          placeholder='Tell your story'
          type="text"
          ></textarea>
        </div>
        <button className='writeSubmit'>Publish</button>
      </div>
    </div>
  )
}
