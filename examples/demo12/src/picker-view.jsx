/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:04
 */

import React from 'react';

class PickerView extends React.Component {
    constructor(props) {
        super(props);
        this.pickerView = React.createRef();
        this.state = {
            value: [0, 1],
        };
        this.onChange = evt => {
            console.log(evt.detail.value);
            this.setState({
                value: evt.detail.value,
            });
        };
    }

    componentDidMount() {
        this.pickerView.current.addEventListener('change', this.onChange);
    }

    componentWillUnmount() {
        this.pickerView.current.removeEventListener('change', this.onChange);
    }

    render() {
        return (
            <picker-view ref={this.pickerView} style={{ width: '100%', height: '300px' }} value={this.state.value}>
                <picker-view-column>
                    <div>春</div>
                    <div>夏</div>
                    <div>秋</div>
                    <div>冬</div>
                </picker-view-column>
                <picker-view-column>
                    <div>2011</div>
                    <div>2012</div>
                    <div>2013</div>
                    <div>2014</div>
                    <div>2015</div>
                    <div>2016</div>
                    <div>2017</div>
                    <div>2018</div>
                </picker-view-column>
            </picker-view>
        );
    }
}

export default PickerView;
