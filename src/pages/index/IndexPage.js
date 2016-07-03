'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SwitchToggle from 'components/SwitchToggle/SwitchToggle';

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.refs.switchTest.state.checked);
        console.log(this.refs.switchTest2.state.checked);
    }

    onChange = (checked) => {
        console.log(checked);
    }

    render() {
        return (
            <div>
                <SwitchToggle size="medium" id="test-1" ref="switchTest" checked={true} onChange={this.onChange} />
                <SwitchToggle size="small" id="test-2" ref="switchTest2" checked={false} onChange={this.onChange} />
            </div>
        )
    }
}

export default IndexPage;
