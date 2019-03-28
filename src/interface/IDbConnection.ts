import * as Sequelize from 'sequelize'

import { IModels } from './IModels'

export type IDbConnection = { sequelize: Sequelize.Sequelize } & IModels
