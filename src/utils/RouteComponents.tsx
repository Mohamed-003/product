import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import PrivateRouteSix from '../Components/Routing/PrivateRouteSix';
import AddressInfo from '../Layouts/AddressInfo';
import PaymentInfo from '../Layouts/PaymentInfo';
import AddAddressPage from '../Pages/AddAddressPage';
import Cart from '../Pages/Cartpage';
import Homepage from '../Pages/Homepage';
import { aboutUs } from '../Pages/LegalDocs/Constants/AboutUs';
import { deliveryInformation } from '../Pages/LegalDocs/Constants/DeliveryInformation';
import { privacyPolicy } from '../Pages/LegalDocs/Constants/PrivacyPolicy';
import { returnPolicy } from '../Pages/LegalDocs/Constants/ReturnPolicy';
import { Terms } from '../Pages/LegalDocs/Constants/Terms&conditions';
import { LegalDocsComponent } from '../Pages/LegalDocs/LegalDocs';
import PreviousOrdersPage from '../Pages/PreviousOrdersPage';
import Productpage from '../Pages/Productpage';
import ProfilePage from '../Pages/ProfilePage';
import Searchpage from '../Pages/Searchpage';
import Sitemap from '../Sitemap';
import Loading from './Loading';

type RouteTypes = {
	[key: string]: ReactJSXElement;
};

type legalDocVarTypes = {
	[key: string]: any;
};

const legalDocVariables: legalDocVarTypes[] = [
	{
		key: 1,
		name: 'terms-and-conditions',
		propValue: Terms,
	},
	{
		key: 2,
		name: 'privacy-policy',
		propValue: privacyPolicy,
	},
	{
		key: 3,
		name: 'return-policy',
		propValue: returnPolicy,
	},
	{
		key: 4,
		name: 'delivery-info',
		propValue: deliveryInformation,
	},
	{
		key: 5,
		name: 'about-us',
		propValue: aboutUs,
	},
];

const privateRouteConst: legalDocVarTypes[] = [
	{
		path: '/checkout',
		element: <Cart />,
		compname: 'cart',
	},
	{
		path: '/delivery-address',
		element: <AddressInfo />,
		compname: 'deliveryaddress',
	},
	{
		path: '/payment-details',
		element: <PaymentInfo />,
		compname: 'payment',
	},
	{
		path: '/profile',
		element: <ProfilePage />,
		compname: 'profile',
	},
	{
		path: '/orders',
		element: <PreviousOrdersPage />,
		compname: 'orders',
	},
	{
		path: '/address',
		element: <AddAddressPage />,
		compname: 'addressinfo',
	},
];

type LegaldocObj = {
	[key: string]: ReactJSXElement;
};

function generateLegalDocsRoute() {
	let obj: LegaldocObj = {};
	legalDocVariables.map((value) => {
		obj[value.name] = <LegalDocsComponent doc={value.propValue} />;
	});

	return obj;
}

function generatePrivateRoutes() {
	let obj: LegaldocObj = {};
	privateRouteConst.map((route) => {
		obj[route.compname] = (
			<>
				<PrivateRouteSix redirectTo="/">
					<React.Suspense fallback={<Loading />}>
						{route.element}
					</React.Suspense>
				</PrivateRouteSix>
			</>
		);
	});
	return obj;
}

export const routeComponents: RouteTypes = {
	home: <Homepage />,
	search: <Searchpage />,
	product: <Productpage />,
	sitemap: <Sitemap />,
	...generateLegalDocsRoute(),
	...generatePrivateRoutes(),
};
