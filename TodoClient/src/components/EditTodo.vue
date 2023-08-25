<template>
    <div class="edit-todo-form">
        <section class="add-todo">
            <h1>Update Your Todo</h1>
            <br />
            <div class="add-todo-container">
                <form @submit="onSubmit">
                    <label for="title">Title</label>
                    <input
                        @input="onInput"
                        type="text"
                        required
                        :value="todoText"
                        placeholder="Add a new todo..."
                    />

                    <br />
                    <label for="description">Description</label>
                    <textarea
                        class="description-input"
                        @input="onDescriptionInput"
                        type="text"
                        required
                        :value="todoDescription"
                        placeholder="Todo description..."
                    />

                    <button type="submit" class="btn-edit">Update Todo</button>
                </form>
            </div>
            <button
                class="btn-edit cancel"
                @click="todoStore.setCurrentTodo(null)"
            >
                Cancel
            </button>
        </section>
    </div>
</template>

<style scoped>
.edit-todo-form {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    background-color: rgba(48, 48, 48, 0.98);
    padding-bottom: 20px;
}

.add-todo {
    width: 90%;
    padding-bottom: 20px;
    text-align: center;
}

.add-todo h1 {
    color: var(--color-text);
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
}

.add-todo-container {
    display: flex;
    border-radius: 10px;
    gap: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}

.add-todo-container form {
    flex: 1;
    display: flex;
    padding: 15px;
    align-items: start;
    flex-direction: column;
}

.add-todo-container form input {
    background-color: transparent;
    padding: 10px;
    color: var(--color-text);
    outline: none;
    width: 100%;
    font-size: 1rem;
    font-weight: 300;
    border-bottom: 1px solid var(--color-text);
}

.add-todo-container form .description-input {
    flex: 1;
    font-weight: 300;
    background-color: transparent;
    padding: 10px;
    color: var(--color-text);
    outline: none;
    width: 100%;
    font-size: 1rem;
    border-bottom: 1px solid var(--color-text);
}

.add-todo-container form label {
    color: var(--color-text);
    font-weight: 300;
    font-size: 1.1rem;
    text-align: left;
}

.btn-edit:first-of-type {
    margin-top: 20px;
}

.btn-edit {
    padding: 10px 10px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    outline: none;
    width: 70%;
    align-self: center;
}

.btn-edit:hover {
    transition: all ease-in-out 0.2s;
    color: var(--color-text);
    border: 1px solid var(--color-text);
    background-color: transparent;
}

.btn-edit.cancel {
    background-color: var(--color-delete);
    color: var(--color-text);
    border-radius: 5px;
    margin: 20px 0;
    color: var(--color-text);
    padding: 10px 30px;
    border-radius: 6px;
    border: 1px solid transparent;
    outline: none;
}

.btn-edit.cancel:hover {
    transition: all ease-in-out 0.2s;
    border: 1px solid var(--color-text);
    background-color: var(--color-delete-hover);
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";
const todoStore = useTodoStore();

let todoText = ref(todoStore.currentTodo?.text || "");
let todoDescription = ref(todoStore.currentTodo?.description || "");

const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log(todoText.value);

    // Update database
    const todo = {
        todoId: todoStore.currentTodo?.todoId || 0,
        text: todoText.value,
        isCompleted: todoStore.currentTodo?.isCompleted || false,
        description: todoDescription.value,
    };

    todoStore.updateTodo(todo);
    todoStore.setCurrentTodo(null);
    todoText.value = "";
};

const onInput = (e: Event) => {
    todoText.value = (e.target as HTMLInputElement).value;
};

const onDescriptionInput = (e: Event) => {
    todoDescription.value = (e.target as HTMLInputElement).value;
};
</script>
