import React, { Component } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, FormControlLabel, Checkbox,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import '../App.css';
class TableComponent extends Component{
  
  // constructor(props) {
  //   super(props);
  // }

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
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
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
                  <IconButton aria-label="Delete" style={{ color: 'rgb(243, 7, 7)' }}>
                    <Edit onClick={() => this.handleUpdate(todo)} />
                  </IconButton>
                  <IconButton aria-label="Delete" style={{ color: 'rgb(243, 7, 7)' }}>
                    <DeleteIcon onClick={() => this.handleRemove(todo)}/>
                  </IconButton>
                  {/* <Button color="primary" onClick={() => this.handleUpdate(todo)}>Edit</Button> */}
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