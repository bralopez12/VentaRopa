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
    /// Summary description for ControladorDevolucion
    /// </summary>
    public class ControladorDevolucion : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string Datos;
            StreamReader reader = new StreamReader(context.Request.InputStream);
            Datos = reader.ReadToEnd();

            tblDevolucione devoluciones = JsonConvert.DeserializeObject<tblDevolucione>(Datos);
            context.Response.ContentType = "text/plain";
            string DatosRpta = Procesar(devoluciones); /////
            context.Response.Write(DatosRpta);
        }
        private string Procesar(tblDevolucione devoluciones)
        {
            clsDevolucion _Devolucion = new clsDevolucion();
            _Devolucion.devolucione = devoluciones;

            switch (devoluciones.Comando)
            {
                case "LlenarGrid":
                    return JsonConvert.SerializeObject(_Devolucion.ListarTablaDevolucion());
                case "Insertar":
                    return _Devolucion.Insertar();
                case "Consultar":
                    return JsonConvert.SerializeObject(_Devolucion.Consultar(devoluciones.idVentaDevolucion));
                default:
                    return "No se ha implementado el comando";
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