function LlenarGrid_JSON(Datos, Tabla) {
    //Llenar la tabla
    var columns = [];
    columnNames = Object.keys(Datos[0]);
    for (var i in columnNames) {
        columns.push({
            data: columnNames[i],
        });
    }

    $(Tabla).DataTable({
        data: Datos,
        columns: columns,
        destroy: true
    });
}