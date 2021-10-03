const resolvers = {
	Query: {
		ping() {
			return { message: "pong" };
		},
	},
};

export default resolvers;
