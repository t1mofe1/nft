import express from 'express';
import graphqlPlayground from 'graphql-playground-middleware-express';

const router = express.Router();

router.get(
	'/',
	graphqlPlayground({
		endpoint: '/api',
	}),
);

export default router;
