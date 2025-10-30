
const Empleado = function(cc, nombres, apellidos, telefono, email, sueldoBase, tipoEmpleado, tipoBonificacion) {
    this.cc = cc;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.email = email;
    this.sueldoBase = parseFloat(sueldoBase);
    this.tipoEmpleado = tipoEmpleado;
    this.tipoBonificacion = tipoBonificacion.toUpperCase();
    
    this.calcularSueldoTotal = function() {
        let adicion = 0;
        
        switch(this.tipoBonificacion) {
            case 'A':
                adicion = 200000;
                break;
            case 'B':
                adicion = 150000;
                break;
            case 'C':
                adicion = 100000;
                break;
            case 'D':
                adicion = 50000;
                break;
            default:
                adicion = 0;
        }
        
        return this.sueldoBase + adicion;
    };
};



function crearEmpleado() {
    const div = document.getElementById('divAgregarEmpleado');
    
    if (div.style.display === 'none' || div.style.display === '') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}


function agregarEmpleado(event) {
  
    if (event) {
        event.preventDefault();
    }

    
    const cc = document.getElementById('CCf').value.trim();
    const nombres = document.getElementById('nombresf').value.trim();
    const apellidos = document.getElementById('apellidosf').value.trim();
    const telefono = document.getElementById('telefonof').value.trim();
    const email = document.getElementById('emailf').value.trim();
    const sueldoBase = document.getElementById('sueldoBase').value.trim();
    const tipoEmpleado = document.getElementById('tipoEmpleado').value.trim();
    const tipoBonificacion = document.getElementById('tipoModificacion').value.trim();


    if (!cc || !nombres || !apellidos || !telefono || !email || !sueldoBase || !tipoEmpleado || !tipoBonificacion) {
        alert('Por favor, complete todos los campos');
        return false;
    }


    const tipoBonif = tipoBonificacion.toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(tipoBonif)) {
        alert('El tipo de bonificación debe ser A, B, C o D');
        return false;
    }


    let empleados = JSON.parse(localStorage.getItem('empleados')) || [];


    const ccExiste = empleados.some(emp => emp.cc === cc);
    if (ccExiste) {
        alert('Ya existe un empleado con esta cédula: ' + cc);
        return false;
    }

    const nuevoEmpleado = {
        cc: cc,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        email: email,
        sueldoBase: parseFloat(sueldoBase),
        tipoEmpleado: tipoEmpleado,
        tipoBonificacion: tipoBonif
    };


    empleados.push(nuevoEmpleado);

    localStorage.setItem('empleados', JSON.stringify(empleados));


    document.getElementById('formEmpleado').reset();


    document.getElementById('divAgregarEmpleado').style.display = 'none';

  
    mostrarEmpleados();

    alert('Empleado agregado exitosamente');
    
    return false;
}

function mostrarEmpleados() {
    const tbody = document.querySelector('#tablaEmpleados tbody');
    
    if (!tbody) {
        console.error('No se encontró el tbody de la tabla');
        return;
    }
    
    tbody.innerHTML = '';


    const empleadosData = JSON.parse(localStorage.getItem('empleados')) || [];
    

    if (empleadosData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="text-center">No hay empleados registrados</td></tr>';
        mostrarTotalNomina([]);
        return;
    }


    const empleados = empleadosData.map(emp => {
        return new Empleado(
            emp.cc,
            emp.nombres,
            emp.apellidos,
            emp.telefono,
            emp.email,
            emp.sueldoBase,
            emp.tipoEmpleado,
            emp.tipoBonificacion
        );
    });


    empleados.forEach((emp, index) => {
        const sueldoTotal = emp.calcularSueldoTotal();
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${emp.cc}</td>
            <td>${emp.nombres} ${emp.apellidos}</td>
            <td>${emp.telefono}</td>
            <td>${emp.email}</td>
            <td>${emp.tipoEmpleado}</td>
            <td>$${emp.sueldoBase.toLocaleString('es-CO')}</td>
            <td><span class="badge bg-info">${emp.tipoBonificacion}</span></td>
            <td><strong class="text-success">$${sueldoTotal.toLocaleString('es-CO')}</strong></td>
        `;
        
        tbody.appendChild(tr);
    });

   
    mostrarTotalNomina(empleados);
}


function hallarTotalNomina(empleados) {
    let total = 0;
    for (let i = 0; i < empleados.length; i++) {
        total += empleados[i].calcularSueldoTotal();
    }
    return total;
}


function mostrarTotalNomina(empleados) {
    const totalNomina = hallarTotalNomina(empleados);
    
  
    let totalElement = document.getElementById('totalNomina');
    
    if (!totalElement) {
      
        totalElement = document.createElement('div');
        totalElement.id = 'totalNomina';
        totalElement.className = 'alert alert-success mt-3';
        totalElement.style.fontSize = '1.1rem';
        
        const tabla = document.getElementById('tablaEmpleados');
        if (tabla && tabla.parentNode) {
            tabla.parentNode.insertBefore(totalElement, tabla.nextSibling);
        }
    }
    
    totalElement.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <i class="bi bi-people-fill"></i> <strong>Total de Empleados:</strong> ${empleados.length}
            </div>
            <div class="col-md-6 text-end">
                <i class="bi bi-cash-stack"></i> <strong>Total Nómina Mensual:</strong> $${totalNomina.toLocaleString('es-CO')}
            </div>
        </div>
    `;
}

function actualizarEmpleado(index) {
    alert('z');
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSistema);
} else {
    inicializarSistema();
}

function inicializarSistema() {
    console.log('🚀 Iniciando Sistema de Gestión de Empleados Drapps...');
    

    const divFormulario = document.getElementById('divAgregarEmpleado');
    if (divFormulario) {
        divFormulario.style.display = 'none';
    }
    

    mostrarEmpleados();
    
    
    const formulario = document.getElementById('formEmpleado');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            agregarEmpleado(e);
        });
        console.log(' Formulario conectado');
    } else {
        console.error('No se encontró el formulario con id "formEmpleado"');
    }
    console.log('Sistema inicializado correctamente');
    console.log('Desarrollado por: Diego Mendoza');
}