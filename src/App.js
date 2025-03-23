import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

const BASE_URL = 'http://localhost:8000';

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

function App() {
    const [posts, setPosts] = useState([]);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useState(null);
    const [authTokenType, setAuthTokenType] = useState(null);
    const [userId, setUserId] = useState('');

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

    const signIn = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const requestOptions = {
            method: 'POST',
            body: formData,
        }

        fetch(BASE_URL + '/login', requestOptions)
        .then(response => {if(response.ok) {
            return response.json();
        }
        throw response
        })
        .then(data => {console.log(data)
            setAuthToken(data.access_token)
            setAuthToken(data.token_type)
            setUserId(data.user_id)
            setUsername(data.username)
        })
        .catch(error => {console.log(error)
        alert(error)
        })

        setOpenSignIn(false);
    }

    const signOut = (event) => {
        setAuthToken(null)
        setAuthToken(null)
        setUserId("")
        setUsername("")
    }

    return (
        <div className="app">
            {/* Sign-in Modal */}
            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                <Box sx={modalStyle}>
                    <form className="app_signin" onSubmit={signIn}>
                        <center>
                            <img className="app_headerImage"
                                 src="https://cdn.worldvectorlogo.com/logos/instagram-1.svg"
                                 alt="Instagram"/>
                        </center>
                        <Input
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            sx={{ my: 1 }}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            sx={{ my: 1 }}
                        />
                        <Button type="submit" variant="contained" fullWidth>Log In</Button>
                    </form>
                </Box>
            </Modal>

            {/* Sign-up Modal */}
            <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
                <Box sx={modalStyle}>
                    <h2>Sign Up</h2>
                    {/* Add form components here */}
                </Box>
            </Modal>

            <div className="app_header">
                <img
                    className="app_headerImage"
                    src="https://cdn.worldvectorlogo.com/logos/instagram-1.svg"
                    alt="Instagram"
                />
                {authToken ? (
                    <Button onClick={() => signOut()}>Logout</Button>
                ): (
                <div>
                    <Button onClick={() => setOpenSignIn(true)}>Login</Button>
                    <Button onClick={() => setOpenSignUp(true)}>Signup</Button>
                </div>
                    )
                }
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
