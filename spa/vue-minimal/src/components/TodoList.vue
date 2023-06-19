<template>
    <div class="container">
        <h1>{{ headline }}</h1>
        <div class="form">
            <input type="text" class="input" v-model="taskInput" />
            <input type="submit" class="add" value="Add Task" @click="addTask" />
        </div>
        <div class="tasks">
            <div v-for="(task, index) in tasks" :key="index" class="task" @click="deleteTask(index)">
                <div>{{ task }}</div>
                <span>Delete</span>
            </div>
        </div>
        <div class="delete-all" @click="deleteAll">Delete all</div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const tasks = ref([]);
const taskInput = ref('');

defineProps({
  headline: String
});

// const fetchTasks = async () => {
//     const response = await fetch("http://localhost:8080/magnoliaAuthor/.rest/delivery/tasks");
//     const data = await response.json();
//     tasks.value = data.results;
// };

// fetch tasks from localstorage
const fetchTasks = () => {
  if (localStorage.getItem('tasks')) {
    tasks.value = JSON.parse(localStorage.getItem('tasks'));
  }
};

onMounted(() => {
  fetchTasks();
});

const addTask = () => {
  const task = taskInput.value;

  if (task) {
    tasks.value.push(task);
    taskInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const deleteAll = () => {
  tasks.value = [];
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};
</script>

<style scoped lang="scss">
.container {
    width: 500px;
    margin: 20px auto;
}

.form {
    background-color: #eee;
    border-radius: 6px;
    padding: 20px;
    display: flex;
    align-items: center;
}

.input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    flex: 1;

    &:focus {
        outline: none;
    }
}

.add {
    &:focus {
        outline: none;
    }

    border: none;
    background-color: #f44336;
    color: white;
    padding: 10px;
    border-radius: 6px;
    margin-left: 10px;
    cursor: pointer;
}

.tasks {
    background-color: #eee;
    margin-top: 20px;
    border-radius: 6px;
    padding: 20px;

    .task {
        background-color: white;
        padding: 10px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.3s;
        cursor: pointer;
        border: 1px solid #ccc;

        &:not(:last-child) {
            margin-bottom: 15px;
        }

        &:hover {
            background-color: #f7f7f7;
        }

        span {
            font-weight: bold;
            font-size: 10px;
            background-color: red;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    .task.done {
        opacity: 0.5;
        position: relative;
    }
}

.task.done {
    &::after {
        position: absolute;
        content: "";
    }
}

.delete-all {
    width: calc(100% - 25px);
    margin: auto;
    padding: 12px;
    text-align: center;
    font-size: 14px;
    color: white;
    background-color: #f44336;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
}</style>