import { defineConfig , loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd() , '');
  return {
    define: {
      'process.env.URL': JSON.stringify(env.URL),
      'process.env.X_RapidAPI_Key': JSON.stringify(env.X_RapidAPI_Key),
      'process.env.X_RapidAPI_Host': JSON.stringify(env.X_RapidAPI_Host)
    },
    plugins: [react()]
  }
})