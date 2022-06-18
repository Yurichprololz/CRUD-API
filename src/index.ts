import env from 'dotenv';
import server from './server';

env.config();

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});
