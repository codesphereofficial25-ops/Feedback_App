// No need Just for explanation

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
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let feedbacks = [];

// No need just for explanation

// app.get('/', (req, res) => {
//   console.log(req);
//   console.log(res);
//   res.send('Hello World');
// })

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
    name,
    feedback
  }

  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);

});

// Update feedback
app.put("/feedback/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, feedback } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ error: "Name and Feedback both are required!" });
  }
  
  const index = feedbacks.findIndex((f) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Feedback not found!"} )
  }

  feedbacks[index] = { ...feedbacks[index], name, feedback };
  res.status(200).json(feedbacks[index]);

})

// Delete feedbacks
app.delete("/feedback/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = feedbacks.findIndex((f) => f.id === id);

  if (index === -1 ) {
    return res.status(404).json({ error: "Feedback not found!"} )
  }

  const deleteFeedback = feedbacks[index];
  feedbacks.splice(index, 1);

  res.status(200).json({
    message: "Feedback deleted successfully",
    deleteFeedback,
  })
})


app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
})







