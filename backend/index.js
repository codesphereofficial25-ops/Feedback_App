// const http = require('http');

// const port = 3000;

// const server = http.createServer((req, res) => {
//     // Route handling
//     if (req.url === '/' && req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Hello World!');
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
//     }
// });

// server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express()

app.get('/', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('Hello World');
})

app.use(express.json());

let feedbacks = [];

app.get('/feedback', (req, res) => {
  res.json(feedbacks);
})

app.post('/feedback', (req, res) => {
  const {name, feedback} = req.body;
  if(!name || !feedback){
    return res.status(400).json({ error: "Name and Message required"});
  }

  const newFeedback = {
    id: Date.now(),
    name: name,
    feedback: feedback,
  }

  feedback.push(newFeedback);
  res.status(201).json(newFeedback);

});


app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
})








