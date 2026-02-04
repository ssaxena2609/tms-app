import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { User, RegisterInput, LoginInput, AuthPayload, UserRole } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

class AuthService {
  private users: User[] = [];

  constructor() {
    // Create default admin and employee users for demo
    this.seedUsers();
  }

  private async seedUsers() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const employeePassword = await bcrypt.hash('employee123', 10);

    this.users = [
      {
        id: uuidv4(),
        email: 'admin@tms.com',
        password: adminPassword,
        name: 'Admin User',
        role: UserRole.ADMIN,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        email: 'employee@tms.com',
        password: employeePassword,
        name: 'Employee User',
        role: UserRole.EMPLOYEE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async register(input: RegisterInput): Promise<AuthPayload> {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create new user
    const newUser: User = {
      id: uuidv4(),
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: input.role || UserRole.EMPLOYEE, // Default to employee
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);

    // Generate token
    const token = this.generateToken(newUser);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async login(input: LoginInput): Promise<AuthPayload> {
    // Find user by email
    const user = this.users.find(u => u.email === input.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user);

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  verifyToken(token: string): Omit<User, 'password'> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: UserRole };
      
      const user = this.users.find(u => u.id === decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  getUserById(id: string): Omit<User, 'password'> | undefined {
    const user = this.users.find(u => u.id === id);
    if (!user) return undefined;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  getAllUsers(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user);
  }

  private generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  // For testing purposes
  clearUsers(): void {
    this.users = [];
    this.seedUsers();
  }
}

export default AuthService;
