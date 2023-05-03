
var oTabla = $("#tblDevolucion").DataTable();
$(document).ready(function () {
    $('#tblDevolucion tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
        }
    });

    $("#btnIngresarDevolucion").click(function () {
        EjecutarComando("Insertar");
    });
    $("#btnConsultarVenta").click(function () {
        ConsultarVentas();
    });

    //Invocar el llenado del combo
    LlenarSedesDevoluciones();
    llenarVendedorDevoluciones();
    llenarPrendaDevoluciones();
    //Invoca el llenado de la tabla
    LlenarTablaDevoluciones();
});

function ConsultarVentas() {
    event.preventDefault();
    let idVenta = $("#CodigoVenta").val();
    DatosVenta = {
        idVenta: idVenta,
        Comando: "Consultar"
    }
    //Invocar el controlador vía ajax
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorVentas.ashx",
        contentType: "json",
        data: JSON.stringify(DatosVenta),
        success: function (rptaVenta) {
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html("Consulta exitosa");
            //Procesar la respuesta del controlador, como un objeto json y pasar los datos a la interfaz
            Venta = JSON.parse(rptaVenta);
            $("#NombreCliente").val(Venta.tblCliente.NombreCliente);
            $("#DocumentoCliente").val(Venta.tblCliente.idCliente);
            $("#PrendaDevolucion").val(Venta.idPrendaVenta);
            localStorage.setItem('cantidadPrendas', Venta.cantidad);
            Fecha = Venta.fechaVenta;
            $("#FechaVenta").val(Fecha.split("T")[0])

        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function EjecutarComando(Comando) {
    let idDevolucion = $("#CodigoDevolucion").val();
    let idVentaDevolucion = $("#CodigoVenta").val();
    let CantPrendaDevolucion = parseInt($("#CantPrendaDevolucion").val());
    let fechaDevolucion = $("#FechaDevolucion").val();
    let VendedorDevolucion = $("#VendedorDevolucion").val();
    let SedeDevolucion = $("#SedeDevolucion").val();
    let MotivoDevolucion = $("#lblMotivoDevolucion").val();
    let validaDevolucion = false;
    //////////////////////////

    let idVenta = $("#CodigoVenta").val();
    DatosVenta = {
        idVenta: idVenta,
        Comando: "Consultar"
    }

    let cantidadPrendas = parseInt(localStorage.getItem('cantidadPrendas'));


    if (cantidadPrendas < CantPrendaDevolucion) {
        $("#dvMensaje").addClass("alert alert-success");
        $("#dvMensaje").html("La cantidad de prendas a es mayor a las prenda de la venta");
        window.alert("La cantidad de prendas a es mayor a las prenda de la venta");
        return;
    }

    let DatosDevolucion = {
        idDevolucion: idDevolucion,
        idVentaDevolucion: idVentaDevolucion,
        MotivoDevolucion: MotivoDevolucion,
        fechaDevolucion: fechaDevolucion,
        Comando: Comando
    }

    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorDevolucion.ashx",
        contentType: "json",
        data: JSON.stringify(DatosDevolucion),
        success: function (rpta) {
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html(rpta);
            LlenarTablaDevoluciones();
        },
        error: function (errRpta) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errRpta);
        }
    });
    
}

function LlenarSedesDevoluciones() {
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorSede.ashx",
        contentType: "json",
        data: null,
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);
            for (let op = 0; op < rpta.length; op++) {
                $("#SedeDevolucion").append('<option value=' + DatosCombo[op].idSede + '>' + DatosCombo[op].NombreSede + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function llenarVendedorDevoluciones() {
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorVendedor.ashx",
        contentType: "json",
        data: null,
        success: function (rpta) {
            //Crear un objeto JSON con la información
            DatosCombo = JSON.parse(rpta);
            for (let op = 0; op < rpta.length; op++) {
                $("#VendedorDevolucion").append('<option value=' + DatosCombo[op].idVendedor + '>' + DatosCombo[op].NombreVendedor + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function llenarPrendaDevoluciones() {
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
                $("#PrendaDevolucion").append('<option value=' + DatosCombo[op].idPrenda + '>' + DatosCombo[op].NombrePrenda + '</options>'); ///////////////////
            }
        },
        error: function (errCliente) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errCliente);
        }
    });
}

function LlenarTablaDevoluciones() {
    // Exactamente igual a la tabla devoluciones
    let DatosDevoluciones = {
        idDevolucion: "",
        idVentaDevolucion: "",
        motivoDevolucion: "",
        fechaDevolucion: "1900/01/01",
        Comando: "LlenarGrid",
        Error: ""
    }
    $.ajax({
        type: "POST",
        url: "../Controladores/ControladorDevolucion.ashx",
        contentType: "json",
        data: JSON.stringify(DatosDevoluciones),
        success: function (rpta) {
            LlenarGrid_JSON(JSON.parse(rpta), "#tblDevolucion");
        },
        error: function (errRpta) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(errRpta);
        }
    });
}

