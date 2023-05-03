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
    /// Summary description for ControladorProveedor
    /// </summary>
    public class ControladorProveedor : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string Datos;
            StreamReader reader = new StreamReader(context.Request.InputStream);
            Datos = reader.ReadToEnd();

            tblProveedor Proveedor = JsonConvert.DeserializeObject<tblProveedor>(Datos);
            context.Response.ContentType = "text/plain";
            string DatosRpta = Procesar(Proveedor);
            context.Response.Write(DatosRpta);
        }
        private string Procesar(tblProveedor Proveedor)
        {
            clsProveedor objProveedor = new clsProveedor();
            objProveedor.Proveedor = Proveedor;

            switch (Proveedor.Comando)
            {
                case "LlenarGrid":
                    return JsonConvert.SerializeObject(objProveedor.ListarTablaProveedor());
                case "Insertar":
                    return objProveedor.Insertar();
                case "Actualizar":
                    return objProveedor.Actualizar();
                case "Eliminar":
                    return objProveedor.Eliminar();
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