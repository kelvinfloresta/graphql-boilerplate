import { UserModel } from '../model/User.model'
import { Models } from 'sequelize'

export interface IModels extends Models {
  readonly User: UserModel
}
