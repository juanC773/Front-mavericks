// services/authService.ts
import Cookies from 'js-cookie';

interface JwtPayload {
  roles: string[];
  username: string;
  exp: number;
}

class AuthService {
  private static readonly TOKEN_COOKIE = 'token';

  static getToken(): string | null {
    return Cookies.get(this.TOKEN_COOKIE) || null;
  }

  static setToken(token: string) {
    Cookies.set(this.TOKEN_COOKIE, token, {
      secure: true,
      sameSite: 'strict',
      expires: 5 / 24, // 5 horas en días
    });
  }

  static clearToken() {
    Cookies.remove(this.TOKEN_COOKIE);
  }

  static parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch {
      console.error('Error al parsear el token JWT');
      return null;
    }
  }

  static getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded = this.parseJwt(token);
    return decoded?.roles || [];
  }

  static isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('ADMIN');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default AuthService;
