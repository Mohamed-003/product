import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import { Typography } from '@mui/material';
import './LegalDocs.css';
import { trustyBytesUrl } from '../../utils/Links';
import { Helmet } from 'react-helmet';
interface Docs {
	title: string;
	updatedOn?: string;
	contents: Content[];
}

interface Content {
	head: string;
	details: string;
}

interface ILegalDocsComponent {
	doc: Docs;
}

export const LegalDocsComponent = (props: ILegalDocsComponent) => {
	const { title, updatedOn, contents } = props.doc;

	return (
		<div className="LegalDocContainer">
			<Helmet>
				<meta charSet="utf-8" />
				<title>{`${title} | The Cake Point`}</title>
			</Helmet>
			<Typography variant="h4" align="center">
				{title}
			</Typography>
			{updatedOn && (
				<Typography variant="subtitle1" align="center">
					{updatedOn}
				</Typography>
			)}
			{contents.map((content) => {
				const { head, details } = content;
				return (
					<>
						<Typography variant="h5">{head}</Typography>

						<p>
							<Typography variant="body1" paragraph={true} align="justify">
								{details}
							</Typography>
						</p>
					</>
				);
			})}
			{title === 'THE CAKE POINT' && (
				<>
					{' '}
					<a
						href={trustyBytesUrl.instagram}
						title="instagram"
						target="_blank"
						rel="noreferrer noopener"
						style={{ color: '#fbad50' }}
					>
						<Instagram sx={{ marginRight: 2 }} />
					</a>
					<a
						href={trustyBytesUrl.facebook}
						title="facebook"
						target="_blank"
						rel="noreferrer noopener"
						style={{ textDecoration: 'none', color: '	#4267B2' }}
					>
						<FacebookOutlined />
					</a>
				</>
			)}
		</div>
	);
};
