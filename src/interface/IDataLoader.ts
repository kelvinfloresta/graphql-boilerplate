import { ClientInstance } from 'src/model/Client.model'
import { ItemInstance } from 'src/model/Item.model'
import { DataLoaderSafeNull } from 'src/dataloader/DataLoaderFactory'
import { OrderInstance } from 'src/model/Order.model'
import { UserInstance } from 'src/model/User.model'
import sequelize = require('sequelize')

export interface IDataLoaderFactory {
}

export interface IDataLoaderParam {
  key: string
  attributes: sequelize.FindOptionsAttributesArray
}
