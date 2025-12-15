// src/services/auth.service.ts
import api from './axios.config';

// Modelo de usuario REAL según tu backend
export interface Usuario {
  id_usuario?: number;
  nombre: string;
  correo: string;
  password: string;
  id_tipo: number; // profesor = 1, alumno = 2
}

// Respuesta general del backend
export interface ApiResponse<T> {
  error: boolean;
  status: number;
  body: T;
}

// Respuesta de login
export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export const AuthService = {

  // ============================
  //   REGISTRO
  // ============================
  register: async (payload: {
    nombre: string;
    correo: string;
    password: string;
    id_tipo: number;
  }): Promise<Usuario> => {

    const { data } = await api.post<ApiResponse<Usuario>>('/auth/register', payload);

    return data.body;
  },

  // ============================
  //   LOGIN
  // ============================
  login: async (payload: {
    correo: string;
    password: string;
  }): Promise<AuthResponse> => {

    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', payload);

    // Guardar token automáticamente
    if (data.body.token) {
      localStorage.setItem('token', data.body.token);
    }

    // Guardar usuario
    localStorage.setItem('user', JSON.stringify(data.body.usuario));

    return data.body;
  },

  // ============================
  // LOGOUT
  // ============================
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
