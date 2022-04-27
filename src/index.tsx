import ReactDOM from 'react-dom';
import App from './App';
const sitemap = require('../public/sitemap.xml');
const robots = require('../public/robots.txt');

// ReactDOM.render(<App />, document.getElementById('root'));

const rootElement: any = document.getElementById('root');
if (rootElement.hasChildNodes()) {
	ReactDOM.hydrate(<App />, rootElement);
} else {
	ReactDOM.render(<App />, rootElement);
}
