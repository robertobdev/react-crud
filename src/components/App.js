import React, { Component } from 'react';
import '../App.css';
import { TextField, Button } from '@material-ui/core';
import TableComponent from './TableComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      name: '',
      completed: false,
      title: 'React simple todo',
      counter: 0,
      previousCounter: 0,
      status: 0 //its means that status is to create a new todo
    }
  }


  handleOnClick(type) {
    let name = this.state.name;
    let completed = this.state.completed;
    let counter = this.state.counter;
    let todo = {
      name, completed, counter
    };
    //create todo
    if (type === "new") {
      counter += 1;
      this.setState({ todos: [...this.state.todos, todo], counter, previousCounter: counter, name: '', completed: false, status: 0 });
      this.refs.todoForm.reset();
    } else { //update todo
      let todos = this.state.todos.map(todo => {
        if (todo.counter === this.state.previousCounter) {
          todo.name = name,
          todo.completed = completed
        }
        return todo;
      });
      console.log(todos);
      this.setState({ todos, previousCounter: counter, name: '', completed: false, status: 0 });
    }
  }
  handleUpdate(t) {
    console.log(t);
    this.setState({ name: t.name, completed: t.completed, status: 1, previousCounter: t.counter });
  }

  handleChecked(t) {
    let todos = this.state.todos.map(todo => {
      if (todo.counter === this.state.previousCounter) {
        todo.name = t.name,
        todo.completed = t.completed
      }
      return todo;
    });
    console.log(todos);
    this.setState({ todos, previousCounter: this.state.counter, name: '', completed: false, status: 0 });
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
    let todos = this.state.todos;
    const isUpdate = this.state.status;
    const buttons = isUpdate ? (
      <div>
        <Button style={{ color: 'rgb(243, 7, 7)' }} disabled={this.state.name === '' ? true : false} onClick={() => this.handleOnClick('new')}>Add todo</Button>
        <Button style={{ color: 'rgb(243, 7, 7)' }} disabled={this.state.name === '' ? true : false} onClick={() => this.handleOnClick('update')}>Update</Button>
      </div>
    ) : (<Button style={{ color: 'rgb(243, 7, 7)' }} disabled={this.state.name === '' ? true : false}  onClick={() => this.handleOnClick('new')}>Add todo</Button>);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Today's To Do List</h1>
        </header>
        <div>
          <form ref="todoForm">
            <TextField required={true} label="what do you need to do" id="name" value={this.state.name} onChange={this.handleInputs} />
              {buttons}
          </form>
        </div>
        <div>
          <TableComponent
            todo={todos}
            handleRemove={(t) => this.handleRemove(t)}
            handleUpdate={(t) => this.handleUpdate(t)}
            handleChecked={(t) => this.handleChecked(t)}
          />
        </div>
      </div>
    );
  }
}

export default App;
