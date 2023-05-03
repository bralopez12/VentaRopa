using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pApp_Serv_WEB.Modelos
{
    public class ViewGridVenta
    {
        public string IdVenta { get; set; }

        public string NombreCliente { get; set; }

        public DateTime FechaVenta { get; set; }

        public string NombreSede { get; set; }

        public string NombreVendedor { get; set; }

        public string NombrePrenda { get; set; }

        public int CantidadPrenda { get; set; }

        [JsonIgnore]
        public double Precio { get; set; }

        public double Total { get; set; }
    }
}