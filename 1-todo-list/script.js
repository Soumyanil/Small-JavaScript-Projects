// Todo List Logic

// Select elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Add task event
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload
  
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    input.value = ''; // Clear input
  }
});

// Function to add a task to the DOM
function addTask(text) {
  // Create list item
  const li = document.createElement('li');
  
  // Create span for text
  const span = document.createElement('span');
  span.textContent = text;
  
  // Toggle completion on text click
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  
  // Delete task event
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  // Append elements
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}
