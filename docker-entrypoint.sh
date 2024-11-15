#!/bin/sh
set -e

# Reemplazar variables de entorno en los archivos estáticos
for file in /usr/share/nginx/html/**/*.js; do
  if [ -f "$file" ]; then
    sed -i "s|VITE_API_URL|${VITE_API_URL}|g" "$file"
    sed -i "s|VITE_GOOGLE_CLIENT_ID|${VITE_GOOGLE_CLIENT_ID}|g" "$file"
  fi
done

# Ejecutar nginx
exec nginx -g "daemon off;"