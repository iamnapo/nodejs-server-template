const schema = `#graphql
	type Ping {
		message: String!
	}

	type Query {
		ping: Ping!
	}
`;

export default schema;
