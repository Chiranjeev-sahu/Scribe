// src/jobs/cleanup.job.ts
import cron from 'node-cron';

import { Post } from '@/models/post.model.js';

export const startCleanupJob = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      await runCleanup();
    } catch (error) {
      console.error('Error during cleanup job:', error);
    }
  });
};

export const runCleanup = async () => {
  console.log(' Running daily database cleanup...');

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const deletedPosts = await Post.deleteMany({
    status: 'draft',
    title: 'Untitled',
    updatedAt: { $lt: oneDayAgo },
    'content.content.0.content': { $exists: false },
  });

  console.log(`Deleted ${deletedPosts.deletedCount} empty drafts.`);
  return { deletedCount: deletedPosts.deletedCount };
};
