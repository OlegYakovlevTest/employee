import React, { Component } from 'react'
import { connect } from 'react-redux'
import Employee from '../components/Employee'
import * as userActions from '../actions/UserActions'
import { bindActionCreators } from 'redux'
import TestComponent from '../components/TestComponent'

class App extends Component {
    render() {
        console.log('--------');
        // const { user } = this.props
        return <div>
            <Employee name={'sadsa'} />
            <TestComponent></TestComponent>
        </div>
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        employee: state.employee
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)