using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsProveedor
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();
        public tblProveedor Proveedor = new tblProveedor();

        public List<ViewGridProveedor> ListarTablaProveedor()
        {
            return (from tblPv in dbVentaRopa.Set<tblProveedor>()
                   join tblPd in dbVentaRopa.Set<tblPrenda>()
                   on tblPv.idPrendaProveedor equals tblPd.idPrenda
                   orderby tblPv.idProveedor
                   select new ViewGridProveedor
                   {
                       idProveedor = tblPv.idProveedor,
                       NombreProveedor = tblPv.NombreProveedor,
                       TelefonoProveedor = tblPv.TelefonoProveedor,
                       EmailProveedor = tblPv.EmailProveedor,
                       DireccionProveedor = tblPv.DireccionProveedor,
                       IdPrenda = tblPd.idPrenda.ToString(),
                       NombrePrenda = tblPd.NombrePrenda,
                   }).ToList();
        }
        public string Insertar()
        {
            dbVentaRopa.tblProveedors.Add(Proveedor);
            dbVentaRopa.SaveChanges();
            return "Se insertó el proveedor: " + Proveedor.NombreProveedor + " exitosamente.";
        }

        public string Actualizar()
        {
            tblProveedor ProveedorActualizar = dbVentaRopa.tblProveedors.FirstOrDefault(p => p.idProveedor == Proveedor.idProveedor);
            ProveedorActualizar.NombreProveedor = Proveedor.NombreProveedor;
            ProveedorActualizar.TelefonoProveedor = Proveedor.TelefonoProveedor;
            ProveedorActualizar.EmailProveedor = Proveedor.EmailProveedor;
            ProveedorActualizar.DireccionProveedor = Proveedor.DireccionProveedor;
            ProveedorActualizar.idPrendaProveedor = Proveedor.idPrendaProveedor;

            dbVentaRopa.SaveChanges();
            return "Se actualizó el proveedor: " + Proveedor.NombreProveedor + " exitosamente.";
        }

        public string Eliminar()
        {
            tblProveedor ProveedorEliminar = dbVentaRopa.tblProveedors.FirstOrDefault(p => p.idProveedor == Proveedor.idProveedor);
            dbVentaRopa.tblProveedors.Remove(ProveedorEliminar);
            dbVentaRopa.SaveChanges();
            return "Se eliminó el proveedor: " + Proveedor.NombreProveedor + " exitosamente.";
        }
    }
}