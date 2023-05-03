var oTabla = $("#tblVenta").DataTable();

$(document).ready(function () {
    $('#tblVenta tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
        }
    });

    $("#btnFinalizarCompra").click(function () {
        EjecutarComando("Insertar");
    });
    $("#btnConsultarCliente").click(function () {
        ConsultarCliente();
    });



    var camporPrendaVenta = document.getElementById("PrendaVenta")
    var campoCantidadPrendaVenta = document.getElementById("CantPrendaVenta")

    camporPrendaVenta.addEventListener("change", function () {
        CalcularTotal(campoCantidadPrendaVenta.value);

    });

    campoCantidadPrendaVenta.addEventListener("change", function () {
        CalcularTotal(campoCantidadPrendaVenta.value);
    });

    //Invocar el llenado de los combos
    LlenarTipoDocumento();
    LlenarMetodoPago();
    LlenarPrenda();
    LlenarSedes();
    LlenarVendedor();
    //Invoca el llenado de la tabla
    LlenarTablaVentas();
});

function CalcularTotal(campoCantidadPrendaVenta) {

    let idPrenda = $("#PrendaVenta").val();
    DatosPrenda = {
        idPrenda: idPrenda,
        Comando: "ConsultarPrenda"
    }
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorCboPrenda.ashx",
        contentType: "json",
        data: JSON.stringify(DatosPrenda),
        success: function (rptaCliente) {
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html("Consulta exitosa");

            //Procesar la respuesta del controlador, como un objeto json y pasar los datos a la interfaz
            Prenda = JSON.parse(rptaCliente);
            $("#TotalVenta").val(Prenda.precio * campoCantidadPrendaVenta);

        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function ConsultarCliente() {
    event.preventDefault();
    let Cliente = $("#DocumentoCliente").val();
    DatosCliente = {
        idCliente: Cliente,
        Comando: "Consultar"
    }
    //Invocar el controlador vía ajax
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorClientes.ashx",
        contentType: "json",
        data: JSON.stringify(DatosCliente),
        success: function (rptaCliente) {
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html("Consulta exitosa");

            //Procesar la respuesta del controlador, como un objeto json y pasar los datos a la interfaz
            Cliente = JSON.parse(rptaCliente);
            $("#NombreCliente").val(Cliente.NombreCliente);
            $("#TelefonoCliente").val(Cliente.TelefonoCliente);
            $("#EmailCliente").val(Cliente.EmailCliente);
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function EjecutarComando(Comando) {
    /// Traemos y asignamos los datos de los text del formulario (No datos de salida) 
    let idVenta = $("#CodigoVenta").val();
    let idClienteVenta = $("#DocumentoCliente").val();
    let fechaVenta = $("#FechaVenta").val();
    let idVendedorVenta = $("#VendedorVenta").val();
    let idSedeVenta = $("#SedeVenta").val();
    let idPrendaVenta = $("#PrendaVenta").val();
    let cantidad = $("#CantPrendaVenta").val();
    let idMetodoPagoVenta = $("#MetodoPago").val();

    let DatosVenta = {
        idVenta: idVenta,
        idPrendaVenta: idPrendaVenta,
        idClienteVenta: idClienteVenta,
        idVendedorVenta: idVendedorVenta,
        idMetodoPagoVenta: idMetodoPagoVenta,
        idSedeVenta: idSedeVenta,
        fechaVenta: fechaVenta,
        cantidad: cantidad,
        Comando: Comando
    }


    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorVentas.ashx", /////
        contentType: "json",
        data: JSON.stringify(DatosVenta), ////
        success: function (rpta) {
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html(rpta);
            LlenarTablaVentas(); /////
        },
        error: function (errRpta) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errRpta);
        }
    });


}

function LlenarTipoDocumento() {
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorTipoDocumento.ashx",/////////////////
        contentType: "json",
        data: null,
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);////////////
            for (let op = 0; op < rpta.length; op++) {
                $("#TipoDocumento").append('<option value=' + DatosCombo[op].idTipoDocumento + '>' + DatosCombo[op].nombreDocumento + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function LlenarPrenda() {
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
                $("#PrendaVenta").append('<option value=' + DatosCombo[op].idPrenda + '>' + DatosCombo[op].NombrePrenda + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function LlenarMetodoPago() {
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorMetodoPago.ashx",/////////////////
        contentType: "json",
        data: null,
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);////////////
            for (let op = 0; op < rpta.length; op++) {
                $("#MetodoPago").append('<option value=' + DatosCombo[op].idMetodoPago + '>' + DatosCombo[op].MetodoPago + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function LlenarSedes() {
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorSede.ashx",/////////////////
        contentType: "json",
        data: null,
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);////////////
            for (let op = 0; op < rpta.length; op++) {
                $("#SedeVenta").append('<option value=' + DatosCombo[op].idSede + '>' + DatosCombo[op].NombreSede + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function LlenarVendedor() {
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorVendedor.ashx",/////////////////
        contentType: "json",
        data: null,
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);////////////
            for (let op = 0; op < rpta.length; op++) {
                $("#VendedorVenta").append('<option value=' + DatosCombo[op].idVendedor + '>' + DatosCombo[op].NombreVendedor + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function LlenarTablaVentas() {
    /// Se trae tal cual la tabla de ventas (La tabla principal)
    let DatosVenta = {
        idVenta: "",
        idPrendaVenta: 0,
        idClienteVenta: "",
        idVendedorVenta: "",
        idMetodoPagoVenta: 0,
        idSedeVenta: 0,
        fechaVenta: "1900/01/01",
        totalVenta: 0,
        Comando: "LlenarGrid",
        Error: ""
    }
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorVentas.ashx",
        contentType: "json",
        data: JSON.stringify(DatosVenta),
        success: function (rpta) {
            LlenarGrid_JSON(JSON.parse(rpta), "#tblVenta");
        },
        error: function (errRpta) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errRpta);
        }
    });
}