"use client"

import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TableOrders from '@/components/tableOrders.tsx';
import Table from '@/components/table.tsx';
import TableModal from '@/components/tablemodal.tsx';
	
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
  const [orders, setOrders] = useState([])
	
	useEffect(()=>{
		async function fetchData(){
		try{
			const [res1, res2] = await Promise.all([
          			fetch('http://localhost:8000/api/products/'),
          			fetch(`http://localhost:8000/api/orders/${id}`)]);

		        const [json1, json2] = await Promise.all([
          			res1.json(),
          			res2.json(),
       			 ]);

        		setProducts(json1);
			setOrders(json2)
		}catch(e){
			console.log(e)
		}
		}
		fetchData()

	}, [])


	return (<div>
	<main style={{width: '80%', display: 'flex', justifyContent: 'center'}}>
	<section style={{width: '40%'}}>
	<h1>Edit order</h1>
	<br/>
	 <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
	  disabled
          id=""
          label="Order"
          defaultValue={id}
        />
        <TextField
	  disabled
          id=""
          label="Date"
          defaultValue={new Date()}
        />
      </div>
      <div>
        <TextField
	  disabled
          id=""
          defaultValue={orders?.products?.length || "none"}
        />
        <TextField
	  disabled
          id=""
          label="not available"
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
		<TableModal products={products} id={id} state={setProducts}/>
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
    	<h1> Order Products </h1>
	<TableOrders id={id} orders={orders}/>	
    </div>
    </section>
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
