import React, {useState, useEffect} from 'react';
import './Post.css';
import { Avatar, Button } from '@mui/material';

const BASE_URL = 'http://localhost:8000/'

function Post({post}) {

    const [imageUrl, setImageUrl] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (post.image_url_type === 'absolute') {
            setImageUrl(post.image_url);
        } else {
            setImageUrl(BASE_URL + post.image_url)
        }
    }, [post.image_url, post.image_url_type])

    useEffect(() => {
        setComments(post.comments);
    },[post.comments])

    console.log("Image URL: ", imageUrl);

    return (
        <div className='post'>
            <div>
                <Avatar
                    alt="Andrii"
                    src=""/>
                    <div className='post_headerInfo'>
                    <h3>
                    {post.user.username}  
                    </h3>
                    <Button className='post_delete'>Delete</Button>
                    </div>
                <h3>{post.username}</h3>
            </div>
            <img className='post_image' src={imageUrl} alt="Post" />
            <h4 className='post_text'>{post.caption}</h4>

            <div className='post_comments'>
                {
                    comments.map(comment => (
                        <p>
                            <strong>{comment.username}:</strong>{comment.text}
                        </p>
                    ))
                }
            </div>
            </div>
    )
}

export default Post