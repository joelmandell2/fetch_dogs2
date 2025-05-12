import { useEffect, useState } from 'react';
import { Container,Card, CardContent, TextField} from '@mui/material';



export default function SecurityPage(){

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);


    useEffect(() => {}, []);

    return(
        <Container sx={{align:'center', justifyContent: 'center', display:'flex'}}>
            <Card sx={{align:'center', justifyContent: 'center', mt: 30,  width:'300px'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column',align: 'center', justifyContent: 'center'}}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                    <TextField id="pass" label="Password" variant="outlined" sx={{mt:3}}/>

                </CardContent>
            </Card>
        </Container>


    );

};