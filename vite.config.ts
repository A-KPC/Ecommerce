import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Ecommerce/', // เปลี่ยนเป็นชื่อ repo ของคุณ
});
