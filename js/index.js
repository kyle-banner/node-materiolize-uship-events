import ReactDOM from 'react-dom';

import App from './app';
import '../less/index.less';

let el = document.querySelector('#app');

let render = () => ReactDOM.render(App(), el);

render();
