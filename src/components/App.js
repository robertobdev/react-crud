import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Paper, FormControlLabel, Checkbox } from '@material-ui/core';

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
      this.setState({ todos: [...this.state.todos, todo], counter, previousCounter: counter, name: '', completed: '', status: 0 });
      this.refs.todoForm.reset();
    } else { //update todo
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
    this.setState({ name: t.name, completed: t.completed, status: 1, previousCounter: t.counter });
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

  handleChange(check){

  }

  render() {
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
          <h1 className="App-title">Today's To Do List</h1>
        </header>
        <div>
          <form ref="todoForm">
            <TextField label="what do you need to do" id="name" value={this.state.name} onChange={this.handleInputs} />
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.gilad}
                            onChange={() => this.handleChange('gilad')}
                            value="gilad"
                          />
                        }
                        label="Gilad Gray"
                      />
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
