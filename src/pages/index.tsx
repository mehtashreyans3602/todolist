import React, { useState } from 'react';

interface TaskListData {
  TaskName: string;
  TaskDescription: string;
  TaskDeadline: string;
  Status: string;

}

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const [taskList, setTaskList] = useState<TaskListData[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<TaskListData[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [taskListData, setTaskListData] = useState<TaskListData>({
    TaskName: '',
    TaskDescription: '',
    TaskDeadline: '',
    Status: selectedOption || '',
  });

  const [isClicked, setisClicked] = useState(0);

  function addTask(): void {
    if (isClicked === 0) {
      setisClicked(1);
    } else {
      setisClicked(0);
    }
    console.log(isClicked);
  }

  function handleAddTask(): void {
    // Check if any of the input fields is empty and set an error message if so
    if (!taskListData.TaskName || !taskListData.TaskDescription || !taskListData.TaskDeadline) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Create a new task object using the current input values and selected radio button value
    const newTask: TaskListData = {
      TaskName: taskListData.TaskName,
      TaskDescription: taskListData.TaskDescription,
      TaskDeadline: taskListData.TaskDeadline,
      Status: selectedOption || '', // Set the Status based on the selected radio button value
    };

    // Update the taskList state by adding the new task to the existing list
    setTaskList([...taskList, newTask]);

    // Clear the form input fields and reset the error message
    setTaskListData({
      TaskName: '',
      TaskDescription: '',
      TaskDeadline: '',
      Status: '',
    });
    setErrorMessage('');
  }


  function handleTaskCompleted(taskName: string): void {
    // Find the task to mark as completed in the main task list
    const completedTask = taskList.find((task) => task.TaskName === taskName);
    if (completedTask) {
      // Add the completed task to the completed task list
      setCompletedTaskList([...completedTaskList, completedTask]);

      // Remove the task from the main task list
      const updatedTaskList = taskList.filter((task) => task.TaskName !== taskName);
      setTaskList(updatedTaskList);
    }
  }

  function RemoveTask(taskName: string): void {
    // Use the filter method to create a new array without the task to be removed
    const updatedTaskList = taskList.filter((task) => task.TaskName !== taskName);

    // Update the taskList state with the new array
    setTaskList(updatedTaskList);
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="text-white">
      <div className="w-full text-center items-center p-1 text-3xl border-b-2">Todolist</div>
      <div className="flex flex-col-reverse justify-center items-center">
        <div className='w-full flex flex-col md:flex-row justify-evenly p-2 m-1 md:space-y-0 space-y-2'>
          <div>
            <div>Tasks to Complete:</div>
            {taskList.map((task, index) => (
              <div
                className="flex md:flex-row flex-col m-1 md:space-x-2 space-x-0 md:space-y-0 space-y-2"
                key={index}
              >
                <div className="w-[50vh] md:w-[300px] h-[200px] rounded-lg drop-shadow-lg bg-gray-800 p-2">
                  <h1 className="text-xl font-normal">{task.TaskName}</h1>
                  <h3 className="text-lg font-light">Description: {task.TaskDescription}</h3>
                  <h5 className="text-md font-extralight font-sans">Deadline: {task.TaskDeadline}</h5>

                  {/* Inside the taskList.map section */}
                  <h5 className="text-md font-extralight font-sans">
                    Status: <span className={task.Status === "Important" ? 'text-blue-500' : 'text-yellow-500'}>
                      {task.Status}
                    </span>
                  </h5>

                  <br />
                  <div className="flex flex-row space-x-1">
                    <button onClick={() => handleTaskCompleted(task.TaskName)} className="text-green-500 font-medium">
                      Complete
                    </button>
                    <button onClick={() => RemoveTask(task.TaskName)} className="text-red-600 font-medium">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>Completed Tasks:</div>
            {completedTaskList.map((task, index) => (
              <div
                className="flex md:flex-row flex-col m-1 md:space-x-2 space-x-0 md:space-y-0 space-y-2"
                key={index}
              >
                <div className="w-[50vh] md:w-[300px] h-[200px] rounded-lg drop-shadow-lg bg-gray-800 p-2">
                  <h1 className="text-xl font-normal">{task.TaskName}</h1>
                  <h3 className="text-lg font-light">Description: {task.TaskDescription}</h3>
                  <h5 className="text-md font-extralight font-sans">Deadline: {task.TaskDeadline}</h5>
                  <h5 className="text-md font-extralight font-sans">
                    Status: <span className={task.Status === "Important" ? 'text-blue-500' : 'text-yellow-500'}>
                      {task.Status}
                    </span>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="m-1 p-2">
          {isClicked === 0 ? (
            <button className="text-xl px-2 text-center rounded-full ring-4 font-medium font-sans hover:bg-slate-400" onClick={addTask}>
              Create Task
            </button>
          ) : (
            <div className="w-[50vh] md:w-[300px] h-[200px] rounded-lg drop-shadow-lg bg-gray-800 p-2 m-1 text-black">
              <form className="flex flex-col space-y-1 justify-center">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <input
                  type="text"
                  placeholder="Enter Task Name:"
                  className="rounded"
                  value={taskListData.TaskName}
                  onChange={(e) => setTaskListData({ ...taskListData, TaskName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Task Description:"
                  className="rounded"
                  value={taskListData.TaskDescription}
                  onChange={(e) => setTaskListData({ ...taskListData, TaskDescription: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Task Deadline:"
                  className="rounded"
                  value={taskListData.TaskDeadline}
                  onChange={(e) => setTaskListData({ ...taskListData, TaskDeadline: e.target.value })}
                  required
                />
                <label className='text-white'>
                  <input
                    type="radio"
                    value="Important"
                    checked={selectedOption === "Important"}
                    onChange={handleRadioChange}
                  />
                  Important
                </label>

                <label className='text-white'>
                  <input
                    type="radio"
                    value="Not Important"
                    checked={selectedOption === "Not Important"}
                    onChange={handleRadioChange}
                  />
                  Not Important
                </label>

                <div className="flex justify-center space-x-1">
                  <button className="rounded bg-white hover:bg-slate-200 w-fit p-1" onClick={handleAddTask}>
                    Add Task
                  </button>
                  <button className="rounded bg-white hover:bg-slate-200 w-fit p-1" onClick={addTask}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
