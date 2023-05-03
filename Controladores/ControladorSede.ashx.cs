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
    /// Summary description for ControladorSede
    /// </summary>
    public class ControladorSede : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(LlenarCombo());
        }
        private string LlenarCombo()
        {
            clsSede Sedes = new clsSede();
            return JsonConvert.SerializeObject(Sedes.LlenarComboSede());
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