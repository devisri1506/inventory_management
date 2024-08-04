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
import { markingBlocksData, markingBlocksGrid, markingsData, markingsGrid} from '../data/Data';
import { WidthNormal } from '@mui/icons-material';

const Marking = () => {
  const [editBlockRow, setEditBlockRow] = useState({});
  const [openEditBlockModal, setOpenEditBlockModal] = useState(false);
  const [openNewBlockRowModal, setOpenNewBlockRowModal] = useState(false);
  const [newBlockRow, setNewBlockRow] = useState({});

  const [data, setData] = useState(markingsData.map(item => ({
    ...item,
  })));
  const [markingId, setmarkingId]=useState("");
  const [orderBy, setOrderBy] = useState('');
  const [blocksOrderBy, setBlocksOrderBy] = useState("");
  const [blocksOrder, setBlocksOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlockData, setFilteredBlockData] = useState([]);
  const [searchBlockQuery, setSearchBlockQuery] = useState("");
  const [order, setOrder] = useState('asc');
  const [editRow, setEditRow] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [selectedMarking, setSelectedMarking] = useState(null);
  const [selectedMarkingBlocks, setSelectedMarkingBlocks] = useState([]);
  
  useEffect(() => {
    if (selectedMarkingBlocks == null) {
      return;
    }
    const filtered = selectedMarkingBlocks.filter((item) =>
      String(item.blockId).toLowerCase().includes(searchBlockQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [selectedMarkingBlocks, searchBlockQuery]);

  const handleSearchBlock = (e) => {
    setSearchBlockQuery(e.target.value);
  };
  
  useEffect(() => {
    if (data == null) {
      return;
    }
    const filtered = data.filter(item => item.markingId.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    setFilteredData(filtered);
  }, [data, searchQuery]);  
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort =
  (property, isMarkingsTable = true) =>
  () => {
    if (isMarkingsTable) {
      const isAsc = orderBy === property && order === "asc";
      const sortedData = [...data].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      });
      setData(sortedData);
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    } else {
      const isAsc = blocksOrderBy === property && blocksOrder === "asc";
      const sortedSlabs = [...selectedMarkingBlocks].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      });
      setSelectedMarkingBlocks(sortedSlabs);
      setBlocksOrder(isAsc ? "desc" : "asc");
      setBlocksOrderBy(property);
    }
  };
  

  const handleEdit = (row) => {
    setEditRow(row);
    setOpenEditModal(true);
  };

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.markingId !== row.markingId);
    setData(newData);
    toast.success("Marking deleted Successfully");
  };

  const handleNewRow = () => {
    setNewRow({
    });
    setOpenNewRowModal(true);
  };

  const handleMarkingClick = (row) => {
    setSelectedMarking(row);
    const blocksForSelectedMarking = markingBlocksData.filter(
      (block) => block.markingId === row.markingId
    );
    setmarkingId(row.markingId);
    setSelectedMarkingBlocks(blocksForSelectedMarking);
    
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const handleNewRowModalClose = () => {
    setOpenNewRowModal(false);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
    
    item.markingId === editRow.markingId
        ? {
            ...item,
            ...editRow,
            
          }
        : item
    );
    setData(updatedData);
    setOpenEditModal(false);
    toast.success('Marking edited successfully')
  };
  const handleSaveNewRow = () => {
    // Check if all mandatory fields are filled
    if (!newRow.markingId || !newRow.quarryName ) {
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
    toast.success('New Marking Created successfully'),{
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
    setSelectedMarking(null);
  };
  const handleEditBlock = (row) => {
    setEditBlockRow(row);
    setOpenEditBlockModal(true);
  };

  const handleDeleteBlock = (row) => {
    const newBlockData = selectedMarkingBlocks.filter((item) => item.blockId !== row.blockId);
    setSelectedMarkingBlocks(newBlockData);
    toast.success("Marking deleted Successfully");
  };

  const handleNewBlockRow = () => {
    setNewBlockRow({
      entryDate:"01-06-2023",
           blockId:"",
           markingId:"",
           quarryId:"",
           grossLength:"",
           grossWidth:"",
           grossHeight:"",
           status:"Marked"
    });
    setOpenNewBlockRowModal(true);
  };

  const handleEditBlockModalClose = () => {
    setOpenEditBlockModal(false);
  };

  const handleNewBlockRowModalClose = () => {
    setOpenNewBlockRowModal(false);
  };

  const handleSaveEditBlock = () => {
    const updatedBlockData = selectedMarkingBlocks.map((block) =>
    
    block.blockId === editBlockRow.blockId
        ? {
            ...item,
            ...editRow,
            blockMeasurement:(editBlockRow.grossLength * editBlockRow.grossWidth * editBlockRow.grossHeight/1000000).toFixed(3),
          }
        : item
    );
    setBlockData(updatedBlockData);
    setOpenEditBlockModal(false);
    toast.success('Block edited successfully')
  };

  const handleSaveNewBlockRow = () => {
    // Check if all mandatory fields are filled
    if (!newBlockRow.grossLength || !newBlockRow.grossWidth || !newBlockRow.grossHeight) {
      toast.error("Please fill all mandatory fields.", {
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

    const newBlockRowWithoutDate = Object.fromEntries(
      Object.entries(newBlockRow).filter(
        ([key]) => key !== "entryDate" && key !== "blockId"
      )
    );
    const newBlockRowWithMeasurement = {
      ...newBlockRow,
      blockMeasurement: (newBlockRow.length * newBlockRow.width * newBlockRow.height/1000000).toFixed(3),
    };

    const newBlockRowWithMeasurementWithoutDate = {
      ...newBlockRowWithoutDate,
      blockMeasurement: (newBlockRow.length * newBlockRow.width * newBlockRow.height/1000000).toFixed(3),
    };

    const newBlockData = [...selectedMarkingBlocks, newBlockRow];
  
    // Update the state with the new data
    setData(newBlockData);
    setOpenNewRowModal(false);
    toast.success('New Block Created successfully'),{
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

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) {
      return "";
    }
    const date = new Date(dateTimeString);
    return date.toISOString().split("T")[0]; // Extracts date part (YYYY-MM-DD)
  };

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" >
      <Header category="Page" title="Markings" />
        <div className="text-left mt-4 space-x-4">
                      <Button variant="contained" onClick={handleNewRow} style={{backgroundColor:'black',borderRadius:"12px"}}>
                        Add New Marking
                      </Button>
                      <TextField
            label="Search by Marking ID"
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
                {markingsGrid.map((column, index) => (
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
                {markingsGrid.map((column, columnIndex) => (
                  <TableCell key={columnIndex} className="p-2 sm:p-3"
                  onClick={() => handleMarkingClick(row)}>
                  {column.field === "entryDate" ? (
                        <span>{formatDate(row.entryDate)}</span>
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
          <DialogTitle>Edit Marking
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
              label="Marking ID"
              type="text"
              value={editRow.markingId || ''}
              onChange={(e) => setEditRow({ ...editRow, markingId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quarry Name"
              value={editRow.quarryName || ''}
              onChange={(e) => setEditRow({ ...editRow, quarryName: e.target.value })}
              fullWidth
              margin="normal"
            />
          <TextField
              label="Measurement"
              type='number'
              value={editRow.totalMeasurement}
              onChange={(e) => setEditRow({ ...editRow, totalMeasurement: e.target.value })}
              fullWidth
              margin="normal"
              disabled
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
          <DialogTitle>Create New Marking
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
              label="Marking ID"
              type='text'
              value={newRow.markingId || ''}
              onChange={(e) => setNewRow({ ...newRow, markingId: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quarry Name"
              value={newRow.quarryName || ''}
              onChange={(e) => setNewRow({ ...newRow, quarryName: e.target.value })}
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

      <Dialog
        open={!!selectedMarking}
        onClose={handleCardClose}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Block Details</DialogTitle>
        <div className="text-left ml-6 ">
          <TextField
            label="Search by Block Number"
            variant="outlined"
            size="small"
            value={searchBlockQuery}
            onChange={handleSearchBlock}
            bold
          />
        </div>
        <DialogContent>
          {selectedMarking && (
            <Card>
              <CardContent>
                <div>
                  <TableContainer id="slabs-table-container">
                    <Table>
                      <TableHead>
                        <TableRow>
                          {markingBlocksGrid.map((column, index) => (
                            <TableCell key={index} className="p-2 sm:p-3">
                              <TableSortLabel
                                active={blocksOrderBy === column.field}
                                direction={
                                  blocksOrder === column.field
                                    ? blocksOrder
                                    : "asc"
                                }
                                onClick={handleSort(column.field, false)}
                              >
                                {column.headerText}
                              </TableSortLabel>
                            </TableCell>
                          ))}
                          <TableCell colSpan={2}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBlockData.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {markingBlocksGrid.map((column, columnIndex) => (
                              <TableCell key={columnIndex}>
                                
                                {column.field === "entryDate" ? (
                        <span>{formatDate(row.entryDate)}</span>
                          ) : (
                                  row[column.field]
                                )}
                              </TableCell>
                            ))}
                            <TableCell>
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEditBlock(row)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteBlock(row)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      onClick={handleNewBlockRow}
                      style={{ backgroundColor: "black", borderRadius: "12px" }}
                    >
                      Add Block
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditBlockModal}
        onClose={handleEditBlockModalClose}
        fullWidth
      >
       <DialogTitle>
    Edit Block
    <IconButton
      aria-label="close"
      onClick={handleEditBlockModalClose}
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
            label="Date"
            type="date"
            value={editBlockRow.entryDate || ""}
            onChange={(e) =>
            setEditBlockRow({ ...editBlockRow, entryDate: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Block Number"
            value={editBlockRow.blockId || ""}
            onChange={(e) =>
              setEditBlockRow({ ...editBlockRow, blockId: e.target.value })
            }
            fullWidth
            margin="normal"
            
          />

      <TextField
            label="Quarry ID"
            value={editBlockRow.quarryId || ""}
            onChange={(e) =>
              setEditBlockRow({ ...editBlockRow, quarryId: e.target.value })
            }
            fullWidth
            margin="normal"
            
          />

          <TextField
            label="Gross Length"
            type="number"
            value={editBlockRow.grossLength}
            onChange={(e) =>
              setEditBlockRow({ ...editBlockRow, grossLength: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gross Breadth"
            type="number"
            value={editBlockRow.grossWidth}
            onChange={(e) =>
              setEditBlockRow({ ...editBlockRow, grossWidth: e.target.value })
            }
            fullWidth
            margin="normal"
          />
           <TextField
            label="Gross Height"
            type="number"
            value={editBlockRow.grossHeight}
            onChange={(e) =>
              setEditBlockRow({ ...editBlockRow, grossHeight: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        
        <TextField
            label="Status"
            value="marked"
            onChange={(e) =>
              setEditBlockRow({ ...editBlockRow, status: e.target.value })
            }
            fullWidth
            margin="normal"
            
          />
          <div className="text-center mt-4">
            <Button
              variant="contained"
              onClick={handleSaveEditBlock}
              style={{ backgroundColor: "black", borderRadius: "12px" }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openNewBlockRowModal}
        onClose={handleNewBlockRowModalClose}
        fullWidth
      >
       <DialogTitle>
    Create New Block
    <IconButton
      aria-label="close"
      onClick={handleNewBlockRowModalClose}
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
            label="Marking Id"
            defaultValue={markingId}
            onChange={(e) =>
              setNewBlockRow({ ...newBlockRow, markingId: e.target.value })
            }
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="Length"
            type="number"
            value={newBlockRow.grossLength}
            onChange={(e) =>
              setNewBlockRow({ ...newBlockRow, grossLength: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Breadth"
            type="number"
            value={newBlockRow.grossWidth}
            onChange={(e) =>
              setNewBlockRow({ ...newBlockRow, grossWidth: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height"
            type="number"
            value={newBlockRow.grossHeight}
            onChange={(e) =>
              setNewBlockRow({ ...newBlockRow, grossHeight: e.target.value })
            }
            fullWidth
            margin="normal"
          />
         
            
          <div className="text-center mt-4">
            <Button
              variant="contained"
              onClick={handleSaveNewBlockRow}
              style={{ backgroundColor: "black", borderRadius: "12px" }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Marking;
