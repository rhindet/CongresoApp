1. Si al momento de iniciar el Backend(Carpeta server) da errores, Desinstalar los node_modules y el package con:
-Acceder a la terminal de visual code
-cd server(carpeta)
-Remove-Item -Recurse -Force node_modules 
-Remove-Item package-lock.json

2. Volver a instalar dependencias en Backend(Carpeta server):
-nmp install
-npm install cors

3. Abrir el backend con el comando node server.js y Debe funcionar correctamente y aparecer:
"Servidor corriendo en puerto 8002"
"✅ MongoDB Atlas conectado correctamente"
