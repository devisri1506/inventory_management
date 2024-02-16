import React, { useState } from 'react';
import {
    Paper,
    Select,
    MenuItem,
    Autocomplete,
    Table,
    IconButton,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Header } from '../components';
import { toast } from 'react-toastify';

const NewOrder = () => {
    const [newRow, setNewRow] = useState({});
    const [slabs, setSlabs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editRow, setEditRow] = useState({});
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleCustomerSelect = (event, value) => {
        console.log(value);
    };

    const handleGstSelect = (event) => {
      setNewRow((prev) => ({
          ...prev,
          hasGST: event.target.value,
      }));
  };
  

    const handleNewSlab = () => {
        setOpenModal(true);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewRow((prev) => ({
          ...prev,
          [name]: value,
      }));
  };

    const handleFormSubmit = () => {
        const newSlab = {
            ...newRow,
            measurement: newRow.length * newRow.breadth,
        };
        setSlabs((prev) => [...prev, newSlab]);
        setNewRow({});
        setOpenModal(false);
        toast.success("Slab Created Successfully")
    };

    const handleEditRow = (slab) => {
      setEditRow(slab);
      setOpenEditModal(true);
  
    };

    const handleEditModalClose = () => {
      setOpenEditModal(false);
    };
 
  
    const handleDeleteRow = (slab) => {
      const newSlabData = slabs.filter((item) => item.slabNumber !== slab.slabNumber);
      setSlabs(newSlabData);
      toast.success("Slab deleted successfully");
    };
    const handleSaveEditSlab = () => {
      const updatedSlabData = slabs.map((slab) =>
        slab.slabNumber === editRow.slabNumber
          ? {
              ...slab,
              ...editRow,
              measurement: editRow.length * editRow.breadth,
            }
          : slab
      );
      setSlabs(updatedSlabData);
      setOpenEditModal(false);
      toast.success("Slab edited successfully")
        
        
    };

    return (
        <div className="md:w-10/12 sm:w-full mx-auto">
            <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Page" title="New Order" />
                <div>
                <div className=" flex space-x-4 ">
                  <div className='w-1/2 flex space-x-4'>
                  <TextField name="date" type="date" label="Date" variant='outlined' focused fullWidth></TextField>
                  
                  <Select
                     value={newRow.hasGST || ''}
                     onChange={handleGstSelect}
                     variant="outlined"
                     label="GST"
                     margin="normal"
                     placeholder="Select GST Status"
                     fullWidth
                  >
                      <MenuItem value="GST">GST</MenuItem>
                      <MenuItem value="NoGST">No GST</MenuItem>
                  </Select>
                  </div>
                  <div className='w-1/2'>
                    <Autocomplete
                        options={[{ name: 'Balaji' }, { name: 'Devisri' }, { name: 'Suresh Babu' }]}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} label="Customer" variant="outlined"   fullWidth  />
                        )}
                        onChange={handleCustomerSelect}
                    />
                   </div>
                  </div>
                  <br />
                    <br />

                    <Button variant="contained" onClick={handleNewSlab} style={{ backgroundColor: 'black', borderRadius: '12px' }}>
                        Add Slab
                    </Button>

                </div>
                <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Add New Slab</DialogTitle>
                <DialogContent>
                    <TextField name="slabNumber" label="Slab Number" variant="outlined" fullWidth margin="normal" onChange={handleInputChange} value={newRow.slabNumber || ''} />
                    <TextField name="length" label="Length" type="number" variant="outlined" fullWidth margin="normal" onChange={handleInputChange} value={newRow.length || ''} />
                    <TextField name="breadth" label="Breadth" type="number" variant="outlined" fullWidth margin="normal" onChange={handleInputChange} value={newRow.breadth || ''} />
                    <label>Type</label>
                    <Select
                        name="type"
                        label="Type"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newRow.type || ''}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Fresh">Fresh</MenuItem>
                        <MenuItem value="Light Defect">Light Defect</MenuItem>
                        <MenuItem value="Defect">Defect</MenuItem>
                    </Select>
                    <br />
                    <br/>
<div className="text-center mt-4">
                    <Button variant="contained" onClick={handleFormSubmit} style={{backgroundColor:'black',borderRadius:"12px"}}>
                        Save
                    </Button>
                    </div>
                </DialogContent>
            </Dialog>
         <Dialog open={openEditModal} onClose={handleEditModalClose} fullWidth> 
          <DialogTitle>Edit Slab</DialogTitle>
          <DialogContent>
            <TextField
              label="Slab Number"
              value={editRow.slabNumber || ''}
              onChange={(e) => setEditRow({ ...editRow, slabNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
          
            <TextField
              label="Length"
              type="number"
              value={editRow.length}
              onChange={(e) => setEditRow({ ...editRow, length: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Breadth"
              type="number"
              value={editRow.breadth}
              onChange={(e) => setEditRow({ ...editRow, breadth: e.target.value })}
              fullWidth
              margin="normal"
            />
           <label>Type</label>
            <Select
              
              value={editRow.type || 'Fresh'}
              onChange={(e) => setEditRow({ ...editRow, type: e.target.value })}
              fullWidth
            >
              <MenuItem value="Fresh">Fresh</MenuItem>
              <MenuItem value="Defect">Defect</MenuItem>
              <MenuItem value="LightDefect">Light Defect</MenuItem>
            </Select>
            
            <div className="text-center mt-4">
              <Button variant="contained" onClick={handleSaveEditSlab} style={{backgroundColor:'black',borderRadius:"12px"}}>
                Save
              </Button>
            
            </div>
          </DialogContent>
        </Dialog>
            <TableContainer component={Paper} className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Slab Number</TableCell>
                            <TableCell>Length</TableCell>
                            <TableCell>Breadth</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Measurement</TableCell>
                            <TableCell align='center' colSpan={2}>Actions</TableCell>

                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slabs.map((slab, index) => (
                            <TableRow key={index}>
                                <TableCell>{slab.slabNumber}</TableCell>
                                <TableCell>{slab.length}</TableCell>
                                <TableCell>{slab.breadth}</TableCell>
                                <TableCell>{slab.type}</TableCell>
                                <TableCell>{slab.measurement}</TableCell>
                                <TableCell className="p-2 sm:p-3">
                                <IconButton aria-label="edit" onClick={() => handleEditRow(slab)}>
                                  <EditIcon />
                                </IconButton>
                    
                                </TableCell>
                                <TableCell>
                                  <IconButton aria-label="delete" onClick={() => handleDeleteRow(slab)}>
                                    <DeleteIcon />
                                  </IconButton>
                                          
                                </TableCell>
                                </TableRow>
                        ))}
                  
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            
        </div>
    );
};

export default NewOrder;
