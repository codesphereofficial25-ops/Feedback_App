import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    if(!name || !feedback){
      alert("All fields are required!");
      return;
    }
  }

  return (
    <>
      <div className="container m-5 p-5">
        <h3>Feedback App</h3>

        <form>
          <div className="mb-3">
            <label for="name" className="form-label mt-5">Name: </label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              aria-describedby="emailHelp" 
              value={ name }
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="feedback" className="form-label">Feedback: </label>
            <textarea 
              type="text" 
              className="form-control" 
              id="feedback" 
              value={ feedback }
              onChange={ (e) => setFeedback(e.target.value) }
            />
          </div>
          <button onClick={ submitFeedback } type="submit" className="btn btn-outline-success">Submit</button>
        </form>
        <hr />
        <h3>All Feedbacks:</h3>
      </div>
    </>
  )
}

export default App
