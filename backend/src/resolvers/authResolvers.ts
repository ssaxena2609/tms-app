import AuthService from '../services/authService';
import { RegisterInput, LoginInput, Context } from '../types/auth';

const authService = new AuthService();

export const authResolvers = {
  Query: {
    me: (_: unknown, __: unknown, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },
    
    users: (_: unknown, __: unknown, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      if (context.user.role !== 'ADMIN') {
        throw new Error('Not authorized. Admin access required.');
      }
      return authService.getAllUsers();
    },
  },

  Mutation: {
    register: async (_: unknown, { input }: { input: RegisterInput }) => {
      return authService.register(input);
    },
    
    login: async (_: unknown, { input }: { input: LoginInput }) => {
      return authService.login(input);
    },
  },
};

// Export authService for use in context
export { authService };
