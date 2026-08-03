'use server'

import { signIn, signOut } from '@/lib/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { loginSchema, signupSchema } from '@/lib/validations/auth';

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = loginSchema.safeParse(rawData);
    
    if (!validatedData.success) {
      return { error: 'Invalid fields provided.' };
    }

    await signIn('credentials', {
      email: validatedData.data.email,
      password: validatedData.data.password,
      redirectTo: '/',
    });
    
    return {};
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    return { error: 'Invalid credentials or something went wrong.' };
  }
}

export async function signUpAction(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = signupSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { error: 'Invalid fields provided.' };
    }

    const { email, password, name, role } = validatedData.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role,
      },
    });

    await signIn('credentials', {
      email,
      password,
      redirectTo: role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard',
    });

    return { success: true };
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    return { error: 'Something went wrong during signup.' };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}
