import { app } from '@/app.js';
import { connectDb } from '@/config/db.js';
import config from './config/config.js';
import { startCleanupJob } from './jobs/cleanupPosts.js';

(async () => {
  try {
    await connectDb();
    startCleanupJob();
    app.listen(config.port, () => {
      console.log('Serve on port: ', config.port);
      console.log(`URL: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
