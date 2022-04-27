import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../store';

const PrivateRouteSix = ({
	children,
	redirectTo,
}: {
	children: JSX.Element;
	redirectTo: string;
}) => {
	const auth = useSelector((state: State) => state.auth.isAuthenticated);
	const loading = useSelector((state: State) => state.auth.loading);
	const isAuthenticated = auth === null ? false : true;

	return isAuthenticated && !loading ? children : <Navigate to={redirectTo} />;
};

export default PrivateRouteSix;
