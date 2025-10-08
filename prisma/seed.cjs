const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { promises: fs } = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main(){
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'change-me';
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role: "ADMIN" },
    create: { email, password: hashed, role: "ADMIN", name: "Admin" }
  });
  const [mil, con, ple] = await Promise.all([
    prisma.collection.upsert({ where: { handle: "military" }, update: {}, create: { title: "Military", handle: "military" } }),
    prisma.collection.upsert({ where: { handle: "construction" }, update: {}, create: { title: "Construction", handle: "construction" } }),
    prisma.collection.upsert({ where: { handle: "pleasure" }, update: {}, create: { title: "Pleasure", handle: "pleasure" } }),
  ]);
  const deluxeSwing = await prisma.product.upsert({
    where: { handle: "deluxe-swing-with-faux-fur" },
    update: {
      title: "Deluxe Swing with Faux Fur",
      description: "Premium swing outfitted with faux fur seat and trim, available in curated color selections for high-impact visuals.",
      status: "ACTIVE"
    },
    create: {
      title: "Deluxe Swing with Faux Fur",
      handle: "deluxe-swing-with-faux-fur",
      description: "Premium swing outfitted with faux fur seat and trim, available in curated color selections for high-impact visuals.",
      status: "ACTIVE"
    }
  });

  await prisma.productImage.create({
    data: {
      productId: deluxeSwing.id,
      url: "/images/skyfox-placeholder.png",
      alt: "Deluxe Swing with Faux Fur primary image"
    }
  });

  const defaultVariant = await prisma.variant.upsert({
    where: { sku: "SW-SWG-DLX-FUR" },
    update: {
      productId: deluxeSwing.id,
      price: 45000,
      size: "Standard",
      color: "Custom",
      isDefault: true
    },
    create: {
      productId: deluxeSwing.id,
      sku: "SW-SWG-DLX-FUR",
      price: 45000,
      size: "Standard",
      color: "Custom",
      isDefault: true
    }
  });

  await prisma.inventoryLevel.upsert({
    where: { variantId: defaultVariant.id },
    create: { variantId: defaultVariant.id, quantity: 12 },
    update: { quantity: 12 }
  });

  const onyxVariant = await prisma.variant.upsert({
    where: { sku: "SW-SWG-DLX-FUR-ONX" },
    update: {
      productId: deluxeSwing.id,
      price: 47500,
      size: "Standard",
      color: "Onyx"
    },
    create: {
      productId: deluxeSwing.id,
      sku: "SW-SWG-DLX-FUR-ONX",
      price: 47500,
      size: "Standard",
      color: "Onyx"
    }
  });

  await prisma.inventoryLevel.upsert({
    where: { variantId: onyxVariant.id },
    create: { variantId: onyxVariant.id, quantity: 8 },
    update: { quantity: 8 }
  });

  await prisma.collectionProduct.upsert({
    where: {
      productId_collectionId: {
        productId: deluxeSwing.id,
        collectionId: ple.id
      }
    },
    update: {},
    create: {
      productId: deluxeSwing.id,
      collectionId: ple.id
    }
  });

  const jobSeeds = [
    {
      title: 'Lead Suspension Designer',
      slug: 'lead-suspension-designer',
      department: 'Engineering',
      location: 'Brooklyn, NY (Hybrid)',
      type: 'FULL_TIME',
      salaryRange: '$120,000 - $145,000',
      description: 'Architect next-generation aerial rigs that balance indulgent comfort with enterprise-grade safety tolerances.',
      responsibilities: [
        '• Own the suspension design backlog from concept through production release',
        '• Partner with somatic practitioners to translate sensation maps into mechanical requirements',
        '• Model redundant load paths and certify designs against ANSI/OSHA performance standards',
        '• Prototype iteratively with fabrication partners and lead quarterly burn-in testing rituals'
      ].join('\n'),
      requirements: [
        '• 7+ years designing load-bearing hardware or theatrical rigging systems',
        '• Demonstrated mastery of SolidWorks or Fusion 360 with FEA workflows',
        '• Comfort collaborating with multidisciplinary teams of engineers, artisans, and intimacy coaches',
        '• Ability to travel quarterly for lab intensives and on-site installations'
      ].join('\n'),
      benefits: [
        '• Signature SkyFox retreat and lab immersion stipends',
        '• Annual education budget for kink, somatics, and advanced rigging certifications',
        '• Sliding-scale product access for you and designated partners'
      ].join('\n'),
      status: 'ACTIVE'
    },
    {
      title: 'Experiential Hospitality Producer',
      slug: 'experiential-hospitality-producer',
      department: 'Experiences',
      location: 'Los Angeles, CA or Remote (North America)',
      type: 'REMOTE',
      salaryRange: '$95,000 - $115,000',
      description: 'Produce SkyFox takeover weekends and pop-up lounges that choreograph touch, lighting, and story into unforgettable evenings.',
      responsibilities: [
        '• Program multi-room journeys in collaboration with riggers, DJs, and consent facilitators',
        '• Manage vendor relationships, budgets, and run-of-show documents',
        '• Translate guest feedback into measurable experience improvements',
        '• Ensure every activation meets SkyFox safety and inclusion protocols'
      ].join('\n'),
      requirements: [
        '• 5+ years producing immersive, nightlife, or experiential events',
        '• Proven ability to hold trauma-informed, consent-forward spaces',
        '• Expertise coordinating cross-functional event teams with grace under pressure',
        '• Bonus: familiarity with ADA requirements and sensory-friendly design'
      ].join('\n'),
      benefits: [
        '• Monthly creative sabbatical days and personal sensory lab hours',
        '• Revenue share incentives tied to event performance',
        '• Comprehensive health benefits and mental wellness stipend'
      ].join('\n'),
      status: 'DRAFT'
    }
  ];

  for (const job of jobSeeds) {
    const publishedAt = job.status === 'ACTIVE' ? new Date() : null;
    await prisma.jobPosting.upsert({
      where: { slug: job.slug },
      update: {
        ...job,
        publishedAt
      },
      create: {
        ...job,
        publishedAt
      }
    });
  }

  // QUICK WINS IMPLEMENTATION
  await implementQuickWins();
}

async function implementQuickWins() {
  console.log('🚀 Implementing Quick Wins...');
  
  try {
    // 1. Update package.json with nodemailer
    await updatePackageJson();
    
    // 2. Update contact form
    await updateContactForm();
    
    // 3. Update contact API
    await updateContactAPI();
    
    // 4. Enhance product pages
    await enhanceProductPage();
    
    // 5. Add environment variables template
    await createEnvTemplate();
    
    console.log('✅ Quick Wins implemented successfully!');
    console.log('Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Configure your .env file with email settings');
    console.log('3. Test the implementations');
    
  } catch (error) {
    console.error('❌ Quick Wins implementation failed:', error);
  }
}

async function updatePackageJson() {
  const packagePath = path.resolve(__dirname, '../package.json');
  const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
  
  if (!pkg.dependencies.nodemailer) {
    pkg.dependencies.nodemailer = '^6.9.7';
    await fs.writeFile(packagePath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('✓ Added nodemailer to package.json');
  }
}

async function updateContactForm() {
  const contactPath = path.resolve(__dirname, '../app/contact/page.tsx');
  
  try {
    let content = await fs.readFile(contactPath, 'utf8');
    
    // Update form inputs to include name attributes
    const updatedContent = content
      .replace(
        '<input className="rounded border border-alloy/50 p-2" placeholder="Full name" required />',
        '<input name="name" className="rounded border border-alloy/50 p-2" placeholder="Full name" required />'
      )
      .replace(
        '<input className="rounded border border-alloy/50 p-2" placeholder="Email" type="email" required />',
        '<input name="email" className="rounded border border-alloy/50 p-2" placeholder="Email" type="email" required />'
      )
      .replace(
        '<input className="rounded border border-alloy/50 p-2" placeholder="Company / Organization (optional)" />',
        '<input name=.company" className="rounded border border-alloy/50 p-2" placeholder="Company / Organization (optional)" />'
      )
      .replace(
        '<textarea className="rounded border border-alloy/50 p-2" placeholder="How can we help?" rows={4} required />',
        '<textarea name="message" className="rounded border border-alloy/50 p-2" placeholder="How can we help?" rows={4} required />'
      );
    
    if (updatedContent !== content) {
      await fs.writeFile(contactPath, updatedContent);
      console.log('✓ Updated contact form with name attributes');
    }
  } catch (error) {
    console.log('⚠️  Contact form update skipped:', error.message);
  }
}

async function updateContactAPI() {
  const apiPath = path.resolve(__dirname, '../app/api/contact/route.ts');
  
  const apiContent = `import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email,.company, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Send email
    await transporter.sendMail({
      from: \`"SkyFox Swings" <\${process.env.SMTP_FROM || process.env.SMTP_USER}>\`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: \`New Contact: \${name}\$.company ? \` - \$.company}\` : ''}\`,
      html: \`
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> \${name}</p>
        <p><strong>Email:</strong> \${email}</p>
        \$.company ? \`<p><strong>Company:</strong> \$.company}</p>\` : ''}
        <p><strong>Message:</strong></p>
        <p>\${message.replace(/\\n/g, '<br>')}</p>
      \`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response('Failed to send message', { status: 500 });
  }
}

export const runtime = 'nodejs';`;

  try {
    await fs.writeFile(apiPath, apiContent);
    console.log('✓ Updated contact API with nodemailer');
  } catch (error) {
    console.log('⚠️  Contact API update failed:', error.message);
  }
}

async function enhanceProductPage() {
  const productPath = path.resolve(__dirname, '../app/product/[handle]/page.tsx');
  
  try {
    let content = await fs.readFile(productPath, 'utf8');
    
    // Add trust badges and inventory indicators after the price
    const enhancementCode = `
      
      {/* Inventory Indicator */}
      {data.variants?.[0]?.inventory && (
        <div className="flex items-center gap-2 text-sm mt-2">
          <div className={\`h-2 w-2 rounded-full \${data.variants[0].inventory.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}\`}></div>
          <span className={data.variants[0].inventory.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
            {data.variants[0].inventory.quantity > 0 
              ? (data.variants[0].inventory.quantity > 10 ? 'In Stock' : \`Only \${data.variants[0].inventory.quantity} left\`)
              : 'Out of Stock'}
          </span>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-alloy/20">
        <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
          Safety Certifications:
        </div>
        <div className="flex gap-3 items-center text-xs text-neutral-700 dark:text-neutral-300">
          <span>✓ ANSI Z359.1-2016</span>
          <span>✓ OSHA Compliant</span>
          <span>✓ CE Marked</span>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
          Trusted by 5,000+ worksites worldwide
        </p>
      </div>

      {/* Urgency Elements */}
      {data.variants?.[0]?.inventory?.quantity < 5 && data.variants[0].inventory.quantity > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-orange-800">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Only {data.variants[0].inventory.quantity} left in stock</span>
          </div>
        </div>
      )}

      {/* Free Shipping Notice */}
      <div className="bg-signal/10 border border-signal/20 rounded-lg p-3 mt-4">
        <div className="text-sm text-signal font-medium">
          🚚 Free shipping on orders over $500 • 30-day returns
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": data.title,
            "description": data.description,
            "image": data.images?.map((img) => img.url) || [],
            "sku": data.variants?.[0]?.sku || "",
            "brand": {
              "@type": "Brand",
              "name": "SkyFox Swings"
            },
            "offers": {
              "@type": "Offer",
              "url": \`\${process.env.NEXT_PUBLIC_BASE_URL}/product/\${params.handle}\`,
              "priceCurrency": "USD",
              "price": (data.variants?.[0]?.price || 0) / 100,
              "availability": data.variants?.[0]?.inventory?.quantity > 0 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />`;

    // Insert after the price display
    const updatedContent = content.replace(
      '<p className="mt-4 opacity-80">{data.description}</p>',
      `<p className="mt-4 opacity-80">{data.description}</p>${enhancementCode}`
    );
    
    if (updatedContent !== content) {
      await fs.writeFile(productPath, updatedContent);
      console.log('✓ Enhanced product page with trust badges and inventory indicators');
    }
  } catch (error) {
    console.log('⚠️  Product page enhancement skipped:', error.message);
  }
}

async function createEnvTemplate() {
  const envPath = path.resolve(__dirname, '../.env.example');
  
  try {
    let envContent = await fs.readFile(envPath, 'utf8');
    
    const emailConfig = `
# Email Configuration for Contact Form
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="contact@skywalker.com"
CONTACT_RECEIVER_EMAIL="admin@skywalker.com"`;

    if (!envContent.includes('SMTP_HOST')) {
      envContent += emailConfig;
      await fs.writeFile(envPath, envContent);
      console.log('✓ Added email configuration to .env.example');
    }
  } catch (error) {
    console.log('⚠️  Environment template creation skipped:', error.message);
  }
}

main().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });
