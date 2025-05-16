import { useEffect, useState } from 'react';
import { Container, Box, Button, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, Link, TableRow } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import FavoriteCard from './FavoriteCard';

export default function HomePage(){

    // todo: favorites (return match form /dogs/match)
    // todo: paginated
    // todo: style
    const [sortOn, setSortOn] = useState('asc');
    const [anyTimes, setAnyTimes] = useState(0);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10]);
    const [dogData, setDogData] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [dogIds, setDogIds] = useState([]);
    const [orderByAsc, setOrderByAsc] = useState(true);
    const [selectedBreed, setSelectedBreed] = useState('Any');
    const[favoriteIds, setFavoriteIds] = useState(new Set());
    const [favoriteCard, setFavoriteCard] = useState(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    // use a table with a bunch of filtering abilities on top

//     interface Coordinates {
//     lat: number;
//     lon: number;
// }

//     interface Location {
//     zip_code: string
//     latitude: number
//     longitude: number
//     city: string
//     state: string
//     county: string


//     interface Dog {
//     id: string
//     img: string
//     name: string
//     age: number
//     zip_code: string
//     breed: string
    const adjustSort =() =>{
        if(sortOn == 'asc'){
            setSortOn('desc');
            return;
        } setSortOn('asc');
        return;
    };

    function addFav(row){
        favoriteIds.add(row.id);
    };

    function removeFav(row){
        favoriteIds.delete(row.id);
    };

    // make sure to add a favorite field
    // field = key within json
    // headerName = how it's displayed
    const dogColumns = [
        // {
        //     field: favorite,
        //     headerName: 'Favrorite'
        // },
        {
            field: 'favorite',
            headerName: 'Favorite',
            renderCell: (row) => {
                return favoriteIds.has(row.id) ? (
                    <StarIcon style={{cursor:'pointer'}} onClick={ () => {
                        const copySet = new Set(favoriteIds);
                        copySet.delete(row.id);
                        setFavoriteIds(copySet);
                    }}/>
                ) : (
                    <StarBorderIcon style={{cursor:'pointer'}} onClick={() => {
                        const copySet = new Set(favoriteIds);
                        copySet.add(row.id);
                        setFavoriteIds(copySet);
                    }}/>
                );
            }

        },
        {
            field: 'img',
            headerName: 'Picture',
        },
         {
            field: 'breed',
            headerName: 'Breed',
        },
        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: 'age',
            headerName: 'Age',
        },
        {
            field: 'zip_code',
            headerName: 'Zip Code',
        },
       
        

    ];

  
    useEffect(
        ()=> {
            // make sure when you get results you add a favorite field

            // dogs/search gets you dog ids
            // dogs/breeds gets you breed names
            


            fetch(`https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${sortOn}`,
                {method: 'GET',
                credentials: 'include',})
            .then(res => res.json())
            .then(resJson => {
                setDogIds(resJson.resultIds);

                // fetch the dog information for each dog id 
             fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`,
                {method:'GET',
                credentials: 'include',
                }
            ).then(res => res.json())
            .then(resJson=> {
                setBreeds(resJson)});
                
            });
            }, []);


           
            // once you get dog ids with number you want then you post those ids and get the results


//   The following query parameters can be supplied to filter the search results. All are optional; if none are provided, the search will match all dogs.

// -   `breeds` - an array of breeds
// -   `zipCodes` - an array of zip codes
// -   `ageMin` - a minimum age
// -   `ageMax` - a maximum age

// Additionally, the following query parameters can be used to configure the search:

// -   `size` - the number of results to return; defaults to 25 if omitted
// -   `from` - a cursor to be used when paginating results (optional)
// -   `sort` - the field by which to sort results, and the direction of the sort; in the format `sort=field:[asc|desc]`.


    useEffect(() => {
        console.log(selectedBreed, ' selected breed ');
        // if breeds changes fetch dogs/search
        if(selectedBreed != 'Any'){
            console.log('changing selected breed to ', selectedBreed);
            const selected_arr = [selectedBreed]
            const breedP = selected_arr.map(selected_arr => `breeds=${encodeURIComponent(selected_arr)}`).join('&');
            console.log(breedP, ' breed Parameter being passed in');
            const url = `https://frontend-take-home-service.fetch.com/dogs/search?${breedP}&sort=breed:${sortOn}`;
            console.log(url, ' url being fetched');
            fetch(url,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/JSON'
                        },
                       
                        credentials: 'include'
                    }
                )
                .then(res2 => res2.json())
                .then(resJson2 => {
                    console.log(resJson2, ' Response from filtered search');
                    setDogIds(resJson2.resultIds);
                
        })
        } else if(anyTimes >= 0){
            const url = `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${sortOn}`;
            fetch(url,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/JSON'
                        },
                       
                        credentials: 'include'
                    }
                )
                .then(res2 => res2.json())
                .then(resJson2 => {
                    setDogIds(resJson2.resultIds);
                
        })
        }
    }, [selectedBreed, sortOn]);

    useEffect(() => {
        console.log(dogData, ' dog data before');
        console.log(dogIds, ' dog ids now');
        fetch(`https://frontend-take-home-service.fetch.com/dogs`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/JSON'
                        },
                        body:JSON.stringify(dogIds),
                        credentials: 'include'

                    }
                )
                .then(res2 => res2.json())
                .then(resJson2 => {
                    console.log(resJson2, ' dog data after');
                    setDogData(resJson2);

                
        })
    }, [dogIds, sortOn]);
const handleChangePageSize = (e) => {
    // when handling events such as changing a selection box or typing into a text box,
    // the handler is called with parameter e (the event) and the value is e.target.value
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
    setPage(1);
    // TODO (TASK 18): set the pageSize state variable and reset the current page to 1
  }

 
const handleChangePage = (e, newPage) => {
    // Can always go to previous page (TablePagination prevents negative pages)
    // but only fetch next page if we haven't reached the end (currently have full page of data)
    if (newPage < page || dogData.length === pageSize) {
      // Note that we set newPage + 1 since we store as 1 indexed but the default pagination gives newPage as 0 indexed
      setPage(newPage + 1);
    }
  }

const handleChange = (event) => {
    setSelectedBreed(event.target.value);
    let x = anyTimes;
    setAnyTimes(x += 1);
}

// default way to render cell
 const defaultRenderCell = (col, row) => {
     if (col.field === 'img') {
        return (
            <img 
                src={row[col.field]} 
                alt="dog" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
            />
        );
    }
    return <div>{row[col.field]}</div>;
  }

  /*  */

  function checkHead(name){
    if (name == 'Breed'){
        if(sortOn == 'asc'){
            setSortOn('desc');
        } else if(sortOn == 'desc'){
            setSortOn('asc');
        }
    }
  }


  const fetchMatch = () => {
    setFavoriteCard(true);
  };



return(
    <Container>
        {favoriteCard && <FavoriteCard dogIds={favoriteIds} handleClose={() => setFavoriteCard(false)}/>}
        <Box sx={{display:'flex'}}>
         <FormControl sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, width:'250px'}}>
                <InputLabel id="breed-select-label">Breed</InputLabel>
                <Select
                    labelId="breed-select-label"
                    id="breed-select"
                    value={selectedBreed}
                    label="Breed"
                    onChange={handleChange}
                >
                    <MenuItem value={'Any'}>Any</MenuItem>
                    {breeds && breeds.length > 0 && breeds.map((breed) => (
                        <MenuItem key={breed} value={breed}>
                            {breed}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={fetchMatch}>Match</Button>
        </Box>
            
    <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {dogColumns.map(col => <TableCell key={col.headerName} style={{cursor: col.headerName == 'Breed'? 'pointer' : 'default'}} onClick={() => checkHead(col.headerName)}>{col.headerName}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dogData.map((row, idx) => 
                    <TableRow key={idx}>
                        {
                            dogColumns.map(col=> 
                                <TableCell key={col.headerName}>
                                    {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                                </TableCell>
                            )
                        }
                    </TableRow>
                    )
                    }
                </TableBody>
                <TablePagination
                rowsPerPageOptions={rowsPerPageOptions ?? [5, 10, 25]}
                count={-1}
                rowsPerPage={pageSize}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangePageSize}
                />
            </Table>
    </TableContainer>
    </Container>
);
}