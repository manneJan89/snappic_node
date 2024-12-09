import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectToDB from './services/mongo-connnect';
import routes from './routes/_index';

const app = express();
const port = 8000;

// Connect to MongoDB
connectToDB();
  
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});