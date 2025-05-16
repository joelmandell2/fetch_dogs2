import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, ButtonGroup, Modal } from '@mui/material';


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
            return <p>{favDogData[0].age}, {favDogData[0].breed} {favDogData[0].img} {favDogData[0].name} {favDogData[0].zip_code}</p>;
        }
    };
    return(
        <Modal 
        open={true}
        onClose={handleClose}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box  
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 600 }}
        >   
        {favDogData && favDogData.length > 0 ? (<img src={favDogData[0].img}/>) : <p> </p> }
        <Card>
        <CardContent>
        
        {favDogData && favDogData.length > 0 ? (<img src={favDogData[0].img}/>) : <p> loading</p> }
        {dogD()}

        </CardContent>

        </Card>

        </Box>

        </Modal>
    );

}