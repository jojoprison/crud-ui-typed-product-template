import React, {Component} from "react";
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = {types: []}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    imagesrc = process.env.REACT_APP_NKS_PHOTO_PRODUCTS_PATH + this.props.product_photo;

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
                id: event.target.product_id.value,
                title: event.target.product_title.value,
                type: event.target.type_id.value,
                photo_file_name: this.product_photo
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
                this.imagesrc = process.env.REACT_APP_NKS_PHOTO_PRODUCTS_PATH + result;
            }, (error) => {
                alert('Uploading File Failed!')
            })
    }

    render() {
        return (<div className="container">
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование продукта
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="product_id">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="text" name="product_id" required placeholder="Product ID"
                                                  disabled defaultValue={this.props.product_id}/>
                                </Form.Group>

                                <Form.Group controlId="product_title">
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control type="text"    name="product_title" required placeholder="ProductTitle"
                                                  defaultValue={this.props.product_title}/>
                                </Form.Group>

                                <Form.Group controlId="type_id">
                                    <Form.Label>Категория</Form.Label>
                                    <Form.Control as='select' name='type_id'
                                                  defaultValue={this.props.type_id ? this.props.type_id : 1}>
                                        {this.state.types.map(type =>
                                            <option key={type.id} value={type.id}>
                                                {type.title}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Изменить
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>

                        <Col sm={6}>
                            <Image width='200px' height='200px'
                                   src={process.env.REACT_APP_NKS_PHOTO_PRODUCTS_PATH + this.props.product_photo}/>
                            <input onChange={this.handleFileSelected} type='File'/>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>)
    }
}
