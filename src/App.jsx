import { useState } from 'react'
import DataTable from 'react-data-table-component';

function App() {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    // 1. La logique pour supprimer 🗑️
    const deleteTask = (idToDelete) => {
        const updatedList = taskList.filter(t => t.id !== idToDelete);
        setTaskList(updatedList);
    };

    // 2. La définition des colonnes (déplacée ici pour voir deleteTask) 📋
    const columns = [
        {
            name: 'Mes tâches',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <button onClick={() => deleteTask(row.id)}>Supprimer</button>
            ),
        }
    ];

    // 3. La logique pour ajouter ➕
    const addTask = () => {
        if (task.trim() !== "") {
            const newTaskObject = { id: Date.now(), title: task };
            setTaskList([...taskList, newTaskObject]);
            setTask("");
        }
    };

    return (
        <div style={{ display: "flex", gap: '20px', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
            <h1>Ajouter une tâche</h1>
            <div style={{ display: "flex", gap: '10px' }}>
                <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Ecrivez ici" />
                <button onClick={addTask}>Ajouter</button>
            </div>
            <DataTable columns={columns} data={taskList} noDataComponent="Aucune tâche" />
        </div>
    );
}

export default App;