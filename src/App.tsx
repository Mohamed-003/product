import Navbar from './Layouts/Navbar';
import '@fontsource/plus-jakarta-sans';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import { SnackbarProvider } from 'notistack';
import RouterComponent from './Router';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);

let theme = createTheme({
	palette: {
		primary: {
			main: '#de3838',
		},
		info: {
			main: '#54545b',
		},
		secondary: {
			main: '#232323',
		},
		warning: {
			main: '#EFEFF0',
		},
		neutral: {
			main: '#2f2f2f',
		},
		success: {
			main: '#2e7d32',
		},
	},
	shape: {
		borderRadius: 1,
	},
	typography: {
		fontFamily: ['Plus Jakarta Sans', 'sans-serif'].join(','),
		button: {
			textTransform: 'none',
		},
	},
});
theme = responsiveFontSizes(theme);

const App = () => {
	useEffect(() => {
		store.dispatch<any>(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<SnackbarProvider maxSnack={3} preventDuplicate hideIconVariant>
						<CssBaseline />
						<Navbar />
						<RouterComponent />
					</SnackbarProvider>
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

export default App;
