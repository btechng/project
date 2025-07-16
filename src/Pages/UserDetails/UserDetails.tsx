import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from "react-icons/fa";

const UserDetails = () => {
  const {id} = useParams()
  console.log(id);
  
   const [viewResult, setViewResult] = useState<any>({});
   console.log(viewResult);

   const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `https://fullstack-student-backend.onrender.com/api/auth/delete/${id}`
      );
      window.location.reload();
    } catch (error: any) {
      console.error(error.data.response);
    }
  };

   useEffect(() => {
       const fetchPosts = async () => {
         try {
           const { data } = await axios.get(
             `https://fullstack-student-backend.onrender.com/api/auth/${id}`
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
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial'}}
    >
      <Modal.Dialog>
        <Modal.Header closeButton style={{backgroundColor:"black", color:"white"}}>
          <Modal.Title>USER DETAILS</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6>{viewResult?.firstName}</h6>
          <h6>{viewResult?.lastName}</h6>
          <h6>{viewResult?.phoneNumber}</h6>
          <h6>{viewResult?.email}</h6>
          <h6>{viewResult?.createdAt}</h6>
          <h6>{viewResult?.isBlocked}</h6>
          <FaTrash style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => handleDelete(viewResult._id)}/>
        </Modal.Body>

        <Modal.Footer>
          <Link to={"/userprofile"}><Button variant="secondary">Close</Button></Link>
          <Link to={"/"}><Button variant="secondary">Home</Button></Link>
          <Link to={`/updateallusers/${id}`}><Button variant="primary">Update User Profile</Button></Link>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    </div>
  )
}

export default UserDetails
