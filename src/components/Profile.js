import React, { Component } from 'react';
import { PageHeader, Form, FormGroup, Col, FormControl, Button, Grid, Row, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateEmployee } from '../actions/EmployeeActions';

@connect(state => ({
    manager: state.manager,
    employee: state.employee.employee
}), {updateEmployee})

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditting: false
        }
        this.employee = null;
    }

    render() {
        console.log('Profile', this.props);
        return (
            <div>
                <PageHeader>Profile page</PageHeader>
                {
                    this.props.employee ?
                        (this.state.isEditting ? this.renderEditingForm() : this.renderEmployeeInfo()) :
                        null
                }
            </div>
        );
    }

    renderEditingForm = () => {
        this.employee = this.props.employee;
        return (
            <Form horizontal>
                <FormGroup controlId='formHorizontalEmail'>
                    <Col componentClass={ControlLabel} md={2}>
                        First name
                    </Col>
                    <Col md={10}>
                        <FormControl type='text' placeholder='First name' onChange={this.onFnameChange} defaultValue={this.employee.fname}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId='formHorizontalEmail'>
                    <Col componentClass={ControlLabel} md={2}>
                        Last name
                    </Col>
                    <Col md={10}>
                        <FormControl type='text' placeholder='Last name' onChange={this.onLnameChange} defaultValue={this.employee.lname}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId='formHorizontalEmail'>
                    <Col componentClass={ControlLabel} md={2}>
                        Middle name
                    </Col>
                    <Col md={10}>
                        <FormControl type='text' placeholder='Middle name' onChange={this.onMnameChange} defaultValue={this.employee.lname}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId='formHorizontalEmail'>
                    <Col componentClass={ControlLabel} md={2}>
                        Position
                    </Col>
                    <Col md={10}>
                        <FormControl type='text' placeholder='Position' onChange={this.onPositioChange} defaultValue={this.employee.position}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId='formHorizontalEmail'>
                    <Col componentClass={ControlLabel} md={2}>
                        Skills
                    </Col>
                    <Col md={10}>
                        <FormControl type='text' placeholder='Skills' onChange={this.onSkillsChange} defaultValue={this.employee.skills}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col md={6}>
                        <Button type='button' onClick={this.onSaveClick}>
                            Save
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button type='button' onClick={this.onCancelClick}>
                            Cancel
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    };

    renderEmployeeInfo = () => {
        const employee = this.props.employee;
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col md={12}>{`${employee.lname} ${employee.fname} ${employee.mname}`}</Col>
                </Row>

                <Row className='show-grid'>
                    <Col md={12}>{employee.position}</Col>
                </Row>

                <Row className='show-grid'>
                    <Col md={12}>{employee.skills}</Col>
                </Row>

                <Row className='show-grid'>
                    <Col md={12}>
                        <Button type='button' onClick={this.onEditClick}>Edit</Button>
                    </Col>
                </Row>
            </Grid>
        );
    };

    onEditClick = () => {
        this.setState({
            isEditting: true
        });
    };

    onCancelClick = () => {
        this.setState({
            isEditting: false
        });
    };

    onSaveClick = () => {
        this.props.updateEmployee(this.employee);
    };

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
}