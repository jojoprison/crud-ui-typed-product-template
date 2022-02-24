import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditTypeModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_NKS_API + 'products', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.product_id.value,
                title: event.target.product_title.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                    alert(result);
                },
                (error) => {
                    alert('Product Updating Failed!');
                })
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelleby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Product
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="product_id">
                                        <Form.Label>Product ID</Form.Label>
                                        <Form.Control type="text" name="product_id" required disabled
                                                      placeholder="ID" defaultValue={this.props.product_id} />
                                    </Form.Group>

                                    <Form.Group controlId="product_title">
                                        <Form.Label>Product Title</Form.Label>
                                        <Form.Control type="text" name="product_title" required
                                                      placeholder="Title" defaultValue={this.props.product_title}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Product
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
