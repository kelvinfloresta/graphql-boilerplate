import { IDbConnection } from './IDbConnection'
import { AuthUser } from './IAuthUser'
import { IDataLoaderFactory } from './IDataLoader'

export interface IGraphqlContext {
  db: IDbConnection
  authorization?: string
  authUser?: AuthUser
  dataLoaders: IDataLoaderFactory
}
