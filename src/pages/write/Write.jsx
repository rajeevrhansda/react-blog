import React from 'react'
import { useState } from 'react'
import './write.css'
import { Context } from '../../context/Context'
import { useContext } from 'react';
import axios from 'axios'

export default function Write() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
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
      const res = await axios.post("posts/", newPost);
      window.location.replace("/post/"+res.data._id)

    } catch (err) {

    }

  }

  return (
    <div className='write'>
      {file && (<img
        className='writeImg'
        src={URL.createObjectURL(file)}
        alt="" />)}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor='fileInput'>
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input 
          type="file" 
          id='fileInput' 
          style={{ display: "none" }} 
          onChange={(e)=>setFile(e.target.files[0])}
          />
          <input 
          className='writeInput' 
          type="text" 
          placeholder='Title' 
          autoFocus={true} 
          onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className='writeInput writeText'
            placeholder='Tell your story'
            type="text"
            onChange={(e)=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className='writeSubmit' type='submit'>Publish</button>
      </form>
    </div>
  )
}
