import { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showButtonsForTaskId, setShowButtonsForTaskId] = useState(null);
  const [editTasks, setEditTasks] = useState(false);

  const addTask = () => {
    if (selectedTask) {
      setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, text: task } : t));
      setSelectedTask(null);
      setTask("");
      setShowButtonsForTaskId(null);
      return;
    } else {
      setTasks([...tasks, { id: `${Date.now()}${task}`, text: task, completado: false }]);
    }
    setTask('');
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completado: !t.completado } : t));
  };

  const taskDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setShowButtonsForTaskId(null);
  };

  const editTask = (task) => {
    setTask(task.text);
    setSelectedTask(task);
    setEditTasks(true);
    setShowButtonsForTaskId(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.taskInput}
        placeholder="Agrega una tarea"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>{editTasks ? "Guardar Cambios" : "Agregar Tarea"}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View key={task.id} style={[styles.task, task.completado && styles.completeTask]}>
            <TouchableOpacity
              onPress={() => setShowButtonsForTaskId(task.id)}
              onLongPress={() => toggleTaskComplete(task.id)}
              style={styles.taskTextContainer}
            >
              <Text style={styles.taskText}>{task.text}</Text>
            </TouchableOpacity>
            
            {showButtonsForTaskId === task.id && (
              <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => { setEditTasks(true); editTask(task); }} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => taskDelete(task.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  taskInput: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: "center"
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tasksContainer: {
    marginTop: 20,
  },
  task: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  taskTextContainer: {
    maxWidth: "70%",
  },
  taskText: {
    maxWidth: "100%",
  },
  completeTask: {
    backgroundColor: "#d1e7dd"
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  }
});
