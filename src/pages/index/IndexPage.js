'use strict';

import React from 'react';
import SwitchToggle from 'components/SwitchToggle/SwitchToggle';

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: false
        }
    }

    componentDidMount() {}

    onChange = (checked) => {
        this.setState({
            value: checked
        })
    }

    onClick = () => {
        this.refs.switchTest.setValue(true);
    }

    onTurnOff = () => {
        this.refs.switchTest.setValue(false);
    }

    render() {
        let valueDisplay = '';
        if(this.state.value) {
            valueDisplay = 'true - turn on';
        } else {
            valueDisplay = 'false - turn off';
        }

        return (
            <div>
                <SwitchToggle size="medium" id="test-1" ref="switchTest" checked={true} onChange={this.onChange} />
                <SwitchToggle size="small" id="test-2" ref="switchTest2" checked={false} onChange={this.onChange} />
                <button onClick={this.onClick}>turn on</button>
                <button onClick={this.onTurnOff}>turn off</button>
                <p>{ valueDisplay }</p>
            </div>
        )
    }
}

export default IndexPage;
