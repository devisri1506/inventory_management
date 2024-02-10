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
import { blocksGrid, slabData, slabsGrid, blocksData} from '../data/Data';
import { WidthNormal } from '@mui/icons-material';

const Blocks = () => {
  const [editSlabRow, setEditSlabRow] = useState({});
  const [openEditSlabModal, setOpenEditSlabModal] = useState(false);
  const [openNewSlabRowModal, setOpenNewSlabRowModal] = useState(false);
  const [newSlabRow, setNewSlabRow] = useState({});
  const [data, setData] = useState(blocksData.map(item => ({
    ...item,
    MeasurementCBM: item.Length * item.Width * item.Height,
  })));
  const [orderBy, setOrderBy] = useState('');
  const [slabsOrderBy, setSlabsOrderBy] = useState('');
const [slabsOrder, setSlabsOrder] = useState('asc');

  const [order, setOrder] = useState('asc');
  const [editRow, setEditRow] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedBlockSlabs, setSelectedBlockSlabs] = useState([]);
  

  const handleSort = (property, isBlocksTable = true) => () => {
    if (isBlocksTable) {
      const isAsc = orderBy === property && order === 'asc';
      const sortedData = [...data].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      });
      setData(sortedData);
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    } else {
      const isAsc = slabsOrderBy === property && slabsOrder === 'asc';
      const sortedSlabs = [...selectedBlockSlabs].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      });
      setSelectedBlockSlabs(sortedSlabs);
      setSlabsOrder(isAsc ? 'desc' : 'asc');
      setSlabsOrderBy(property);
    }
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
    setNewRow({
    });
    setOpenNewRowModal(true);
  };

  const handleBlockClick = (row) => {
    setSelectedBlock(row);
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
      item.BlockNumber === editRow.BlockNumber
        ? {
            ...item,
            ...editRow,
            MeasurementCBM: editRow.Length * editRow.Width * editRow.Height,
          }
        : item
    );
    setData(updatedData);
    setOpenEditModal(false);
  };

  const handleSaveNewRow = () => {
    // Check if all mandatory fields are filled
    if (!newRow.BlockNumber || !newRow.Length || !newRow.Width || !newRow.Height) {
      alert('Please fill all mandatory fields.');
      return;
    }
  
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

  const handleEditSlab = (row) => {
    setEditSlabRow(row);
    setOpenEditSlabModal(true);
  };
  
  const handleDeleteSlab = (row) => {
    const newSlabData = selectedBlockSlabs.filter((slab) => slab.SlabNumber !== row.SlabNumber);
    setSelectedBlockSlabs(newSlabData);
  };

  const handleNewSlabRow = () => {
    setNewSlabRow({
      Date: '',
      SlabNumber: '',
      BlockNumber: '',
      Length: '',
      Breadth: '',
      Type: 'Fresh',
      Status: 'Pending',
      StatusBg: '#FB9678',
    });
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
      slab.SlabNumber === editSlabRow.SlabNumber
        ? {
            ...slab,
            ...editSlabRow,
            MeasurementSQFT: editSlabRow.Length * editSlabRow.Breadth,
          }
        : slab
    );
    setSelectedBlockSlabs(updatedSlabData);
    setOpenEditSlabModal(false);
  };
  


  const handleSaveNewSlabRow = () => {
    // Check if all mandatory fields are filled
    if (
      !newSlabRow.Date ||
      !newSlabRow.SlabNumber ||
      !newSlabRow.BlockNumber ||
      !newSlabRow.Length ||
      !newSlabRow.Breadth
    ) {
      alert('Please fill all mandatory fields.');
      return;
    }
  
    const newSlabRowWithMeasurement = {
      ...newSlabRow,
      MeasurementSQFT: newSlabRow.Length * newSlabRow.Breadth,
    };
  
    const newSlabData = [...selectedBlockSlabs, newSlabRowWithMeasurement];
    setSelectedBlockSlabs(newSlabData);
    setOpenNewSlabRowModal(false);
  };
  

  

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Blocks" />
        <div className="text-left mt-4">
                      <Button variant="contained" onClick={handleNewRow} style={{backgroundColor:'black',borderRadius:"12px"}}>
                        Add Block
                      </Button>
        </div>
        <TableContainer >
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                {blocksGrid.map((column, index) => (
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
                  {blocksGrid.map((column, columnIndex) => (
                    <TableCell key={columnIndex} className="p-2 sm:p-3"onClick={() => handleBlockClick(row)}>
                      {column.field === 'BlockNumber' ? (
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
                    <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openEditModal} onClose={handleEditModalClose}  fullWidth >
          <DialogTitle>Edit Block</DialogTitle>
          <DialogContent>
            {editRow &&
              blocksGrid.map((column, columnIndex) => (
                <div key={columnIndex}>
                  {column.field === 'Status' ? (
                    <div>
                      <label>Status:</label>
                      <Select
                        value={editRow.Status}
                        onChange={(e) => setEditRow({ ...editRow, Status: e.target.value })}
                        fullWidth
                      >
                        <MenuItem value="Cutting">Cutting</MenuItem>
                        <MenuItem value="Polishing">Polishing</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
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
            <div className="text-center mt-4">
            <Button variant="contained" onClick={handleSaveEdit} style={{backgroundColor:'black',borderRadius:"12px"}}>
              Save
            </Button>
            </div>
          </DialogContent>
        </Dialog>

      {/* New Row Modal */}
        <Dialog open={openNewRowModal} onClose={handleNewRowModalClose} fullWidth>
          <DialogTitle>Create New Block

          </DialogTitle>
          <DialogContent>
            {blocksGrid.map((column, columnIndex) => (
              <div key={columnIndex}>
                {column.field === 'Status' ? (
                  <div>
                    <label>Status:</label>
                    <Select
                      value={newRow.Status || ''}
                      onChange={(e) => setNewRow({ ...newRow, Status: e.target.value })}
                      fullWidth
                    >
                      <MenuItem value="Cutting">Cutting</MenuItem>
                      <MenuItem value="Polishing">Polishing</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </div>
                ) : (
                  <TextField
                    label={column.headerText}
                    value={newRow[column.field] || ''}
                    onChange={(e) => setNewRow({ ...newRow, [column.field]: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                )}
              </div>
            ))}
            <div className="text-center mt-4">
            <Button variant="contained" onClick={handleSaveNewRow} style={{backgroundColor:'black',borderRadius:"12px"}} >
              Save
            </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Paper>
        <Dialog open={!!selectedBlock} onClose={handleCardClose} maxWidth="xl" fullWidth>
          <DialogTitle>Slab Details</DialogTitle>
          <DialogContent>
            {selectedBlock && (
              <Card>
                <CardContent>
                  <div>
                    <TableContainer id="slabs-table-container">
                      <Table>
                        <TableHead>
                          <TableRow>
                            {slabsGrid.map((column, index) => (
                             <TableCell key={index} className="p-2 sm:p-3">
                             <TableSortLabel
                               active={slabsOrderBy === column.field}
                               direction={slabsOrderBy === column.field ? slabsOrder : 'asc'}
                               onClick={handleSort(column.field,false)}
                             >
                               {column.headerText}
                             </TableSortLabel>
                           </TableCell>
                            ))}
                            <TableCell colSpan={2}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {selectedBlockSlabs.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {slabsGrid.map((column, columnIndex) => (
                              <TableCell key={columnIndex}>
                                {column.field === 'MeasurementSQFT' ? (
                                  <span>{(row.Length * row.Breadth).toFixed(2)}</span>
                                ) : (
                                  row[column.field]
                                )}
                              </TableCell>
                            ))}
                            <TableCell>
                              <IconButton aria-label="edit" onClick={() => handleEditSlab(row)}>
                                <EditIcon />
                              </IconButton>
                              
                            </TableCell>
                            <TableCell><IconButton aria-label="delete" onClick={() => handleDeleteSlab(row)}>
                                <DeleteIcon />
                              </IconButton></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                      </Table>
                    </TableContainer>


                    <div className="text-center mt-4">
                      <Button variant="contained" onClick={handleNewSlabRow} style={{backgroundColor:'black', borderRadius:"12px"}}>
                        Add Slab
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={openEditSlabModal} onClose={handleEditSlabModalClose} fullWidth> 
          <DialogTitle>Edit Slab</DialogTitle>
          <DialogContent>
            <TextField
              label="Date"
              value={editSlabRow.Date || ''}
              onChange={(e) => setEditSlabRow({ ...editSlabRow, Date: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Slab Number"
              value={editSlabRow.SlabNumber || ''}
              onChange={(e) => setEditSlabRow({ ...editSlabRow, SlabNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
          

            <TextField
              label="Length"
              value={editSlabRow.Length}
              onChange={(e) => setEditSlabRow({ ...editSlabRow, Length: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Breadth"
              value={editSlabRow.Breadth}
              onChange={(e) => setEditSlabRow({ ...editSlabRow, Breadth: e.target.value })}
              fullWidth
              margin="normal"
            />
           <label>Type</label>
            <Select
              
              value={editSlabRow.Type || 'Fresh'}
              onChange={(e) => setEditSlabRow({ ...editSlabRow, Type: e.target.value })}
              fullWidth
            >
              <MenuItem value="Fresh">Fresh</MenuItem>
              <MenuItem value="Defect">Defect</MenuItem>
              <MenuItem value="LightDefect">Light Defect</MenuItem>
            </Select>
            <label htmlFor="">Status</label>
            <Select
              label="Status"
              value={editSlabRow.Status || 'Pending'}
              onChange={(e) => setEditSlabRow({ ...editSlabRow, Status: e.target.value })}
              fullWidth
            >
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="InSales">In Sales</MenuItem>
              
            </Select>
            <div className="text-center mt-4">
              <Button variant="contained" onClick={handleSaveEditSlab} style={{backgroundColor:'black',borderRadius:"12px"}}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openNewSlabRowModal} onClose={handleNewSlabRowModalClose} fullWidth>
          <DialogTitle>Create New Slab</DialogTitle>
          <DialogContent>
            <TextField
              label="Date"
              value={newSlabRow.Date || ''}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, Date: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Slab Number"
              value={newSlabRow.SlabNumber || ''}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, SlabNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Block Number"
              value={newSlabRow.BlockNumber}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, BlockNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Length"
              value={newSlabRow.Length}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, Length: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Breadth"
              value={newSlabRow.Breadth}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, Breadth: e.target.value })}
              fullWidth
              margin="normal"
            />
           <label>Type</label>
            <Select
              
              value={newSlabRow.Type || 'Fresh'}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, Type: e.target.value })}
              fullWidth
            >
              <MenuItem value="Fresh">Fresh</MenuItem>
              <MenuItem value="Defect">Defect</MenuItem>
              <MenuItem value="LightDefect">Light Defect</MenuItem>
            </Select>
            <label htmlFor="">Status</label>
            <Select
              label="Status"
              value={newSlabRow.Status || 'Pending'}
              onChange={(e) => setNewSlabRow({ ...newSlabRow, Status: e.target.value })}
              fullWidth
            >
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="InSales">In Sales</MenuItem>
              
            </Select>
            <div className="text-center mt-4">
              <Button variant="contained" onClick={handleSaveNewSlabRow} style={{backgroundColor:'black',borderRadius:"12px"}}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
                    
    </div>
  );
};

export default Blocks;