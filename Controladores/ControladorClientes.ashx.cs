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
    /// Summary description for ControladorClientes
    /// </summary>
    public class ControladorClientes : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string Datos;
            StreamReader reader = new StreamReader(context.Request.InputStream);
            Datos = reader.ReadToEnd();

            tblCliente Cliente = JsonConvert.DeserializeObject<tblCliente>(Datos);
            context.Response.ContentType = "text/plain";
            string DatosRpta = Procesar(Cliente);
            context.Response.Write(DatosRpta);
        }
        private string Procesar(tblCliente Cliente)
        {
            clsCliente _Cliente = new clsCliente();

            switch (Cliente.Comando)
            {
                case "Consultar":
                    return JsonConvert.SerializeObject(_Cliente.Consultar(Cliente.idCliente));
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