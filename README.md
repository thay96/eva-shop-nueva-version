# 👗 EVA Shop

Tienda online de ropa femenina moderna, desarrollada con React, TypeScript y Tailwind CSS. Permite a los usuarios explorar el catálogo, filtrar por categorías, agregar productos al carrito y realizar pedidos directamente por WhatsApp. Incluye un panel de administración completo para la gestión de inventario.

## ✨ Características Principales

- **Catálogo interactivo**: Visualización de productos con banner principal, buscador en tiempo real y filtros por categorías (Vestidos, Conjuntos, Tops, Accesorios).
- **Carrito de compras**: Gestión de cantidades, tallas y colores, con generación automática de mensaje de pedido para WhatsApp.
- **Panel de Administración**: Acceso seguro con autenticación (Supabase Auth) para crear, visualizar y eliminar productos, incluyendo subida de imágenes.
- **Página de Políticas**: Sección dedicada a métodos de pago (Zelle, Binance, Pago Móvil, etc.) y condiciones de compra.
- **Diseño 100% Responsive**: Adaptado perfectamente para móviles, tablets y escritorio.

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend & Base de Datos**: Supabase (PostgreSQL, Auth, Storage)
- **Estado Global**: Zustand
- **Iconos**: Lucide React

## Cómo ejecutar el proyecto en local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/thay96/eva-shop-nueva-version.git
   cd eva-shop-nueva-version

   Instala las dependencias
   npm install

   Crea un archivo .env en la raíz del proyecto y agrega tus credenciales de Supabase:
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase

   Inicia el servidor de desarrollo:
   npm run dev


    Despliegue (Deploy)
El proyecto está configurado para ser desplegado como sitio estático en Cloudflare Pages o Vercel.
Asegúrate de configurar las variables de entorno (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY) en la plataforma de hosting antes de construir (npm run build).

dejo el link de la pagina por si te interesa verla 

https://eva-shop-elegancia-que-define.evashop.workers.dev/
