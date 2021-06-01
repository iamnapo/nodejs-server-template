export default `#graphql
	type Ping {
		message: String!
	}

	type Query {
		ping: Ping!
	}
`;
