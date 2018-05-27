import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Button }  from '@material-ui/core';
class Form extends Component {
  
  constructor(props) {
    super(props);
  }

  // handleChange = (event) => {
  //   let key = event.target.id;
  //   this.setState({ [key]: event.target.value });
  // }

  handleChange = (event) => {
    this.props.onChange(event);
  }

  render() {
    return (
      <div>
        <TextField label="name" id="name" onChange={this.handleChange} />
        <TextField label="age" id="age" onChange={this.handleChange} />
        <Button color="primary" onClick={this.props.onClick}>Save</Button>
      </div>
    )
  }
}

class App extends Component {
  data;
  id = 0;
  constructor(props) {
    super(props);
    this.data = [
      this.createData('Frozen yoghurt', 24),
      this.createData('Ice cream sandwich', 37),
      this.createData('Eclair', 24),
      this.createData('Cupcake', 67),
      this.createData('Gingerbread', 49)
    ];
    this.state = { person: { name: '', age: '' }, data : this.data };
    console.log(this.data);
  }
  createData = (name, age) => {
    let id = this.id += 1;
    return {id, name, age};
  }

  handleClick = () => {
    console.log(this.state.person);
    this.setState({ data: [ ...this.state.data, this.createData(this.state.person.name, this.state.person.age)] });
  }
  handleRemovePerson(person) {
    let id = person.id;
    this.setState({
      data: this.state.data.filter(person => person.id !== id)
    })
    console.log(person);
  }

  handleEditPerson(person){
    console.log(this.state.person);
    this.setState({ data: [...this.state.data, this.createData(this.state.person.name, this.state.person.age)] });
  }

  handleChange = (event) => {
    let key = event.target.id;
    this.state.person[key] = event.target.value;
    this.setState({ person: this.state.person });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Form onClick={this.handleClick} onChange={this.handleChange}/>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Idade</TableCell>
                <TableCell>Acões</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(person => {
                return (
                  <TableRow key={person.id}>
                    <TableCell>
                      {person.id}
                    </TableCell> 
                    <TableCell>
                      {person.name}
                    </TableCell> 
                    <TableCell>
                      {person.age}s
                    </TableCell> 
                    <TableCell>
                      <Button color="primary" onClick={() => this.handleRemovePerson(person)}>Remove</Button>
                      <Button color="primary" onClick={this.handleEditPerson}>Edit</Button>
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
