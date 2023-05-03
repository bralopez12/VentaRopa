using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pApp_Serv_WEB.Modelos
{
    public class ViewGridDevolucion
    {
        public string idDevolucion { get; set; }
        public string NombreCliente { get; set; }
        public string NombrePrenda { get; set; }
        public int Cantidad { get; set; }

        public DateTime fechaDevolucion { get; set; }

        public string NombreVendedor { get; set; }

        public string NombreSede { get; set; }

        public string motivoDevolucion { get; set; }
    }
}