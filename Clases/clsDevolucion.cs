using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsDevolucion
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();
        public tblDevolucione devolucione = new tblDevolucione();

        public List<ViewGridDevolucion> ListarTablaDevolucion()
        {
            return (from tblVt in dbVentaRopa.Set<tblVenta>()
                    join tblDv in dbVentaRopa.Set<tblDevolucione>()
                    on tblVt.idVenta equals tblDv.idVentaDevolucion
                    join tblVdor in dbVentaRopa.Set<tblVendedor>()
                    on tblVt.idVendedorVenta equals tblVdor.idVendedor
                    join tblCli in dbVentaRopa.Set<tblCliente>()
                    on tblVt.idClienteVenta equals tblCli.idCliente
                    join tblSd in dbVentaRopa.Set<tblSede>()
                    on tblVt.idSedeVenta equals tblSd.idSede
                    join tblPd in dbVentaRopa.Set<tblPrenda>()
                    on tblVt.idPrendaVenta equals tblPd.idPrenda
                    orderby tblVt.idVenta
                    select new ViewGridDevolucion
                    {
                        idDevolucion = tblDv.idDevolucion,
                        NombreCliente = tblCli.NombreCliente,
                        NombrePrenda = tblPd.NombrePrenda,
                        Cantidad = tblVt.cantidad,
                        fechaDevolucion = tblDv.fechaDevolucion,
                        NombreVendedor = tblVdor.NombreVendedor,
                        NombreSede = tblSd.NombreSede,
                        motivoDevolucion = tblDv.motivoDevolucion

                    }).ToList();
        }

        public string Insertar()
        {
            dbVentaRopa.tblDevoluciones.Add(devolucione);
            dbVentaRopa.SaveChanges();
            return "Se insertó la devolución: " + devolucione.idVentaDevolucion + " exitosamente.";
        }

        public tblDevolucione Consultar(string idVentaDevolucion)
        {

            return dbVentaRopa.tblDevoluciones.FirstOrDefault(x => x.idVentaDevolucion == idVentaDevolucion);
        }
    }
}