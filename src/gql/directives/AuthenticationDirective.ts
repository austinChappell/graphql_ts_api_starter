import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLDirective, defaultFieldResolver, DirectiveLocation } from 'graphql';

import { AuthError, Context } from 'types/context';

export class AuthenticationDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(_directiveName) {
    return new GraphQLDirective({
      name: "authentication",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FIELD_DEFINITION,
        DirectiveLocation.MUTATION,
        DirectiveLocation.QUERY,
      ],
    });
  }
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const ctx: Context = args[2];

      if (!ctx.req.userId) {
        throw new AuthError();
      }

      const result = await resolve.apply(this, args);

      return result;
    };
  }
}
