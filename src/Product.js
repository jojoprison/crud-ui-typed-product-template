import React, {Component} from 'react';
import {Table as BootstrapTable} from 'react-bootstrap';

import {Button, ButtonToolbar} from "react-bootstrap";
import {AddProductModal} from "./AddProductModal";
import {EditProductModal} from "./EditProductModal";

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {products: [], addModalShow: false, editModalShow: false}
    }

    refreshList() {
        fetch(process.env.API_URL + 'products')
            .then(response => response.json())
            .then(data => {
                this.setState({products: data});
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(JSON.stringify(prevState) !== JSON.stringify(this.state))
            this.refreshList()
        }


    deleteProduct(product_id) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.API_URL + 'products/' + product_id, {
                method: 'DELETE',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            }).then(() => this.refreshList())
        }
    }

    render() {
        const {products, product_id, product_title, type_id, product_photo} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});

        return (
            <div>
                <BootstrapTable className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>

                    {products.map(product => <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>{product.type}</td>

                        <td>
                            <ButtonToolbar>
                                <Button className="me-2 ms-2" variant="info"
                                        onClick={() => {
                                            this.setState({
                                                editModalShow: true,
                                                product_id: product.id,
                                                product_title: product.title,
                                                type_id: product.type,
                                                product_photo: product.photo_file_name,
                                            });
                                        }}>
                                    Изменить
                                </Button>

                                <Button className="me-2 ms-2" variant="danger"
                                        onClick={() => this.deleteProduct(product.id)}>
                                    Удалить
                                </Button>

                                <EditProductModal show={this.state.editModalShow} onHide={editModalClose}
                                                  product_id={product_id} product_title={product_title}
                                                  type_id={type_id} product_photo={product_photo}/>
                            </ButtonToolbar>
                        </td>

                    </tr>)}
                    </tbody>
                </BootstrapTable>

                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={() => this.setState({addModalShow: true})}>
                        Добавить продукт
                    </Button>

                    <AddProductModal show={this.state.addModalShow}
                                     onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        );
    }
}
