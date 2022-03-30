import { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../lib/api/task';

const TaskPage = () => {
  const [tasks, setTasks] = useState([{number: "", name: "", target_person: "", planned_period_fr: "", planned_period_to: "", planned_workload: 1, status: "未着"}]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    handleGetTasks();
  },[])

  const handleGetTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (e) {
      setMessage("タスク取得エラー");
    } 
  }

  const addNewTask = () => {
    setTasks([...tasks,
    {number: "",
      name: "",
      target_person: "",
      planned_period_fr: "",
      planned_period_to: "",
      planned_workload: 0,
      status: "未着"
    }]);
  }

  const handleChange = (e, i) => {
    const _tempTasks = [...tasks];
    _tempTasks[i][e.target.name] = e.target.value;
    setTasks(_tempTasks);
  }

  const getTotalLoad = () => {
    return tasks.reduce((total,item) => {
      return total + Number(item.planned_workload);
    },0);
  }

  const handleDelTask = async (id) => {
    const confirmed = window.confirm("削除してもよろしいですか?");
    if (confirmed) {
      try {
          const res = await deleteTask(id);
          handleGetTasks();
      } catch (e) {
        setMessage("タスク削除エラー");
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createTask(tasks)
      if (res.data.status === 500) {
        setMessage("タスク登録エラー(500)");
      } else {
        console.log(res.status + ":" + res.data.status)
        handleGetTasks();
      }
    } catch (e) {
      setMessage("タスク登録エラー");
    }
  }

  return (
    <div className="tasks_container">
      <div>
        <button type="button" onClick={(e) => handleSubmit(e)}>登録</button>
      </div>
      <div>{message}</div>
      <table className="task-table">
        <thead>
          <th className="number-h">No.</th>
          <th className="name-h">タスク名</th>
          <th className="target-parson-h">担当</th>
          <th className="planned-period-h">開始予定日</th>
          <th className="planned-period-h">完了予定日</th>
          <th className="planned-workload-h">予定工数</th>
        </thead>
        <tbody>
          {tasks.map((task,i) => {
            return(
            <tr key={i}>
              <td className="number-d">
                <input type="text" name="number" value={task.number} onChange={(e)=>handleChange(e,i)} />
              </td>
              <td className="name-d">
                <input type="text" name="name" value={task.name} onChange={(e)=>handleChange(e,i)} />
              </td>
              <td className="planned-person-d">
                <input type="text" name="target_person" value={task.target_person} onChange={(e)=>handleChange(e,i)} />
              </td>
              <td className="planned-period-d">
                <input type="text" name="planned_period_fr" value={task.planned_period_fr} onChange={(e)=>handleChange(e,i)} />
              </td>
              <td className="planned-period-d">
                <input type="text" name="planned_period_to" value={task.planned_period_to} onChange={(e)=>handleChange(e,i)} />
              </td>
              <td className="planned-workload-d">
                <input type="text" name="planned_workload" value={task.planned_workload} onChange={(e)=>handleChange(e,i)} />
              </td>
              <td className="">
                {task.id && <button type="button" onClick={() => handleDelTask(task.id)}>削除</button>}
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
      <button type="button" onClick={() => addNewTask()}>追加</button>
      <div>Total Workload</div>
      <div>{getTotalLoad()}</div>
    </div>
  );
}

export default TaskPage;
