// Lista de tareas predefinidas con sus emojis y notas
const predefinedTasks = [
    { text: "Recoger la ropa tendida", emoji: "👕" },
    { text: "Planchar ropa", emoji: "🧺", note: "Recordatorio: no planchar los bodies y pijamas de Lorenzo" },
    { text: "Limpiar cocina", emoji: "🍳" },
    { text: "Limpiar baño", emoji: "🚽" },
    { text: "Limpiar habitación", emoji: "🛏️" },
    { text: "Limpiar salón", emoji: "🛋️" },
    { text: "Limpiar cocina en profundidad", emoji: "🧽", note: "Incluir microondas, freidora de aire y cafetera" },
    { text: "Limpiar baño en profundidad", emoji: "🚿" },
    { text: "Limpiar habitación en profundidad", emoji: "🧹" },
    { text: "Limpiar salón en profundidad", emoji: "🧹" },
    { text: "Cambiar las sábanas y poner lavadora con sábanas usadas", emoji: "🛏️", note: "Las sábanas limpias pueden estar en el cuarto de la plancha o debajo de la cama" },
    { text: "Lavar albornoces, toallas y toallas", emoji: "🧺", note: "Reponer toallas con las que hay debajo de la cama" },
    { text: "Poner lavadora con ropa de nosotros", emoji: "👕", note: "Usar programa de 60 minutos y detergente en tiras" },
    { text: "Poner lavadora con ropa de Lorenzo", emoji: "👶", note: "Usar programa delicado y detergente de Norit" },
    { text: "Regar las plantas", emoji: "🌱" },
    { text: "Poner lavadora con trapos y bayetas", emoji: "🧺", note: "Usar programa de 15 minutos" }
];

// Array para almacenar las tareas seleccionadas
let selectedTasks = [];

// Función para inicializar la lista de tareas
function initializeTaskList() {
    const taskList = document.getElementById('taskList');
    predefinedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <span>${task.emoji} ${task.text}</span>
            <span class="remove-btn" onclick="removeTask('${task.text}')">×</span>
        `;
        taskElement.onclick = () => toggleTask(task);
        taskList.appendChild(taskElement);
    });
}

// Función para añadir una tarea personalizada
function addCustomTask() {
    const input = document.getElementById('newTask');
    const taskText = input.value.trim();
    
    if (taskText) {
        const task = {
            text: taskText,
            emoji: "📝",
            isCustom: true
        };
        
        const taskList = document.getElementById('taskList');
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <span>${task.emoji} ${task.text}</span>
            <span class="remove-btn" onclick="removeTask('${task.text}')">×</span>
        `;
        taskElement.onclick = () => toggleTask(task);
        taskList.appendChild(taskElement);
        
        input.value = '';
    }
}

// Función para alternar la selección de una tarea
function toggleTask(task) {
    const index = selectedTasks.findIndex(t => t.text === task.text);
    
    if (index === -1) {
        selectedTasks.push(task);
    } else {
        selectedTasks.splice(index, 1);
    }
    
    updateSelectedTasks();
}

// Función para actualizar la lista de tareas seleccionadas
function updateSelectedTasks() {
    const selectedTasksContainer = document.getElementById('selectedTasks');
    selectedTasksContainer.innerHTML = '';
    
    selectedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item selected';
        taskElement.innerHTML = `
            <span>${task.emoji} ${task.text}</span>
            <span class="remove-btn" onclick="removeTask('${task.text}')">×</span>
        `;
        taskElement.onclick = () => toggleTask(task);
        selectedTasksContainer.appendChild(taskElement);
    });
}

// Función para eliminar una tarea
function removeTask(taskText) {
    event.stopPropagation();
    selectedTasks = selectedTasks.filter(task => task.text !== taskText);
    updateSelectedTasks();
}

// Función para generar el mensaje
function generateMessage() {
    let message = "📋 *Tareas para hoy:*\n\n";
    
    selectedTasks.forEach(task => {
        message += `• ${task.emoji} *${task.text}*\n`;
        if (task.note) {
            message += `   _${task.note}_\n`;
        }
    });
    
    message += "\n¡Muchas gracias! 😊";
    
    document.getElementById('generatedMessage').value = message;
}

// Función para copiar el mensaje al portapapeles
function copyToClipboard() {
    const messageText = document.getElementById('generatedMessage');
    messageText.select();
    document.execCommand('copy');
    alert('¡Mensaje copiado al portapapeles!');
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeTaskList); 