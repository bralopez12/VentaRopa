using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsVendedor
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();

        public List<tblVendedor> LlenarComboVendedor()
        {
            return dbVentaRopa.tblVendedors.OrderBy(p => p.idVendedor).ToList();
        }


    }
}