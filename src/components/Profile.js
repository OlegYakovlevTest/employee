import React, {Component} from 'react';
import { PageHeader, Col, Button, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateEmployee } from '../actions/EmployeeActions';
import EmployeeForm from './EmployeeForm';
import './Profile.css';

@connect(state => ({
    manager: state.manager,
    employee: state.employee.employee
}), {updateEmployee})

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            employee: this.props.employee
        };
    }

    render() {
        console.log('Profile', this.props);
        return (
            <div>
                <PageHeader>
                    Profile page
                    {
                        this.state.isEditing ?
                            <Button type='button' className='header-btn' onClick={this.onCancelClick}>Cancel</Button> :
                            <Button type='button' className='header-btn' onClick={this.onEditClick}>Edit</Button>
                    }
                </PageHeader>
                {
                    this.props.employee ?
                        (this.state.isEditing ? this.renderEditingForm() : this.renderEmployeeInfo()) :
                        null
                }
            </div>
        );
    }

    renderEditingForm = () => {
        return (
            <EmployeeForm
                employee={this.props.employee}
                handlerSave={this.handlerSave}
            />
        );
    };

    renderEmployeeInfo = () => {
        const employee = this.props.employee;
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col md={2}>Name:</Col>
                    <Col md={10}>{`${employee.lname} ${employee.fname} ${employee.mname}`}</Col>
                </Row>
                <Row className='show-grid'>
                    <Col md={2}>Position:</Col>
                    <Col md={10}>{employee.position}</Col>
                </Row>
                <Row className='show-grid'>
                    <Col md={2}>First day:</Col>
                    <Col md={10}>{employee.firstDay ? employee.firstDay.format('DD.MM.YYYY') : 'Date is not selected'}</Col>
                </Row>
                {this.renderSkills(employee)}
            </Grid>
        );
    };

    renderSkills = (employee) => {
        return employee.skills.map((skill, index) => {
            if (index === 0) {
                return <Row className='show-grid' key={'skill' + index}>
                    <Col md={2}>Skills:</Col>
                    <Col md={10}>{skill}</Col>
                </Row>
            } else {
                return <Row className='show-grid' key={'skill' + index}>
                    <Col mdOffset={2} md={10}>{skill}</Col>
                </Row>
            }
        });
    };

    handlerSave = (employee) => {
        this.setState({
            isEditing: false
        });
        this.props.updateEmployee(employee);
    };

    onEditClick = () => {
        this.setState({
            isEditing: true
        });
    };

    onCancelClick = () => {
        this.setState({
            isEditing: false
        });
    };
}