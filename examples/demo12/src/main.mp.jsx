/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:04
 */

import React from 'react';
import { render, h } from 'react-dom';
import App from './app';

export default function createApp() {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    render(<App />, container);
}
