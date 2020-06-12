/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:03
 */

import { render, h } from 'omio';
import './components/todo';
import Store from './store';

export default function createApp() {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
    render(<todo-app />, '#app', new Store());
}
