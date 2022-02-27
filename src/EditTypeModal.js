import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditTypeModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(process.env.REACT_APP_NKS_API + 'types', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.type_id.value,
                title: event.target.type_title.value,
            }),

        }).then(res => res.json())
            .then((result) => {
                    alert(result);
                },
                (error) => {
                    alert('Type Updating Failed!');
                })
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Type
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="type_id">
                                        <Form.Label>Type ID</Form.Label>
                                        <Form.Control type="text" name="type_id" required disabled
                                                      placeholder="Type ID" defaultValue={this.props.type_id} />
                                    </Form.Group>

                                    <Form.Group controlId="type_title">
                                        <Form.Label>Type Title</Form.Label>
                                        <Form.Control type="text" name="type_title" required
                                                      placeholder="Type Title" defaultValue={this.props.type_title}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Type
                                        </Button>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
