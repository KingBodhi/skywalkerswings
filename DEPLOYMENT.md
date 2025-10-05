# Deployment Configuration

## Production Environment Variables

For production deployment, ensure the following environment variables are set:

### Database
```
DATABASE_URL="postgresql://main_dlwc_user:TV4d0qmfVetingvquCIQHpU2adiR0P3n@dpg-d386ckggjchc73cqg6rg-a.oregon-postgres.render.com/main_dlwc"
```

### Next.js
```
# Set to your production domain
NEXT_PUBLIC_BASE_URL="https://your-production-domain.com"
NEXTAUTH_URL="https://your-production-domain.com"
NEXTAUTH_SECRET="your-production-secret-key"
SESSION_SECRET="your-session-secret"
```

### Stripe
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Blog System Configuration

The blog system is configured to work in both development and production environments:

- **Development**: Uses localhost URLs for API calls
- **Production**: Uses relative URLs that resolve to the current domain

This is handled automatically by the blog page components. No additional configuration is needed.

## Database Setup

The application uses PostgreSQL in production with the following models:
- User (admin authentication)
- BlogPost (blog content)
- Product/Collection/Cart/Order (e-commerce)

All blog posts are stored in the database and managed through the admin panel at `/admin`.

## Deployment Checklist

1. ✅ Set production environment variables
2. ✅ Configure database connection
3. ✅ Blog system uses database (not static files)
4. ✅ Admin panel authentication works
5. ✅ Text colors optimized for visibility
6. ✅ API endpoints work with production database

## Admin Access

- URL: `/admin/login`
- Email: `admin@skywalker.com`
- Password: `admin123`

## Blog Management

All blog posts are managed through the admin panel and stored in the PostgreSQL database. No static files are used for blog content.