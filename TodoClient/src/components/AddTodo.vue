<template>
    <section class="add-todo">
        <div class="add-todo-container">
            <form>
                <div :class="{ active: showForm }">
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
                        @input="onDescriptionInput"
                        type="text"
                        required
                        :value="todoDescription"
                        placeholder="Todo description..."
                    />

                    <button
                        type="reset"
                        @click="cancelAdding"
                        class="btn-cancel"
                    >
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                </div>

                <button @click="onSubmit" class="show-add-todo-form">
                    Add Todo
                </button>
            </form>
        </div>
    </section>
</template>

<style scoped>
.add-todo {
    width: 100%;
    padding-bottom: 20px;
}

.add-todo-container {
    display: flex;
    border-radius: 10px;
    gap: 10px;
    padding: 15px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}

.add-todo-container form {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
}

.add-todo-container form div {
    display: flex;
    flex-direction: column;
    display: none;
    margin-bottom: 15px;
}

.add-todo-container form div.active {
    display: flex;
}

.add-todo-container form input {
    width: 100%;
    background-color: transparent;
    padding: 10px;
    color: var(--color-text);
    border-bottom: 1px solid var(--color-border);
    outline: none;
    margin-left: 10px;
    font-size: 1rem;
}

.add-todo-container form textarea {
    flex: 1;
    background-color: transparent;
    padding: 10px;
    color: var(--color-text);
    border-bottom: 1px solid var(--color-border);
    outline: none;
    margin-left: 10px;
    font-size: 1rem;
}

.add-todo-container form label {
    color: var(--color-text);
    font-size: 1.1rem;
    margin-left: 10px;
}

.show-add-todo-form {
    border-top-right-radius: unset;
    background-color: rgba(48, 48, 48, 0.65);
    border: none;
    outline: none;
    padding: 10px;
    cursor: pointer;
    display: grid;
    color: var(--color-text);
    place-items: center;
}

.show-add-todo-form img {
    width: 70%;
    aspect-ratio: 1;
}

.show-add-todo-form:hover {
    background-color: var(--color-border);
    transition: all 0.3s ease-in-out;
}

.btn-cancel {
    width: 35px;
    border: none;
    display: grid;
    place-items: center;
    font-size: 1.3rem;
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    border: 1px solid transparent;
    top: -10px;
    cursor: pointer;
    right: -10px;
}

.btn-cancel:hover {
    transition: all ease-in-out 0.2s;
    color: var(--color-text);
    border: 1px solid var(--color-text);
    background-color: transparent;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";
const todoStore = useTodoStore();

let todoText = ref("");
let todoDescription = ref("");
let showForm = ref(false);

const onSubmit = (e: Event) => {
    e.preventDefault();

    if (!showForm.value) {
        showForm.value = true;
        return;
    }

    if (!todoText.value || !todoDescription.value) {
        return;
    }

    // Update database
    const todo = {
        todoId: 0,
        text: todoText.value,
        isCompleted: false,
        description: todoDescription.value,
    };

    todoStore.createTodo(todo);
    todoText.value = "";
    todoDescription.value = "";

    showForm.value = false;
};

const onInput = (e: Event) => {
    todoText.value = (e.target as HTMLInputElement).value;
};

const onDescriptionInput = (e: Event) => {
    todoDescription.value = (e.target as HTMLInputElement).value;
};

const cancelAdding = (e: Event) => {
    e.preventDefault();
    showForm.value = false;
    todoText.value = "";
    todoDescription.value = "";
};
</script>
