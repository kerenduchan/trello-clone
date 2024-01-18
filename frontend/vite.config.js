import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/trello-clone',
    plugins: [react()],
    build: {
        outDir: '../backend/public',
        emptyOutDir: true,
    },
})
