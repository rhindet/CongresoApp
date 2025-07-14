/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ROOT_URL: string;
  // Agrega aquí más variables que vayas a usar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}