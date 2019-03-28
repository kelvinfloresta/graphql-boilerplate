const ENV_NAME = process.env.NODE_ENV || 'development'
const fileName = './config.' + ENV_NAME
const { config:Environment } = require(fileName)


export type InitConfig = {
    SERVER_PORT:number
    DEV_MODE?:boolean
    DROP_DATABASE?:boolean
    ALTER_TABLE?:boolean
    TYPESCRIPT:boolean
}

export default <InitConfig>Environment
