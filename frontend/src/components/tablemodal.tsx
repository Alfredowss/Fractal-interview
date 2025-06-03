import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({products, id, setProducts}) {

  const [age, setAge] = React.useState('none');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

 const handleClick = (e)=>{
	fetch(`${API_URL}/api/orders/${id}/products/`, {
   		 method: 'POST',
    		headers: {
      			'Content-Type': 'application/json',
    		},
    		body: JSON.stringify({ product_id:  age})
  		}		
	)
	.then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error || 'Something went wrong');
        });
      }
      return response.json();
    })
    .then((data) => {
     alert("added correclty")
    })
    .catch((error) => {
      alert('Error adding product:');
    });
 }

  return (
  	<main>
	<h2>Add product </h2>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Product"
          onChange={handleChange}
        >
	  {products.map((e)=>{
		return(
			<MenuItem value={e.id}>{e.name}</MenuItem>
		)
	  })}
        </Select>
      </FormControl>
      <br/>
      <br/>
      <br/>
      <Stack>
      <Button onClick={handleClick}>Add</Button>
      </Stack>
    </Box>
       </main>
  );
}

