using Backend.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;

namespace Backend.Datos
{
    public class TareaDatos
    {
        public List<TareaModel> listar() {
            var lista = new List<TareaModel>();
            var cn = new Conexion();
            using (var conexion = new SqlConnection(cn.getCadenaSQL())){
                conexion.Open();
                SqlCommand cmd = new SqlCommand("Select * from tarea", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = cmd.ExecuteReader()){
                    while (dr.Read()){
                        lista.Add(new TareaModel(){
                            idTarea = Convert.ToInt32(dr["idTarea"]),
                            descripcion = Convert.ToString(dr["descripcion"]),
                            nombre = Convert.ToString(dr["nombre"]),
                            prioridad = Convert.ToInt32(dr["prioridad"]),
                            entrega = Convert.ToDateTime(dr["date"]),
                            idEstado = Convert.ToInt32(dr["idEstado"])
                        });
                    }
                }
            }
            return lista;
        }

        public bool Guardar(TareaModel tarea){
            bool rpta;
            try{
                var cn = new Conexion();
                using (var conexion = new SqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("INSERT INTO tarea (descripcion, nombre, prioridad, entrega, idEstado) VALUES(@param1, @param2, @param3, @param4, @param5) ", conexion);
                    cmd.Parameters.AddWithValue("@param1", tarea.descripcion);
                    cmd.Parameters.AddWithValue("@param2", tarea.nombre);
                    cmd.Parameters.AddWithValue("@param3", tarea.prioridad);
                    cmd.Parameters.AddWithValue("@param4", tarea.entrega);
                    cmd.Parameters.AddWithValue("@param5", tarea.idEstado);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();

                    rpta = true;
                }
            }
            catch(Exception ex){
                string error = ex.Message;
                rpta = false;
            }
            return rpta;
        }

        public bool Editar(TareaModel tarea){
            bool rpta;
            try
            {
                var cn = new Conexion();
                using (var conexion = new SqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("UPDATE tarea descripcion=@param1, nombre=@param2, prioridad=@param3, entrega=@param4, idEstado=@param5 WHERE idTarea=@param6 ", conexion);
                    cmd.Parameters.AddWithValue("@param1", tarea.descripcion);
                    cmd.Parameters.AddWithValue("@param2", tarea.nombre);
                    cmd.Parameters.AddWithValue("@param3", tarea.prioridad);
                    cmd.Parameters.AddWithValue("@param4", tarea.entrega);
                    cmd.Parameters.AddWithValue("@param5", tarea.idEstado);
                    cmd.Parameters.AddWithValue("@param6", tarea.idTarea);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();

                    rpta = true;
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                rpta = false;
            }
            return rpta;
        }
        public bool Eliminar(int idTarea){
            bool rpta;
            try
            {
                var cn = new Conexion();
                using (var conexion = new SqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("DELETE FROM tarea WHERE idTarea=@param1", conexion);
                    cmd.Parameters.AddWithValue("@param1", idTarea);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();

                    rpta = true;
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                rpta = false;
            }
            return rpta;
        }
    }
}
