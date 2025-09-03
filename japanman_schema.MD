# JapanMan Database Schema (Human-Readable)

## profiles

- **id** (uuid, pk, fk → `auth.users.id`)
- **role** (`'admin' | 'editor' | 'customer'`, default `'customer'`)
- **display_name** (text)
- **avatar_url** (text)
- **created_at** (timestamp)

---

## destinations

- **id** (uuid, pk)
- **slug** (text, unique)
- **name** (text)
- **summary** (text)
- **body_richtext** (jsonb)
- **hero_image** (text)
- **region** (text)
- **lat** / **lng** (numeric)
- **status** (`'draft' | 'published'`, default `'draft'`)
- **published_at** (timestamp)
- **created_at** (timestamp)

---

## accommodations

- **id** (uuid, pk)
- **destination_id** (uuid, fk → `destinations.id`)
- **slug** (text, unique)
- **name** (text)
- **summary** (text)
- **description** (jsonb)
- **address** (jsonb)
- **lat** / **lng** (numeric)
- **rating** (numeric)
- **price_band** (`'$$' | '$$$' | '$$$$' | '$$$$$'`)
- **hero_image** (text)
- **website_url** (text)
- **affiliate_url** (text)
- **status** (`'draft' | 'published'`, default `'draft'`)
- **created_at** (timestamp)

---

## articles

- **id** (uuid, pk)
- **slug** (text, unique)
- **title** (text)
- **excerpt** (text)
- **body_richtext** (jsonb)
- **cover_image** (text)
- **destination_id** (uuid, fk → `destinations.id`)
- **author_id** (uuid, fk → `profiles.id`)
- **status** (`'draft' | 'published'`, default `'draft'`)
- **published_at** (timestamp)
- **created_at** (timestamp)

---

## poi (Points of Interest / Activities)

- **id** (uuid, pk)
- **destination_id** (uuid, fk → `destinations.id`)
- **type** (`'sight' | 'food' | 'tour' | 'experience' | 'transport' | 'other'`)
- **title** (text)
- **summary** (text)
- **details** (jsonb)
- **lat** / **lng** (numeric)
- **image** (text)
- **provider** (`'internal' | 'gyg' | 'dekitabi'`, default `'internal'`)
- **deeplink** (text)
- **status** (`'draft' | 'published'`, default `'draft'`)
- **created_at** (timestamp)

---

## itineraries

- **id** (uuid, pk)
- **owner_id** (uuid, fk → `profiles.id`)
- **title** (text)
- **destination_id** (uuid, fk → `destinations.id`)
- **start_date** / **end_date** (date)
- **status** (`'draft' | 'shared' | 'confirmed' | 'archived'`, default `'draft'`)
- **visibility** (`'private' | 'unlisted' | 'public'`, default `'private'`)
- **notes** (jsonb)
- **created_at** (timestamp)

---

## itinerary_days

- **id** (uuid, pk)
- **itinerary_id** (uuid, fk → `itineraries.id`)
- **day_index** (integer, unique per itinerary)
- **title** (text)

---

## itinerary_items

- **id** (uuid, pk)
- **itinerary_day_id** (uuid, fk → `itinerary_days.id`)
- **position** (integer, ordering within the day)
- **kind** (`'poi' | 'accommodation' | 'note' | 'transport' | 'meal' | 'custom'`)
- **ref_id** (uuid, nullable, points to related entity)
- **start_time** / **end_time** (time)
- **meta** (jsonb, freeform)
- **created_at** (timestamp)

---

## Storage Buckets

- **media**: public read, editors can upload/delete.
- **itinerary-exports**: private, owner can read/write their own folder (signed URLs).
