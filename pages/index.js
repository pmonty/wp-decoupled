import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';
import AddToCartButton from "../components/cart/AddToCartButton";
import Hero from "../components/home/Hero";

/**
 * GraphQL products query
 */
const PRODUCTS_QUERY = gql`query {
					products {
						nodes {
							id
							productId
							averageRating
							slug
							description
							image {
								uri
								title
								srcSet
								sourceUrl
							}
							name
							price
						}
					}
				}`;

const NewProducts = ({ products }) => {

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-5">Products</h2>
			{ products.length ? (
				<div className="mt-2">
					<div className="products-wrapper row">
						{
							products.map( item => (
								<div className="product-container col-md-3 mb-5" key={item.id}>
									<Link as={`/product/${item.slug}-${item.productId}`} href={`/product?slug=${item.slug}-${item.productId}`}>
										<span className="product-link">
											<img className="product-image" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={ item.name }/>
											<h5 className="product-name">{item.name}</h5>
											<p className="product-price">{item.price}</p>
										</span>
									</Link>
									<AddToCartButton product={ item } />
								</div>
							) )
						}
					</div>
				</div>
			) : '' }
		</div>
	);
};

const Index = ( props ) => {

	const { products } = props;
	const recentProducts = products.slice( 0, 4 );

	return (
		<Layout>
			<Hero/>
			{/*<Categories/>*/}
			<NewProducts products={ recentProducts } />
		</Layout>
	);
};

Index.getInitialProps = async () => {

	const result = await client.query({
		query: PRODUCTS_QUERY
	});

	return {
		products: result.data.products.nodes,
	}
};

export default Index;
