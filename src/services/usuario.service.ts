import axios from './axios.config';

export interface Usuario {
    id_usuario: number;
    nombre: string;
    correo: string;
    password: string;
    id_tipo: number;  // 1 = profesor, 2 = alumno
}

export interface ApiResponse<T> {
    error: boolean;
    status: number;
    body: T;
}

export const usuarioService = {

    // Obtener todos
    obtenerTodos: async (): Promise<Usuario[]> => {
        const res = await axios.get<ApiResponse<Usuario[]>>('/api/usuario');
        return res.data.body;
    },

    // Crear usuario
    crear: async (usuario: Usuario): Promise<Usuario> => {
        const res = await axios.post<ApiResponse<Usuario>>('/api/usuario', usuario);
        return res.data.body;
    },

    // Actualizar usuario
    actualizar: async (id: number, usuario: Usuario): Promise<Usuario> => {
        const res = await axios.put<ApiResponse<Usuario>>(`/api/usuario/${id}`, usuario);
        return res.data.body;
    },

    // Eliminar usuario
    eliminar: async (id: number): Promise<void> => {
        await axios.delete(`/api/usuario/${id}`);
    },

    // Verificar conexión API
    verificarConexion: async (): Promise<boolean> => {
        try {
            await axios.get('/api/health');
            return true;
        } catch {
            return false;
        }
    }
};


