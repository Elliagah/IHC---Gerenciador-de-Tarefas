// Este arquivo contém a lógica JavaScript do gerenciador de tarefas.

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('nova-tarefa');
    const addTaskButton = document.getElementById('adicionar-tarefa');
    const taskList = document.getElementById('lista-tarefas');

    // Carrega tarefas do localStorage ao iniciar
    let tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
    tasks.forEach(addTask);

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            tasks.push(taskText);
            localStorage.setItem('tarefas', JSON.stringify(tasks));
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Concluir';
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            // Remove do array e atualiza o localStorage
            tasks = tasks.filter(t => t !== taskText || listItem.textContent !== taskText + 'Concluir');
            localStorage.setItem('tarefas', JSON.stringify(tasks));
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }
});