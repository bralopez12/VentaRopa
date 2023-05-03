using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsTipoDocumento
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();

        public List<tblTipoDocuman> LlenarCombo()
        {
            return dbVentaRopa.tblTipoDocumen.OrderBy(p => p.idTipoDocumento).ToList();
        }

    }
}