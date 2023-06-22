using Backend.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using MySql.Data.MySqlClient;
using System.Drawing.Drawing2D;

namespace Backend.Datos
{
    public class TareaDatos
    {
        public List<TareaModel> listarPorId(int id) {
            var lista = new List<TareaModel>();
            var cn = new Conexion();
            using (var conexion = new MySqlConnection(cn.getCadenaSQL())){
                conexion.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT t.idTarea, t.descripcion, t.nombre, t.prioridad, t.entrega, e.estado, mt.idMateria FROM tarea t " +
                    "INNER JOIN materia_tarea mt on (t.idTarea = mt.idTarea) INNER JOIN estado e ON (e.id = t.idEstado) WHERE mt.idMateria = @param1", conexion);
                cmd.Parameters.AddWithValue("@param1", id);
                using (var dr = cmd.ExecuteReader()){
                    while (dr.Read()){
                        lista.Add(new TareaModel(){
                            idTarea = Convert.ToInt32(dr["idTarea"]),
                            descripcion = Convert.ToString(dr["descripcion"]),
                            nombre = Convert.ToString(dr["nombre"]),
                            prioridad = Convert.ToInt32(dr["prioridad"]),
                            entrega = Convert.ToDateTime(dr["entrega"]),
                            estado = Convert.ToString(dr["estado"])
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
                using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO tarea (descripcion, nombre, prioridad, entrega, idEstado) VALUES(@param1, @param2, @param3, @param4, @param5) ", conexion);
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
                using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    MySqlCommand cmd = new MySqlCommand("UPDATE tarea descripcion=@param1, nombre=@param2, prioridad=@param3, entrega=@param4, idEstado=@param5 WHERE idTarea=@param6 ", conexion);
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
                using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    MySqlCommand cmd = new MySqlCommand("DELETE FROM tarea WHERE idTarea=@param1", conexion);
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
