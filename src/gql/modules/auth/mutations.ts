// External Dependencies
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Internal Dependencies
import UserRepo from '../../../repository/userRepo';

import { Mutations } from 'types/graphqlUtils';
import keys from 'config/keys';
import { Context } from 'types/context';
import { getUserIdFromCtx } from 'utils/middlewares';

const userRepo = new UserRepo();

// Local Variables
const setToken = (ctx: Context, user: DB.User) => {
  const tokenLifeInMinutes = 30;

  const token = jwt.sign(
    {
      user: {
        email: user.email,
        id: user.id,
      }
    },
    keys.TOKEN_SECRET,
    { expiresIn: `${tokenLifeInMinutes}m` }
  );

  ctx.res.cookie(
    'token',
    token,
    {
      httpOnly: true,
      maxAge: 1000 * 60 * tokenLifeInMinutes,
    }
  );
}

function checkPassword(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}

export const mutations: Partial<Mutations> = {
  signIn: async (_parent, args, ctx) => {
    const failedSignInErrorMessage = 'Invalid credentials';

    try {
      const user = await userRepo.findOne({
        email: args.input.email.trim().toLowerCase(),
      });

      if (!user) {
        throw new Error(failedSignInErrorMessage);
      }

      const isPasswordValid = checkPassword(args.input.password, user.password);

      if (!isPasswordValid) {
        throw new Error(failedSignInErrorMessage);
      }

      setToken(ctx, user);

      return user;
    } catch (error) {
      throw error;
    }
  },

  signOut: async (_parent, args, ctx) => {
    ctx.res.clearCookie('token');

    return true;
  },

  signUp: async (_parent, args, ctx) => {
    try {
      const user = await userRepo.create(args.input);

      setToken(ctx, user);

      return user;
    } catch (error) {
      throw error;
    }
  },

  updateSelf: async (_parent, args, ctx) => {
    try {
      const userId = getUserIdFromCtx(ctx);

      const user = await userRepo.updateById(userId, args.input);

      return user;
    } catch (error) {
      throw error;
    }
  },
};
