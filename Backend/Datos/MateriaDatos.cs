using Backend.Models;
using MySql.Data.MySqlClient;

namespace Backend.Datos
{
    public class MateriaDatos{
        public List<MateriaModel> listar()
        {
            var lista = new List<MateriaModel>();
            var cn = new Conexion();
            using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
            {
                conexion.Open();
                MySqlCommand cmd = new MySqlCommand("Select * from materia", conexion);
                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        lista.Add(new MateriaModel()
                        {
                            idMateria = Convert.ToInt32(dr["idMateria"]),
                            nombre = Convert.ToString(dr["nombre"])
                        });
                    }
                }
            }
            return lista;
        }

        public MateriaModel listarPorId(int id)
        {
            MateriaModel materia = new MateriaModel();
            var cn = new Conexion();
            using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
            {
                conexion.Open();
                MySqlCommand cmd = new MySqlCommand("Select * from materia WHERE idMateria = @param1", conexion);
                cmd.Parameters.AddWithValue("@param1", id);
                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        materia.idMateria = Convert.ToInt32(dr["idMateria"]);
                        materia.nombre = Convert.ToString(dr["nombre"]);

                    }
                }
            }
            return materia;
        }

        public bool Guardar(MateriaModel materia)
        {
            bool rpta;
            try
            {
                var cn = new Conexion();
                using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO materia (nombre) VALUES(@param1) ", conexion);
                    cmd.Parameters.AddWithValue("@param1", materia.nombre);
                    cmd.ExecuteNonQuery();

                    rpta = true;
                }
            }
            catch (Exception ex)
            {   
                string error = ex.Message;
                Console.WriteLine("Error " + error);
                rpta = false;
            }
            return rpta;
        }

        public bool Editar(MateriaModel materia)
        {
            bool rpta;
            try
            {
                var cn = new Conexion();
                using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    MySqlCommand cmd = new MySqlCommand("UPDATE materia SET nombre=@param1 WHERE idMateria=@param2", conexion);
                    cmd.Parameters.AddWithValue("@param1", materia.nombre);
                    cmd.Parameters.AddWithValue("@param2", materia.idMateria);
                    cmd.ExecuteNonQuery ();

                    rpta = true;
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                Console.WriteLine("Error! " + error);
                rpta = false;
            }
            return rpta;
        }
        public bool Eliminar(int idMateria)
        {
            bool rpta;
            try
            {
                var cn = new Conexion();
                using (var conexion = new MySqlConnection(cn.getCadenaSQL()))
                {
                    conexion.Open();
                    MySqlCommand cmd = new MySqlCommand("DELETE FROM materia WHERE idMateria=@param1", conexion);
                    cmd.Parameters.AddWithValue("@param1", idMateria);
                    cmd.ExecuteNonQuery();

                    rpta = true;
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                Console.WriteLine("Error! " + error);
                rpta = false;
            }
            return rpta;
        }
    }
}
