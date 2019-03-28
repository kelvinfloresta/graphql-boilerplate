import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import { IGraphqlContext } from 'src/interface/IGraphqlContext'
import db from '../../model'

export class AuthDirective extends SchemaDirectiveVisitor {
  public visitObject (type): void {
    this.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  public visitFieldDefinition (field, details): void {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredAuthRole = this.args.requires
  }

  public ensureFieldsWrapped (objectType): () => any {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field

      field.resolve = async function (...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole

        if (!requiredRole) {
          return resolve.apply(this, args)
        }

        const context: IGraphqlContext = args[2]
        if (!context.authUser) {
          throw new Error('not authorized')
        }

        const user = await db.User.findById(context.authUser.id)
        if (!user.hasRole(requiredRole)) {
          throw new Error('not authorized')
        }

        return resolve.apply(this, args)
      }
    })
  }
}
