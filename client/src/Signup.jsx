import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Users() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: ''
    });
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/users', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            fetchUsers();
            setShow(false);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/users/${currentUserId}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            fetchUsers();
            setShowEdit(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleLogout = () => {
        // Clear token and navigate to login page
        localStorage.removeItem('authToken'); // Ensure 'authToken' is used
        navigate('/login'); // Use navigate to go to the login page
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Button variant="success" onClick={() => setShow(true)}>
                    Add +
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formDesignation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourse">
                                <Form.Label>Course</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEdit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formDesignation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCourse">
                                <Form.Label>Course</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.designation}</td>
                                <td>{user.gender}</td>
                                <td>{user.course}</td>
                                <td>
                                    <Button
                                        className='btn btn-sm btn-success'
                                        onClick={() => {
                                            setFormData(user);
                                            setCurrentUserId(user._id);
                                            setShowEdit(true);
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        className='btn btn-sm btn-danger'
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
