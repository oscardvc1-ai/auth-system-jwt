# 🔐 Auth System JWT

Sistema de autenticación full stack: registro, login y rutas protegidas con JSON Web Tokens.

🔗 **Demo:** https://auth-system-jwt.vercel.app
⏳ La API está en el plan gratuito de Render: la primera petición puede tardar unos segundos mientras el servidor arranca.

## Tecnologías

**Frontend:** React, React Router, Vite — desplegado en Vercel
**Backend:** Node.js, Express — desplegado en Render
**Base de datos:** MongoDB Atlas con Mongoose
**Seguridad:** bcrypt (cifrado de contraseñas) y JWT (autenticación)

## Cómo funciona

1. **Registro:** el usuario envía nombre, email y contraseña. La contraseña se cifra con bcrypt antes de guardarse en MongoDB.
2. **Login:** el servidor comprueba la contraseña y devuelve un token JWT firmado.
3. **Rutas protegidas:** el frontend envía el token en la cabecera `Authorization: Bearer <token>`. Un middleware verifica el token antes de dar acceso al perfil.

## Endpoints de la API

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar un usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Ver el perfil del usuario | Sí |

## Ejecutar en local

1. Clonar el repositorio.
2. En `backend`, crear un archivo `.env` con:
   PORT=4000
   MONGO_URI=tu_cadena_de_conexion
   JWT_SECRET=tu_clave_secreta
4. Arrancar el backend: `cd backend && npm install && node server.js`
5. Arrancar el frontend: `cd frontend && npm install && npm run dev`

## Próximas mejoras

- Guardar el token en una cookie `httpOnly` en lugar de `localStorage`.
- Comprobar en el frontend que el token sigue siendo válido, no solo que existe.
- Validar mejor los datos de entrada.
- Reducir la caducidad del token.
