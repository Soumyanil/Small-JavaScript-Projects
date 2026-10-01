// Kanban Board Logic

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const todoInput = document.getElementById('todo-input');
    const lists = document.querySelectorAll('.task-list');
    const trashZone = document.getElementById('trash-zone');
    const columns = document.querySelectorAll('.column');

    // State Management (Load from Local Storage)
    let tasks = JSON.parse(localStorage.getItem('kanban_tasks')) || [
        { id: '1', text: 'Learn JavaScript Basics', status: 'done' },
        { id: '2', text: 'Build a Kanban Board', status: 'progress' },
        { id: '3', text: 'Create a personal portfolio', status: 'todo' }
    ];

    // Initialize Board
    renderTasks();

    // 1. Add New Task
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && todoInput.value.trim() !== '') {
            const newTask = {
                id: Date.now().toString(),
                text: todoInput.value.trim(),
                status: 'todo'
            };
            tasks.push(newTask);
            saveAndRender();
            todoInput.value = '';
        }
    });

    // 2. Render Tasks
    function renderTasks() {
        // Clear lists
        lists.forEach(list => list.innerHTML = '');

        // Distribute tasks
        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.classList.add('task');
            taskEl.setAttribute('draggable', 'true');
            taskEl.dataset.id = task.id;
            taskEl.innerHTML = `<span>${task.text}</span>`;

            // Drag Events
            taskEl.addEventListener('dragstart', dragStart);
            taskEl.addEventListener('dragend', dragEnd);

            // Append to correct list
            const targetList = document.getElementById(`${task.status}-list`);
            if(targetList) targetList.appendChild(taskEl);
        });

        updateCounts();
    }

    // 3. Update Counts & Save
    function updateCounts() {
        document.getElementById('todo-count').innerText = tasks.filter(t => t.status === 'todo').length;
        document.getElementById('prog-count').innerText = tasks.filter(t => t.status === 'progress').length;
        document.getElementById('done-count').innerText = tasks.filter(t => t.status === 'done').length;
    }

    function saveAndRender() {
        localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // 4. Drag and Drop Logic
    let draggedTask = null;

    function dragStart() {
        draggedTask = this;
        setTimeout(() => this.classList.add('dragging'), 0);
    }

    function dragEnd() {
        this.classList.remove('dragging');
        draggedTask = null;
        
        // Remove hover effects from columns
        columns.forEach(col => col.classList.remove('drag-over'));
        trashZone.classList.remove('drag-over');
    }

    // Setup Drop Zones (Columns)
    lists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            list.parentElement.classList.add('drag-over');
            
            // Calculate insertion point (optional for reordering, keeping simple here)
            const afterElement = getDragAfterElement(list, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                list.appendChild(draggable);
            } else {
                list.insertBefore(draggable, afterElement);
            }
        });

        list.addEventListener('dragleave', () => {
            list.parentElement.classList.remove('drag-over');
        });

        list.addEventListener('drop', (e) => {
            list.parentElement.classList.remove('drag-over');
            if (draggedTask) {
                const taskId = draggedTask.dataset.id;
                const newStatus = list.dataset.status;
                
                // Update state
                const taskIndex = tasks.findIndex(t => t.id === taskId);
                if(taskIndex > -1) {
                    tasks[taskIndex].status = newStatus;
                    saveAndRender();
                }
            }
        });
    });

    // Helper: Determine where to insert based on mouse Y position
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Setup Trash Zone
    trashZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        trashZone.classList.add('drag-over');
    });

    trashZone.addEventListener('dragleave', () => {
        trashZone.classList.remove('drag-over');
    });

    trashZone.addEventListener('drop', () => {
        trashZone.classList.remove('drag-over');
        if (draggedTask) {
            const taskId = draggedTask.dataset.id;
            tasks = tasks.filter(t => t.id !== taskId);
            saveAndRender();
        }
    });

});
