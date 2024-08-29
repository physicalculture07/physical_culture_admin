import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import apiURl from '../../store/Action/api-url';

export default function Listing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'courseName', label: 'courseName', minWidth: 170 },
    { id: 'courseFees', label: 'courseFees', minWidth: 170 },
    { id: 'createdAt', label: 'Created Date', minWidth: 170 },
  ];

  useEffect(() => {
    // Replace with your API endpoint
    fetch(`${process.env.REACT_APP_API_BACKEND_URL+apiURl.courses}`,)
      .then((response) => response.json())
      .then((data) => {
        setRows(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusClick = (id, currentStatus) => {
    console.log("currentStatus", currentStatus);
    const newStatus = currentStatus === true ? "false" : "true";
    const newStatus1 = currentStatus === true ? false: true;

    fetch(`${process.env.REACT_APP_API_BACKEND_URL + apiURl.updateUserStatus}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          
          setRows((prevRows) =>
            prevRows.map((row) =>{
              console.log(row._id, id);
              return row._id === id ? { ...row, status: newStatus1 } : row}
            )
          );
        } else {
          console.error('Error updating status:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = column.id === 'status' ? (row[column.id] === true ? "Active": "In-active") : row[column.id]
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          onClick={column.id === 'status' ? () => handleStatusClick(row._id, row.status) : undefined}
                          style={column.id === 'status' ? { cursor: 'pointer', color: 'blue' } : {}}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
