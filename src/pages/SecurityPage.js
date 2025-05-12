import { useEffect, useState ,} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Card, CardContent, TextField, Button} from '@mui/material';

import vid from './videos/retriever.mp4';




export default function SecurityPage(){

    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [userPassword, setPassword] = useState(null);


    useEffect(() => {
    }, 
    []);

    const handleClick = (event) => {
        fetch(
            `https://frontend-take-home-service.fetch.com/auth/login`, {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/JSON'
                },
             
               body: JSON.stringify({
                name:userName,
                email:userPassword
               }),
               credentials: 'include'
            }
            
        ).then(response => {
            if(response.ok){
                console.log('correct');
                navigate('/dogs');
            }else {
                console.log('incorrect login');
            } 
        });
    };

    const handleUser = (event) => {
        setUserName(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    return(
        <Container sx={{align:'center', justifyContent: 'center', display:'flex'}}>
            <video
                autoPlay
                muted
                playsInline
                loop
                id="ny_vid"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            >
                <source src={vid} type="video/mp4" />
            </video>
            <Card sx={{align:'center', justifyContent: 'center', mt: 30,  width:'300px', backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column',align: 'center', justifyContent: 'center'}}>
                    <TextField onChange={handleUser} id="outlined-basic" label="Name" variant="outlined" required/>
                    <TextField onChange={handlePassword} id="pass" label="Email" variant="outlined" required sx={{mt:2}}/>
                    <Button onClick={handleClick}>Submit</Button>
                </CardContent>
            </Card>
        </Container>
    );

};