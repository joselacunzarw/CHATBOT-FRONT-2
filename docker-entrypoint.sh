#!/bin/sh

# Reemplazar variables de entorno en los archivos estáticos
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|VITE_API_URL|${VITE_API_URL}|g" {} \;
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|VITE_GOOGLE_CLIENT_ID|${VITE_GOOGLE_CLIENT_ID}|g" {} \;

# Ejecutar nginx
exec "$@"