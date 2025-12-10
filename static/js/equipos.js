// JavaScript para la página de equipos

let equipoEnEdicion = null;

function abrirModal(id) {
    equipoEnEdicion = id;
    fetch(`/api/equipos/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                const eq = data.equipo;
                document.getElementById('editCodigo').value = eq.codigo || '';
                document.getElementById('editTipo').value = eq.tipo || '';
                document.getElementById('editMarcas').value = eq.marcas || '';
                document.getElementById('editModelo').value = eq.modelo || '';
                document.getElementById('editSO').value = eq.so || '';
                document.getElementById('editAlmacenamiento').value = eq.almacenamiento || '';
                document.getElementById('editRam').value = eq.ram || '';
                document.getElementById('editEstado').value = eq.estado || '';
                document.getElementById('editMantenimiento').value = (eq.mantenimiento || '').substring(0, 10);
                document.getElementById('modalEditar').style.display = 'block';
            }
        })
        .catch(error => alert('Error al cargar el equipo: ' + error.message));
}

function cerrarModal() {
    document.getElementById('modalEditar').style.display = 'none';
    equipoEnEdicion = null;
}

window.onclick = function(event) {
    const modal = document.getElementById('modalEditar');
    if (event.target == modal) {
        cerrarModal();
    }
}

document.getElementById('formEditar').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const datos = {
        codigo: document.getElementById('editCodigo').value,
        tipo: document.getElementById('editTipo').value,
        marcas: document.getElementById('editMarcas').value,
        modelo: document.getElementById('editModelo').value,
        so: document.getElementById('editSO').value,
        almacenamiento: document.getElementById('editAlmacenamiento').value,
        ram: document.getElementById('editRam').value,
        estado: document.getElementById('editEstado').value,
        mantenimiento: document.getElementById('editMantenimiento').value
    };

    try {
        const response = await fetch(`/api/equipos/${equipoEnEdicion}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });

        const data = await response.json();
        if (data.ok) {
            alert('Equipo actualizado exitosamente');
            cerrarModal();
            location.reload();
        } else {
            alert('Error: ' + (data.error || 'No se pudo actualizar'));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function eliminarEquipo(id) {
    if (confirm('¿Está seguro de que desea eliminar este equipo?')) {
        try {
            const response = await fetch(`/api/equipos/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });

            const data = await response.json();
            if (data.ok) {
                alert('Equipo eliminado exitosamente');
                location.reload();
            } else {
                alert('Error: ' + (data.error || 'No se pudo eliminar'));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Cargar equipos al abrir la página
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/equipos', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        
        const data = await response.json();
        
        if (data.ok && data.equipos && data.equipos.length > 0) {
            let tabla = '<div class="tabla-wrapper"><table>';
            tabla += '<thead><tr>';
            tabla += '<th>Código</th>';
            tabla += '<th>Tipo</th>';
            tabla += '<th>Marca</th>';
            tabla += '<th>Modelo</th>';
            tabla += '<th>SO</th>';
            tabla += '<th>Almacenamiento (GB)</th>';
            tabla += '<th>RAM (GB)</th>';
            tabla += '<th>Estado</th>';
            tabla += '<th>Mantenimiento</th>';
            tabla += '<th>Acciones</th>';
            tabla += '</tr></thead><tbody>';
            
            data.equipos.forEach((equipo, index) => {
                const estado = (equipo.estado || '').toLowerCase();
                const estadoClass = estado.includes('activo') || estado.includes('funcionando') ? 'estado-activo' : 'estado-inactivo';
                
                tabla += '<tr>';
                tabla += '<td>' + (equipo.codigo || '-') + '</td>';
                tabla += '<td>' + (equipo.tipo || '-') + '</td>';
                tabla += '<td>' + (equipo.marcas || '-') + '</td>';
                tabla += '<td>' + (equipo.modelo || '-') + '</td>';
                tabla += '<td>' + (equipo.so || '-') + '</td>';
                tabla += '<td>' + (equipo.almacenamiento || '-') + '</td>';
                tabla += '<td>' + (equipo.ram || '-') + '</td>';
                tabla += '<td><span class="' + estadoClass + '">' + (equipo.estado || '-') + '</span></td>';
                tabla += '<td>' + (equipo.mantenimiento ? equipo.mantenimiento.substring(0, 10) : '-') + '</td>';
                tabla += '<td><div class="acciones">';
                tabla += '<button class="btn-accion btn-editar" onclick="abrirModal(' + equipo.id + ')">✏️ Editar</button>';
                tabla += '<button class="btn-accion btn-eliminar" onclick="eliminarEquipo(' + equipo.id + ')">🗑️ Eliminar</button>';
                tabla += '</div></td>';
                tabla += '</tr>';
            });
            
            tabla += '</tbody></table></div>';
            tabla += '<div class="contador">Total de equipos: <strong>' + data.equipos.length + '</strong></div>';
            document.getElementById('listaEquipos').innerHTML = tabla;
        } else {
            document.getElementById('listaEquipos').innerHTML = '<div class="sin-datos">ℹ️ No hay equipos registrados aún.</div>';
        }
    } catch (error) {
        document.getElementById('listaEquipos').innerHTML = '<div class="sin-datos" style="color: #e74c3c;">❌ Error al cargar los equipos: ' + error.message + '</div>';
    }
});
