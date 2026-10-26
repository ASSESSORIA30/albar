/** Acceso seguro a localStorage: puede no existir o lanzar en modo privado. */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* sin almacenamiento disponible: la web sigue funcionando */
  }
}
