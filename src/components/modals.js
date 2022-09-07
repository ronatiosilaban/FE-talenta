import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Alert } from "react-bootstrap";

export default function RegisterData({ show, handleCloses, setConfirmAdd }) {
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        name: '',
        gender: '',
        age: '',
    });
    function refreshPage() {
        window.location.reload(false);
    }
    const { name, gender, age } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/member', body, config);
            refreshPage()
            console.log('response', response);
            // Handling response here
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

  


    return (

        <Modal show={show} onHide={handleCloses}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Data</Modal.Title>
            </Modal.Header>
            {message && message}
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Name"
                            id="name"
                            onChange={handleChange}
                            value={name}
                            name="name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Gender"
                            id="gender"
                            onChange={handleChange}
                            value={gender}
                            name="gender" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control type="number" placeholder="Age"
                            id="age"
                            name="age"
                            value={age}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit" onHide={handleCloses}>
                        Add
                    </Button>
                </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleCloses}>
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}

