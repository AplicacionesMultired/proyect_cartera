import express from 'express';
import { conection } from './connections/cartera';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

async function test(){
  try {
    await conection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();