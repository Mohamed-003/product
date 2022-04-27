import React from 'react';
import RouterComponent from './Router';
import DynamicSitemap from 'react-dynamic-sitemap';
import { Box } from '@mui/material';

export default function Sitemap(props: any) {
	return (
		<Box mt={10}>
			<DynamicSitemap routes={RouterComponent} prettify={true} {...props} />
		</Box>
	);
}
