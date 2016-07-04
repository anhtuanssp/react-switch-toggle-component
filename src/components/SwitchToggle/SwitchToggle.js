'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
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
            // should remove this prop, and implement set value for input
            // check: this.props.checked, 
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
