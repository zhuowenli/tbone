/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:04
 */

import React from 'react';

class View3 extends React.Component {
    render() {
        return (
            <div>
                <p>I am view3</p>
                <p>route: {this.props.match.path}</p>
            </div>
        );
    }
}

export default View3;
