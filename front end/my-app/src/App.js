//importing usestate and useeffect from react to use it in the app.js
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  //created taskname and alltask to store the values of task and alltask in the to-do-list app
  const [taskName, settaskName] = useState('');
  // console.log(taskName);
  const [allTask, setallTask] = useState([]);
  //calling api to fetch the data from node-persist when the form is submitted
  const submitForm = async e => {
    e.preventDefault();
    try {
      console.log(taskName);
      const resp = await axios.post("http://localhost:5000/todolist", taskName);
      console.log(resp.data);

      //calling the function again to display the data when it is added newly
      getData();
    }

    catch (err) {
      console.error(err.message);
    }
  }
  //using async function to get the data using api fetch
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/alltasks');
      console.log(response.data);
      setallTask(response.data);
      console.log(allTask);
    } catch (err) {

      console.error(err.message);
    }
  }
  
  //calling the getdata method in useeffect to display the data for n number of times
  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      {/*creating form in bootstrap to get the output of the to-do-list form*/}
      <form action='' onSubmit={submitForm}>
        <h1 className='h1'>To Do List App</h1>
        <div className="input-group input-group-lg">
          <span className="input-group-text mt-5 fw-bold" id="inputGroup-sizing-lg">Enter the task:</span>
          <input type="text" className="form-control mt-5" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Get groceries' name="taskName" value={taskName.taskname}
            onChange={(e) => settaskName({ ...taskName, taskname: e.target.value })} />
          <button type="submit" className="btn btn-custom mt-5">Add Task</button>
        </div>
      </form>
      <div>
        {/*calling map function to display the data from the database*/}
        {allTask.map((item, index) => {
          return (
            <div className="input-group input-group-lg">
              <span className="input-group-text m-auto justify-content-center mt-3" id="inputGroup-sizing-lg" style={{ "width": "50%" }}>
                <div style={{ "background-color": "white" }} key={index}>{item.taskname}</div>
                <button className="btn btn-danger" onClick={() => { deleteTask(item.id) }}>X</button>
              </span>
            </div>
            // <div key={index}>
            // {item.taskName}
            // </div>
          )
        })}
      </div>
    </>
  )
}
export default App;