import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as managerActions from '../actions/ManagerActions';
import * as employeeActions from '../actions/EmployeeActions';
import { bindActionCreators } from 'redux';
import { Nav, NavItem } from 'react-bootstrap';

class App extends Component {
    render() {
        console.log('--------', this.props);
        const { manager } = this.props;
        return (
            <div className='container'>
                <Nav bsStyle='pills'>
                    {!manager.username && <NavItem ><Link to='/auth'>Authorization</Link></NavItem>}
                    {manager.username && <NavItem ><Link to='/list'>Employees</Link></NavItem>}
                    {manager.username && <NavItem ><Link to='/new'>New employee</Link></NavItem>}
                    {manager.username && <NavItem onClick={this.logOut}>Log out</NavItem>}
                </Nav>
                {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        const currentUser = localStorage.getItem('currentUser');
        if(currentUser) {
            this.props.managerActions.setManager(JSON.parse(currentUser));
        }
    }

    logOut = () => {
        this.props.managerActions.logOut();
    };
}

function mapStateToProps (state) {
    return {
        manager: state.manager,
        employee: state.employee
    }
}

function mapDispatchToProps(dispatch) {
    return {
        managerActions: bindActionCreators(managerActions, dispatch),
        employeeActions: bindActionCreators(employeeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)