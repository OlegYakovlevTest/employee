import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import 'react-date-picker/index.css';
import DatePicker from 'react-datepicker';
import './EmployeeForm.css';
require('react-datepicker/dist/react-datepicker.css');
require('moment');
import Dropzone from 'react-dropzone';
// import ImagePreview from 'react-image-preview';

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
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            Photo
                        </Col>
                        <Col sm={10}>
                            <Dropzone onDrop={this.onDrop}>
                                {
                                    this.state.employee.photo ?
                                        <img className='photo' src={'data:image/*;base64,' + this.state.employee.photo}/> :
                                        <div>Try dropping some files here, or click to select files to upload.</div>
                                }
                            </Dropzone>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            First name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                placeholder='First name'
                                value={this.state.employee.fname}
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
                                value={this.state.employee.lname}
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
                                value={this.state.employee.mname}
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
                                value={this.state.employee.position}
                                onChange={this.onPositioChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={2}>
                            First day
                        </Col>
                        <Col sm={10}>
                            <DatePicker
                                selected={this.state.employee.firstDay}
                                onChange={this.onDateChange}
                                withPortal/>
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
                photo: ''
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
                        value={this.state.employee.skills[0]}
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
        let photo = {};
        const readerOnload = (e) => {
            const base64 = btoa(e.target.result);
            photo.base64 = base64;
            this.setState({
                ...this.state,
                employee: {
                    ...this.state.employee,
                    photo: base64
                }
            });
        };

        let reader = new FileReader();
        reader.onload = readerOnload;

        const file = acceptedFiles[0];
        photo.filetype = file.type;
        photo.size = file.size;
        photo.filename = file.name;
        reader.readAsBinaryString(file);
    };

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