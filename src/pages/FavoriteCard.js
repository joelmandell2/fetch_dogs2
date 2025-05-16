import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, ButtonGroup, Modal } from '@mui/material';


export default function FavoriteCard({dogIds, handleClose}){

    const [favDog, setFavDog] = useState();
    const [favDogData, setFavDogData] = useState([]);

    useEffect( () => {
        console.log([Array.from(dogIds)], ' dog ids being sent into favorite');
        // should take in array of dog ids and return one dog id
            fetch(`https://frontend-take-home-service.fetch.com/dogs/match`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/JSON'
                        },
                        body:JSON.stringify(Array.from(dogIds)),
                        credentials: 'include'
                    }
                )
                .then(res2 => res2.json())
                .then(resJson2 => {
                    console.log(resJson2, ' fav dogs response');
                    setFavDog(resJson2.match);
        })
        
        
    }, [dogIds]
    );

    useEffect(() => {
        console.log(favDog, ' fav dog right now');
        console.log([favDog], ' fav dog being passed in');
        // should take in an array of dog ids and the data for each
        if(favDog){
            fetch(`https://frontend-take-home-service.fetch.com/dogs`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/JSON'
                        },
                        body:JSON.stringify([favDog]),
                        credentials: 'include'

                    }
                )
                .then(res2 => res2.json())
                .then(resJson2 => {
                    console.log(resJson2,  ' fav dog returned');
                    setFavDogData(resJson2);

        })
        }
        
    }, [favDog]);

    const dogD = () => {
        if(favDogData && favDogData.length > 0){
            return <div>
                <Typography align='center'>{favDogData[0].age} Years Old </Typography>
                <Typography align='center'>{favDogData[0].breed} </Typography>
                <Typography align='center'>Zip Code: {favDogData[0].zip_code} </Typography>
            </div>
        }
    };
    return(
        <Modal 
        open={true}
        onClose={handleClose}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box  
        p={3}
        style={{ background: 'green', borderRadius: '16px', border: '2px solid #000', width: 600, display:'flex', alignItems: 'center', justifyContent: 'center', }}
        >   
        <Card sx={{backgroundColor: 'white'}}>
        <CardContent>
        {favDogData && favDogData.length > 0 ? (<Typography variant="h5" align="center" sx={{mb:2}}>{favDogData[0].name}</Typography>) : <p> </p> }

        
        {favDogData && favDogData.length > 0 ? (<img src={favDogData[0].img}/>) : <p> Matching</p> }
        {dogD()}

        </CardContent>

        </Card>

        </Box>

        </Modal>
    );

}