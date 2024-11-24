// src/pages/AuthTestPage.tsx
import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';

interface DecodedToken {
  roles: string[];
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

interface TokenInfo {
  token: string;
  decodedToken: DecodedToken | null;
  roles: string[];
  isAdmin: boolean;
  isAuthenticated: boolean;
  username: string;
  expirationTime: string;
  isExpiringSoon: boolean;
}

const AuthTestPage: React.FC = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    token: '',
    decodedToken: null,
    roles: [],
    isAdmin: false,
    isAuthenticated: false,
    username: '',
    expirationTime: '',
    isExpiringSoon: false,
  });

  const updateTokenInfo = () => {
    // Leer la cookie existente
    const token = AuthService.getToken();
    console.log('Cookie actual:', document.cookie);
    console.log('Token obtenido de la cookie:', token);

    // Si hay token, decodificarlo y obtener la información
    const decoded = token ? AuthService.parseJwt(token) : null;
    console.log('Token decodificado:', decoded);

    // Obtener toda la información necesaria
    const roles = AuthService.getUserRoles();
    const isAdmin = AuthService.isAdmin();
    const isAuthenticated = AuthService.isAuthenticated();
    const username = AuthService.getUsername();
    const isExpiringSoon = AuthService.isTokenExpiringSoon();

    // Calcular tiempo de expiración
    let expirationTime = '';
    if (decoded?.exp) {
      const date = new Date(decoded.exp * 1000);
      expirationTime = date.toLocaleString();
    }

    // Actualizar el estado con toda la información
    setTokenInfo({
      token: token || '',
      decodedToken: decoded,
      roles,
      isAdmin,
      isAuthenticated,
      username: username || '',
      expirationTime,
      isExpiringSoon,
    });
  };

  // Actualizar información al cargar la página
  useEffect(() => {
    updateTokenInfo();
  }, []);

  const handleRefreshInfo = () => {
    updateTokenInfo();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Auth Service Test Page</h1>
          <button
            onClick={handleRefreshInfo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Refrescar Información
          </button>
        </div>

        <div className="grid gap-4">
          {/* Estado de Autenticación */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Estado de Autenticación:</h2>
            <div className="space-y-2">
              <p>
                ¿Está autenticado?:{' '}
                <span className={tokenInfo.isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                  {tokenInfo.isAuthenticated ? 'Sí' : 'No'}
                </span>
              </p>
              <p>
                ¿Es Admin?:{' '}
                <span className={tokenInfo.isAdmin ? 'text-green-600' : 'text-red-600'}>
                  {tokenInfo.isAdmin ? 'Sí' : 'No'}
                </span>
              </p>
            </div>
          </div>

          {/* Información del Usuario */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Información del Usuario:</h2>
            <div className="space-y-2">
              <p>
                Username: <span className="font-mono">{tokenInfo.username || 'N/A'}</span>
              </p>
              <p>
                Roles: <span className="font-mono">{tokenInfo.roles.join(', ') || 'No roles'}</span>
              </p>
            </div>
          </div>

          {/* Información del Token */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Información del Token:</h2>
            <div className="space-y-2">
              <p>
                Token Existente: <span className="font-mono">{tokenInfo.token ? 'Sí' : 'No'}</span>
              </p>
              <p>
                Expira en: <span className="font-mono">{tokenInfo.expirationTime || 'N/A'}</span>
              </p>
              <p>
                ¿Expirando pronto?:{' '}
                <span className={tokenInfo.isExpiringSoon ? 'text-yellow-600' : 'text-green-600'}>
                  {tokenInfo.isExpiringSoon ? 'Sí' : 'No'}
                </span>
              </p>
            </div>
          </div>

          {/* Token Decodificado */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Token Decodificado:</h2>
            <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-sm">
              {JSON.stringify(tokenInfo.decodedToken, null, 2)}
            </pre>
          </div>

          {/* Cookie Actual */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Cookie Actual:</h2>
            <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-sm break-all">
              {document.cookie || 'No hay cookies'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;
