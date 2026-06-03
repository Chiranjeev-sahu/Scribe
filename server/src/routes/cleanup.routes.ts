import { Router } from 'express';

import { runCleanup } from '@/jobs/cleanupPosts.js';
import { APIResponse } from '@/util/apiResponse.js';
import { asyncHandler } from '@/util/asyncHandler.js';

const cleanupRouter = Router();

cleanupRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      res
        .status(503)
        .json(new APIResponse(503, null, 'Cleanup route is not configured'));
      return;
    }

    if (req.headers.authorization !== `Bearer ${cronSecret}`) {
      res.status(401).json(new APIResponse(401, null, 'Unauthorized'));
      return;
    }

    const result = await runCleanup();

    res
      .status(200)
      .json(new APIResponse(200, result, 'Cleanup completed successfully'));
  })
);

export { cleanupRouter };
