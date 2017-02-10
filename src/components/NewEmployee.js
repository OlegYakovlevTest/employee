import React, { Component } from 'react';
import { PageHeader, Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveEmployee } from '../actions/EmployeeActions';


@connect(state => ({
    manager: state.manager
}), {saveEmployee})

export default class NewEmployee extends Component {
    constructor(props) {
        super(props);
        this.employee = {};
    }

    render() {
        console.log('NewEmployee', this.props);
        return (
            <div>
                <PageHeader>New employee page</PageHeader>
                <Form horizontal>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' placeholder='First name' onChange={this.onFnameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Last name
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' placeholder='Last name' onChange={this.onLnameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Middle name
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' placeholder='Middle name' onChange={this.onMnameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Position
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' placeholder='Position' onChange={this.onPositioChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Skills
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' placeholder='Skills' onChange={this.onSkillsChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type='button' onClick={this.onSaveClick}>
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    onFnameChange = (e) => {
        this.employee.fname = e.target.value;
    };

    onLnameChange = (e) => {
        this.employee.lname = e.target.value;
    };

    onMnameChange = (e) => {
        this.employee.mname = e.target.value;
    };

    onPositioChange = (e) => {
        this.employee.position = e.target.value;
    };

    onSkillsChange = (e) => {
        this.employee.skills = e.target.value;
    };

    onSaveClick = () => {
        this.props.saveEmployee(this.employee);
    };
}