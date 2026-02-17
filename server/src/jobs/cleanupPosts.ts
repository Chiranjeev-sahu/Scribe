// src/jobs/cleanup.job.ts
import cron from 'node-cron';
import { Post } from '@/models/post.model.js';

export const startCleanupJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log(' Running daily database cleanup...');

    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const deletedPosts = await Post.deleteMany({
        status: 'draft',
        title: 'Untitled',
        updatedAt: { $lt: oneDayAgo },
        'content.content.0.content': { $exists: false },
      });

      console.log(`Deleted ${deletedPosts.deletedCount} empty drafts.`);
    } catch (error) {
      console.error('Error during cleanup job:', error);
    }
  });
};
