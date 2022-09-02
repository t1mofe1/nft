import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
	process.env.NODE_ENV === 'production' ? res.send(path.join(__dirname, '../public', 'index.html')) : res.redirect('http://localhost:3000');
});

export default router;
