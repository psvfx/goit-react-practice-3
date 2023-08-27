import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
  todos: [],
  }
  
  creatTodo = (text) => {
    const newTodos = {text, id: nanoid()}
    this.setState(({ todos }) => ({ todos: [...todos, newTodos] }))
  }

  render() {
    console.log(this.state.todos)
    return (
      <>
        <SearchForm onSubmit={this.creatTodo}></SearchForm>
        <Grid>{
          this.state.todos.map(({ text, id }) =>
          {
            return (<GridItem key={id}>
  <Todo text={text}/>
</GridItem>)
            }
          )
        }</Grid>
      </>
    );
  }
}
