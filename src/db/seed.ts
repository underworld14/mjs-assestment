import { db, schema } from './index';

async function seed() {
  console.log('🌱 Seeding database...');
  
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(schema.addresses);
    await db.delete(schema.users);

    // Create users with their addresses
    const usersData = [
      {
        firstname: 'John',
        lastname: 'Doe',
        birthdate: '1990-01-01',
        address: {
          street: 'Jl. Sudirman No. 123',
          city: 'Jakarta',
          province: 'DKI Jakarta',
          postalCode: '12930'
        }
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        birthdate: '1992-05-15',
        address: {
          street: 'Jl. Gatot Subroto No. 45',
          city: 'Jakarta',
          province: 'DKI Jakarta',
          postalCode: '12870'
        }
      },
      {
        firstname: 'Alex',
        lastname: 'Johnson',
        birthdate: '1985-08-22',
        address: {
          street: 'Jl. Merdeka No. 17',
          city: 'Bandung',
          province: 'Jawa Barat',
          postalCode: '40115'
        }
      },
      {
        firstname: 'Maria',
        lastname: 'Garcia',
        birthdate: '1988-12-03',
        address: {
          street: 'Jl. Ahmad Yani No. 89',
          city: 'Surabaya',
          province: 'Jawa Timur',
          postalCode: '60231'
        }
      },
      {
        firstname: 'David',
        lastname: 'Wilson',
        birthdate: '1993-04-11',
        address: {
          street: 'Jl. Diponegoro No. 56',
          city: 'Semarang',
          province: 'Jawa Tengah',
          postalCode: '50275'
        }
      },
      {
        firstname: 'Sarah',
        lastname: 'Brown',
        birthdate: '1991-07-19',
        address: {
          street: 'Jl. Raya Kuta No. 120',
          city: 'Denpasar',
          province: 'Bali',
          postalCode: '80361'
        }
      },
      {
        firstname: 'Michael',
        lastname: 'Lee',
        birthdate: '1987-02-28',
        address: {
          street: 'Jl. Veteran No. 33',
          city: 'Makassar',
          province: 'Sulawesi Selatan',
          postalCode: '90157'
        }
      },
      {
        firstname: 'Linda',
        lastname: 'Tan',
        birthdate: '1995-09-25',
        address: {
          street: 'Jl. Asia Afrika No. 78',
          city: 'Medan',
          province: 'Sumatera Utara',
          postalCode: '20214'
        }
      },
      {
        firstname: 'James',
        lastname: 'Anderson',
        birthdate: '1989-11-12',
        address: {
          street: 'Jl. Pahlawan No. 65',
          city: 'Palembang',
          province: 'Sumatera Selatan',
          postalCode: '30137'
        }
      },
      {
        firstname: 'Emily',
        lastname: 'Wong',
        birthdate: '1994-03-07',
        address: {
          street: 'Jl. Pemuda No. 91',
          city: 'Yogyakarta',
          province: 'DIY Yogyakarta',
          postalCode: '55224'
        }
      }
    ];

    console.log(`Seeding ${usersData.length} users with addresses...`);
    
    // Insert users and their addresses in transactions
    for (const userData of usersData) {
      await db.transaction(async (tx) => {
        // Insert user
        const [user] = await tx.insert(schema.users).values({
          firstname: userData.firstname,
          lastname: userData.lastname,
          birthdate: userData.birthdate
        }).returning();
        
        // Insert address
        await tx.insert(schema.addresses).values({
          userId: user.id,
          street: userData.address.street,
          city: userData.address.city,
          province: userData.address.province,
          postalCode: userData.address.postalCode
        });
      });
    }

    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the seed function
seed().catch(console.error);
