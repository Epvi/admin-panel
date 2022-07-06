import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getData,useCount} from '../auth/reducer'
import { useEffect} from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
  const {state,dispatch} = useCount();
  
  const complaint = [];
  useEffect(()=>{
    getData(dispatch,complaint);
   },[])
  return (
    <>
    <h1 style={{textAlign:"center",marginTop:"20px"}}>Customer Complaints</h1>
    <TableContainer component={Paper} sx={{marginRight:"100px"}}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{width:"5vw"}}align="center">Sr.</StyledTableCell>
            <StyledTableCell sx={{width:"15vw"}}align="center">userID</StyledTableCell>
            <StyledTableCell sx={{width:"15vw"}}align="center">Phone no.</StyledTableCell>
            <StyledTableCell sx={{width:"15vw"}}align="center">Date</StyledTableCell>
            <StyledTableCell sx={{width:"35vw"}}align="center">Complaint Text</StyledTableCell>
            <StyledTableCell sx={{width:"15vw"}}align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {state.complaint?.map((row,index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {index}
              </StyledTableCell>
              <StyledTableCell align="center">{row.userID}</StyledTableCell>
              <StyledTableCell align="center">{row.phoneNo}</StyledTableCell>
              <StyledTableCell align="center">{row.time.toDate().toString().slice(4,15)}</StyledTableCell>
              <StyledTableCell align="center">{row.complaintText}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </>
  );
}
