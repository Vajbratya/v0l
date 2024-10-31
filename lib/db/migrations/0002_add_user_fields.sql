-- Drop existing columns if they exist
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_hash";

-- Add new columns
ALTER TABLE "users" ADD COLUMN "password_hash" text NOT NULL;
ALTER TABLE "users" ADD COLUMN "specialty" varchar(50);
ALTER TABLE "users" ADD COLUMN "phone" varchar(20);

-- Add Stripe related columns if they don't exist
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "stripe_customer_id" text UNIQUE;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "stripe_subscription_id" text UNIQUE;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "stripe_product_id" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan_name" varchar(50);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "subscription_status" varchar(20); 