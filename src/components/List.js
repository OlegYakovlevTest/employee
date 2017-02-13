import React, { Component } from 'react';
import { PageHeader, Table, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getEmployees, setEmployee } from '../actions/EmployeeActions';
import { Link } from 'react-router';

@connect(state => ({
    manager: state.manager,
    employee: state.employee
}), {getEmployees, setEmployee})

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: this.props.employee.employees,
            filter: ''
        }
    }

    render() {
        return (
            <div>
                <PageHeader>List page</PageHeader>
                <FormGroup
                    controlId='formBasicText'
                >
                    <ControlLabel>Enter filter text</ControlLabel>
                    <FormControl
                        type='text'
                        value={this.state.filter}
                        placeholder='Enter text'
                        onChange={this.onFilterChange}
                    />
                </FormGroup>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>First day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTableRows()}
                    </tbody>
                </Table>
            </div>
        );
    }

    componentDidMount() {
        this.props.getEmployees();
    }

    componentWillReceiveProps(nextProps) {
        if ( JSON.stringify(this.state.employees) !== JSON.stringify(nextProps.employee.employees) ) {
            this.setState({
                employees: nextProps.employee.employees
            });
        }
    }

    onFilterChange = (e) => {
        this.setState({
            filter: e.target.value
        });
        this.filter(e.target.value);
    };

    filter = (text) => {
        console.log('filter', text);
        if (text === '') {
            this.setState({
                employees: this.props.employee.employees
            });
        }
        const employees = this.props.employee.employees.filter((el) => {
            return new RegExp(text.toLowerCase()).test(JSON.stringify(el).toLowerCase());
        });
        this.setState({
            employees
        });
    };

    getTableRows = () => {
        let rows = this.state.employees.map((employee, index) => {
            console.log(employee.firstDay)
            return (
                <tr key={'row' + index}>
                    <td>{++index}</td>
                    <td>
                        <Link to='/profile'>
                            <span onClick={() => {this.onEmployeeClick(employee)}}>
                                {`${employee.lname} ${employee.fname} ${employee.mname}`}
                            </span>
                        </Link>
                    </td>
                    <td>{employee.position}</td>
                    <td>{employee.firstDay ? employee.firstDay.format('DD.MM.YYYY') : 'Date is not selected'}</td>
                </tr>
            );
        });
        return rows;
    };

    onEmployeeClick = (employee) => {
        this.props.setEmployee(employee);
    }
}