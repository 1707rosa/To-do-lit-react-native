import { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
export default function App() {
  const [task, setTask]= useState('');
  const [tasks, setTasks]= useState([]);

  const addTask =()=>{
    setTasks([...tasks,{id:`${Date.now()}${task}`, text: task, completado:false}])
    setTask('')
  };

  const toggleTaskComplete=(id)=>{
    setTasks(tasks.map(t=> t.id===id?{...t, completado:!t.completado}: t));
  }
  const taskDelete=(id)=>{
    setTasks(tasks.filter(t=> t.id !==id));
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.taskInput} placeholder="Agrege una tarea" value={task} onChangeText={setTask}></TextInput>
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar Tarea</Text>
      </TouchableOpacity>
      <ScrollView style={styles.tasksContainer}>
          {tasks.map((task)=>(
            <TouchableOpacity key={task.id} onPress={()=>
           toggleTaskComplete(task.id)
           }
           onLongPress={()=>
            taskDelete(task.id)
          }
          style={[styles.task, task.completado && styles.completeTask]}>
            <Text style={styles.taskText}>{task.text}</Text>
        </TouchableOpacity>

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
  taskInput:{
    height:40,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor:"#fff",
    borderColor:'#ddd',
    borderWidth: 1,
    borderRadius: 6,
  },

  addButton:{
    backgroundColor: '#007bff',
    padding:10,
    borderRadius: 6,
    alignItems:"center"
  },
  addButtonText:{
    color:"#fff",
    fontWeight:"bold",
  },
  tasksContainer:{
    marginTop:20,
  },
  task:{
    backgroundColor:'#fff',
    padding: 15,
    borderRadius:6,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom: 20,
  },
  taskText:{
    maxWidth: "80%",
  },
  completeTask:{
    backgroundColor: "#d1e7dd"
  }
});
