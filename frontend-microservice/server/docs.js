import express from 'express';
import { validate } from 'express-validation';
import docsCtrl from './controllers/docs.js';
import validations from './validation/docs.js';

const router = express.Router();

router.route('/').get(validate(validations.getDocument),docsCtrl.get);
router.route('/:docId').get(validate(validations.getDocument),docsCtrl.get);

export default router;