
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import { Button, Container, Modal } from "react-bootstrap";
import Chart from './components/charts'
import React, { useState, useEffect } from 'react';
import Modals from './components/modals'

import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import { API } from './config/api';
import noproduct from "./style/delete.png"



function App() {
  const title = 'Home';
  document.title = 'Talenta Indonesia | ' + title;

  let navigate = useNavigate();

  const [member, setMember] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    async function dataMember() {
      const db = await API.get('/members')
      return setMember(db.data.data.data)
    }
    dataMember();
  }, [])




  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/member/${id}`);

    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      refreshPage()
      deleteById.mutate(idDelete);
      setConfirmDelete(null);

    }
  }, [confirmDelete]);;

  const [confirmAdd, setConfirmAdd] = useState(null);
  const [confirmRegister, setConfirmRegister] = useState(null);


  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const handleAdd = () => {
    handleShows();

  };

  useEffect(() => {
    if (confirmAdd) {
      handleCloses();
      setConfirmAdd(null);

    }
  }, [confirmAdd]);;

  console.log(member)
  return (
    <div className="App" style={{ BackgroundImage: 'url("https://drive.google.com/file/d/1oSdUYlKvFJWzVWyK5N-rvdR54_aq-nHp/view?usp=sharing")' }}>
      <header className="App-header">

        <img src='https://1.bp.blogspot.com/-t38D2h5Tjmk/YBS1qYIBwFI/AAAAAAAAGC8/_3XR7hhehigwfOnKkjjC30ey3Q3pxI7eQCLcBGAsYHQ/s1280/lowongan-kerja-talenta-indonesia-serang.png' className="App-logo" alt="logo" />

      </header>

      <Container>
        <div className="add">
          <div>
            <h4>Community data</h4>
          </div>
          <Button variant='secondary'
            onClick={() => {
              handleAdd()
            }}>Add New Member</Button>
        </div>
        {member?.length !== 0 ? (
          <Table striped bordered hover className="charts">
            <thead>
              <tr>
                <th width="3%">No</th>
                <th>Name</th>
                <th>Gander</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            {member?.map((item, index) => (
              <tbody className='charts'>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.gender}</td>
                  <td>{item?.age}</td>
                  <td><img src={noproduct} onClick={() => {
                    handleDelete(item?.id);
                  }} className='img' /></td>
                </tr>


              </tbody>
            ))}
          </Table>
        ) : (
          <div className="text-center pt-5 charts" >
            <img
              src='https://cdn.dribbble.com/users/2698098/screenshots/5957957/untitled-2-01_4x.jpg'
              className="img-fluid"
              style={{ width: '40%' }}
              alt="empty"
            />
            <div className="mt-3">No Data Here!!</div>
          </div>
        )}
        <Chart />
        <Modals
          setConfirmAdd={setConfirmAdd}
          show={shows}
          handleCloses={handleCloses}
        />
        <MyVerticallyCenteredModal
          setConfirmDelete={setConfirmDelete}
          show={show}
          handleClose={handleClose}
        // onHide={() => setModalShow(false)}

        />
      </Container >
    </div >
  );
}

function MyVerticallyCenteredModal({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true)
  }
  return (
    <Modal
      // {...props}
      show={show} onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this data?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleDelete} >
          Yes
        </Button>
        <Button variant="danger" onClick={handleClose} >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default App;
