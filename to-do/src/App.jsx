import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Section from "./components/Section";
import List from "./components/List";
import "./App.css"
import swal from 'sweetalert';
import todos from "./apis";

const appTitle = "| Todo-List With Backend |";

const App = () => {

  const [todoList, setTodoList] = useState([]);

  useEffect(() => { //req for backend to get info and save data in todoList state
    async function fetchData() {
      const { data } = await todos.get("/todos"); //send get req to server on port 3030 to collection /todos
      setTodoList(data);
    }

    fetchData();
  }, []);

  const editTodo = async (id, item) => {
    await todos.put(`/todos/${id}`, item);
  };

  const addTodo = async (item) => {
    const { data } = await todos.post("/todos", item); //send post req to server on port 3030 to collection /todos
    setTodoList((oldList) => [...oldList, data]); //create new note
  };

  const removeTodo = async (id) => {
    // Sweet alert modal function

    try {
      const willDelete = await swal({
        title: "¿Estás seguro?",
        text: "Una vez eliminada, tendrás que crear tu nota nuevamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      });

      if (willDelete) { //if user select delete > todos.delet send req for backend to delete note
        await todos.delete(`/todos/${id}`); //send delete req to server on port 3030 to collection /todos
        setTodoList(oldList => oldList.filter(item => item._id !== id)); // remove note

        swal("Tu nota fue eliminada correctamente", {
          icon: "success"
        });
      } else { //if user select cancel, actions be stop
        swal("Cancelaste la eliminación de tu nota");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="ui container center aligned" id="main-container">
      <Section>
        <h1 id="app-title">{appTitle}</h1>
      </Section>
      <Section>
        <Form addTodo={addTodo} />
      </Section>
      <Section>
        <List removeTodoListProp={removeTodo} list={todoList} editTodoListProp={editTodo} />
      </Section>
    </div>
  )
}
export default App;