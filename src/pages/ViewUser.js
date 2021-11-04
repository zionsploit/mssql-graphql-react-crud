import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GetByIdDataQuery } from '../gql/Query';
import { useParams } from 'react-router';
import { UpdateDataByIdMutations } from '../gql/Mutations';


export const ViewUser = () => {

    const { userId } = useParams();
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({})

    const [updateMovie] = useMutation(UpdateDataByIdMutations)

    const onHandleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { loading, error, data } = useQuery(GetByIdDataQuery, {
        variables: { id: userId },
    })

    if (error) return <p>Error</p>;
    if (loading) return <p>Loading...</p>;

    const onHandleClick = (e) => {
        e.preventDefault()
        updateMovie({
            variables: {
                id: userId,
                author: formData.author,
                movie: formData.movie
            }
        })
        window.location.href = `/${userId}`
    }

    return <div>
        <div className="container mt-5">
            <Link to="/" className="btn btn-secondary">Back</Link>
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
                    {data.getByIdData.map(todo => (
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.author}</td>
                            <td>{todo.movie}</td>
                            <td><Button variant="warning" onClick={() => setShow(true)}>Update</Button></td>
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