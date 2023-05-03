using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsSede
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();

        public List<tblSede> LlenarComboSede()
        {
            return dbVentaRopa.tblSedes.OrderBy(p => p.idSede).ToList();
        }


    }
}