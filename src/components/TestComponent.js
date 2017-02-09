import React, {Component}  from 'react'
import {modal} from 'react-redux-modal'
import myModalComopnent from './myModalComopnent'

export default class TestComponent extends Component {
    constructor(props) {
        super(props);
    }

    addModal() {
        console.log('addModal');
        modal.add(myModalComopnent, {
            title: 'This is my modal',
            size: 'medium', // large, medium or small,
            // closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            // hideTitleBar: true, // (optional) Switch to true if do not want the default title bar and close button,
            // hideCloseButton: false // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;)
        });
    }

    render() {
        return <button onClick={this.addModal.bind(this)}>Add modal</button>;
    }
}