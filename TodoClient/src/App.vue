<script setup lang="ts">
import AddTodo from "@/components/AddTodo.vue";
import TodoItem from "@/components/TodoItem.vue";
import EditTodo from "@/components/EditTodo.vue";
import { useTodoStore } from "@/stores/todoStore";
import { onMounted } from "vue";

const todoStore = useTodoStore();

onMounted(() => {
    todoStore.getTodos();
});
</script>

<template>
    <section class="app">
        <header class="app__header">
            <img class="logo" alt="todo logo" src="./assets/todo.png" />
            <div class="wrapper">
                <h1><span>W</span>hat <span>T</span>odo?</h1>
            </div>
        </header>

        <main class="app__main">
            <div class="app__mainHeader">
                <h2>Todos</h2>
                <span class="todo-count">{{ todoStore.todos.length }}</span>
            </div>
            <div class="todo-list">
                <TodoItem
                    v-for="todo in todoStore.todos"
                    :key="todo.todoId"
                    :todo="todo"
                />
            </div>
            <AddTodo :editing="todoStore.currentTodo" />
        </main>

        <EditTodo v-if="todoStore.currentTodo" />
    </section>
</template>

<style scoped>
.app__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: var(--color-border);
}

.app__header .wrapper {
    flex: 1;
}

.app__header .wrapper h1 {
    font-weight: 600;
    font-size: x-large;
}

.app__header .wrapper h1 span {
    font-weight: 800;
    color: var(--color-logo-1);
}

.app__main {
    flex: 1;
    height: calc(100% - 49.9px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.app__mainHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    border-bottom: 0.5px solid var(--color-border);
}

.app__mainHeader h2 {
    font-size: 1.5rem;
    font-weight: lighter;
}

.todo-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 10px 0;
    gap: 10px;
}
</style>
