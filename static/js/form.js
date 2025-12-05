// Datos de modelos por marca
const modelosPorMarca = {
    "hp": ["HP 15-ef1xxx", "HP 15-dy1xxx", "HP ProBook 450 G7", "HP ProBook 640 G5", "HP Pavilion 15", "HP Envy 13", "HP ZBook 15"],
    "dell": ["Dell Inspiron 15 3000", "Dell Inspiron 15 5000", "Dell XPS 13", "Dell XPS 15", "Dell Latitude 5520", "Dell Latitude 7420", "Dell Vostro 15"],
    "lenovo": ["Lenovo ThinkPad E15", "Lenovo ThinkPad T14", "Lenovo ThinkPad X1", "Lenovo IdeaPad 5", "Lenovo IdeaPad 3", "Lenovo Legion 5", "Lenovo Yoga 9"],
    "asus": ["ASUS VivoBook 15", "ASUS VivoBook Pro", "ASUS ROG G513", "ASUS ROG Zephyrus", "ASUS ZenBook 13", "ASUS ZenBook 14", "ASUS TUF Gaming"],
    "apple": ["MacBook Air M1", "MacBook Air M2", "MacBook Pro 13", "MacBook Pro 14", "MacBook Pro 16", "iMac 24", "Mac Mini M1"]
};

// Especificaciones por modelo
const especificacionesModelo = {
    "HP 15-ef1xxx": { "ram": "8", "almacenamiento": "256", "procesador": "AMD Ryzen 5" },
    "HP 15-dy1xxx": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "HP ProBook 450 G7": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "HP ProBook 640 G5": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "HP Pavilion 15": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "HP Envy 13": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "HP ZBook 15": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Dell Inspiron 15 3000": { "ram": "4", "almacenamiento": "128", "procesador": "Intel Core i3" },
    "Dell Inspiron 15 5000": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "Dell XPS 13": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Dell XPS 15": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Dell Latitude 5520": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Dell Latitude 7420": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Dell Vostro 15": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "Lenovo ThinkPad E15": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "Lenovo ThinkPad T14": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Lenovo ThinkPad X1": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Lenovo IdeaPad 5": { "ram": "8", "almacenamiento": "256", "procesador": "AMD Ryzen 5" },
    "Lenovo IdeaPad 3": { "ram": "4", "almacenamiento": "128", "procesador": "Intel Core i3" },
    "Lenovo Legion 5": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "Lenovo Yoga 9": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "ASUS VivoBook 15": { "ram": "8", "almacenamiento": "256", "procesador": "AMD Ryzen 5" },
    "ASUS VivoBook Pro": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "ASUS ROG G513": { "ram": "32", "almacenamiento": "1024", "procesador": "Intel Core i9" },
    "ASUS ROG Zephyrus": { "ram": "32", "almacenamiento": "1024", "procesador": "Intel Core i9" },
    "ASUS ZenBook 13": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "ASUS ZenBook 14": { "ram": "8", "almacenamiento": "256", "procesador": "Intel Core i5" },
    "ASUS TUF Gaming": { "ram": "16", "almacenamiento": "512", "procesador": "Intel Core i7" },
    "MacBook Air M1": { "ram": "8", "almacenamiento": "256", "procesador": "Apple M1" },
    "MacBook Air M2": { "ram": "8", "almacenamiento": "256", "procesador": "Apple M2" },
    "MacBook Pro 13": { "ram": "16", "almacenamiento": "512", "procesador": "Apple M1" },
    "MacBook Pro 14": { "ram": "16", "almacenamiento": "512", "procesador": "Apple M1 Pro" },
    "MacBook Pro 16": { "ram": "32", "almacenamiento": "1024", "procesador": "Apple M1 Max" },
    "iMac 24": { "ram": "16", "almacenamiento": "512", "procesador": "Apple M1" },
    "Mac Mini M1": { "ram": "8", "almacenamiento": "256", "procesador": "Apple M1" }
};

// Fechas disponibles para registro
const fechasRegistro = [
    "2025-01-01",
    "2025-01-15",
    "2025-02-01",
    "2025-02-15",
    "2025-03-01",
    "2025-03-15",
    "2025-04-01"
];

// Cargar modelos cuando cambien las marcas
document.getElementById("marcas").addEventListener("change", function() {
    const marca = this.value.toLowerCase();
    const modeloSelect = document.getElementById("modelo");
    modeloSelect.innerHTML = "<option value=\"\">Seleccionar...</option>";
    
    if (marca && modelosPorMarca[marca]) {
        modelosPorMarca[marca].forEach(modelo => {
            const option = document.createElement("option");
            option.value = modelo;
            option.textContent = modelo;
            modeloSelect.appendChild(option);
        });
    }
});

// Mostrar especificaciones al seleccionar modelo
document.getElementById("modelo").addEventListener("change", function() {
    const modelo = this.value;
    const specs = especificacionesModelo[modelo];
    
    if (specs) {
        document.getElementById("ram").value = specs.ram;
        document.getElementById("almacenamiento").value = specs.almacenamiento;
    }
});

// Establecer fecha mínima en mantenimiento (hoy)
document.addEventListener('DOMContentLoaded', function() {
    const hoy = new Date();
    const fechaMinima = hoy.toISOString().split('T')[0];
    document.getElementById('mantenimiento').min = fechaMinima;
    
    const pruebaSelect = document.getElementById('prueba');
    fechasRegistro.forEach(fecha => {
        const option = document.createElement('option');
        option.value = fecha;
        option.textContent = fecha;
        pruebaSelect.appendChild(option);
    });
});

// Envío del formulario
document.getElementById("equipoForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Obtener fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const fechaActual = hoy.toISOString().split('T')[0];
    
    const formData = {
        codigo: document.getElementById("codigo").value,
        tipo: document.getElementById("tipo").value,
        marcas: document.getElementById("marcas").value,
        modelo: document.getElementById("modelo").value,
        so: document.getElementById("so").value,
        almacenamiento: document.getElementById("almacenamiento").value,
        ram: document.getElementById("ram").value,
        estado: document.getElementById("estado").value,
        mantenimiento: document.getElementById("mantenimiento").value,
        fecha_registro: fechaActual
    };

    try {
        const response = await fetch("/api/equipos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.ok) {
            mostrarMensaje("Equipo registrado exitosamente", "exito");
            document.getElementById("equipoForm").reset();
            document.getElementById("modelo").innerHTML = "<option value=\"\">Seleccionar...</option>";
        } else {
            mostrarMensaje(data.error || "Error al registrar el equipo", "error");
        }
    } catch (error) {
        mostrarMensaje("Error: " + error.message, "error");
    }
});

function mostrarMensaje(texto, tipo) {
    const div = document.getElementById("mensaje");
    div.textContent = texto;
    div.className = "mensaje " + tipo;
    div.style.display = "block";
    setTimeout(() => {div.style.display = "none";}, 3000);
}
