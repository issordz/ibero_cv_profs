# IBERO Login

Sistema de login responsivo para la Universidad Iberoamericana.

## Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de utilidades CSS
- **Bootstrap 5** - Componentes UI
- **React Bootstrap** - Componentes Bootstrap para React
- **Lucide React** - Iconos

## Instalación

```bash
cd ibero-login
npm install
```

## Ambientes

El proyecto usa los "modes" de Vite para apuntar a distintos backends. Cada ambiente
tiene su propio archivo `.env.<mode>` que sobreescribe `VITE_API_AUTH_URL` sobre la
base de `.env`:

| Ambiente    | Mode          | Archivo             | API (Auth)                                |
|-------------|---------------|----------------------|--------------------------------------------|
| Desarrollo  | `development` | `.env.development`  | https://administracion-ditdes.ibero.mx     |
| Pruebas     | `pruebas`     | `.env.pruebas`       | https://administracion-ditpru.ibero.mx     |
| Producción  | `production`  | `.env.production`    | https://administracion-dit.ibero.mx        |

## Desarrollo

```bash
npm run dev            # ambiente desarrollo (ditdes)
npm run dev:pruebas    # ambiente pruebas (ditpru)
npm run dev:prod       # servidor local apuntando a producción (dit)
```

## Build

```bash
npm run build          # build de producción (dit)
npm run build:dev      # build de desarrollo (ditdes)
npm run build:pruebas  # build de pruebas (ditpru)
```

## Características

- Diseño responsivo (mobile-first)
- Formulario de login con validación
- Toggle para mostrar/ocultar contraseña
- Integración de Tailwind CSS + Bootstrap
- Iconos modernos con Lucide
