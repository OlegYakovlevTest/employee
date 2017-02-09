import React, {Component}  from 'react'

export class myModalComopnent extends Component {
    constructor(props) {
        super(props);
        console.log('## MODAL DATA AND PROPS:', this.props);
    }

    removeThisModal() {
        this.props.removeModal();
    }

    render() {
        return (
            <div>
                <p>this is my modal</p>
                <button
                    type='button'
                    onClick={this.removeThisModal.bind(this)}>
                    close this modal
                </button>
            </div>
        );
    }
}