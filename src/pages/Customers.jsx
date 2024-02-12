import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Customers = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {customersGrid.map((item, index) => (
                <TableCell key={index}>{item.headerText}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersData.map((customer, index) => (
              <TableRow key={index}>
                {customersGrid.map((item, idx) => (
                  <TableCell key={idx}>{customer[item.field]}</TableCell>
                ))}
                <TableCell>
                  <IconButton aria-label="delete" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;
