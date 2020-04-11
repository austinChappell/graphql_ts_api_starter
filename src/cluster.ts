import { cpus } from 'os';
import cluster from 'cluster';

import Server from './server';

const server = new Server();

if (cluster.isMaster) {
  // Count the machine's CPUs
  // eslint-disable-next-line global-require
  const cpuCount = cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  // eslint-disable-next-line global-require
  server.start();
}
