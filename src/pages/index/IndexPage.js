'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SwitchToggle from 'components/SwitchToggle/SwitchToggle';

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.refs.switchTest.getValue());
    }

    onChange = () => {
        console.log(this.refs.switchTest.getValue());
    }

    render() {
        return (
            <SwitchToggle size="small" id="test-1" ref="switchTest" onChange={this.onChange} />
        )
    }
}

export default IndexPage;
