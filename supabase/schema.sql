create extension if not exists "pgcrypto";

create type public.user_role as enum ('user', 'admin');
create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type public.payment_status as enum ('unpaid', 'paid', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  short_description text,
  image text,
  gallery text[] not null default '{}',
  price numeric(10,2),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.fleet (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  model text,
  year integer,
  seats integer,
  luggage integer,
  image text,
  gallery text[] not null default '{}',
  price_per_hour numeric(10,2),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  pickup_location text not null,
  dropoff_location text not null,
  booking_date date not null,
  booking_time time not null,
  passengers integer not null default 1 check (passengers between 1 and 50),
  notes text,
  status public.booking_status not null default 'pending',
  payment_status public.payment_status not null default 'unpaid',
  created_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_image text,
  review text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.fleet enable row level security;
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.testimonials enable row level security;

create policy "Profiles are visible to owner and admins"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users update their profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins update profiles"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Services are public"
  on public.services for select
  using (true);

create policy "Admins manage services"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Fleet is public"
  on public.fleet for select
  using (true);

create policy "Admins manage fleet"
  on public.fleet for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Testimonials are public"
  on public.testimonials for select
  using (true);

create policy "Admins manage testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Users create bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Users read own bookings"
  on public.bookings for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins manage bookings"
  on public.bookings for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can send contact messages"
  on public.contact_messages for insert
  with check (true);

create policy "Admins read contact messages"
  on public.contact_messages for select
  using (public.is_admin());

create policy "Admins delete contact messages"
  on public.contact_messages for delete
  using (public.is_admin());

create index bookings_user_id_idx on public.bookings(user_id);
create index bookings_status_idx on public.bookings(status);
create index services_slug_idx on public.services(slug);

insert into public.services (title, slug, short_description, description, price, featured)
values
  ('Airport Transfer', 'airport-transfer', 'Flight-aware airport pickups with luggage support.', 'Premium airport transfer service with live flight monitoring, meet-and-greet options, and punctual chauffeur coordination.', 145, true),
  ('Corporate Travel', 'corporate-travel', 'Executive transport for meetings and roadshows.', 'Discreet corporate chauffeur service designed for executives, client hosting, and multi-stop business travel.', 125, true),
  ('Wedding Limousine', 'wedding-limousine', 'Elegant arrival and guest logistics for the full day.', 'Luxury wedding limousine coordination for couples, wedding parties, family shuttles, and farewell rides.', 250, true),
  ('VIP Chauffeur', 'vip-chauffeur', 'Private hourly chauffeur service on standby.', 'A polished VIP chauffeur experience for nightlife, red carpet events, and private city movement.', 175, false),
  ('City Tours', 'city-tours', 'Curated city tours in luxury comfort.', 'Private city tours with flexible stops, concierge recommendations, and a quiet premium cabin.', 160, false),
  ('Hourly Hire', 'hourly-hire', 'Flexible luxury transport billed by the hour.', 'Book a chauffeur and luxury vehicle for flexible hourly movement with multiple stops.', 135, false)
on conflict (slug) do nothing;

insert into public.fleet (name, brand, model, year, seats, luggage, price_per_hour, featured)
values
  ('Mercedes S-Class', 'Mercedes-Benz', 'S-Class', 2025, 3, 3, 145, true),
  ('Cadillac Escalade', 'Cadillac', 'Escalade', 2025, 6, 6, 165, true),
  ('Rolls Royce Ghost', 'Rolls Royce', 'Ghost', 2024, 3, 2, 325, true),
  ('Stretch Limousine', 'Lincoln', 'Stretch', 2024, 10, 5, 225, false),
  ('Executive SUV', 'GMC', 'Yukon XL', 2025, 6, 6, 155, false);

insert into public.testimonials (customer_name, review, rating)
values
  ('Arianna Cole', 'The booking experience felt effortless and the chauffeur was impeccable.', 5),
  ('Marcus Reed', 'Our corporate roadshow ran exactly on time across six stops.', 5),
  ('Leah Bennett', 'The wedding limousine was spotless, calm, and beautifully coordinated.', 5);
