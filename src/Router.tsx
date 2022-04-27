import { Routes, Route } from 'react-router-dom';
import { routes } from './utils/RouterLinks';
import { routeComponents } from './utils/RouteComponents';
import newHome from './Pages/newHome';

function renderRouteComponent() {
	let arr = [];
	arr = routes.map((route: any) => {
		return {
			key: route.path,
			ele: (
				<Route
					path={route.path}
					key={route.path}
					element={routeComponents[route.element]}
				/>
			),
		};
	});
	return arr;
}

function RouterComponent() {
	return <Routes>{renderRouteComponent().map((route) => route.ele)}</Routes>;
}

export default RouterComponent;
