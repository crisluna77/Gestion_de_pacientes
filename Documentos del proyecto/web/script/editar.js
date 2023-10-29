// Recupera el ID del paciente de los parámetros de consulta
const params = new URLSearchParams(window.location.search);
const pacienteId = params.get('id');

// Realiza una solicitud para obtener los datos del paciente
// Reemplaza la URL con la correcta
fetch(`http://localhost:3000/api/expedientes/${pacienteId}`)
    .then(response => response.json())
    .then(data => {
        // Muestra la información del paciente
        const pacienteInfo = document.getElementById('paciente-info');
        pacienteInfo.innerHTML = `
            <p>ID: ${data.id}</p>
            <p>Tipo de sangre: ${data.tipoSangre}</p>
            <p>Nombres: ${data.nombres}</p>
            <p>Apellidos: ${data.apellidos}</p>
            <p>DPI: ${data.dpi}</p>
            <p>Email: ${data.email}</p>
            <p>Convenio: ${data.convenio}</p>
            <p>Sexo: ${data.sexo}</p>
            <p>Fecha de naciemineto: ${data.fechaNacimiento}</p>
            <p>Departamento: ${data.departamento}</p>
            <p>Muncipio: ${data.municipio}</p>
            <p>Telefono: ${data.telefono}</p>
            <p>Actividad o Profecion: ${data.actividadProfesion}</p>
            <p>Alergias: ${data.alergias}</p>
            <!-- Agrega más campos aquí según sea necesario -->
        `;
    })
    .catch(error => {
        console.error(error);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Recupera el ID del paciente de los parámetros de consulta
        const params = new URLSearchParams(window.location.search);
        const pacienteId = params.get('id');
    
        // Obtén los elementos del formulario
        const editarPacienteForm = document.getElementById('editarPacienteForm');
        const cargarDatosButton = document.getElementById('cargarDatos');
        const guardarCambiosButton = document.getElementById('guardarCambios');
        const cancelarEdicionButton = document.getElementById('cancelarEdicion');
    
        // Función para cargar los datos del paciente
        cargarDatosButton.addEventListener('click', () => {
            // Realiza una solicitud para obtener los datos del paciente
            // Reemplaza la URL con la correcta
            fetch(`http://localhost:3000/api/expedientes/${pacienteId}`)
                .then(response => response.json())
                .then(data => {
                    // Rellena los campos del formulario con los datos del paciente
                    editarPacienteForm.tipoSangre.value = data.tipoSangre;
                    editarPacienteForm.nombres.value = data.nombres;
                    editarPacienteForm.apellidos.value = data.apellidos;
                    editarPacienteForm.dpi.value = data.dpi;
                    editarPacienteForm.email.value = data.email;
                    editarPacienteForm.convenio.value = data.convenio;
                    editarPacienteForm.sexo.value = data.sexo;
                    editarPacienteForm.fechaNacimiento.value = data.fechaNacimiento;
                    editarPacienteForm.departamento.value = data.departamento;
                    editarPacienteForm.municipio.value = data.municipio;
                    editarPacienteForm.telefono.value = data.telefono;
                    editarPacienteForm.actividadProfesion.value = data.actividadProfesion;
                    editarPacienteForm.alergias.value = data.alergias;
                })
                .catch(error => {
                    console.error(error);
                });
        });
    
        // Función para guardar los cambios en el paciente
        guardarCambiosButton.addEventListener('click', () => {
            // Obtén los valores actualizados del formulario
            const pacienteActualizado = {
                tipoSangre: editarPacienteForm.tipoSangre.value,
                nombres: editarPacienteForm.nombres.value,
                apellidos: editarPacienteForm.apellidos.value,
                dpi: editarPacienteForm.dpi.value,
                email: editarPacienteForm.email.value,
                convenio: editarPacienteForm.convenio.value,
                sexo: editarPacienteForm.sexo.value,
                fechaNacimiento: editarPacienteForm.fechaNacimiento.value,
                departamento: editarPacienteForm.departamento.value,
                municipio: editarPacienteForm.municipio.value,
                telefono: editarPacienteForm.telefono.value,
                actividadProfesion: editarPacienteForm.actividadProfesion.value,
                alergias: editarPacienteForm.alergias.value,
            };
    
            // Realiza una solicitud para actualizar los datos del paciente
            fetch(`http://localhost:3000/api/expedientes/${pacienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pacienteActualizado),
            })
                .then(response => response.json())
                .catch(error => {
                    console.error(error);
                });
        });
    
        // Función para cancelar la edición
        cancelarEdicionButton.addEventListener('click', () => {
            // Redirige a la página anterior o a otra página de tu elección
            window.location.href = '/web/tabla.html';
        });
    });
    
