// import { conection } from './connections/cartera';
import express from 'express';
import { getCartera } from './controllers/cartera.controller';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/cartera', getCartera);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*
async function test(){
  try {
    await conection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();
*/