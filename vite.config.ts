import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;

export default defineConfig({
   plugins: [
      laravel({
         input: ['resources/css/app.css', 'resources/js/app.tsx'],
         refresh: true,
         fonts: [
            bunny('Instrument Sans', {
               weights: [400, 500, 600],
            }),
         ],
      }),
      inertia(),
      react({
         babel: {
            // Hanya aktifkan React Compiler di development (bukan di Vercel)
            plugins: isVercel ? [] : ['babel-plugin-react-compiler'],
         },
      }),
      tailwindcss(),
      // Wayfinder hanya diaktifkan jika bukan Vercel
      wayfinder({
         formVariants: true,
      }),
   ],
});
