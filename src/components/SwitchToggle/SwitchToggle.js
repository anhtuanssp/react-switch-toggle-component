'use strict';

import React from 'react';
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
require('./style.scss');


class SwitchToggle extends React.Component {
    
    static propTypes = {
        onChange: React.PropTypes.func,
        size: React.PropTypes.string,
        id: React.PropTypes.string.isRequired,
        style: React.PropTypes.string
    };

    static defaultProps = {
        size: 'large',
        defaultChecked: false,
        style: 'style-1'
    };

    constructor(props) {
        super(props);
        this.displayName = 'SwitchToggle';
        this.rootClassName = 'switch';
        this.state = {
            checked: this.props.checked || false
        }
    }
    
    getValue() {
        return this.input ? this.input.checked : undefined;
    }

    setValue(value) {
        if(value === null || typeof(value) !== 'boolean')
            throw new Error('setValue(): arg must be boolean.');
        this.setState({ checked: value });
    }

    handleChange = (e) => {
        this.setState({checked: e.target.checked});
        if(this.props.onChange) {
            this.props.onChange(e.target.checked);
        }
    }

    render() {
        let rootProps = {
            className: `${this.rootClassName} ${this.props.style} ${this.props.size}`
        };
        let inputProps = {
            id: this.props.id,
            ref: (elem) => this.input = elem,
            className: 'cmn-toggle cmn-toggle-round-flat',
            type: 'checkbox',
            checked: this.state.checked,
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
