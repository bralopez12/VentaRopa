using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using pApp_Serv_WEB.Clases;
using Newtonsoft.Json;
using System.IO;
using pApp_Serv_WEB.Modelos;

namespace pApp_Serv_WEB.Controladores
{
    /// <summary>
    /// Summary description for ControladorPrenda
    /// </summary>
    public class ControladorPrenda : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string Datos;
            StreamReader reader = new StreamReader(context.Request.InputStream);
            Datos = reader.ReadToEnd();

            tblPrenda prenda = JsonConvert.DeserializeObject<tblPrenda>(Datos);
            context.Response.ContentType = "text/plain";
            string DatosRpta = Procesar(prenda);
            context.Response.Write(DatosRpta);
        }

        private string Procesar(tblPrenda prenda)
        {
            clsPrenda _prenda = new clsPrenda();

            switch (prenda.Comando)
            {
                case "LlenarCombo":
                    return JsonConvert.SerializeObject(_prenda.LlenarComboPrenda());
                case "ConsultarPrenda":
                    return JsonConvert.SerializeObject(_prenda.ConsultarPrenda(prenda.idPrenda));
                default:
                    return "sin implementar";
            }
        }

        //private string LlenarComboPrenda()
        //{
        //    clsPrenda Prenda = new clsPrenda();
        //    return JsonConvert.SerializeObject(Prenda.LlenarComboPrenda());
        //}




        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}