import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/3D-Portfolio/', // Make sure this matches your repo name
  plugins: [react()],
});
