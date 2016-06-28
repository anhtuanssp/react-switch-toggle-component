'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
require('./style.scss');

class SwitchToggle extends React.Component {
    
    static propTypes = {
        onChange: React.PropTypes.func,
        size: React.PropTypes.string,
        id: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        size: 'large',
        checked: false
    };

    constructor(props) {
        super(props);
        this.displayName = 'SwitchToggle';
        this.rootClassName = 'switch';
    }

    getValue() {
        return this.input ? this.input.checked : undefined;
    }

    handleChange = () => {
        if(this.props.onChange) {
            this.props.onChange();
        }
    }

    render() {

        let rootProps = {
            className: `${this.rootClassName} ${this.props.size}`
        };

        let inputProps = {
            id: this.props.id,
            ref: (elem) => this.input = elem,
            className: 'cmn-toggle cmn-toggle-round-flat',
            type: 'checkbox',
            check: this.props.checked,
            onChange: this.handleChange
        };

        let labelProps = {
            htmlFor: this.props.id
        };

        return (
            <div {...rootProps}>
                <input {...inputProps} />
                <label {...labelProps}></label>
            </div>
        )
    }
}

export default SwitchToggle;
