import path from 'path';

export const BASE_DIR = path.resolve(path.resolve(__dirname, '../'),'../');
export const ENV_PATH = path.join(BASE_DIR, 'VITE_ENVS');
export const PUBLIC_DIR = path.join(BASE_DIR, 'public');

export function isDevFn(mode: string): boolean {
  return mode === 'development';
}

export function isProdctFn(mode: string): boolean {
  return mode === 'production';
}

declare type Recordable<T = any> = Record<string, T>;
declare interface ViteEnv {
  VITE_RENTER_INDEX_PORT: number;
  VITE_RENTER_EDITOR_TEXT_PORT: number;
  VITE_RENTER_EDITOR_MARKDOWN_PORT: number;
  VITE_RENTER_EDITOR_POINTSHOW_PORT: number;
  VITE_RENTER_EDITOR_MINDMAP_PORT: number;
  VITE_RENTER_EDITOR_SKETCH_PORT: number;
  VITE_VIEWER_MARKDOWN_PORT: number;
  VITE_RENTER_SOURCES_MANAGER_PORT: number;
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const res: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    
    if (envName.includes('_PORT')) {
      realName = Number(realName);
    }
    
    res[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return res;
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}


