import { z } from 'zod';
import { Environment } from '@/shared/enums/environment.enum';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRATION: z.string(),
  JWT_REFRESH_TOKEN_EXPIRATION: z.string(),
});

export type Env = z.infer<typeof envSchema>;
