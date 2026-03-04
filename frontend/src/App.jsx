import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {
    const res = await fetch("http://localhost:3000/feedback");
    const data = await res.json();
    setFeedbacks(data);
  }

  useEffect(() => {
    fetchFeedback();
  }, []);

  const submitFeedback = async () => {
    if (!name || !feedback) {
      alert("All fields are required!");
      return;
    } 

    await fetch("http://localhost:3000/feedback", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, feedback})
    })

    setName("");
    setFeedback("");
    fetchFeedback();
  }

  return (
    <>
      <div className="container m-5 p-5">
        <h3>Feedback App</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label mt-5">Name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">Feedback: </label>
            <textarea
              type="text"
              className="form-control"
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <button onClick={submitFeedback} type="submit" className="btn btn-outline-success">Submit</button>
        </form>
        <hr />
        <h3>All Feedbacks:</h3>

        {
          feedbacks.map((f) => (
            <div className='m-4' key={f.id}>
             <strong>{f.name}</strong>: {f.feedback} <hr />
            </div>
          ))
        }

      </div>
    </>
  )
}

export default App
