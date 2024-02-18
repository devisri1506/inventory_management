import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Header } from '../components';
import {  customersGrid, customersData} from '../data/Data';
import { WidthNormal } from '@mui/icons-material';

const Customers = () => {
  const [data, setData] = useState(customersData.map(item => ({
    ...item,
  })));
  const [orderBy, setOrderBy] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [editRow, setEditRow] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [copyBillingToShipping, setCopyBillingToShipping] = useState(false);
  
  
  useEffect(() => {
    const filtered = data.filter(item => item.customerId.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    setFilteredData(filtered);
  }, [data, searchQuery]);  
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
      const sortedData = [...data].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      });
      setData(sortedData);
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
  };
  

  const handleEdit = (row) => {
    setEditRow(row);
    setOpenEditModal(true);
  };

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.customerId !== row.customerId);
    setData(newData);
    toast.success("Customer deleted Successfully");
  };

  const handleNewRow = () => {
    setNewRow({
    });
    setOpenNewRowModal(true);
  };
  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const handleNewRowModalClose = () => {
    setOpenNewRowModal(false);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
    
    item.customerId === editRow.customerId
        ? {
            ...item,
            ...editRow,
            
          }
        : item
    );
    setData(updatedData);
    setOpenEditModal(false);
    toast.success('Customer edited successfully')
  };
  const handleSaveNewRow = () => {
    // Check if all mandatory fields are filled
    if (!newRow.customerId || !newRow.customerName || !newRow.billingAddress || !newRow.shippingAddress || !newRow.customerPhone || !newRow.customerEmailId) {
      toast.error('Please fill all mandatory fields.',{
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });      
      return;
    }   
  
    const newData = [...data, newRow];
  
    // Update the state with the new data
    setData(newData);
    setOpenNewRowModal(false);
    toast.success('New Customer Created successfully'),{
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      };
    return;
  };

  const handleCardClose = () => {
    setSelectedCustomer(null);
  };

  const handleCopyBillingToShipping = () => {
    setCopyBillingToShipping(!copyBillingToShipping);
    if (!copyBillingToShipping) {
      setNewRow({ ...newRow, shippingAddress: newRow.billingAddress });
    }
  };

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" >
      <Header category="Page" title="Customers" />
        <div className="text-left mt-4 space-x-4">
                      <Button variant="contained" onClick={handleNewRow} style={{backgroundColor:'black',borderRadius:"12px"}}>
                        Add New Customer
                      </Button>
                      <TextField
            label="Search by Customer ID"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <TableContainer >
          <Table className="min-w-full" >
            <TableHead>
              <TableRow>
                {customersGrid.map((column, index) => (
                  <TableCell key={index} className="p-2 sm:p-3">
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={handleSort(column.field)}
                    >
                      {column.headerText}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell className="p-2 sm:p-3" colSpan={2}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-100">
                {customersGrid.map((column, columnIndex) => (
                  <TableCell key={columnIndex} className="p-2 sm:p-3">
                    {column.field === 'customerId' ? (
                      <span style={{ cursor: 'pointer' }}>
                        {row[column.field]}
                      </span>
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
                  <TableCell className="p-2 sm:p-3">
                    <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>                    
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => handleDelete(row)} color="error">
                      <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openEditModal} onClose={handleEditModalClose}  fullWidth >
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              label="Customer ID"
              type="text"
              value={editRow.customerId || ''}
              onChange={(e) => setEditRow({ ...editRow, customerId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Customer Name"
              value={editRow.customerName || ''}
              onChange={(e) => setEditRow({ ...editRow, customerName: e.target.value })}
              fullWidth
              margin="normal"
            />
          <TextField
              label="Organization Name"
              value={editRow.organizationName || ''}
              onChange={(e) => setEditRow({ ...editRow, organizationName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Billing Address"
              value={editRow.billingAddress ||'' }
              onChange={(e) => setEditRow({ ...editRow, billingAddress: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Shipping Address"
              value={editRow.shippingAddress ||''}
              onChange={(e) => setEditRow({ ...editRow, shippingAddress: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              type="number"
              value={editRow.customerPhone || ''}
              onChange={(e) => setEditRow({ ...editRow, customerPhone: e.target.value })}
              fullWidth
              margin="normal"
            />
           <TextField
              label="Email ID"
              type="email"
              value={editRow.customerEmailId || ''}
              onChange={(e) => setEditRow({ ...editRow, customerEmailId: e.target.value })}
              fullWidth
              margin="normal"
            />
            
            <div className="text-center mt-4">
              <Button variant="contained" onClick={handleSaveEdit} style={{backgroundColor:'black',borderRadius:"12px"}}>
                Save
              </Button>
            
            </div>
          </DialogContent>
        </Dialog>

      {/* New Row Modal */}
        <Dialog open={openNewRowModal} onClose={handleNewRowModalClose} fullWidth>
          <DialogTitle>Create New Customer

          </DialogTitle>
          <DialogContent>
            <TextField
              label="Customer ID"
              type='text'
              value={newRow.customerId || ''}
              onChange={(e) => setNewRow({ ...newRow, customerId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Customer Name"
              value={newRow.customerName || ''}
              onChange={(e) => setNewRow({ ...newRow, customerName: e.target.value })}
              fullWidth
              margin="normal"
            />
          <TextField
              label="Organization Name"
              value={newRow.organizationName || ''}
              onChange={(e) => setNewRow({ ...newRow, organizationName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Billing Address"
              value={newRow.billingAddress ||'' }
              onChange={(e) => setNewRow({ ...newRow, billingAddress: e.target.value })}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Shipping Address"
              value={newRow.shippingAddress ||''}
              onChange={(e) => setNewRow({ ...newRow, shippingAddress: e.target.value })}
              fullWidth
              margin="normal"
            />
            <div style={{ marginTop: '10px' }}>
              <input
                type="checkbox"
                checked={copyBillingToShipping}
                onChange={handleCopyBillingToShipping}
              />
              <label style={{ marginLeft: '5px' }}>Same as billing address</label>
            </div>
            <TextField
              label="Phone Number"
              type="number"
              value={newRow.customerPhone || ''}
              onChange={(e) => setNewRow({ ...newRow, customerPhone: e.target.value })}
              fullWidth
              margin="normal"
            />
           
           <TextField
              label="Email ID"
              type="email"
              value={newRow.customerEmailId || ''}
              onChange={(e) => setNewRow({ ...newRow, customerEmailId: e.target.value })}
              fullWidth
              margin="normal"
            />

            <div className="text-center mt-4">
              <Button variant="contained" onClick={handleSaveNewRow} style={{backgroundColor:'black',borderRadius:"12px"}}>
                Save
              </Button>
            
            </div>
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
};

export default Customers;
