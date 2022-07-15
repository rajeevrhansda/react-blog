import React from 'react'
import './post.css'
export default function Post() {
  return (
    <div className='post'>
      <img
      className='postImg'
      src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      alt="" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Life</span>
        </div>
        <span className="postTitle">
          Lorem ipsum dolor sit amet
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <div className="postDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia amet praesentium sint natus ducimus similique! Nisi sed vitae ex excepturi voluptatem quam et. Optio eveniet sit placeat, recusandae saepe earum.
      </div>
    </div>
  )
}
