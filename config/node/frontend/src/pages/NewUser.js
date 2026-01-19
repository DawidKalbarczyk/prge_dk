import React, {useState} from 'react';
import {Container, Box, TextField, Button, Paper} from '@mui/material';

function NewUser(props) {
    const [userName, setUserName] = useState("")
    const [userLocation, setUserLocation] = useState("")
    const [userPosts, setUserPosts] = useState(0)

    const handleSubmit = async (e) => {
        console.log(userName, userLocation, userPosts)
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:10000/app/insert_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    location: userLocation,
                    posts: userPosts
                })
            })
            console.log(response)
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Container>
                <Paper elevation={3} sx={{p: 4}}>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        style={{padding: 10}}
                        fullWidth
                        label="imie"
                        value={userName.name}
                        onChange={(e)=>setUserName(e.target.value)}
                    ></TextField>
                    <TextField
                        style={{padding: 10}}
                        fullWidth
                        label="location"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                    ></TextField>
                    <TextField
                        style={{padding: 10}}
                        fullWidth
                        label="posts"
                        value={userPosts}
                        onChange={(e) => setUserPosts(e.target.value)}
                    ></TextField>
                    <Button type="submit" variant="contained">Dodaj użytkownika</Button>
                </Box>
            </Paper>
            </Container>
        </div>
    )
}
export default NewUser;