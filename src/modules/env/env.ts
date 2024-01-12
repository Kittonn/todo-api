import { z } from 'zod';
import { Environment } from '@/shared/enums/environment.enum';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
});

export type Env = z.infer<typeof envSchema>;
