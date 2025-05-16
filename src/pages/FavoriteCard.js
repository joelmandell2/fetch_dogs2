import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, ButtonGroup, Modal } from '@mui/material';


export default function FavoriteCard({dogIds, handleClose}){

    const [favDog, setFavDog] = useState([]);
    const [favDogData, setFavDogData] = useState([]);

    useEffect( () => {
        console.log([Array.from(dogIds)], ' dog ids being sent into favorite');
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
                    setFavDog(resJson2);
        })
    }, [dogIds]
    );

    useEffect(() => {

    }, [favDog]);

    return(
        <Modal 
        open={true}
        onClose={handleClose}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box  
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 600 }}
        >   
        <p>Match</p>
        <Card>
        <CardContent>

        <image src={favDog.img}></image>
        <p>{dogIds}, dog ids</p>
        <p>{favDog[0]}, ${favDog[0].name}, ${favDog[0].img}, {favDog[0].breed}, {favDog[0].age}, {favDog[0].zip_code}</p>

        </CardContent>

        </Card>

        </Box>

        </Modal>
    );

}