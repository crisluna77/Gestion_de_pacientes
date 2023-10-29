// Variables globales
const baseUrl = 'http://localhost:3000/api/expedientes'; // Cambia la URL según tu configuración
const fichasList = document.getElementById('fichas-list');
const fichaForm = document.getElementById('ficha-form');

// Helper function para hacer peticiones
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

// Cargar lista de fichas
async function loadfichas() {
    try {
        const fichas = await makeRequest(baseUrl, 'GET');
        // Procesa la respuesta y muestra los fichas
        fichasList.innerHTML = '';
        fichas.forEach((ficha) => {
            const fichaDiv = createfichaElement(ficha);
            fichasList.appendChild(fichaDiv);
        });
    } catch (error) {
        console.error(error);
        // Muestra un mensaje de error si es necesario
    }
}



fichaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idInput = document.getElementById('id');
    const tipoSangreInput = document.getElementById('tipoSangre');
    const nombresInput = document.getElementById('nombres');
    const apellidosInput = document.getElementById('apellidos');
    const dpiInput = document.getElementById('dpi');
    const emailInput = document.getElementById('email');
    const convenioInput = document.getElementById('convenio');
    const sexoInput = document.getElementById('sexo');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const departamentoInput = document.getElementById('departamento');
    const municipioInput = document.getElementById('municipio');
    const telefonoInput = document.getElementById('telefono');
    const actividadProfesionInput = document.getElementById('actividadProfesion');
    const alergiasInput = document.getElementById('alergias');

    
    const nuevoficha = {
        id: idInput.value,
        tipoSangre: tipoSangreInput.value,
        nombres: nombresInput.value,
        apellidos: apellidosInput.value,
        dpi: dpiInput.value,
        email: emailInput.value,
        convenio: convenioInput.value,
        sexo: sexoInput.value,
        fechaNacimiento: fechaNacimientoInput.value,
        departamento: departamentoInput.value,
        municipio: municipioInput.value,
        telefono: telefonoInput.value,
        actividadProfesion: actividadProfesionInput.value,
        alergias: alergiasInput.value,
    };

    try {
        const ficha = await makeRequest(baseUrl, 'POST', nuevoficha);
        // Procesa la respuesta y muestra el ficha agregado
        const fichaDiv = createfichaElement(ficha);
        fichaList.appendChild(fichaDiv);

        // Limpia el formulario
        tituloInput.value = '';
        autorInput.value = '';
        añoPublicacionInput.value = '';
        isbnInput.value = '';
        generoInput.value = '';
    } catch (error) {
        console.error(error);
        // Muestra un mensaje de error si es necesario
    }
});


// Función para crear elementos de ficha con botones de editar y eliminar
function createfichaElement(ficha) {
    const fichaDiv = document.createElement('div');
    fichaDiv.classList.add('ficha-item');
    fichaDiv.id = `${ficha._id}`;

    const id = document.createElement('h2');
    id.textContent = `id: ${ficha.id}`;

    const tipoSangre = document.createElement('p');
    tipoSangre.textContent = `Tipo de Sangre: ${ficha.tipoSangre}`;

    const nombres = document.createElement('p');
    nombres.textContent = `Nombres: ${ficha.nombres}`;

    const apellidos = document.createElement('p');
    apellidos.textContent = `Apellidos: ${ficha.apellidos}`;

    const dpi = document.createElement('p');
    dpi.textContent = `DPI: ${ficha.dpi}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${ficha.email}`;

    const convenio = document.createElement('p');
    convenio.textContent = `Convenio: ${ficha.convenio}`;

    const sexo = document.createElement('p');
    sexo.textContent = `Sexo: ${ficha.sexo}`;

    const fechaNacimiento = document.createElement('p');
    fechaNacimiento.textContent = `Fecha de Nacimiento: ${ficha.fechaNacimiento}`;

    const departamento = document.createElement('p');
    departamento.textContent = `Departamento: ${ficha.departamento}`;

    const municipio = document.createElement('p');
    municipio.textContent = `Municipio: ${ficha.municipio}`;

    const telefono = document.createElement('p');
    telefono.textContent = `Telefono: ${ficha.telefono}`;

    const actividadProfesion = document.createElement('p');
    actividadProfesion.textContent = `Actividad Profesion: ${ficha.actividadProfesion}`;

    const alergias = document.createElement('p');
    alergias.textContent = `Alergias: ${ficha.alergias}`;

    fichaDiv.appendChild(id);
    fichaDiv.appendChild(tipoSangre);
    fichaDiv.appendChild(nombres);
    fichaDiv.appendChild(apellidos);
    fichaDiv.appendChild(dpi);
    fichaDiv.appendChild(email);
    fichaDiv.appendChild(convenio);
    fichaDiv.appendChild(sexo);
    fichaDiv.appendChild(fechaNacimiento);
    fichaDiv.appendChild(departamento);
    fichaDiv.appendChild(municipio);
    fichaDiv.appendChild(telefono);
    fichaDiv.appendChild(actividadProfesion);
    fichaDiv.appendChild(alergias);

    return fichaDiv;


}




// Cargar lista de fichas cuando se carga la página
window.addEventListener('load', loadfichas);