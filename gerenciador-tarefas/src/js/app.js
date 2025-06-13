// Este arquivo contém a lógica JavaScript do gerenciador de tarefas.

let calendar; // Agora global

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('nova-tarefa');
    const dateInput = document.getElementById('data-tarefa');
    const urgencyInput = document.getElementById('urgencia-tarefa');
    const addTaskButton = document.getElementById('adicionar-tarefa');
    const taskList = document.getElementById('lista-tarefas');

    let tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
    tasks.forEach(addTask);

    // Inicializa o calendário com eventos das tarefas
    const calendarEl = document.getElementById('calendario');
    if (calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            events: tarefasParaEventos(tasks)
        });
        calendar.render();
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;
        const taskUrgency = urgencyInput.value;
        if (taskText && taskDate && taskUrgency) {
            const taskObj = { text: taskText, date: taskDate, urgency: taskUrgency };
            addTask(taskObj);
            tasks.push(taskObj);
            localStorage.setItem('tarefas', JSON.stringify(tasks));
            taskInput.value = '';
            dateInput.value = '';
            urgencyInput.value = 'urgente';

            // Adiciona evento no calendário
            if (calendar) {
                let cor;
                if (taskUrgency === 'urgente') cor = '#ff4d4d';
                else if (taskUrgency === 'pouco-urgente') cor = '#28a745';
                else cor = '#007bff';

                calendar.addEvent({
                    title: taskText,
                    start: taskDate,
                    color: cor
                });
            }
        } else {
            alert('Preencha a tarefa, a data e a urgência!');
        }
    });

    function addTask(taskObj) {
        let text, date, urgency;
        if (typeof taskObj === 'string') {
            text = taskObj;
            date = '';
            urgency = 'nao-urgente';
        } else {
            text = taskObj.text;
            date = taskObj.date;
            urgency = taskObj.urgency || 'nao-urgente';
        }

        const listItem = document.createElement('li');

        // Urgência
        const urgencySpan = document.createElement('span');
        urgencySpan.className = 'urgency ' + urgency;
        if (urgency === 'urgente') {
            urgencySpan.textContent = 'URGENTE';
        } else if (urgency === 'pouco-urgente') {
            urgencySpan.textContent = 'POUCO URGENTE';
        } else {
            urgencySpan.textContent = 'NÃO URGENTE';
        }
        listItem.appendChild(urgencySpan);

        // Texto da tarefa
        const textSpan = document.createElement('span');
        textSpan.textContent = ' ' + text;
        listItem.appendChild(textSpan);

        // Data da tarefa
        if (date) {
            const dateSpan = document.createElement('span');
            dateSpan.className = 'task-date';
            dateSpan.textContent = ` (Concluir até: ${date})`;
            listItem.appendChild(dateSpan);
        }

        // Botão de concluir
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Concluir';
        removeButton.addEventListener('click', () => {
            listItem.remove();
            tasks = tasks.filter(t => (typeof t === 'string' ? t !== text : t.text !== text || t.date !== date || t.urgency !== urgency));
            localStorage.setItem('tarefas', JSON.stringify(tasks));

            // Remove evento do calendário
            if (calendar) {
                const eventos = calendar.getEvents();
                eventos.forEach(evento => {
                    if (
                        evento.title === text &&
                        evento.startStr === date
                    ) {
                        evento.remove();
                    }
                });
            }
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    function tarefasParaEventos(tarefas) {
        return tarefas.map(tarefa => {
            let cor;
            if (tarefa.urgency === 'urgente') cor = '#ff4d4d';
            else if (tarefa.urgency === 'pouco-urgente') cor = '#28a745';
            else cor = '#007bff';

            return {
                title: tarefa.text,
                start: tarefa.date,
                color: cor
            };
        });
    }

    // Referências - Modal
    const btnReferencias = document.getElementById('btn-referencias');
    const modalReferencias = document.getElementById('modal-referencias');
    const fecharModal = document.getElementById('fechar-modal');

    btnReferencias.addEventListener('click', () => {
        modalReferencias.style.display = 'block';
    });

    fecharModal.addEventListener('click', () => {
        modalReferencias.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalReferencias) {
            modalReferencias.style.display = 'none';
        }
    });
});