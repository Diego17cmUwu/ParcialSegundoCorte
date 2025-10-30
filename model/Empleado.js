class Empleado {
    constructor(cc, nombres, apellidos, telefono, email, sueldoBase, tipoEmpleado, tipoBonificacion) {
        this.cc = cc;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.sueldoBase = parseFloat(sueldoBase);
        this.tipoEmpleado = tipoEmpleado;
        this.tipoBonificacion = tipoBonificacion.toUpperCase();
    }
}