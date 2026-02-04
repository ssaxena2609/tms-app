import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { authService } from './resolvers/authResolvers';
import { Context } from './types/auth';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

async function startServer() {
  const app = express();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable GraphQL Playground
  });

  await server.start();

  // Middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: CORS_ORIGIN,
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        // Get token from header
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (token) {
          try {
            const user = authService.verifyToken(token);
            return { user };
          } catch (error) {
            // Invalid token, continue without user
            return {};
          }
        }
        
        return {};
      },
    })
  );

  // Health check endpoint
  app.get('/health', (_, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🏥 Health check at http://localhost:${PORT}/health`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
