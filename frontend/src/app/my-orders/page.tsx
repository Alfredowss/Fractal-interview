'use client';

import React, {useState, useEffect} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


let rows = [
  { id: 0, lastName: 'loading', firstName: 'loading', age: 65 },
  { id: 1, lastName: 'loading', firstName: 'loading', age: 65 },
  { id: 2, lastName: 'loading', firstName: 'loading', age: 65 },
  { id: 3, lastName: 'loading', firstName: 'loading', age: 65 },
];



const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {

 const [orders, setOrders] = useState()

 const performDelete = (e)=>{
	let id= e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id')
	fetch(`${API_URL}/api/orders/${id}/`, {
  		method: 'DELETE',
		headers: {
   			 'Content-Type': 'application/json',
  		}
	}).then(response => {
    if (response.ok) {
      console.log('Product successfully removed from order');
      
      setOrders(prevProducts => prevProducts.filter(product => product.id != id));
    } else {
      return response.json().then(data => {
        throw new Error(data.error || 'Failed to delete');
      });
    }
  })
 }	


  const router = useRouter();
  useEffect(()=>{
  	fetch(`${API_URL}/api/orders/`)
	.then(res=> res.json())
	.then(data=>{
		rows = []
		data.forEach(e=>{
		   rows.push({id: e.id, lastName: e.date, firstName: e.id, age: e.products.length, fullName: "no disponible"}) 
		})

		setOrders(rows)
	}).catch(()=>{setOrders(rows)})
  }, [])

  return (
  <main style={{width: '100%', display:'flex', justifyContent: 'center'}}>
  <section style={{width: "80vw"}}>
    <h1>Orders list</h1>	
    <br/>
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={[
  			{ field: 'id', headerName: 'ID', width: 70 },
 			 { field: 'firstName', headerName: 'Order #', width: 130 },
  			{ field: 'lastName', headerName: 'date', width: 130 },
  			{
    field: 'age',
    headerName: '# Products',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Final price',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
  },
  {
    field: 'actions',
    headerName: 'Options',
    width: 180,
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" size="small" onClick={(e)=>router.push(`add-order/${e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id')}`)}>Edit</Button>
        <Button variant="contained" size="small"onClick={(e)=>performDelete(e)} color="error">Delete</Button>
      </Stack>
    ),
  }]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
   </section>
  </main>  
  );
}

