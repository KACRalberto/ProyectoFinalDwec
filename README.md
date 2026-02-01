Pequeña aplicación de tareas construida con Vue 3 y Firebase (Firestore + Auth). Permite registrarse/iniciar sesión y gestionar tareas por usuario.

Tiene una interfaz sencilla para crear, listar y gestionar tareas. Cada usuario solo ve sus propias tareas. El header permanece visible para navegación.

Se ha utilizado:
- Vue 3
- Vite
- Firebase (Authentication, Firestore)
- Tailwind CSS (estilos)


La estructura de este proyecto es:
- `src/` — Código fuente de la aplicación.
  - `components/` — Componentes reutilizables (ej. `taskCardComponent.vue`).
  - `views/` — Vistas principales (`authViewPage.vue`, `taskViewPage.vue`, `workspaceViewPage.vue`).
  - `firebase/config.js` — Inicialización de Firebase.
  - `services/` — Lógica relacionada con auth y perfil de usuario.
  - `stores/` — Pinia/Vuex stores (estado global).


Para utilizarlo en local:
1. Clona el repositorio:
git clone <repo-url>
cd ProyectoFinalDwec

2. Instala dependencias:
npm install

3. Copia tu configuración de Firebase a `src/firebase/config.js`

4. Ejecuta la aplicación en modo desarrollo:
npm run dev

-Enlace de vercel : https://proyecto-final-dwec-eta.vercel.app/auth


La aplicación usa una colección principal donde cada usuario tiene su documento y dentro de él se almacena la lista de tareas. Ejemplo:

- Colección: `users`
  - Documento: `{userId}` (ID del usuario de Firebase Auth)
    - Campo: `tasks` — Array de objetos con las tareas, por ejemplo:

```json
{
  "tasks": [
    {
      "id": "t1",
      "title": "Comprar leche",
      "done": false,
      "createdAt": 1670000000000
    },
    {
      "id": "t2",
      "title": "Enviar informe",
      "done": true,
      "createdAt": 1670001000000
    }
  ]
}
```
