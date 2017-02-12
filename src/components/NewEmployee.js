import React, {Component} from 'react';
import { connect } from 'react-redux';
import { saveEmployee } from '../actions/EmployeeActions';
import EmployeeForm from './EmployeeForm'
import { PageHeader } from 'react-bootstrap';

@connect(state => ({
    manager: state.manager
}), {saveEmployee})

export default class NewEmployee extends Component {

    render() {
        return <div>
            <PageHeader>New employee page</PageHeader>
            <EmployeeForm
                handlerSave={this.props.saveEmployee}
            />
        </div>
    }
}