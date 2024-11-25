import Cookies from 'js-cookie';

interface JwtPayload {
  roles: string[];
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

class AuthService {
  static getToken(): string | null {
    return Cookies.get('token') || null;
  }

  static setToken(token: string): void {
    Cookies.set('token', token, {
      path: '/',
      sameSite: 'strict',
    });
  }

  static clearToken(): void {
    Cookies.remove('token', { path: '/' });
  }

  static parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = window.atob(base64);
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al parsear el token:', error);
      return null;
    }
  }

  static getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded = this.parseJwt(token);
    return decoded?.roles || [];
  }

  static getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.parseJwt(token);
    return decoded?.username || null;
  }

  static isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('ADMIN');
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.parseJwt(token);
    if (!decoded) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  static isTokenExpiringSoon(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.parseJwt(token);
    if (!decoded) return false;

    const now = Math.floor(Date.now() / 1000);
    const fiveMinutes = 5 * 60;
    return decoded.exp - now < fiveMinutes;
  }

  // Método para manejar la renovación del token
  static handleTokenRenewal(newToken: string): void {
    if (newToken.startsWith('Bearer ')) {
      newToken = newToken.substring(7);
    }
    this.setToken(newToken);
  }

  // Método de logout para conectarse con el backend
  static async logout(): Promise<void> {
    try {
      // Llama al endpoint del backend para invalidar la sesión
      await fetch('http://localhost:8080/mavericks/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error durante el logout:', error);
    } finally {
      // Limpia el token del cliente
      this.clearToken();

      // Redirige al backend para mostrar la página de login
      window.location.href = 'http://localhost:8080/mavericks/auth/login';
    }
  }
}

export default AuthService;
