import { defineStore } from "pinia";
import type { Todo } from "@/types/Todo";

import todoApi from "@/utils/fetchData";

export const useTodoStore = defineStore("todos", {
    state: () => ({
        todos: [] as Todo[],
        currentTodo: null as Todo | null,
    }),

    actions: {
        setCurrentTodo(todo: Todo | null) {
            this.currentTodo = todo;
        },

        completeTodo(todo: Todo) {
            todo.isCompleted = !todo.isCompleted;
            this.updateTodo(todo);
        },

        async getTodos() {
            await todoApi.getTodos().then((todos) => {
                this.todos = todos;
            });
        },

        async updateTodo(todo: Todo) {
            await todoApi.updateTodo(todo).then((updatedTodo) => {
                this.todos = this.todos.map((t) => {
                    if (t.todoId === updatedTodo.todoId) {
                        return updatedTodo;
                    } else {
                        return t;
                    }
                });
            });
        },

        async createTodo(todo: Todo) {
            await todoApi.createTodo(todo).then((newTodo) => {
                if (!newTodo?.todoId) {
                    return;
                }

                this.todos = [...this.todos, newTodo];
            });
        },

        async deleteTodo(todoId: number) {
            await todoApi.deleteTodo(todoId).then((isDeleted) => {
                if (isDeleted) {
                    this.todos = this.todos.filter((t) => t.todoId !== todoId);
                }
            });
        },
    },
});
