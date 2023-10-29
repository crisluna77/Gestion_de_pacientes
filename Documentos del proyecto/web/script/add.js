// JavaScript para manejar el formulario y las peticiones
const baseUrl = 'http://localhost:3000/api/expedientes';

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

const fichaForm = document.getElementById('ficha-form');
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

        // Limpia el formulario
        idInput.value = '';
        tipoSangreInput.value = '';
        nombresInput.value = '';
        apellidosInput.value = '';
        dpiInput.value = '';
        emailInput.value = '';
        convenioInput.value = '';
        sexoInput.value = '';
        fechaNacimientoInput.value = '';
        departamentoInput.value = '';
        municipioInput.value = '';
        telefonoInput.value = '';
        actividadProfesionInput.value = '';
        alergiasInput.value = '';

    } catch (error) {
        console.error(error);
        // Muestra un mensaje de error si es necesario
    }
});
