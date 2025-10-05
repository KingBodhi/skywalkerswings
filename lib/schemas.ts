import { z } from 'zod';

// Common reusable schemas
export const IdSchema = z.string().cuid();
export const EmailSchema = z.string().email().toLowerCase();
export const HandleSchema = z.string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Handle must contain only lowercase letters, numbers, and hyphens');

// User schemas
export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Password is required')
});

export const CreateUserSchema = z.object({
  email: EmailSchema,
  name: z.string().min(1).max(255),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['ADMIN', 'EDITOR', 'CUSTOMER', 'DISTRIBUTOR']).default('CUSTOMER')
});

// Product schemas
export const ProductSchema = z.object({
  title: z.string().min(1).max(255),
  handle: HandleSchema,
  description: z.string().min(1).max(5000),
  status: z.enum(['ACTIVE', 'DRAFT', 'ARCHIVED']).default('DRAFT'),
  metadata: z.string().optional().transform(val => {
    if (!val) return null;
    try {
      return JSON.parse(val);
    } catch {
      throw new z.ZodError([{
        code: 'custom',
        path: ['metadata'],
        message: 'Invalid JSON format'
      }]);
    }
  })
});

export const UpdateProductSchema = ProductSchema.partial().omit({ handle: true });

// Variant schemas
export const VariantSchema = z.object({
  productId: IdSchema,
  sku: z.string().min(1).max(100),
  price: z.number().int().positive().max(10000000), // Max $100,000
  compareAt: z.number().int().positive().optional(),
  color: z.string().max(50).optional(),
  size: z.string().max(50).optional(),
  weightG: z.number().int().positive().max(50000).optional(), // Max 50kg
  dims: z.string().max(100).optional(),
  isDefault: z.boolean().default(false)
});

// Collection schemas
export const CollectionSchema = z.object({
  title: z.string().min(1).max(255),
  handle: HandleSchema,
  description: z.string().max(1000).optional(),
  heroImage: z.string().url().optional(),
  status: z.enum(['ACTIVE', 'DRAFT', 'ARCHIVED']).default('DRAFT')
});

// Cart schemas
export const AddToCartSchema = z.object({
  variantId: IdSchema,
  qty: z.number().int().positive().max(100)
});

export const UpdateCartItemSchema = z.object({
  qty: z.number().int().positive().max(100)
});

// Contact form schema
export const ContactSchema = z.object({
  name: z.string().min(1).max(255),
  email: EmailSchema,
  company: z.string().max(255).optional(),
  message: z.string().min(10).max(5000)
});

// File upload schema
export const FileUploadSchema = z.object({
  filename: z.string().min(1).max(255),
  size: z.number().int().positive().max(5 * 1024 * 1024), // 5MB max
  mimetype: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
  ])
});

// Admin settings schemas
export const GeneralSettingsSchema = z.object({
  storeName: z.string().min(1).max(255),
  storeDescription: z.string().max(1000).optional(),
  contactEmail: EmailSchema,
  supportPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  address: z.string().max(500).optional(),
  timezone: z.string().default('UTC')
});

// Query parameter schemas
export const PaginationSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive()).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive().max(100)).default('10'),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const ProductFilterSchema = z.object({
  status: z.enum(['ACTIVE', 'DRAFT', 'ARCHIVED']).optional(),
  collection: HandleSchema.optional(),
  minPrice: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxPrice: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().max(255).optional()
});