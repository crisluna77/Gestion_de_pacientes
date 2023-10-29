// JavaScript para cargar la tabla de pacientes
const baseUrl = 'http://localhost:3000/api/expedientes'; // Reemplaza con la URL correcta
const tableBody = document.getElementById('table-body');

// Función para hacer peticiones
async function makeRequest(url, method, data = null) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

// Función para cargar la lista de pacientes desde el servidor
async function cargarPacientes() {

    try {
        const response = await fetch(baseUrl, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const pacientes = await response.json();

        // Limpia cualquier contenido existente en la tabla
        tableBody.innerHTML = '';

        // Itera a través de los pacientes y crea filas para la tabla
        pacientes.forEach((paciente) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nombres}</td>
                <td>${paciente.apellidos}</td>
                <td>${paciente.email}</td>
                <td>${paciente.telefono}</td>
                <td>
                    <button class="btn btn-warning btn-editar" data-id="${paciente._id}">Editar</button>
                    <button class="btn btn-danger btn-eliminar" data-id="${paciente._id}">Eliminar</button>
                </td>
            `;

            tableBody.appendChild(fila);
        });

        // Agrega manejadores de eventos a los botones de "Editar" y "Eliminar"
        document.querySelectorAll('.btn-editar').forEach((btnEditar) => {
            btnEditar.addEventListener('click', editarPaciente);
        });

        document.querySelectorAll('.btn-eliminar').forEach((btnEliminar) => {
            btnEliminar.addEventListener('click', eliminarPaciente);
        });
    } catch (error) {
        console.error(error);
        // Manejar errores si es necesario
    }
}

// Función para editar un paciente
function editarPaciente(event) {
    const pacienteId = event.target.getAttribute('data-id');
    // Redirige a editar.html y pasa el ID del paciente como parámetro de consulta
    window.location.href = `editar.html?id=${pacienteId}`;
}


// Función para eliminar un paciente
async function eliminarPaciente(event) {
    const pacienteId = event.target.getAttribute('data-id');
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este paciente?');

    if (confirmDelete) {
        try {
            const baseUrl = 'http://localhost:3000/api/expedientes'; // Reemplaza con la URL correcta
            await makeRequest(`${baseUrl}/${pacienteId}`, 'DELETE');
            // Actualizar la lista de pacientes después de la eliminación
            cargarPacientes();
        } catch (error) {
            console.error(error);
            // Manejar errores si es necesario
        }
    }
}

// Llama a la función para cargar la tabla cuando la página se carga
window.addEventListener('load', cargarPacientes);
