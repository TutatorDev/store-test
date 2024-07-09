import { environmentDefault } from "./default";

export const environment = {
  production: true,
  ...environmentDefault,
  // backend: 'http://localhost:3000'
  backend: 'http://demos.tutator.net:6952/api/'
};
