<template>
    <div
        :class="{
            todo: true,
            completed: todo.isCompleted,
        }"
    >
        <div>
            <p>{{ todo.text }}</p>
            <button
                @click="completeTodo"
                :class="{
                    'todo-btn': true,
                    complete: true,
                    completed: todo.isCompleted,
                }"
            >
                <font-awesome-icon
                    v-if="!todo.isCompleted"
                    icon="fa-solid fa-check"
                />
                <font-awesome-icon
                    v-if="todo.isCompleted"
                    icon="fa-solid fa-rotate-left"
                />
            </button>
            <button
                @click="editTodo"
                :disabled="todo.isCompleted"
                :class="{
                    'todo-btn': true,
                    edit: true,
                    completed: todo.isCompleted,
                }"
            >
                <font-awesome-icon icon="fa-solid fa-pen" />
            </button>
            <button
                @click="deleteTodo"
                :class="{
                    'todo-btn': true,
                    delete: true,
                }"
            >
                <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
        </div>

        <div class="todo-description">
            <p>{{ todo.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.todo {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
    background-color: var(--color-border);
    border-radius: 5px;
}

.todo > div {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 5px;
}

.todo.completed {
    background-color: var(--color-success);
}

.todo p {
    flex: 1;
    font-weight: 600;
    font-size: 0.9rem;
    overflow: hidden;
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.todo-btn.complete.completed {
    background-color: var(--color-border-hover);
}

.todo-description {
    display: none;
    padding: 10px;
    height: fit-content;
    background-color: var(--color-border);
    border-radius: 5px;
    font-size: 0.9rem;
}

.todo-description p {
    font-weight: 200;
    overflow: unset;
    display: block;
    -webkit-box-orient: unset;
    -webkit-line-clamp: unset;
}

.todo-btn {
    border: none;
    outline: none;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    padding: 5px;
    display: grid;
    place-items: center;
    font-size: 0.97rem;
}

.todo-btn.complete {
    color: var(--color-success);
}

.todo-btn.edit {
    color: var(--color-logo-1);
}

.todo-btn.delete {
    color: var(--color-delete);
}

.todo-btn.edit.completed {
    color: var(--color-border-hover);
    cursor: not-allowed;
}

.todo-btn:hover {
    transition: all 0.23s ease-in-out;
    background-color: var(--color-border);
}
</style>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import type { Todo } from "@/types/Todo";

const todoStore = useTodoStore();

type Props = {
    todo: Todo;
};

let props = defineProps<Props>();

const deleteTodo = () => {
    todoStore.deleteTodo(props.todo.todoId);
};

const editTodo = () => {
    todoStore.setCurrentTodo(props.todo);
};

const completeTodo = () => {
    todoStore.completeTodo(props.todo);
};
</script>
