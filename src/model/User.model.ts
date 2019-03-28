import * as Sequelize from 'sequelize'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { IBaseAttributes } from '../interface/IBaseAttibutes'
import { IModels } from '../interface/IModels'
import { IBaseModel } from 'src/interface/IBaseModel'

type ROLES = 'ADMIN' | 'USER'
export const ROLES: ROLES[] = ['ADMIN', 'USER']

export interface UserAttributes extends IBaseAttributes {
  id?: Sequelize.DataTypeUUID
  name: String
  email: String
  password: String
  role: ROLES
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  passwordMatch (encodedPassword: string, password: string): boolean
  hasRole (role: string): boolean
}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes>, IBaseModel<UserInstance> {
  Client: Sequelize.IncludeAssociation
}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
  const User = sequelize.define<UserInstance, UserAttributes>(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ROLES,
        defaultValue: 'USER', // Warning: defaultValue is implicity anys
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: (user: UserInstance): void => {
          const salt = genSaltSync()
          const password = user.get('password')
          const passwordEncrypted = hashSync(password, salt)
          user.set('password', passwordEncrypted)
        },

        beforeUpdate: (user: UserInstance): void => {
          if (user.changed('password')) {
            const salt = genSaltSync()
            const newPass = hashSync(user.get('password'), salt)
            user.set('password', newPass)
          }
        }
      }
    }
  ) as UserModel

  User.prototype.passwordMatch = (encodedPassword: string, password: string): boolean => {
    return compareSync(password, encodedPassword)
  }

  User.prototype.hasRole = function (this: UserInstance, role: string): boolean {
    return this.get('role') === role
  }

  User.associate = (models: IModels): void => {
  }

  return User
}
