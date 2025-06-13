document.getElementById('form-tarefa').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('input-tarefa');
    const tarefa = input.value.trim();
    if (tarefa) {
        const li = document.createElement('li');
        li.textContent = tarefa;

        // Botão Concluir
        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir';
        btnConcluir.addEventListener('click', function() {
            li.classList.toggle('concluida');
        });

        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(btnConcluir);
        li.appendChild(btnExcluir);

        document.getElementById('lista-tarefas').appendChild(li);
        input.value = '';
    }
});