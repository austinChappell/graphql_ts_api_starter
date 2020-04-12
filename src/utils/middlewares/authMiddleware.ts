// External Dependencies
import { rule } from "graphql-shield";
import { Context } from "types/context";
import { getUserIdFromCtx } from "./getUserIdFromCtx";

export function authMiddleware() {
  return rule({ cache: 'contextual' })(
    async (
      _parent,
      _args,
      ctx: Context
    ) => {
      try {
        getUserIdFromCtx(ctx);

        return true;
      } catch (error) {
        return error;
      }
    }
  );
}
