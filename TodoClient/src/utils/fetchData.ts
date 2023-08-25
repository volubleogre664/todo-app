import api from "./axios";
import type { Todo } from "@/types/Todo";

async function getTodos(): Promise<Todo[]> {
    let todos: Todo[] = [];
    await api
        .get("/todo")
        .then((response) => {
            todos = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return todos;
}

async function updateTodo(todo: Todo): Promise<Todo> {
    let updatedTodo = {} as Todo;

    await api
        .put("/todo", todo)
        .then((response) => {
            updatedTodo = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return updatedTodo;
}

async function createTodo(todo: Todo): Promise<Todo> {
    let newTodo = {} as Todo;

    await api
        .post("/todo", todo)
        .then((response) => {
            newTodo = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return newTodo;
}

async function deleteTodo(todoId: number): Promise<boolean> {
    let isDeleted = false;

    await api
        .delete("/todo/?id=" + todoId)
        .then(() => {
            isDeleted = true;
        })
        .catch((error) => {
            console.log(error);
        });

    return isDeleted;
}

export default { getTodos, updateTodo, createTodo, deleteTodo };
