import React, { useState } from 'react';
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

const Orders = () => {
  
  const [data, setData] = useState(ordersData.map(item => ({
    ...item,
    MeasurementCBM: item.Length * item.Width * item.Height,
  })));
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [editRow, setEditRow] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
 
  

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
    const newData = data.filter((item) => item.BlockNumber !== row.BlockNumber);
    setData(newData);
    toast.success("Order Deleted Successfully");
  };

  const handleNewRow = () => {
    setNewRow({
    });
    setOpenNewRowModal(true);
  };


  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.BlockNumber === editRow.BlockNumber
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
    const newRowWithMeasurement = {
      ...newRow,
      MeasurementCBM: newRow.Length * newRow.Width * newRow.Height,
    };

    const newData = [...data, newRowWithMeasurement];
    setData(newData);
    setOpenNewRowModal(false);
  };

  const handleCardClose = () => {
    setSelectedBlock(null);
  };

  

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders" />
        <div className="text-left mt-4">
                      <Button variant="contained" onClick={handleNewRow} style={{backgroundColor:"Black", borderRadius:"12px"}}>
                        Place an order
                      </Button>
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
                    <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
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
              value={editRow.Date || ''}
              onChange={(e) => setEditRow({ ...editRow, Date: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Order Id"
              value={editRow.OrderId || ''}
              onChange={(e) => setEditRow({ ...editRow, OrderId: e.target.value })}
              fullWidth
              margin="normal"
            />
          <TextField
              label="Customer ID"
              value={editRow.CustomerId|| ''}
              onChange={(e) => setEditRow({ ...editRow, CustomerId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Customer Name"
             
              value={editRow.CustomerName ||'' }
              onChange={(e) => setEditRow({ ...editRow, CustomerName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Customer Phone Number"
              type="number"
              value={editRow.CustomerPhoneNumber ||''}
              onChange={(e) => setEditRow({ ...editRow, CustomerPhoneNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fresh"
              type="number"
              value={editRow.Fresh || ''}
              onChange={(e) => setEditRow({ ...editRow, Fresh: e.target.value })}
              fullWidth
              margin="normal"
            />
           
           <TextField
              label="Light Defect"
              type="number"
              value={editRow.LightDefect || ''}
              onChange={(e) => setEditRow({ ...editRow, LightDefect: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Defect"
              type="number"
              value={editRow.Defect || ''}
              onChange={(e) => setEditRow({ ...editRow, Defect: e.target.value })}
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

     
      </Paper>
       
           
    </div>
  );
};

export default Orders;
