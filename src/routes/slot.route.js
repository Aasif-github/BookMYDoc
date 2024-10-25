import express from 'express';

import { getSlots } from '../controllers/slot.controller.js';

const router = express();

router.get('/slots', getSlots);

export default router;