// aigents-web/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 👇 Nuevo flag para que Next genere la carpeta `out/`
  output: 'export',
  images: { unoptimized: true }, // evita errores de <Image> al exportar
}

export default nextConfig