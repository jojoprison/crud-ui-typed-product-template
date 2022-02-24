import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddTypeModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_NKS_API + 'types', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: event.target.product_title.value,
                type: {
                    title: 'Стол'
                }
            })
        })
            .then(res => res.json())
            .then((result) => {
                    alert(result);
                },
                (error) => {
                    alert('Product Adding Failed!');
                })
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelleby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Product
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="product_title">
                                        <Form.Label>Product Title</Form.Label>
                                        <Form.Control type="text" name="product_title" required placeholder="Title"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Product
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
