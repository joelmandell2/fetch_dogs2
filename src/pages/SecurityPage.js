import { useEffect, useState ,} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Card, CardContent, TextField, Button} from '@mui/material';





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
            <Card sx={{align:'center', justifyContent: 'center', mt: 30,  width:'300px'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column',align: 'center', justifyContent: 'center'}}>
                    <TextField onChange={handleUser} id="outlined-basic" label="Name" variant="outlined" required/>
                    <TextField onChange={handlePassword} id="pass" label="Email" variant="outlined" required sx={{mt:2}}/>
                    <Button onClick={handleClick}>Submit</Button>
                </CardContent>
            </Card>
        </Container>
    );

};