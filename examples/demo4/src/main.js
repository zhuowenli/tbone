/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:03
 */

import { render, h } from 'omio';
import './components/todo';
import Store from './store';

render(<todo-app />, '#app', new Store());
