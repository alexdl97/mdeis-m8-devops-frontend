# POS Frontend – SolidProducts

## Descripción
Este proyecto es el frontend de un sistema **POS (Point of Sale)** desarrollado con [Vite](https://vitejs.dev/) y [TypeScript](https://www.typescriptlang.org/), diseñado para gestionar productos, ventas y operaciones relacionadas.

## 🚀 Tecnologías principales

- **Vite**: Bundler rápido para desarrollo moderno.
- **TypeScript**: Tipado estático para JavaScript.
- **ESLint**: Estándares de calidad y consistencia de código.
- **Node.js & npm**: Gestión de dependencias.

## 📦 Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) — Versión recomendada: **22.x**
- npm — Incluido con la instalación de Node.js

## ⚙️ Instalación

Clonar este repositorio e instala las dependencias:

```bash
git clone https://github.com/alexdl97/mdeis-m8-devops-frontend.git
cd mdeis-m8-devops-frontend
npm install
```

## ⚙️ Ejecución en entorno local
Para desarrollo:

```bash
npm run dev
```

# 🚀 Despliegue del Proyecto en Producción con NGINX (Windows)

## 📦 Prerrequisitos
- Tener instalado NGINX en Windows ([Guía de instalación](https://nginx.org/en/docs/windows.html))
- Node.js y npm instalados
- Proyecto React/Vite configurado

---

## 🔧 Pasos de Despliegue

### 1. Construcción del Proyecto
Genera los archivos estáticos para producción ejecutando:

```bash
npm run build
```

### 2. Configurar el directorio en NGINX
- Navega hacia el directorio `../nginx/html` y crear el directorio `grupo5-frontend`
- Mueve todos los archivos del directorio `dist/` hacia el nuevo directorio `grupo5-frontend`

### 3. Configurar NGINX
Ingresa al archivo `../nginx/conf/nginx.conf` y agrega este bloque de configuración:
```
  server {
        listen 8080;
        server_name localhost;

        location /grupo5-frontend/ {
            alias "<PATH_NGINX>/html/grupo5-frontend/"; # camia PATH_NGINX por la ruta donde se encuentra el directorio nginx
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
```
### 4: Reiniciar NGNIX
Ejecuta los comandos en el CMD (como administrador):
```
nginx -s stop
nginx
```
o solo recarga la configuración:
```
nginx -s reload
```

### 5: Accede a la aplicación
La aplicación estará disponible en:
```
http://localhost:8080/grupo5-frontend/
```