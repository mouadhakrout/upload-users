import React from 'react'
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Col, Form, Row} from 'react-bootstrap'

const Home = () => {
    const state = useSelector(state => state);
    const { currentUser } = state.authentication;
    const user = currentUser.user;
    return (
        <div className="container">
            <Link to="/login">Logout</Link>
            <h1>Hi {user.email}!</h1>
            <p>Your details:</p>
            <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={user.email} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="2">
                        Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext defaultValue={user.name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextAge">
                    <Form.Label column sm="2">
                        Age
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext defaultValue={user.age} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextCompany">
                    <Form.Label column sm="2">
                        Company
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext defaultValue={user.company} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPhone">
                    <Form.Label column sm="2">
                        Phone
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext defaultValue={user.phone} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextAdress">
                    <Form.Label column sm="2">
                        Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext defaultValue={user.address} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextAbout">
                    <Form.Label column sm="2">
                        About
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" plaintext defaultValue={user.about} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextData">
                    <Form.Label column sm="2">
                        Data
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" plaintext defaultValue={user.data} />
                    </Col>
                </Form.Group>
            </Form>

        </div>
    );
};
export default Home;
