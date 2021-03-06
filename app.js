import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { gradeRouter } from './routes/gradeRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

// (async () => {
//   try {
//     await db.mongoose.connect(db.url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     logger.info('Conectado ao banco de dados');
//   } catch (error) {
//     logger.error(`Erro ao conectar no banco de dados! ${error}`);

//     process.exit();
//   }
// })();


// Conectar ao MongoDB pelo mongoose
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
db.mongoose.connect(db.url, options);
db.mongoose.connection.on('connected', () => {
    console.log('Aplicacao conectada com sucesso');
});
db.mongoose.connection.on('disconnected', () => {
    console.log('Aplicacao disconectada');
});
db.mongoose.connection.on('error', (err) => {
    console.log('Erro de conexao' + err);
});

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ' https://igti-grade-app.herokuapp.com',
  })
);

app.use(gradeRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
});
