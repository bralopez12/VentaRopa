var oTabla = $("#tblProveedores").DataTable();
$(document).ready(function () {
    $('#tblProveedores tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
        }
    });

    $("#btnInsertarProveedor").click(function () {
        EjecutarComando("Insertar");
    });
    $("#btnEliminarProveedor").click(function () {
        EjecutarComando("Eliminar");
    });
    $("#btnActualizarProveedor").click(function () {
        EjecutarComando("Actualizar");
    })

    $("#btnLimpiarProveedor").click(function () {
        LimpiarCamposProveedor();
    })

    // Invocar el llenado del combo de las prendas
    LlenarComboPrenda();
    // Invocar el llenado de la tabla de proveedores y prendas
    LlenarTablaProveedor();
});

// Función para insertar y eliminar (Ejecutar comando)
function EjecutarComando(Comando) {
    let Nit = $("#NitProveedor").val();
    let Nombre = $("#NombreProveedor").val();
    let Telefono = $("#TelefonoProveedor").val();
    let Email = $("#EmailProveedor").val();
    let Direccion = $("#DireccionProveedor").val();
    let Prenda = $("#PrendaProveedor").val();

    let DatosProveedor = {
        idProveedor: Nit,
        NombreProveedor: Nombre,
        TelefonoProveedor: Telefono,
        EmailProveedor: Email,
        DireccionProveedor: Direccion,
        idPrendaProveedor: Prenda,
        Comando: Comando,
        Error: ""
    }
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorProveedor.ashx",
        contentType: "json",
        data: JSON.stringify(DatosProveedor),
        success: function (rpta) {
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html(rpta);
            LlenarTablaProveedor();
        },
        error: function (errRpta) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errRpta);
        }
    });
}

// Función para Limpiar los datos de la tabla
function LimpiarCamposProveedor() {
    $("#NitProveedor").val("");
    $("#NombreProveedor").val("");
    $("#TelefonoProveedor").val("");
    $("#EmailProveedor").val("");
    $("#DireccionProveedor").val("");
    $("#PrendaProveedor").val("");
}

// Función para editar los datos de la tabla
function EditarFila(DatosFila) {
    $("#NitProveedor").val(DatosFila.find('td:eq(0)').text());
    $("#NombreProveedor").val(DatosFila.find('td:eq(1)').text());
    $("#TelefonoProveedor").val(DatosFila.find('td:eq(2)').text());
    $("#EmailProveedor").val(DatosFila.find('td:eq(3)').text());
    $("#DireccionProveedor").val(DatosFila.find('td:eq(4)').text());
    $("#PrendaProveedor").val(DatosFila.find('td:eq(5)').text());
}

// Función para llenar el combo de prenda
function LlenarComboPrenda() {
    let DatosPrenda = {
        Comando: "LlenarCombo"
    }

    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorCboPrenda.ashx",/////////////////
        contentType: "json",
        data: JSON.stringify(DatosPrenda),
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);////////////
            for (let op = 0; op < rpta.length; op++) {
                $("#PrendaProveedor").append('<option value=' + DatosCombo[op].idPrenda + '>' + DatosCombo[op].NombrePrenda + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

// Función para llenar la tabla del proveedor
function LlenarTablaProveedor() {
    // Exactamente igual a la tabla proveedor
    let DatosProveedor = {
        idProveedor: "",
        NombreProveedor: "",
        TelefonoProveedor: 0,
        EmailProveedor: "",
        DireccionProveedor: "",
        idPrendaProveedor: 0,
        Comando: "LlenarGrid",
        Error: ""
    }
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorProveedor.ashx",
        contentType: "json",
        data: JSON.stringify(DatosProveedor),
        success: function (rpta) {
            LlenarGrid_JSON(JSON.parse(rpta), "#tblProveedores");
        },
        error: function (errRpta) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errRpta);
        }
    });
}