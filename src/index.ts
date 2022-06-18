import env from 'dotenv';
import server from './server';

env.config();

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000;

server.listen(port, () => {
  console.log(`The server is listening at ${port}`);
});
