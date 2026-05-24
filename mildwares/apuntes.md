# Middlwares

El Middlware es el medio entre el front y back.

De user -> route -> controller -> service -> model

La llamamos y puede retornar o no, si se llama, sigue con la ruta 

Si no tiene permisos para acceder a la ruta, debe devolver error.

Basicamente, es el encargado de interceptar las solicitudes de rutas, verifica y devuelve un resultado.