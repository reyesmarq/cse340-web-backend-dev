-- CSE 340 Week 02: Database Tables and Sample Data
DROP TABLE IF EXISTS project;

DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
  organization_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO
  organization (name, description, contact_email, logo_filename)
VALUES
  (
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
  ),
  (
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
  ),
  (
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives',
    'hello@unityserve.org',
    'unityserve-logo.png'
  );

SELECT
  *
FROM
  organization;

CREATE TABLE project (
  project_id SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organization (organization_id),
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(150) NOT NULL,
  project_date DATE NOT NULL
);

INSERT INTO
  project (
    organization_id,
    title,
    description,
    location,
    project_date
  )
VALUES
  (
    1,
    'Riverside Community Center Rebuild',
    'Volunteers help frame and finish a new community center for neighborhood gatherings.',
    'Riverside Park, Boise, ID',
    '2026-08-08'
  ),
  (
    1,
    'Habitat Homes Foundation Pour',
    'Assist licensed crews with foundation work for two new affordable housing units.',
    'Maple Street, Boise, ID',
    '2026-08-22'
  ),
  (
    1,
    'Elementary School Playground Build',
    'Construct a new accessible playground for a local elementary school.',
    'Lincoln Elementary, Meridian, ID',
    '2026-09-05'
  ),
  (
    1,
    'Senior Center Wheelchair Ramp Install',
    'Build and install a code-compliant wheelchair ramp for the community senior center.',
    'Downtown Senior Center, Nampa, ID',
    '2026-09-19'
  ),
  (
    1,
    'Storm-Damaged Roof Repair Weekend',
    'Repair roofs on homes affected by recent storm damage for low-income families.',
    'Garden City, ID',
    '2026-10-03'
  ),
  (
    2,
    'Community Garden Spring Planting',
    'Plant vegetables and herbs in the neighborhood community garden plots.',
    'Willow Creek Community Garden, Boise, ID',
    '2026-08-15'
  ),
  (
    2,
    'Urban Farm Composting Workshop',
    'Teach residents how to compost kitchen scraps to enrich urban farm soil.',
    'GreenHarvest Urban Farm, Boise, ID',
    '2026-08-29'
  ),
  (
    2,
    'Farmers Market Harvest Drive',
    'Collect surplus produce from local farmers to distribute to food pantries.',
    'Capital City Farmers Market, Boise, ID',
    '2026-09-12'
  ),
  (
    2,
    'School Garden Build Day',
    'Build raised garden beds so students can grow their own vegetables.',
    'Whitney Elementary, Boise, ID',
    '2026-09-26'
  ),
  (
    2,
    'Fall Food Sustainability Fair',
    'Host an educational fair on urban farming and food sustainability practices.',
    'Julia Davis Park, Boise, ID',
    '2026-10-10'
  ),
  (
    3,
    'Downtown Food Pantry Restock',
    'Sort and shelve donated food items at the downtown food pantry.',
    'UnityServe Food Pantry, Boise, ID',
    '2026-08-01'
  ),
  (
    3,
    'Back-to-School Supply Drive',
    'Collect and distribute school supplies to families in need.',
    'UnityServe Volunteer Center, Boise, ID',
    '2026-08-18'
  ),
  (
    3,
    'Winter Coat Collection',
    'Gather and organize donated coats for distribution before winter.',
    'UnityServe Volunteer Center, Boise, ID',
    '2026-09-01'
  ),
  (
    3,
    'Volunteer Coordinator Training Day',
    'Train new volunteer coordinators to support local charity partners.',
    'Boise Public Library, Boise, ID',
    '2026-09-15'
  ),
  (
    3,
    'Charity 5K Fun Run Support',
    'Staff registration and water stations for a charity fundraising run.',
    'Ann Morrison Park, Boise, ID',
    '2026-09-29'
  );

SELECT
  *
FROM
  project;
