import React, {Component} from "react";
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = {types: []}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    product_photo = 'anonymous_bae.jpg';
    imagesrc = process.env.MEDIA_PRODUCTS_URL + this.product_photo;

    componentDidMount() {
        fetch(process.env.API_URL + 'types')
            .then(response => response.json())
            .then(data => {
                this.setState({types: data});
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.API_URL + 'products', {
            method: 'POST', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify({
                id: null,
                title: event.target.product_title.value,
                type: event.target.type_id.value,
                photo_file_name: this.product_photo
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            }, (error) => {
                alert('Product Adding Failed!');
            })
    }

    handleFileSelected(event) {
        event.preventDefault();
        this.product_photo = event.target.files[0].name;
        const formData = new FormData();
        formData.append('myFile', event.target.files[0], event.target.files[0].name);

        fetch(process.env.API_URL + 'products/save_file', {
            method: 'POST', body: formData
        }).then(res => res.json())
            .then((result) => {
                this.imagesrc = process.env.MEDIA_PRODUCTS_URL + result;
            }, (error) => {
                alert('Uploading File Failed!')
            })
    }

    render() {
        return (<div className="container">
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавление товара
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="product_title">
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control type="text" name="product_title" required placeholder="Название продукта"/>
                                </Form.Group>

                                <Form.Group controlId="type_id">
                                    <Form.Label>Категория</Form.Label>
                                    {/*TODO сделать проверку title === 'Любой' при выборке из списка полученных types*/}
                                    <Form.Control as='select' required name='type_id'
                                                  defaultValue='1'>
                                        {this.state.types.map(type =>
                                            <option key={type.id} value={type.id}>
                                                {type.title}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Добавить продукт
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>

                        <Col sm={6}>
                            <Image width='200px' height='200px' src={this.imagesrc}/>
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
