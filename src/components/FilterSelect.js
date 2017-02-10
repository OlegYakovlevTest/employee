import React, { Component } from 'react';
import Select from 'react-select';
import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

export default class FilterSelect extends Component {

    render() {
        console.log('Select', this.props);
        const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        {/*<Creatable*/}
            {/*options={options}*/}
            {/*value={[1, 2]}*/}
        {/*/>*/}
        return (
            <div>
                <Select
                    value={['one', 'two']}
                    options={options}
                    onChange={this.logChange}
                    multi={true}
                />
                <Creatable
                    name='form-field-name'
                    value={['one', 'two']}
                    options={options}
                    onChange={this.logChange}
                />
            </div>
        );
    }

    logChange = (val) => {
        console.log('Selected: ' + val, val);
    }

}