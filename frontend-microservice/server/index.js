import express from 'express';
import docsRoutes from './docs.js';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/', docsRoutes);

export default router;