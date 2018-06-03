import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';

class TableComponent extends Component{
  
  constructor(props) {
    super(props);
  }

  handleRemove(todo) {
    this.props.handleRemove(todo);
  }

  handleUpdate(todo) {
    this.props.handleUpdate(todo);
  }

  handleChecked(e,todo) {
    todo.completed = e.target.checked;
    this.props.handleChecked(todo);
  }

  render() {
    let todos = this.props.todo;
    return(
      <Table>
        <TableHead> 
          <TableRow>
            <TableCell>Completed</TableCell>
            <TableCell>Nome</TableCell>
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
                        checked={todo.completed}
                        onChange={(e) => this.handleChecked(e,todo)}                        
                      />
                    }                    
                  />
                </TableCell>
                <TableCell>
                  {todo.name}
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
    )
  }
}

export default TableComponent;