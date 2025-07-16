import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Link } from "react-router-dom";



const UserProfile= () => {
  const [viewResult, setViewResult] = useState([]);
  console.log(viewResult);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          "https://fullstack-student-backend.onrender.com/api/auth"
        );
        console.log(data);

        setViewResult(data);
      } catch (error) {
        console.error("Result not Found:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <h1 style={{fontWeight:"bold", fontSize:"30px", textAlign:"center"}}>User Profiles</h1>
  <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>First Name</TableCell>
            <TableCell align="left"  style={{fontWeight:"bold"}}>Last Name</TableCell>
            <TableCell align="left" style={{fontWeight:"bold"}}>Phone Number</TableCell>
            <TableCell align="left" style={{fontWeight:"bold"}}>Email</TableCell>
            <TableCell align="left" style={{fontWeight:"bold"}}>createdAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viewResult.map((item: any) => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              component=
              {Link}
              to={`/userdetails/${item._id}`}
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">
                {item.firstName}
              </TableCell>
              <TableCell align="left">{item.lastName}</TableCell>
              <TableCell align="left">{item.phoneNumber}</TableCell>
              <TableCell align="left">{item.email}</TableCell>
              <TableCell align="left">{item.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
       
    </div>   
  );
};

export default UserProfile;