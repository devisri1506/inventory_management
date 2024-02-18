import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "../components";
import { blocksGrid, slabData, slabsGrid, blocksData } from "../data/Data";
import { WidthNormal } from "@mui/icons-material";

const Blocks = () => {
  const [editSlabRow, setEditSlabRow] = useState({});
  const [openEditSlabModal, setOpenEditSlabModal] = useState(false);
  const [openNewSlabRowModal, setOpenNewSlabRowModal] = useState(false);
  const [newSlabRow, setNewSlabRow] = useState({});
  const [data, setData] = useState(
    blocksData.map((item) => ({
      ...item,
      blockMeasurement: item.length * item.width * item.height,
    }))
  );
  const [orderBy, setOrderBy] = useState("");
  const [slabsOrderBy, setSlabsOrderBy] = useState("");
  const [slabsOrder, setSlabsOrder] = useState("asc");

  const [order, setOrder] = useState("asc");
  const [editRow, setEditRow] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNewRowModal, setOpenNewRowModal] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedBlockSlabs, setSelectedBlockSlabs] = useState([]);

  const handleSort =
    (property, isBlocksTable = true) =>
    () => {
      if (isBlocksTable) {
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
        const isAsc = slabsOrderBy === property && slabsOrder === "asc";
        const sortedSlabs = [...selectedBlockSlabs].sort((a, b) => {
          if (a[property] < b[property]) return isAsc ? -1 : 1;
          if (a[property] > b[property]) return isAsc ? 1 : -1;
          return 0;
        });
        setSelectedBlockSlabs(sortedSlabs);
        setSlabsOrder(isAsc ? "desc" : "asc");
        setSlabsOrderBy(property);
      }
    };

  const handleEdit = (row) => {
    setEditRow(row);
    setOpenEditModal(true);
  };

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.blockId !== row.blockId);
    setData(newData);
    toast.success("Block deleted Successfully");
  };

  const handleNewRow = () => {
    setNewRow({});
    setOpenNewRowModal(true);
  };

  const handleBlockClick = (row) => {
    setSelectedBlock(row);
    const slabsForSelectedBlock = slabData.filter(
      (slab) => slab.blockId === row.blockId
    );
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
      item.blockId === editRow.blockId
        ? {
            ...item,
            ...editRow,
            blockMeasurement: editRow.length * editRow.width * editRow.height,
          }
        : item
    );
    setData(updatedData);
    setOpenEditModal(false);
    toast.success("Block edited successfully");
  };

  const handleSaveNewRow = () => {
    // Check if all mandatory fields are filled
    if (!newRow.blockId || !newRow.length || !newRow.width || !newRow.height) {
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

    const newRowWithoutDate = Object.fromEntries(
      Object.entries(newRow).filter(
        ([key]) => key !== "entryDate" && key !== "blockId"
      )
    );
    const newRowWithMeasurement = {
      ...newRow,
      blockMeasurement: newRow.length * newRow.width * newRow.height,
    };

    const newRowWithMeasurementWithoutDate = {
      ...newRowWithoutDate,
      blockMeasurement: newRow.length * newRow.width * newRow.height,
    };

    const newData = [...data, newRowWithMeasurement];
    setData(newData);
    setOpenNewRowModal(false);
    console.log(
      "newData is: " + JSON.stringify(newRowWithMeasurementWithoutDate)
    );
    axios
      .post(
        "http://localhost:8080/block/new-block",
        newRowWithMeasurementWithoutDate
      )
      .then((response) => {
        toast.success("New Block Created successfully"),
          {
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
      })
      .catch((error) => {
        console.log("new error: " + error);
        toast.error("Block Not Created!");
      });
  };

  const handleCardClose = () => {
    setSelectedBlock(null);
  };

  const handleEditSlab = (row) => {
    setEditSlabRow(row);
    setOpenEditSlabModal(true);
  };

  const handleDeleteSlab = (row) => {
    const newSlabData = selectedBlockSlabs.filter(
      (slab) => slab.slabId !== row.slabId
    );
    setSelectedBlockSlabs(newSlabData);
    toast.success("Slab deleted successfully");
  };

  const handleNewSlabRow = () => {
    setNewSlabRow({
      producedOn: "",
      slabId: "",
      blockId: "",
      length: "",
      breadth: "",
      slabType: "Fresh",
      slabStatus: "Pending",
      StatusBg: "#FB9678",
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
      slab.slabId === editSlabRow.slabId
        ? {
            ...slab,
            ...editSlabRow,
            slabMeasurement: editSlabRow.length * editSlabRow.breadth,
          }
        : slab
    );
    setSelectedBlockSlabs(updatedSlabData);
    setOpenEditSlabModal(false);
    toast.success("Slab edited successfully");
  };

  const handleSaveNewSlabRow = () => {
    // Check if all mandatory fields are filled
    if (
      !newSlabRow.blockId ||
      !newSlabRow.length ||
      !newSlabRow.breadth
    ) {
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

    const newSlabRowWithMeasurement = {
      ...newSlabRow,
      slabMeasurement: newSlabRow.length * newSlabRow.breadth,
    };

    const newSlabData = [...selectedBlockSlabs, newSlabRowWithMeasurement];
    setSelectedBlockSlabs(newSlabData);
    setOpenNewSlabRowModal(false);
    toast.success("New Slab Created successfully");
  };

  return (
    <div className="md:w-10/12 sm:w-full mx-auto">
      <Paper className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Blocks" />
        <div className="text-left mt-4">
          <Button
            variant="contained"
            onClick={handleNewRow}
            style={{ backgroundColor: "black", borderRadius: "12px" }}
          >
            Add Block
          </Button>
        </div>
        <TableContainer>
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                {blocksGrid.map((column, index) => (
                  <TableCell key={index} className="p-2 sm:p-3">
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : "asc"}
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
                    <TableCell
                      key={columnIndex}
                      className="p-2 sm:p-3"
                      onClick={() => handleBlockClick(row)}
                    >
                      {column.field === "blockId" ? (
                        <span style={{ cursor: "pointer" }}>
                          {row[column.field]}
                        </span>
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="p-2 sm:p-3">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openEditModal} onClose={handleEditModalClose} fullWidth>
          <DialogTitle>Edit Block</DialogTitle>
          <DialogContent>
            <TextField
              label="Date"
              type="date"
              value={editRow.entryDate || ""}
              onChange={(e) =>
                setEditRow({ ...editRow, entryDate: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Block Number"
              value={editRow.blockId || ""}
              onChange={(e) =>
                setEditRow({ ...editRow, blockId: e.target.value })
              }
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Quarry Number"
              value={editRow.quarryId || ""}
              onChange={(e) =>
                setEditRow({ ...editRow, quarryId: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Length"
              type="number"
              value={editRow.length || ""}
              onChange={(e) =>
                setEditRow({ ...editRow, length: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Width"
              type="number"
              value={editRow.width || ""}
              onChange={(e) =>
                setEditRow({ ...editRow, width: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Height"
              type="number"
              value={editRow.height || ""}
              onChange={(e) =>
                setEditRow({ ...editRow, height: e.target.value })
              }
              fullWidth
              margin="normal"
            />

            <label htmlFor="">Status</label>
            <Select
              label="Status"
              value={editRow.blockStatus || "Pending"}
              onChange={(e) =>
                setEditRow({ ...editRow, blockStatus: e.target.value })
              }
              fullWidth
            >
              <MenuItem value="Cutting">Cutting</MenuItem>
              <MenuItem value="Polishing">Polishing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                onClick={handleSaveEdit}
                style={{ backgroundColor: "black", borderRadius: "12px" }}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Row Modal */}
        <Dialog
          open={openNewRowModal}
          onClose={handleNewRowModalClose}
          fullWidth
        >
          <DialogTitle>Create New Block</DialogTitle>
          <DialogContent>
            <TextField
              label="Quarry Number"
              value={newRow.quarryId || ""}
              onChange={(e) =>
                setNewRow({ ...newRow, quarryId: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Length"
              type="number"
              value={newRow.length || ""}
              onChange={(e) => setNewRow({ ...newRow, length: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Width"
              type="number"
              value={newRow.width || ""}
              onChange={(e) => setNewRow({ ...newRow, width: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Height"
              type="number"
              value={newRow.height || ""}
              onChange={(e) => setNewRow({ ...newRow, height: e.target.value })}
              fullWidth
              margin="normal"
            />

            <label htmlFor="">Status</label>
            <Select
              label="Status"
              value={newRow.blockStatus || ""}
              onChange={(e) => setNewRow({ ...newRow, blockStatus: e.target.value })}
              fullWidth
            >
              <MenuItem value="Cutting">Cutting</MenuItem>
              <MenuItem value="Polishing">Polishing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                onClick={handleSaveNewRow}
                style={{ backgroundColor: "black", borderRadius: "12px" }}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Paper>
      <Dialog
        open={!!selectedBlock}
        onClose={handleCardClose}
        maxWidth="xl"
        fullWidth
      >
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
                                direction={
                                  slabsOrderBy === column.field
                                    ? slabsOrder
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
                        {selectedBlockSlabs.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {slabsGrid.map((column, columnIndex) => (
                              <TableCell key={columnIndex}>
                                {column.field === "slabMeasurement" ? (
                                  <span>
                                    {(row.length * row.breadth).toFixed(2)}
                                  </span>
                                ) : (
                                  row[column.field]
                                )}
                              </TableCell>
                            ))}
                            <TableCell>
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEditSlab(row)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteSlab(row)}
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
                      onClick={handleNewSlabRow}
                      style={{ backgroundColor: "black", borderRadius: "12px" }}
                    >
                      Add Slab
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditSlabModal}
        onClose={handleEditSlabModalClose}
        fullWidth
      >
        <DialogTitle>Edit Slab</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            value={editSlabRow.producedOn || ""}
            onChange={(e) =>
              setEditSlabRow({ ...editSlabRow, producedOn: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Slab Number"
            value={editSlabRow.slabId || ""}
            onChange={(e) =>
              setEditSlabRow({ ...editSlabRow, slabId: e.target.value })
            }
            fullWidth
            margin="normal"
            disabled
          />

          <TextField
            label="Length"
            type="number"
            value={editSlabRow.length}
            onChange={(e) =>
              setEditSlabRow({ ...editSlabRow, length: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Breadth"
            type="number"
            value={editSlabRow.breadth}
            onChange={(e) =>
              setEditSlabRow({ ...editSlabRow, breadth: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <label>Type</label>
          <Select
            value={editSlabRow.slabType || "Fresh"}
            onChange={(e) =>
              setEditSlabRow({ ...editSlabRow, slabType: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="Fresh">Fresh</MenuItem>
            <MenuItem value="Defect">Defect</MenuItem>
            <MenuItem value="LightDefect">Light Defect</MenuItem>
          </Select>
          <label htmlFor="">Status</label>
          <Select
            label="Status"
            value={editSlabRow.slabStatus || "Pending"}
            onChange={(e) =>
              setEditSlabRow({ ...editSlabRow, slabStatus: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="InSales">InSales</MenuItem>
          </Select>
          <div className="text-center mt-4">
            <Button
              variant="contained"
              onClick={handleSaveEditSlab}
              style={{ backgroundColor: "black", borderRadius: "12px" }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openNewSlabRowModal}
        onClose={handleNewSlabRowModalClose}
        fullWidth
      >
        <DialogTitle>Create New Slab</DialogTitle>
        <DialogContent>
        
          <TextField
            label="Block Number"
            value={newSlabRow.blockId}
            onChange={(e) =>
              setNewSlabRow({ ...newSlabRow, blockId: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Length"
            type="number"
            value={newSlabRow.length}
            onChange={(e) =>
              setNewSlabRow({ ...newSlabRow, length: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Breadth"
            type="number"
            value={newSlabRow.breadth}
            onChange={(e) =>
              setNewSlabRow({ ...newSlabRow, breadth: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <label>Type</label>
          <Select
            value={newSlabRow.slabType || "Fresh"}
            onChange={(e) =>
              setNewSlabRow({ ...newSlabRow, slabType: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="Fresh">Fresh</MenuItem>
            <MenuItem value="Defect">Defect</MenuItem>
            <MenuItem value="LightDefect">Light Defect</MenuItem>
          </Select>
          <label htmlFor="">Status</label>
          <Select
            label="Status"
            value={newSlabRow.slabStatus || "Pending"}
            onChange={(e) =>
              setNewSlabRow({ ...newSlabRow, slabStatus: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="InSales">InSales</MenuItem>
          </Select>
          <div className="text-center mt-4">
            <Button
              variant="contained"
              onClick={handleSaveNewSlabRow}
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

export default Blocks;
