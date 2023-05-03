using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsVenta
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();
        public tblVenta venta = new tblVenta();

        List<ViewGridVenta> VGVenta = new List<ViewGridVenta>();

        public List<ViewGridVenta> LlenarTablaVenta()
        {
            VGVenta = (from tblVenta in dbVentaRopa.Set<tblVenta>()
                    join tblPd in dbVentaRopa.Set<tblPrenda>()
                    on tblVenta.idPrendaVenta equals tblPd.idPrenda
                    join tblSede in dbVentaRopa.Set<tblSede>()
                    on tblVenta.idSedeVenta equals tblSede.idSede
                    join tblClient in dbVentaRopa.Set<tblCliente>()
                    on tblVenta.idClienteVenta equals tblClient.idCliente
                    join tblVendedor in dbVentaRopa.Set<tblVendedor>()
                    on tblVenta.idVendedorVenta equals tblVendedor.idVendedor
                    orderby tblVenta.idVenta
                    select new ViewGridVenta
                    {
                        IdVenta = tblVenta.idVenta,
                        NombreCliente = tblClient.NombreCliente,
                        FechaVenta = tblVenta.fechaVenta,
                        NombreSede = tblSede.NombreSede,
                        NombreVendedor = tblVendedor.NombreVendedor,
                        NombrePrenda = tblPd.NombrePrenda,
                        CantidadPrenda = tblPd.Cantidad,
                        Precio = tblPd.precio,
                    }).ToList();

            CalcularValorVenta();
            return VGVenta;
        }

        public string Insertar(tblVenta venta)
        {
            CalcularValorVenta();
            dbVentaRopa.tblVentas.Add(venta);
            dbVentaRopa.SaveChanges();
            return "Se insertó la venta del cliente con documento: " + venta.idClienteVenta + " exitosamente";
        }

        private void CalcularValorVenta()
        {
            foreach (var Venta in VGVenta)
            {
                Venta.Total = Venta.Precio * Venta.CantidadPrenda;
            }
        }

        public tblVenta Consultar(string idVenta)
        {
            return dbVentaRopa.tblVentas.FirstOrDefault(x => x.idVenta == idVenta);
        }
    }
}