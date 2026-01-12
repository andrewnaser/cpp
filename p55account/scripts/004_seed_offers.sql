-- Seed additional offers for testing
--
-- IMPORTANT:
-- This script matches the current schema created by `001_create_schema.sql`.
-- The `offers` table currently contains ONLY:
--   (niche_id, title, description, commission_rate, affiliate_network, created_at)
-- There is no `example_link`, `compliance_notes`, or `niches.slug`.

-- Weight Loss
INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Ultimate Weight Loss System', 'Proven 30-day program with meal plans + workout guides.', '50% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Weight Loss'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Ultimate Weight Loss System'
  );

INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Keto Diet Masterclass', 'Complete keto course with recipes, shopping lists, and coaching.', '35% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Weight Loss'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Keto Diet Masterclass'
  );

-- Make Money Online
INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Affiliate Marketing Blueprint', 'Step-by-step affiliate marketing course with templates + community.', '75% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Make Money Online'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Affiliate Marketing Blueprint'
  );

INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Dropshipping Automation Software', 'All-in-one dropshipping platform with product research + fulfillment.', 'Up to $100 per sale', 'ShareASale'
FROM public.niches n
WHERE n.name = 'Make Money Online'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Dropshipping Automation Software'
  );

-- Dating & Relationships
INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Text Chemistry Program', 'Proven texting strategies to improve dating results.', '45% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Dating & Relationships'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Text Chemistry Program'
  );

INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'His Secret Obsession', 'Relationship psychology program with high conversion rate.', '55% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Dating & Relationships'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'His Secret Obsession'
  );

-- Health & Wellness
INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Wellness Supplement Stack', 'Daily supplement bundle focused on energy + recovery.', '40% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Health & Wellness'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Wellness Supplement Stack'
  );

INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Sleep Reset Protocol', 'Digital program to improve sleep quality with routines + guidance.', '50% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Health & Wellness'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Sleep Reset Protocol'
  );

-- Personal Development
INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Productivity Planner System', 'Planner + habit system for consistent weekly execution.', '30% per sale', 'ShareASale'
FROM public.niches n
WHERE n.name = 'Personal Development'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Productivity Planner System'
  );

INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Confidence Accelerator', 'Video course focused on confidence + social skills.', '45% per sale', 'DigiStore24'
FROM public.niches n
WHERE n.name = 'Personal Development'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Confidence Accelerator'
  );

-- Technology & Gadgets
INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'VPN Security Suite', 'Premium VPN service with annual plans.', 'Up to 60% per sale', 'Impact'
FROM public.niches n
WHERE n.name = 'Technology & Gadgets'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'VPN Security Suite'
  );

INSERT INTO public.offers (niche_id, title, description, commission_rate, affiliate_network)
SELECT n.id, 'Phone Accessory Bundle', 'Accessory bundle with strong conversion for mobile buyers.', 'Amazon variable', 'Amazon Associates'
FROM public.niches n
WHERE n.name = 'Technology & Gadgets'
  AND NOT EXISTS (
    SELECT 1 FROM public.offers o WHERE o.niche_id = n.id AND o.title = 'Phone Accessory Bundle'
  );
