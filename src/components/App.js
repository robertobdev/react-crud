import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button }  from '@material-ui/core';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      name: '',
      completed: '',
      title: 'React simple todo',
      counter: 0,
      previousCounter: 0,
      status: 0 //its means that status is to create a new todo
    }
  }


  handleOnClick(type){
    let name = this.state.name;
    let completed = this.state.completed;
    let counter = this.state.counter;
    let todo = {
      name, completed, counter
    };
    if (type === "new") {
      counter += 1;
      this.setState({ todos: [...this.state.todos, todo], counter, previousCounter: counter, name : '', completed : '', status : 0 });
      this.refs.todoForm.reset();
    } else {
      let todos = this.state.todos.map(todo => {
        if (todo.counter == this.state.previousCounter) {
          todo.name = name,
          todo.completed = completed  
        }
        return todo;
      });
      console.log(todos);
      this.setState({ todos, previousCounter: counter, name: '', completed: '', status: 0 });
    }
  }
  handleUpdate(t) {
    console.log(t);
    this.setState({ name: t.name, completed: t.completed, status : 1, previousCounter : t.counter });
  }

  handleInputs = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleRemove(t) {
    console.log(t);
    let todos = this.state.todos.filter(todo => todo.counter !== t.counter);
    console.log(todos);
    this.setState({ todos });
  } 

  render() {
    let title = this.state.title;
    let todos = this.state.todos;
    const isUpdate = this.state.status;
    const buttons = isUpdate ? (
      <div>
        <Button color="primary" onClick={() => this.handleOnClick('new')}>Add todo</Button>
        <Button color="primary" onClick={() => this.handleOnClick('update')}>Update</Button>
      </div>
    ) : (<Button color="primary" onClick={() => this.handleOnClick('new')}>Add todo</Button>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <h1>{title}</h1>
          <form ref="todoForm">
            <TextField label="what do you need to do" id="name" value={this.state.name} onChange={this.handleInputs} />
            <TextField label="is it done yet?" id="completed" value={this.state.completed} onChange={this.handleInputs} />
            {/* <Button color="primary" onClick={() => this.handleOnClick('new')}>Add todo</Button>
              <Button color="primary"  onClick={() => this.handleOnClick('update')}>Update</Button> */}
            {buttons}
          </form>
        </div>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map(todo => {
                return (
                  <TableRow key={todo.counter}>
                    <TableCell>
                      {todo.counter}
                    </TableCell> 
                    <TableCell>
                      {todo.name}
                    </TableCell> 
                    <TableCell>
                      {todo.completed}
                    </TableCell> 
                    <TableCell>
                      <Button color="primary" onClick={() => this.handleRemove(todo)}>Remove</Button>
                      <Button color="primary" onClick={() => this.handleUpdate(todo)}>Edit</Button>
                    </TableCell> 
                 </TableRow>
               ) 
             })} 
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
