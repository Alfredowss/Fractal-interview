"use client"

import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Table from '@/components/table.tsx';
import TableOrders from '@/components/tableOrders.tsx';
import TableModal from '@/components/tablemodal.tsx';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
	
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Params {
  params: {
    id: string;
  };
}


export default function Home({params}: Params){


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = React.use(params)
  const [products, setProducts] = useState([])
	
	useEffect(()=>{
		 fetch(`${API_URL}/api/products/`)
      		.then(res => res.json())
		.then(data=>setProducts(data))
	}, [])


	return (
	<div>
	<main style={{width: '80%', display: 'flex', justifyContent: 'center'}}>
	<section style={{width: '40%'}}>
	<h1>Add a new product</h1>
	<br/>
	 <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id=""
          label="Order"
          defaultValue=""
        />
        <TextField
	  disabled
          id=""
          label="Date"
          defaultValue=""
        />
      </div>
      <div>
        <TextField
	  disabled
          id=""
          label="# Products"
          defaultValue=""
          variant="filled"
        />
        <TextField
	  disabled
          id=""
          label="Final Price"
          defaultValue=""
          variant="filled"
        />
      </div>
      <br/>
      <div>
    	<Button onClick={handleOpen} variant="contained" color="success">
  		add product
    	</Button>
      </div>
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
		<TableModal />
	</Box>
      </Modal>
    <br/>
    <br/>
    <br/>
    <Stack direction="row" spacing={2}>
    <Button variant="contained" disabled color="success">
  	add / edit
    </Button>
    <Button variant="outlined" color="error">
  	cancel
    </Button>
    </Stack>
    </section>

    <section style={{width: '40%', display: 'flex', justifyContent: 'center'}}>
    <div>
    	<h1> Order products </h1>
	<TableOrders id={id}/>	
    </div>
    <br/>
    <br/>

    </section>
    <br/>
    </main>
    <div style={{width: '80%', display: 'flex', justifyContent: 'center'}}>
    <section style={{width: '40%', display: 'flex', justifyContent: 'center'}}>
    </section>
    <br/>
    <br/>
    <br/>
    <section style={{width: '40%', display: 'flex', justifyContent: 'center'}}>
    <div>
    	<h1> Available products </h1>
	<Table rows={products} />	
    </div>
    </section>
    </div>
    </div>
	)
}
