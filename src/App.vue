<template>
  <div class="container">
    <div class="title"><h1>Todo App</h1></div>
    <div class="actions">
      <form @submit="addTask">
        <input type="text" placeholder="Add Task" v-model="task" required>
        <button type="submit">Add</button>
        <!-- <input type="text" placeholder="search task"> -->
      </form>
    </div>
    <div class="tasks">
      <div class="task-items" v-for="todo in todos" :key="todo.id">
        <p>{{ todo.details }}</p>
        <button class="done-btn"  @click="updateData(todo.id)">Done</button>
        <button class="remove-btn" @click="removeTask(todo.id)">Remove</button>
      </div>
      <!-- <button class="clear-btn">Clear ALL task</button> -->
    </div>
  </div>
  
</template>
<style>
  .container {
    border: 1px solid;
    border-radius: 5px;
    width: 300px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    background-image: url(todo.jpg); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
    background-size: cover; /* Adjust the background-size property according to your preference */
    color: rgb(142, 8, 8); /* Adjust text color to make it readable on the background image */
  }

  /* Rest of your existing styles */
</style>


<script>
// import { v4 as uuidv4 } from 'uuid';
import {db} from './firebase';
import { collection, onSnapshot,addDoc,orderBy,query, serverTimestamp,doc, deleteDoc,updateDoc } from "firebase/firestore";
export default {
  data(){
    return{
      task:'',
      todos:[
      ]
    }
  },
  methods:{
    async addTask(e){
      e.preventDefault();
      // const newTask = {
      //   id:uuidv4(),
      //   details:this.task,
      //   status:false
      // }
      // this.todos.unshift(newTask);
      // this.task=''
       try {
           await addDoc(collection(db, "todos"), {
            details: this.task,
            status: false,
            date_created:serverTimestamp()
            
          });
          // console.log("Document written with ID: ", docRef);
          this.task='';
        } catch (e) {
          console.error("Error adding document: ", e);
        }

    },
   async removeTask(id){
      // const index = this.todos.findIndex(todo => todo.id === id);
      // if (index !== -1) {
      //   this.todos.splice(index, 1);
      // }
      // USING .THEN
      // const documentRef = doc(db, 'todos', id);
      //   deleteDoc(documentRef)
      //   .then(() => {
      //     console.log('Document successfully deleted.');
      //   })
      //   .catch((error) => {
      //     console.error('Error deleting document:', error);
      //   });
      // USING ASYNC AWAIT
      try{
        // const documentRef = doc(db,'todos',id)
         await deleteDoc(doc(db,'todos',id))
      }catch(e){
        console.log(e);
      }
    },
     getData(){
      const fsquery = query(collection(db, "todos"), orderBy('date_created','asc'));
      // const querySnapshot = await getDocs(collection(db, "todos"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      //   const todo = {
      //   id:doc.id,
      //   details:doc.data().details,
      //   status:doc.data().status
      //   }
      //   this.todos.unshift(todo);
       
      // });
       onSnapshot(fsquery,(querySnapshot) => {
        const newTasks = [];
        querySnapshot.forEach((doc) => {
          const todo = {
              id:doc.id,
              details:doc.data().details,
              status:doc.data().status
              }
              newTasks.unshift(todo);
           });
           this.todos=newTasks;
      });

    },
    updateData(id){
      const fsquery =doc(db, 'todos', id);
      const newData = {
        status:true
      }
      updateDoc(fsquery, newData)
      .then(() => {
        console.log('Document successfully updated.');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
    }
  },
 mounted(){
    this.getData();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  border:1px solid;
  border-radius: 5px;
  width: 300px;
  padding:20px;
  margin:0 auto;
  text-align: center;
}
.task-items{
  display: flex;
  padding:5px;
  width: 270px;
  border:1px solid #666;
  margin: 5px;
  align-items: center;
  border-radius: 5px;
}
.task-items:hover{
background-color: #ccc;
cursor: pointer;
}
.remove-btn{
  background-color: red;
  color:#fff;
  width: auto;
  height: auto;
  font-size: 14px;
  padding:5px;
  margin-right: 10px;
  cursor: pointer;
  border:1px solid;
  border-radius: 5px;
}
.done-btn{
  background-color: blue;
  color:#fff;
  width: auto;
  height: auto;
  font-size: 14px;
  padding:5px;
  cursor: pointer;
  border:1px solid;
  border-radius: 5px;
  margin-left: auto;
}
.clear-btn{
  background-color: black;
  color:#fff;
  width: auto;
  height: auto;
  font-size: 14px;
  padding:5px;
  cursor: pointer;
  border:1px solid;
  border-radius: 5px;
  margin-left: auto;
}
</style>

