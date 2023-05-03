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
    /// Summary description for ControladorMetodoPago
    /// </summary>
    public class ControladorMetodoPago : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(LlenarCombo());
        }
        private string LlenarCombo()
        {
            clsMetodoPago metodoPago = new clsMetodoPago();
            return JsonConvert.SerializeObject(metodoPago.LlenarCombo());
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