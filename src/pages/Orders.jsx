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
import { ordersGrid,ordersData} from '../data/Data';
import { useNavigate, NavLink } from "react-router-dom";

const Orders = () => {
  
  const [data, setData] = useState(ordersData.map(item => ({
    ...item,
  })));
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = data.filter(item => item.orderId.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
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
    const newData = data.filter((item) => item.orderId !== row.orderId);
    setData(newData);
    toast.success("Order Deleted Successfully");
  };

  const handleNewRow = () => {
    navigate("/new-order", { replace: true });
  };


  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.orderId === editRow.orderId
        ? {
            ...item,
            ...editRow,
          }
        : item
    );
    setData(updatedData);
    setOpenEditModal(false);
    toast.success("Order Edited Successfully");
  };

  const handleSaveNewRow = () => {
    
    const newData = [...data, newRow];
    setData(newData);
    setOpenNewRowModal(false);
  };

  const handleCardClose = () => {
    setSelectedOrder(null);
  };

  

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders" />
        <div className="text-left mt-4 space-x-4">
                      <Button variant="contained" onClick={handleNewRow} style={{backgroundColor:"Black", borderRadius:"12px"}}>
                        Place an order
                      </Button>
                      <TextField
            label="Search by Order ID"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <TableContainer >
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                {ordersGrid.map((column, index) => (
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
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-100">
                  {ordersGrid.map((column, columnIndex) => (
                    <TableCell key={columnIndex} className="p-2 sm:p-3">
                     {row[column.field]}
                    </TableCell>
                  ))}
                  <TableCell className="p-2 sm:p-3">
                    <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openEditModal} onClose={handleEditModalClose} className="text-center">
          <DialogTitle>Edit Order</DialogTitle>
          <DialogContent>
            <TextField
              label="Date"
              type='date'
              value={editRow.entryDate || ''}
              onChange={(e) => setEditRow({ ...editRow, entryDate: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Order Id"
              value={editRow.orderId || ''}
              onChange={(e) => setEditRow({ ...editRow, orderId: e.target.value })}
              fullWidth
              margin="normal"
            />
          
            <TextField
              label="Customer Name"
             
              value={editRow.customerName ||'' }
              onChange={(e) => setEditRow({ ...editRow, customerName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Customer Phone Number"
              type="number"
              value={editRow.customerPhoneNumber ||''}
              onChange={(e) => setEditRow({ ...editRow, customerPhoneNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fresh"
              type="number"
              value={editRow.fresh || ''}
              onChange={(e) => setEditRow({ ...editRow, fresh: e.target.value })}
              fullWidth
              margin="normal"
            />
           
           <TextField
              label="Light Defect"
              type="number"
              value={editRow.lightDefect || ''}
              onChange={(e) => setEditRow({ ...editRow, lightDefect: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Defect"
              type="number"
              value={editRow.defect || ''}
              onChange={(e) => setEditRow({ ...editRow, defect: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Select
              label="Status"
              value={editRow.status || 'Pending'}
              onChange={(e) => setEditRow({ ...editRow, status: e.target.value })}
              fullWidth
              margin='normal'
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Loading">Loading</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              
            </Select>
            <div className="text-center mt-4">
              <Button variant="contained" onClick={handleSaveEdit} style={{backgroundColor:'black',borderRadius:"12px"}}>
                Save
              </Button>
            
            </div>
          </DialogContent>
        </Dialog>

     
      </Paper>
       
           
    </div>
  );
};

export default Orders;
