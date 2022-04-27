import CaptionCard from '../Components/CaptionCard';
import ContactUs from '../Layouts/ContactUs';
import Explore from '../Layouts/Explore';
import Footer from '../Layouts/Footer';
import Hero from '../Layouts/Hero';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/system/Box';
import AlertComponent from '../Components/AlertComponent';
import { useEffect } from 'react';
import { productsActionCreators, State } from '../store';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utils/Loading';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => {
	return {
		padding: {
			// marginRight: '10%',
			// marginLeft: '10%',
			[theme.breakpoints.up('sm')]: {
				marginRight: '10%',
				marginLeft: '10%',
			},
			[theme.breakpoints.down('sm')]: {
				marginRight: '5%',
				marginLeft: '5%',
			},
		},
	};
});

const Homepage = () => {
	const dispatch = useDispatch();
	const { getProducts } = bindActionCreators(productsActionCreators, dispatch);
	const loading = useSelector((state: State) => state.products.loading);

	useEffect(() => {
		getProducts();
	}, []);
	const classes = useStyles();
	return loading ? (
		<Loading />
	) : (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>
					The Cake Point | Online Cake Delivery | Best Cake Shop | Chennai &
					Pondicherry | Bakery near me
				</title>
				<meta
					name="description"
					content="The Cake Point provide the best online cake delivery, birthday cakes and custom cakes all over Chennai & Pondicherry."
				/>
			</Helmet>
			<Hero />
			<Box className={classes.padding}>
				<AlertComponent />
				<Explore />
				{/* <CaptionCard /> */}
				<ContactUs />
			</Box>
			<Footer />
		</>
	);
};

export default Homepage;
