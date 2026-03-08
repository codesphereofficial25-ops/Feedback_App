import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchFeedback = async () => {
    const res = await fetch("http://localhost:3000/feedback");
    const data = await res.json();
    setFeedbacks(data);
  }

  useEffect(() => {
    fetchFeedback();
  }, []);

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (!name || !feedback) {
      alert("All fields are required!");
      return;
    }

    const url = editingId
      ? `http://localhost:3000/feedback/${editingId}`
      : "http://localhost:3000/feedback";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, feedback})
    });

    setName("");
    setFeedback("");
    setEditingId(null);
    fetchFeedback();
  };

  const startEdit = (item) => {
    setName(item.name);
    setFeedback(item.feedback);
    setEditingId(item.id);
  };

  const deleteFeedback = async (id) => {
    await fetch(`http://localhost:3000/feedback/${id}`, {
      method: "DELETE",
    });
    fetchFeedback();
  };

  const cancelEdit = () => {
    setName("");
    setFeedback("");
    setEditingId(null);
  };

  return (
    <>
      <div className="container m-5 p-5">
        <h3>Feedback App</h3>

        <form onSubmit={submitFeedback}>
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
          <button type="submit" className="btn btn-outline-success">
            {editingId ? "Update" : "Submit"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-outline-secondary ms-2"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
        <hr />
        <h3>All Feedbacks:</h3>

        {
          feedbacks.map((f) => (
            <div className='m-4' key={f.id}>
             <strong>{f.name}</strong>: {f.feedback}
             <div className="mt-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => startEdit(f)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteFeedback(f.id)}
              >
                Delete
              </button>
             </div>
             <hr />
            </div>
          ))
        }

      </div>
    </>
  )
}

export default App
