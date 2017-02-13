import React, {Component} from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import 'react-date-picker/index.css';
// import { DateField, Calendar } from 'react-date-picker';
import DatePicker from 'react-datepicker';
// import Dropzone from 'react-dropzone';
import './EmployeeForm.css';
// import moment from 'moment';
require('react-datepicker/dist/react-datepicker.css');
var moment = require('moment');
import ImagePreview from 'react-image-preview';
require('moment');

export default class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    render() {
        console.log('EditEmployeeForm', this.props, this.state);
        return (
            <div>
                <Form horizontal>
                    {/*<FormGroup controlId='formHorizontalEmail'>*/}
                        {/*<Col componentClass={ControlLabel} sm={2}>*/}
                            {/*File*/}
                        {/*</Col>*/}
                        {/*<Col sm={10}>*/}
                            {/*<FormControl type='file' placeholder='Select file' onChange={this.onInputFileChange}/>*/}
                        {/*</Col>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup controlId='formHorizontalEmail'>*/}
                        {/*<Col componentClass={ControlLabel} sm={2}>*/}
                            {/*File*/}
                        {/*</Col>*/}
                        {/*<Col sm={10}>*/}
                            {/*<Dropzone onDrop={this.onDrop}>*/}
                                {/*<div>Try dropping some files here, or click to select files to upload.</div>*/}
                            {/*</Dropzone>*/}
                        {/*</Col>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup controlId='formHorizontalEmail'>*/}
                        {/*<Col componentClass={ControlLabel} sm={2}>*/}
                            {/*File*/}
                        {/*</Col>*/}
                        {/*<Col sm={10}>*/}
                                {/*<p>Please add your images below:</p>*/}
                                {/*<ImagePreview  onChange={this.onFileChange}/>*/}
                        {/*</Col>*/}
                    {/*</FormGroup>*/}
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                placeholder='First name'
                                defaultValue={this.state.employee.fname}
                                onChange={this.onFnameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Last name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                placeholder='Last name'
                                defaultValue={this.state.employee.lname}
                                onChange={this.onLnameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Middle name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                placeholder='Middle name'
                                defaultValue={this.state.employee.mname}
                                onChange={this.onMnameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Position
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                placeholder='Position'
                                defaultValue={this.state.employee.position}
                                onChange={this.onPositioChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            First day
                        </Col>
                        <Col sm={10}>
                            {/*<DatePicker*/}
                                {/*selected={this.state.employee.firstDay}*/}
                                {/*onChange={this.onDateChange} />*/}
                            <DatePicker
                                selected={this.state.employee.firstDay}
                                onChange={this.onDateChange}
                                withPortal/>
                            {/*<DateField*/}
                                {/*defaultValue={'2016-05-30'}*/}
                                {/*dateFormat='YYYY-MM-DD'*/}
                            {/*/>*/}
                            {/*<DateField*/}
                                {/*dateFormat='YYYY-MM-DD'*/}
                            {/*/>*/}
                            {/*<Calendar*/}
                                {/*dateFormat='YYYY-MM-DD'*/}
                                {/*date={date}*/}
                                {/*onChange={this.onDateChange}*/}
                            {/*/>*/}
                        </Col>
                    </FormGroup>
                    { this.renderSkills() }
                    <FormGroup>
                        <Col smOffset={2} sm={12}>
                            <Button type='button' onClick={this.onAddSkillClick}>
                                Add skill
                            </Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={12}>
                            <Button type='button' onClick={this.onSaveClick}>
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    getDefaultState = () => {
        console.log(this.props.employee);
        if (this.props.employee) {
            return {
                employee: {...this.props.employee}
            };
        }
        return {
            employee: {
                fname: '',
                lname: '',
                mname: '',
                position: '',
                skills: [''],
                firstDay: null,
                photoLink: ''
            },
            photo: null
        };
    };

    renderSkills = () => {
        return this.state.employee.skills.length === 1 ?
            <FormGroup controlId='formHorizontalEmail'>
                <Col componentClass={ControlLabel} sm={2}>
                    Skills
                </Col>
                <Col sm={10}>
                    <FormControl
                        type='text'
                        placeholder='New skill'
                        defaultValue={this.state.employee.skills[0]}
                        onChange={(e) => {
                            this.onSkillsChange(e, 0)
                        }}/>
                </Col>
            </FormGroup> :
            this.state.employee.skills.map((skill, index) => {
                return <FormGroup controlId='formHorizontalEmail' key={'skill' + index}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {index === 0 ? 'Skills' : ''}
                    </Col>
                    <Col sm={8}>
                        <FormControl
                            type='text'
                            placeholder='New skill'
                            defaultValue={skill}
                            onChange={(e) => this.onSkillsChange(e, index)}/>
                    </Col>
                    <Col sm={2}>
                        <Button type='button' onClick={() => this.onDeleteSkillClick(index)}>
                            Delete skill
                        </Button>
                    </Col>
                </FormGroup>
            })
    };

    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
    }

    onDateChange = (momentDate) => {
        this.setState(
            {
                ...this.state,
                employee: {
                    ...this.state.employee,
                    firstDay: momentDate
                }
            }
        );
    };

    onAddSkillClick = () => {
        this.setState(
            {
                employee: {
                    ...this.state.employee,
                    skills: [...this.state.employee.skills, '']
                }
            }
        );
    };

    onDeleteSkillClick = (skillIndex) => {
        let skills = this.state.employee.skills;
        skills.splice(skillIndex, 1);
        this.setState(
            {
                employee: {
                    ...this.state.employee,
                    skills
                }
            }
        )
    };

    onInputFileChange = function() {
        console.log('onInputFileChange');
        console.log(arguments);
    };

    onFileChange = (photo) => {
        console.log(photo);
        this.setState({
            photo: photo[0]
        })
    };

    onFnameChange = (e) => {
        this.setState(
            {
                employee: {
                    ...this.state.employee,
                    fname: e.target.value
                }
            }
        );
    };

    onLnameChange = (e) => {
        this.setState(
            {
                employee: {
                    ...this.state.employee,
                    lname: e.target.value
                }
            }
        );
    };

    onMnameChange = (e) => {
        this.setState(
            {
                employee: {
                    ...this.state.employee,
                    mname: e.target.value
                }
            }
        );
    };

    onPositioChange = (e) => {
        this.setState(
            {
                employee: {
                    ...this.state.employee,
                    position: e.target.value
                }
            }
        );
    };

    onSkillsChange = (e, skillIndex) => {
        let skills = this.state.employee.skills;
        skills[skillIndex] = e.target.value;
        this.setState({
                employee: {
                    ...this.state.employee,
                    skills
                }
            }
        );
    };

    onSaveClick = () => {
        this.props.handlerSave(this.state.employee, this.state.photo);
        this.setState(this.getDefaultState());
    };
}

EmployeeForm.propTypes = {
    employee: React.PropTypes.object,
    handlerSave: React.PropTypes.func
};