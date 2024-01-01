import pkg from 'pg';
import 'dotenv/config'
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgres://bnbzgqnzxirsmv:48746967f4495be1166d3d083b522efb053c840f29a1bae6aa213ce8136946f8@ec2-54-73-22-169.eu-west-1.compute.amazonaws.com:5432/dcmvha2rkgbif4',
  ssl: {
    rejectUnauthorized: false
  },
  user: process.env.DB_USERNAME || 'bnbzgqnzxirsmv',
  host: process.env.DB_HOST || 'ec2-54-73-22-169.eu-west-1.compute.amazonaws.com',
  database: process.env.DB_BDNAME || 'dcmvha2rkgbif4',
  password: process.env.DB_PASSWORD || '48746967f4495be1166d3d083b522efb053c840f29a1bae6aa213ce8136946f8',
  port: 5432,
});

client.connect();

export const getFeedbacks = (request, response) => {
  client.query('SELECT * FROM places ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error.message
    }
    response.status(200).json(results.rows)
  })
}

export const createFeedback = (request, response) => {
  const { name, reasone, description, rating } = request.body

  client.query('INSERT INTO places (name, reasone, description, rating) VALUES ($1, $2, $3, $4) RETURNING *', [name, reasone, description, rating], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

export const deleteFeedback = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM places WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}