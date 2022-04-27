import Product from './../Layouts/Product';
import Box from '@mui/material/Box';
import ScrollToTop from '../utils/ScrollToTop';
import AlertComponent from '../Components/AlertComponent';
import Loading from '../utils/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { productsActionCreators, State } from '../store';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function check(){
	console.log("Just Checking buddies")
}


const Productpage = () => {
	const params = useParams();
	const loading = useSelector((state: State) => state.products.loading);
	const dispatch = useDispatch();
	const { getSingleProduct, getProducts } = bindActionCreators(
		productsActionCreators,
		dispatch
	);

	useEffect(() => {
		getProducts();
		getSingleProduct(params.name);
	}, []);

	return loading ? (
		<Loading />
	) : (
		<>
			<ScrollToTop />
			<Box
				sx={{
					mx: '5%',
					pt: { xs: '20%', sm: '12%', md: '8%', lg: '6%', xl: '6%' },
				}}
			>
				<AlertComponent />
				<Product />
				<Button onClick={check}>kilik</Button>
				<Link to="/product/" >Sign up</Link>
			</Box>
			
		</>
	);
};

export default Productpage;
