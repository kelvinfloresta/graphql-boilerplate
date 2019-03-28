import { InitConfig } from '.'

export const config: InitConfig = {

  SERVER_PORT: 4000,
  DEV_MODE: false,
  DROP_DATABASE: false,
  ALTER_TABLE: false,
  TYPESCRIPT: __filename.slice(-3) === '.ts'
}
