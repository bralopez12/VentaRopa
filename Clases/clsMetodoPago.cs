using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsMetodoPago
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();

        public List<tblMetodoPago> LlenarCombo()
        {
            return dbVentaRopa.tblMetodoPagoes.OrderBy(p => p.idMetodoPago).ToList();
        }

    }
}