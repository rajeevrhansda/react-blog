import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './singlePost.css'
export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/posts/${path}`);
            setPost(res.data);
        }
        getPost();
    }, [path]);


    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        className='singlePostImg'
                        src={post.photo}
                        alt="" />
                )}
                <h1 className='singlePostTitle'>{post.title}
                    <div className="singlePostEdit">
                        <i class="singlePostIcon fa-solid fa-pen-to-square"></i>
                        <i class="singlePostIcon fa-regular fa-trash-can"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePOstAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDelete">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className='singlePostDesc'>{post.desc}</p>
            </div>
        </div>

    )
}
