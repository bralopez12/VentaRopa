using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Clases
{
    public class clsPrenda
    {
        DBVentaRopaEntities dbVentaRopa = new DBVentaRopaEntities();

        public List<tblPrenda> LlenarComboPrenda()
        {
            return dbVentaRopa.tblPrendas.OrderBy(p => p.idPrenda).ToList();
        }

        public tblPrenda ConsultarPrenda(int idPrenda)
        {
            return dbVentaRopa.tblPrendas.FirstOrDefault(x => x.idPrenda == idPrenda);
        }
    }
}