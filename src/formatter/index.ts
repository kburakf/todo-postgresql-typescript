export const prepareTodos = (todos: Array<object>) => {
  return todos.map((todo: any) => ({
    id: todo.id,
    title: todo.title,
    done: todo.done
  }));
}