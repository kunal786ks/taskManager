import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from "./components/Todo";
import { db } from './firebase'
import { doc, collection, onSnapshot, query, updateDoc, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { ImCross } from 'react-icons/im'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[burlywood] to-[beige]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: 'border p-2 w-full text-xl',
  button: `border p-4 ml-2 bg-purple-300  text-slate-100`,
  count: 'text-center p-2'
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [complete, setComplete] = useState(false)

  const today=new Date();
  const Month=today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate()+'/'+today.getTime();
  console.log(Month);
  //creat a task 
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('please enter the task')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
      date:Timestamp.now(),
    })
    setInput('');
  }


  //read a task
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unSub = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todosArr);
    })

    return () => {
      unSub();
    }
  }, [])


  //update task in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }


  //delete task
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  }

  //function to handle something
  const handleComplete = () => {
    setComplete(!complete);
  }
  const handleCross = () => {
    setComplete(!complete)
  }

  return (
    <>
      {complete && <div style={{ position: "absolute",borderRadius:'20px 20px 20px 20px',  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",padding: "20px", display: "flex", flexDirection: "column", width: "30%", height: "100vh", backgroundColor: "beige" }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: '200px',
            justifyContent: 'center',
            display:'flex',
            alignItems:'center'
          }}>Completed Tasks</h1>
          <button onClick={handleCross}><ImCross size={30} /></button>
        </div>
        {todos?.map((todo, index) => (
          <div>
            {todo.completed && <div style={{
              width: "100%",
              backgroundColor: 'lightGray'
              , height: '100px', border: '1px border solid',
              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
              border: '20px 10px 10px 10px',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '25px'
            }} key={index}>{todo.completed ? todo.text : ''}</div>}
            <br></br>
          </div>
        ))
        }
      </div>}
      <div>
        <div style={{ display: "flex" }}>
          <div className={style.bg}>
            <div className={style.container}>
              <h3 className={style.heading}>Task Manager</h3>
              <form onSubmit={createTodo} className={style.form}>
                <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type='text' placeholder="Add your task here" />
                <button className={style.button}><AiOutlinePlus size={30} /></button>
              </form>
              <ul>
                {todos.map((todo, index) => (
                  <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
                ))}
              </ul>
              {todos.length < 1 ? null : <p className={style.count} >{`You have ${todos.length} tasks`}</p>}
              {todos.length < 1 ? null : 
              <div onClick={handleComplete} style={{ width: "100%", backgroundColor: `${complete ? "green" : "red"}`, color: "white", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>{complete ? "Back" : "Completed Tasks"}</div>
              }</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
