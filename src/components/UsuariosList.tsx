import React, { useState, useEffect } from 'react';
import { usuarioService, Usuario } from '../services/usuario.service';

const UsuariosList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 👇 Cambié "type" por "id_tipo"
  const [formData, setFormData] = useState<Usuario>({
    id_usuario: 0,
    nombre: '',
    correo: '',
    password: '',
    id_tipo: 2, // alumno por defecto
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usuarioService.obtenerTodos();
      setUsuarios(data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      await usuarioService.crear(formData);

      // Reiniciar formulario
      setFormData({
        id_usuario: 0,
        nombre: '',
        correo: '',
        password: '',
        id_tipo: 2, // alumno por defecto
      });

      await cargarUsuarios();
    } catch (err) {
      setError('Error al crear usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      setLoading(true);
      await usuarioService.eliminar(id);
      await cargarUsuarios();
    } catch (err) {
      setError('Error al eliminar usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const traducirTipo = (id: number) => {
    if (id === 1) return "profesor";
    if (id === 2) return "alumno";
    return "desconocido";
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit} className="usuario-form">

        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={formData.correo}
          onChange={(e) =>
            setFormData({ ...formData, correo: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        {/* 👇 Cambié type → id_tipo (y envío ID numérico) */}
        <select
          value={formData.id_tipo}
          onChange={(e) =>
            setFormData({
              ...formData,
              id_tipo: Number(e.target.value),
            })
          }
        >
          <option value={2}>Alumno</option>
          <option value={1}>Profesor</option>
        </select>

        <button type="submit" disabled={loading}>
          Crear Usuario
        </button>
      </form>

      <div className="usuarios-lista">
        {usuarios.map((usuario, index) => (
          <div key={usuario.id_usuario || index} className="usuario-item">
            <div>
              <h3>{usuario.nombre}</h3>
              <p>{usuario.correo}</p>

              {/* Mostrar texto según id_tipo */}
              <p>Tipo: {traducirTipo(usuario.id_tipo)}</p>
            </div>

            {usuario.id_usuario && (
              <button
                onClick={() => handleEliminar(usuario.id_usuario)}
                className="btn-eliminar"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsuariosList;
