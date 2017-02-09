import React, { PropTypes, Component } from 'react'

export default class Employee extends Component {
    render() {
        const { name } = this.props
        return <div>
            <p>Привет, {name}!</p>
        </div>
    }
}

Employee.propTypes = {
    name: PropTypes.string.isRequired
}