import { useState } from 'react'
// on importe le composant tableau
import DataTable from 'react-data-table-component';

function App() {
    // Je stock la saisi dans l'input
    const [task, setTask] = useState("");
    // 'taskList' stockage du tableau d'objets
    const [taskList, setTaskList] = useState([]);

    /**
     On crée la logique de suppression
     */
    const deleteTask = (idToDelete) => {
        const updatedList = taskList.filter(t => t.id !== idToDelete);
        setTaskList(updatedList);
    };

    /**
     * 2. Je configure les colonnes du tableau
     */
    const columns = [
        {
            // Liste des tâches stockées
            name: 'Mes tâches',
            selector: row => row.title, // Indique quelle propriété de l'objet afficher
            sortable: true,
        },
        {
            // Bouton pour supprimer une tâche
            name: 'Action',
            cell: (row) => (
                <button onClick={() => deleteTask(row.id)}>Supprimer</button>
            ),
        }
    ];

    /**
     * Je crée la logique d'ajout d'une tâche
     */
    const addTask = () => {
        // J'empêche d'ajouter des tâches si la saisie est vide
        if (task.trim() !== "") {
            // Création de l'objet tâche avec une clé unique.
            const newTaskObject = { id: Date.now(), title: task };

            // Mise à jour de l'état pour garder l'ancien contenu
            setTaskList([...taskList, newTaskObject]);

            // Réinitialisation du champ de saisie
            setTask("");
        }
    };

    return ( // On appelle les résultats dans une div afin de les afficher en front
        <div style={{ display: "flex", gap: '20px', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
            <h1>Ajouter une tâche</h1>
            <div style={{ display: "flex", gap: '10px' }}>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Ecrivez ici"
                />
                <button onClick={addTask}>Ajouter</button>
            </div>

            {/* Affichage du tableau*/}
            <DataTable
                columns={columns}
                data={taskList}
                noDataComponent="Aucune tâche" // Message affiché si le tableau est vide
            />
        </div>
    );
}

export default App;