import { pool } from './database.js'
import dotenv from 'dotenv'

dotenv.config()

const createTables = async () => {
  const createTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      neighborhood VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      description TEXT NOT NULL,
      location_id INTEGER REFERENCES locations(id)
    );
  `

  try {
    await pool.query(createTablesQuery)
    console.log('🎉 tables created successfully')
  } catch (err) {
    console.error('⚠️ error creating tables', err)
  }
}

const seedData = async () => {
  await createTables()

  const locations = [
    { name: 'Stitch & Sip LES', neighborhood: 'Lower East Side', slug: 'stitchandsip' },
    { name: 'Brooklyn Yarn Collective', neighborhood: 'Williamsburg', slug: 'brooklynyarn' },
    { name: 'Harlem Craft House', neighborhood: 'Harlem', slug: 'harlemcraft' },
    { name: 'Queens Makers Market', neighborhood: 'Astoria', slug: 'queensmakers' }
  ]

  for (const location of locations) {
    await pool.query(
      'INSERT INTO locations (name, neighborhood, slug) VALUES ($1, $2, $3)',
      [location.name, location.neighborhood, location.slug]
    )
    console.log(`✅ ${location.name} added`)
  }

  const events = [
    { name: 'Beginner Crochet Night', date: '2026-07-10', description: 'Learn basic crochet stitches while sipping your fave drink', location_id: 1 },
    { name: 'Yarn Swap Meet', date: '2026-08-02', description: 'Bring your leftover yarn and swap with fellow crafters', location_id: 1 },
    { name: 'Amigurumi Workshop', date: '2026-09-14', description: 'Make your first stuffed animal using crochet techniques', location_id: 1 },
    { name: 'Natural Dye Lab', date: '2026-07-18', description: 'Dye your own yarn using plants and natural materials', location_id: 2 },
    { name: 'Knit & Chill', date: '2026-08-09', description: 'Casual open knitting session with good vibes and snacks', location_id: 2 },
    { name: 'Fiber Arts Showcase', date: '2026-09-20', description: 'Community showcase of handmade fiber art pieces', location_id: 2 },
    { name: 'Granny Square Circle', date: '2026-07-22', description: 'Master the classic granny square in a group setting', location_id: 3 },
    { name: 'Crochet & Culture Night', date: '2026-08-15', description: 'Celebrate Black craft traditions with live music', location_id: 3 },
    { name: 'Holiday Ornament Make', date: '2026-09-30', description: 'Crochet holiday ornaments to keep or gift', location_id: 3 },
    { name: 'Macramé Basics', date: '2026-07-25', description: 'Intro to macramé wall hangings for beginners', location_id: 4 },
    { name: 'Kids Craft Saturday', date: '2026-08-23', description: 'Fun fiber arts activities designed for kids', location_id: 4 },
    { name: 'Fall Craft Fair', date: '2026-10-05', description: 'Outdoor market featuring local handmade craft vendors', location_id: 4 }
  ]

  for (const event of events) {
    await pool.query(
      'INSERT INTO events (name, date, description, location_id) VALUES ($1, $2, $3, $4)',
      [event.name, event.date, event.description, event.location_id]
    )
    console.log(`✅ ${event.name} added`)
  }

  pool.end()
}

seedData()