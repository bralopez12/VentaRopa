using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Modelos;
using Newtonsoft.Json;
using pApp_Serv_WEB.Clases;

namespace pApp_Serv_WEB.Controladores
{
    /// <summary>
    /// Summary description for ControladorVentas
    /// </summary>
    public class ControladorVentas : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string Datos;
            StreamReader reader = new StreamReader(context.Request.InputStream);
            Datos = reader.ReadToEnd();

            tblVenta venta = JsonConvert.DeserializeObject<tblVenta>(Datos);
            context.Response.ContentType = "text/plain";
            string DatosRpta = Procesar(venta);
            context.Response.Write(DatosRpta);
        }

        private string Procesar(tblVenta venta)
        {
            clsVenta _venta = new clsVenta();

            switch (venta.Comando)
            {
                case "LlenarGrid":
                    return JsonConvert.SerializeObject(_venta.LlenarTablaVenta());
                case "Insertar":
                    return _venta.Insertar(venta);
                case "Consultar":
                    return JsonConvert.SerializeObject(_venta.Consultar(venta.idVenta));
                default:
                    return "sin implementar";
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}