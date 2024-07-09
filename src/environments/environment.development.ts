import { environmentDefault } from "./default";

export const environment = {
  ...environmentDefault,
  backend: 'http://localhost:3000/api/',
  // backend: 'http://192.168.0.3:3000/api/',
  production: false
};
