// Internal Dependencies
import { Context, AuthError } from "types/context";

export function getUserIdFromCtx(ctx: Context) {
  if (!ctx.req.userId) {
    throw new AuthError();
  }

  return ctx.req.userId;
}
