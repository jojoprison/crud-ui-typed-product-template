import React, {Component} from 'react';
import {Table as BootstrapTable} from 'react-bootstrap';

import {Button, ButtonToolbar} from "react-bootstrap";
import {AddTypeModal} from "./AddTypeModal";
import {EditTypeModal} from "./EditTypeModal";

export class Type extends Component {

    constructor(props) {
        super(props);
        this.state = {types: [], addModalShow: false, editModalShow: false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_NKS_API + 'types')
            .then(response => response.json())
            .then(data => {
                this.setState({types: data});
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(JSON.stringify(prevState) !== JSON.stringify(this.state))
            this.refreshList();
    }

    deleteType(type_id) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_NKS_API + 'types/' + type_id, {
                method: 'DELETE',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            })
        }
    }

    render() {
        const {types, type_id, type_title} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});

        return (
            <div>
                <BootstrapTable className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Тип изделия</th>
                        <th>Type Title</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>

                    {types.map(type => <tr key={type.id}>
                        <td>{type.id}</td>
                        <td>{type.title}</td>

                        <td>
                            <ButtonToolbar>
                                <Button className="me-2 ms-2" variant="info"
                                        onClick={() => this.setState({
                                            editModalShow: true, type_id: type.id, type_title: type.title
                                        })}>
                                    Edit
                                </Button>

                                <Button className="me-2 ms-2" variant="danger"
                                        onClick={() => this.deleteType(type.id)}>
                                    Delete
                                </Button>

                                <EditTypeModal show={this.state.editModalShow} onHide={editModalClose}
                                               type_id={type_id} type_title={type_title}/>

                            </ButtonToolbar>
                        </td>

                    </tr>)}
                    </tbody>
                </BootstrapTable>

                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={() => this.setState({addModalShow: true})}>
                        Add Type
                    </Button>

                    <AddTypeModal show={this.state.addModalShow}
                                  onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        );
    }
}
