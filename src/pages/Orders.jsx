import React, { useState } from 'react';
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
import { ordersGrid, slabData,slabsGrid, ordersData } from '../data/Block';

const Orders = () => {
  const [editSlabRow, setEditSlabRow] = useState(null);
  const [openEditSlabModal, setOpenEditSlabModal] = useState(false);
  const [openNewSlabRowModal, setOpenNewSlabRowModal] = useState(false);
  const [newSlabRow, setNewSlabRow] = useState({});
  const [data, setData] = useState(ordersData);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [editRow, setEditRow] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedBlockSlabs, setSelectedBlockSlabs] = useState([]);

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
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
  };

  const handleNewRow = () => {
    setNewRow({});
    setOpenNewRowModal(true);
  };

  const handleBlockClick = (row) => {
    setSelectedBlock(row);
    // Retrieve slabs data for the selected block from slabData
    const slabsForSelectedBlock = slabData.filter((slab) => slab.BlockNumber === row.BlockNumber);
    setSelectedBlockSlabs(slabsForSelectedBlock);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const handleNewRowModalClose = () => {
    setOpenNewRowModal(false);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.BlockNumber === editRow.BlockNumber ? { ...item, ...editRow } : item
    );
    setData(updatedData);
    setOpenEditModal(false);
  };

  const handleSaveNewRow = () => {
    const newData = [...data, newRow];
    setData(newData);
    setOpenNewRowModal(false);
  };

  const handleCardClose = () => {
    setSelectedBlock(null);
  };

  const handleEditSlab = (row) => {
    setEditSlabRow(row);
    setOpenEditSlabModal(true);
  };

  const handleDeleteSlab = (row) => {
    const newSlabData = selectedBlockSlabs.filter((slab) => slab.SlabNumber !== row.SlabNumber);
    setSelectedBlockSlabs(newSlabData);
  };

  const handleNewSlabRow = () => {
    setNewSlabRow({});
    setOpenNewSlabRowModal(true);
  };

  const handleEditSlabModalClose = () => {
    setOpenEditSlabModal(false);
  };

  const handleNewSlabRowModalClose = () => {
    setOpenNewSlabRowModal(false);
  };

  const handleSaveEditSlab = () => {
    const updatedSlabData = selectedBlockSlabs.map((slab) =>
      slab.SlabNumber === editSlabRow.SlabNumber ? { ...slab, ...editSlabRow } : slab
    );
    setSelectedBlockSlabs(updatedSlabData);
    setOpenEditSlabModal(false);
  };

  const handleSaveNewSlabRow = () => {
    const newSlabData = [...selectedBlockSlabs, newSlabRow];
    setSelectedBlockSlabs(newSlabData);
    setOpenNewSlabRowModal(false);
  };

  return (
    <div>
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders" />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {ordersGrid.map((column, index) => (
                  <TableCell key={index}>
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={handleSort(column.field)}
                    >
                      {column.headerText}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton aria-label="add" onClick={handleNewRow}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {ordersGrid.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>
                      {column.field === 'BlockNumber' ? (
                        <span onClick={() => handleBlockClick(row)} style={{ cursor: 'pointer' }}>
                          {row[column.field]}
                        </span>
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       {/* Edit Modal */}
       <Dialog open={openEditModal} onClose={handleEditModalClose}>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogContent>
            {editRow &&
              ordersGrid.map((column, columnIndex) => (
                <div key={columnIndex}>
                  {column.field === 'Status' ? (
                    <div>
                      <label>Status:</label>
                      <Select
                        value={editRow.Status}
                        onChange={(e) => setEditRow({ ...editRow, Status: e.target.value })}
                        fullWidth
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </div>
                  ) : (
                    <TextField
                      label={column.headerText}
                      value={editRow[column.field]}
                      onChange={(e) => setEditRow({ ...editRow, [column.field]: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
                  )}
                </div>
              ))}
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
          </DialogContent>
        </Dialog>

        {/* Slabs Table */}
        <Dialog open={!!selectedBlock} onClose={handleCardClose}>
          <DialogTitle>Block Details</DialogTitle>
          <DialogContent>
            {selectedBlock && (
              <Card>
                <CardContent>
                

                  {/* Table for slabs */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {slabsGrid.map((column, index) => (
                            <TableCell key={index}>{column.headerText}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedBlockSlabs.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {slabsGrid.map((column, columnIndex) => (
                              <TableCell key={columnIndex}>{row[column.field]}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
};

export default Orders;
