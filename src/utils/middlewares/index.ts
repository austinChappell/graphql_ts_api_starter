// External Dependencies
import { shield } from 'graphql-shield';
import { Rule, RuleAnd, RuleOr } from 'graphql-shield/dist/rules';

// Internal Dependencies
import { genMiddlewares } from './genMiddlewares';

export * from './authMiddleware';
export * from './getUserIdFromCtx';
export * from './setUserMiddleware';

// Local Typings
export interface PermissionMiddleware {
  Query?: {
    [key: string]: Rule | RuleAnd | RuleOr;
  }
  Mutation?: {
    [key: string]: Rule | RuleAnd | RuleOr;
  }
}

// Local Variables
const middlewares = genMiddlewares();

export const gqlShieldMiddlewares = shield(
  middlewares,
  {
    debug: true,
    fallbackError: 'You are not authorized to perform this action.',
  }
);
