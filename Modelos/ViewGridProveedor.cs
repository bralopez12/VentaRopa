using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pApp_Serv_WEB.Modelos
{
    public class ViewGridProveedor
    {
        public string idProveedor { get; set; }
        public string NombreProveedor { get; set; }
        public long TelefonoProveedor { get; set; }
        public string EmailProveedor { get; set; }
        public string DireccionProveedor { get; set; }
        public string IdPrenda { get; set; }
        public string NombrePrenda { get; set; }
    }
}