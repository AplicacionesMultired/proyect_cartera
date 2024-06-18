import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
const conection = new Sequelize('POWERBI', 'consultas_bd_pw', '123456Asd.', {
  host: '172.20.1.216',
  port: 4090,
  dialect: 'mysql'
});

export { conection }