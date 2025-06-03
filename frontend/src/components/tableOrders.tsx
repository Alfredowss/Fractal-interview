import React, {useState, useEffect} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

let rows = [
  { id: 1, lastName: 'loading', firstName: 'loading', age: 35 },
]

const paginationModel = { page: 0, pageSize: 5 };


export default function BasicTable({id, orders}) {
  const router = useRouter();

	if (orders?.length != 0){
		rows = [];
		orders?.products.forEach(e=>{
			rows.push({id: e.id, firstName: e.name, lastName: 'no dispoible', age: e.price, fullName: "no disponible"})
		})
	}

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[
  			{ field: 'id', headerName: 'ID Product', width: 70 },
 			 { field: 'firstName', headerName: 'Product Name', width: 130 },
  			{ field: 'lastName', headerName: 'Quantity', width: 130 },
  			{
    field: 'age',
    headerName: 'Unit Price',
    type: 'number',
    width: 20,
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
        <Button variant="contained" size="small" color="error">Delete</Button>
      </Stack>
    ),
  }]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

