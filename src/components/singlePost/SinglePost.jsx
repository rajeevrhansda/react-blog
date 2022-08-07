import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context';
import './singlePost.css'
export default function SinglePost() {
    const PF = "http://localhost:5000/images/"
    const { user } = useContext(Context);


    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/posts/${path}`);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            // await axios.delete("/posts/" + path, {data:{username: user.username}});
            await axios.delete(`/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace('/');
        } catch (err) {
            console.log(err);
        }
    }
    const handleUpdate = async () => {
        try {
            // await axios.delete("/posts/" + path, {data:{username: user.username}});
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            // window.location.reload();
            setUpdateMode(false)
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">

                {post.photo && (
                    <img
                        className='singlePostImg'
                        src={PF + post.photo}
                        alt="" />
                )}
                {
                    updateMode ? <input
                        className='writeInput'
                        type="text"
                        value={title}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}

                        autoFocus={true}
                    /> : (

                        <h1 className='singlePostTitle'>
                            {title}
                            {post.username === user?.username && (

                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                    )}
                <div className="singlePostInfo">
                    <span className="singlePOstAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDelete">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ?
                    <textarea
                        className='writeInput singlePostText'
                        value={desc}
                        placeholder='Tell your story'
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea> : (

                        <p className='singlePostDesc'>{desc}</p>
                    )}
            </div>
            {updateMode && (
                <button className='singlePostUpdate' onClick={handleUpdate}>Publish</button>
            )}
        </div>

    )
}
