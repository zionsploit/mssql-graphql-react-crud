import { useMutation, useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AddDataMutations, DeleteDataByIdMutations } from '../gql/Mutations';
import { GetAllDataQuery } from '../gql/Query';


export const Dashboard = () => {

    const { loading, error, data } = useQuery(GetAllDataQuery, {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first"
    });
    const [addMovie] = useMutation(AddDataMutations);
    const [deleteMovie] = useMutation(DeleteDataByIdMutations);

    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({})

    const onHandleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;


    const onHandleClick = (e) => {
        e.preventDefault()
        addMovie({
            variables: {
                author: formData.author,
                movie: formData.movie
            }
        })
        window.location.href = '/'
    }

    console.log(formData)
    return <div>
        <div className="container mt-5">
            <Button variant="success" onClick={() => setShow(true)}>Add</Button>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>author</th>
                        <th>movie</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.getAllData.map(todo => (
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.author}</td>
                            <td>{todo.movie}</td>
                            <td><Link to={`/${todo.id}`} className="btn btn-info">View</Link><Button variant="danger" onClick={() => {
                                deleteMovie({
                                    variables: {
                                        id: todo.id
                                    }
                                })
                                window.location.href = '/'
                            }}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>ADD MOVIE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="author" onChange={onHandleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Movie Title</Form.Label>
                        <Form.Control type="text" name="movie" onChange={onHandleChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={onHandleClick}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}