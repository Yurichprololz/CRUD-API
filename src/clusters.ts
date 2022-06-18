import cluster from 'cluster';
import os from 'os';
import { pid } from 'process';

const startMilti = async () => {
  if (cluster.isPrimary) {
    const cpusLength = os.cpus().length;
    for (let index = 0; index < cpusLength; index += 1) {
      cluster.fork({ id: index + 1 });
    }
  } else {
    const id = cluster.worker?.id;
    console.log(`The cluster ${id} have started. It's pid: ${pid}`);
    await import('./index');
  }
};

startMilti();
