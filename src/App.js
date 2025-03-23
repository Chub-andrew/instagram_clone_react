import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import Button from "@mui/material/Button"; // Correct import

const BASE_URL = 'http://localhost:8000';

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + '/post/all')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!Array.isArray(data)) {
            throw new Error('Invalid data format received');
          }

          const sortedPosts = data.sort((a, b) => {
            if (!a.timestamp || !b.timestamp) return 0;
            return new Date(b.timestamp) - new Date(a.timestamp);
          });

          setPosts(sortedPosts);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('Error fetching data: ' + error.message);
        });
  }, []);

  return (
      <div className="app">
        <div className="app_header">
          <img
              className="app_headerImage"
              src="https://cdn.worldvectorlogo.com/logos/instagram-1.svg"
              alt="Instagram"
          />
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button onClick={() => setOpenSignUp(true)}>Signup</Button>
          </div>
        </div>
        <div className="app_posts">
          {posts.map(post => (
              <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
  );
}

export default App;
