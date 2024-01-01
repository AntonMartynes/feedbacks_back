import express from 'express'
import 'dotenv/config'
import cors from 'cors';
import { getFeedbacks, createFeedback, deleteFeedback } from './db/db.js';

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json())


app.get('/', getFeedbacks);
app.post('/', createFeedback);
app.delete('/:id', deleteFeedback);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})