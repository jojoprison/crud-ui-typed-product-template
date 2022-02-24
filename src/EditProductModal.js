import React, {Component} from "react";
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = {types: []}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    product_photo = "anonymous.jpg";
    imagesrc = process.env.REACT_APP_NKS_PHOTO_PATH + this.product_photo;

    componentDidMount() {
        fetch(process.env.REACT_APP_NKS_API + 'types')
            .then(response => response.json())
            .then(data => {
                this.setState({types: data});
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_NKS_API + 'products', {
            method: 'PUT', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify({
                product_id: event.target.product_id.value,
                product_title: event.target.product_title.value,
                type_id: event.target.type_id.value,
                product_photo: event.target.product_photo.value,
                product_doj: this.product_photo
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            }, (error) => {
                alert('Product Editing Failed!');
            })
    }

    handleFileSelected(event) {
        event.preventDefault();
        this.product_photo = event.target.files[0].name;
        const formData = new FormData();
        formData.append('myFile', event.target.files[0], event.target.files[0].name);

        fetch(process.env.REACT_APP_NKS_API + 'products/save_file', {
            method: 'POST', body: formData
        }).then(res => res.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_NKS_PHOTO_PATH + result;
            }, (error) => {
                alert('Uploading File Failed!')
            })
    }

    render() {
        return (<div className="container">
            <Modal {...this.props} size="lg" aria-labelleby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Product
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="product_id">
                                    <Form.Label>Product ID</Form.Label>
                                    <Form.Control type="text" name="product_id" required placeholder="Product ID"
                                                  disabled defaultValue={this.props.product_id}/>
                                </Form.Group>

                                <Form.Group controlId="product_title">
                                    <Form.Label>Product Title</Form.Label>
                                    <Form.Control type="text" name="product_title" required placeholder="ProductTitle"
                                                  defaultValue={this.props.product_title}/>
                                </Form.Group>

                                <Form.Group controlId="type_id">
                                    <Form.Label>Type ID</Form.Label>
                                    <Form.Control as='select' defaultValue={this.props.type_id}>
                                        {this.state.types.map(type => <option key={type.id}>{type.title}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="product_doj">
                                    <Form.Label>Date Added</Form.Label>
                                    <Form.Control
                                        type='date' name='product_doj' required placeholder='Date Added'
                                        defaultValue={this.props.product_doj}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Product
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>

                        <Col sm={6}>
                            <Image width='200px' height='200px'
                                   src={process.env.REACT_APP_NKS_PHOTO_PATH + this.props.product_photo}/>
                            <input onChange={this.handleFileSelected} type='File'/>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>)
    }
}
