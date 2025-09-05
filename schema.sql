-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.accommodations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  destination_id uuid,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  summary text,
  description jsonb,
  address jsonb,
  lat numeric,
  lng numeric,
  rating numeric,
  price_band text CHECK (price_band = ANY (ARRAY['$$'::text, '$$$'::text, '$$$$'::text, '$$$$$'::text])),
  hero_image text,
  website_url text,
  affiliate_url text,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  created_at timestamp with time zone DEFAULT now(),
  credit text,
  sub_destination_id uuid,
  CONSTRAINT accommodations_pkey PRIMARY KEY (id),
  CONSTRAINT accommodations_sub_destination_id_fkey FOREIGN KEY (sub_destination_id) REFERENCES public.sub_destinations(id),
  CONSTRAINT accommodations_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.locations(id)
);
CREATE TABLE public.articles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body_richtext jsonb,
  cover_image text,
  destination_id uuid,
  author_id uuid,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT articles_pkey PRIMARY KEY (id),
  CONSTRAINT articles_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.locations(id),
  CONSTRAINT articles_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.itineraries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  owner_id uuid,
  title text,
  destination_id uuid,
  start_date date,
  end_date date,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'shared'::text, 'confirmed'::text, 'archived'::text])),
  visibility text DEFAULT 'private'::text CHECK (visibility = ANY (ARRAY['private'::text, 'unlisted'::text, 'public'::text])),
  notes jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT itineraries_pkey PRIMARY KEY (id),
  CONSTRAINT itineraries_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.locations(id),
  CONSTRAINT itineraries_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.itinerary_days (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  itinerary_id uuid,
  day_index integer NOT NULL,
  title text,
  destination_id uuid,
  sub_destination_id uuid,
  accommodation_id uuid,
  date date,
  CONSTRAINT itinerary_days_pkey PRIMARY KEY (id),
  CONSTRAINT itinerary_days_sub_destination_id_fkey FOREIGN KEY (sub_destination_id) REFERENCES public.sub_destinations(id),
  CONSTRAINT itinerary_days_itinerary_id_fkey FOREIGN KEY (itinerary_id) REFERENCES public.itineraries(id),
  CONSTRAINT itinerary_days_accommodation_id_fkey FOREIGN KEY (accommodation_id) REFERENCES public.accommodations(id),
  CONSTRAINT itinerary_days_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.locations(id)
);
CREATE TABLE public.itinerary_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  itinerary_day_id uuid,
  position integer NOT NULL,
  kind text NOT NULL CHECK (kind = ANY (ARRAY['poi'::text, 'accommodation'::text, 'note'::text, 'transport'::text, 'meal'::text, 'custom'::text])),
  ref_id uuid,
  start_time time without time zone,
  end_time time without time zone,
  meta jsonb,
  created_at timestamp with time zone DEFAULT now(),
  poi_id uuid,
  accommodation_item_id uuid,
  title_override text,
  CONSTRAINT itinerary_items_pkey PRIMARY KEY (id),
  CONSTRAINT itinerary_items_itinerary_day_id_fkey FOREIGN KEY (itinerary_day_id) REFERENCES public.itinerary_days(id),
  CONSTRAINT itinerary_items_poi_id_fkey FOREIGN KEY (poi_id) REFERENCES public.poi(id),
  CONSTRAINT itinerary_items_accommodation_item_id_fkey FOREIGN KEY (accommodation_item_id) REFERENCES public.accommodations(id)
);
CREATE TABLE public.locations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  summary text,
  body_richtext jsonb,
  hero_image text,
  region text,
  lat numeric,
  lng numeric,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  thumbnail_image text,
  credit text,
  CONSTRAINT locations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.poi (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  destination_id uuid,
  type text CHECK (type = ANY (ARRAY['sight'::text, 'food'::text, 'tour'::text, 'experience'::text, 'transport'::text, 'other'::text])),
  title text NOT NULL,
  summary text,
  details jsonb,
  lat numeric,
  lng numeric,
  image text,
  provider text DEFAULT 'internal'::text CHECK (provider = ANY (ARRAY['internal'::text, 'gyg'::text, 'dekitabi'::text])),
  deeplink text,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  created_at timestamp with time zone DEFAULT now(),
  sub_destination_id uuid,
  CONSTRAINT poi_pkey PRIMARY KEY (id),
  CONSTRAINT poi_sub_destination_id_fkey FOREIGN KEY (sub_destination_id) REFERENCES public.sub_destinations(id),
  CONSTRAINT poi_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.locations(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  role text DEFAULT 'customer'::text CHECK (role = ANY (ARRAY['admin'::text, 'editor'::text, 'customer'::text])),
  display_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.sub_destinations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  destination_id uuid,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  summary text,
  body_richtext jsonb,
  thumbnail_image text,
  images jsonb,
  lat numeric,
  lng numeric,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  position integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sub_destinations_pkey PRIMARY KEY (id),
  CONSTRAINT sub_destinations_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.locations(id)
);