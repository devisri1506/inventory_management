import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
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
import {  employeesGrid, employeesData} from '../data/Data';
import { WidthNormal } from '@mui/icons-material';

const Employees = () => {
  const [data, setData] = useState(employeesData.map(item => ({
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
  const [aadharFileName, setAadharFileName] = useState('');
  
  
  useEffect(() => {
    const filtered = data.filter(item => item.employeeId.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    setFilteredData(filtered);
  }, [data, searchQuery]);  
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
    setAadharFileName(row.aadharCardPhotoName || '');
    setOpenEditModal(true);
  };

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.employeeId !== row.employeeId);
    setData(newData);
    toast.success("Employee deleted Successfully");
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
      item.employeeId === editRow.employeeId
        ? { ...item, ...editRow, aadharCardPhotoName: aadharFileName }
        : item
    );
    setData(updatedData);
    setOpenEditModal(false);
    toast.success('Employee edited successfully');
  };
  
  const handleSaveNewRow = () => {
    // Check if all mandatory fields are filled
    if (!newRow.employeeId || !newRow.employeeName || !newRow.designation || !newRow.aadharCardNumber || !newRow.aadharCardPhoto|| !newRow.employeePhone) {
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
  
    const newData = [...data, { ...newRow, aadharCardPhotoName: aadharFileName }];
  
    // Update the state with the new data
    setData(newData);
    setOpenNewRowModal(false);
    toast.success('New Employee Created successfully'),{
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
    setSelectedEmployee(null);
  };

 

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" >
      <Header category="Page" title="Employees" />
        <div className="text-left mt-4 space-x-4">
                      <Button variant="contained" onClick={handleNewRow} style={{backgroundColor:'black',borderRadius:"12px"}}>
                        Add New Employee
                      </Button>
                      <TextField
            label="Search by Employee ID"
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
                {employeesGrid.map((column, index) => (
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
                {employeesGrid.map((column, columnIndex) => (
                  <TableCell key={columnIndex} className="p-2 sm:p-3">
                    {column.field === 'employeeId' ? (
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
          <DialogTitle>Edit Employee
          <IconButton
      aria-label="close"
      onClick={handleEditModalClose}
      style={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Employee ID"
              type="text"
              value={editRow.employeeId || ''}
              onChange={(e) => setEditRow({ ...editRow, employeeId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employee Name"
              value={editRow.employeeName || ''}
              onChange={(e) => setEditRow({ ...editRow, employeeName: e.target.value })}
              fullWidth
              margin="normal"
            />
          <TextField
              label="Designation"
              value={editRow.designation || ''}
              onChange={(e) => setEditRow({ ...editRow, designation: e.target.value })}
              fullWidth
              margin="normal"
            />
             <TextField
              label="Aadhar Card Number"
              type="number"
              value={editRow.aadharCardNumber || ''}
              onChange={(e) => setEditRow({ ...editRow, aadharCardNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <label >Aadhar Card Photo</label>
              <input
              type="file"
              accept="image/*"
              
              onChange={(e) => handleFileChange(e, (base64) => setEditRow({ ...editRow, aadharCardPhoto: base64 }))}
              fullWidth
              margin="normal"
            />
            
            {aadharFileName && <p>{aadharFileName}</p>}
            <TextField
              label="Phone Number"
              type="number"
              value={editRow.employeePhone || ''}
              onChange={(e) => setEditRow({ ...editRow, employeePhone: e.target.value })}
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
          <DialogTitle>Create New Employee
          <IconButton
      aria-label="close"
      onClick={handleNewRowModalClose}
      style={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Employee ID"
              type='text'
              value={newRow.employeeId || ''}
              onChange={(e) => setNewRow({ ...newRow, employeeId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employee Name"
              value={newRow.employeeName || ''}
              onChange={(e) => setNewRow({ ...newRow, employeeName: e.target.value })}
              fullWidth
              margin="normal"
            />
          <TextField
              label="Designation"
              value={newRow.designation || ''}
              onChange={(e) => setNewRow({ ...newRow, designation: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Aadhar Card Number"
              type="number"
              value={newRow.aadharCardNumber || ''}
              onChange={(e) => setNewRow({ ...newRow, aadharCardNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <label >Aadhar Card Photo</label>
             <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, (base64) => setNewRow({ ...newRow, aadharCardPhoto: base64 }))}
              fullWidth
              margin="normal"
            />
            {aadharFileName && <p>{aadharFileName}</p>}
            
            <TextField
              label="Phone Number"
              type="number"
              value={newRow.employeePhone || ''}
              onChange={(e) => setNewRow({ ...newRow, employeePhone: e.target.value })}
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

export default Employees;
