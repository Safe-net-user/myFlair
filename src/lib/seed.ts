require('dotenv').config();

const bcrypt = require('bcryptjs');
const { addDays } = require('date-fns');
const {
  AdditionalServiceType,
  PrismaClient,
  SubscriptionType,
  UserRole,
} = require('@prisma/client');

const hash = (str: string): string => bcrypt.hashSync(str, 10);



const prisma = new PrismaClient();
const { DateTime } = require('luxon');  

async function createService() {
  
  return await prisma.service.create({
    data: {
      image: 'h',
      title: 'Lissage g ',
      value: 'Coupe Fef',
      createdAt: DateTime.now().toJSDate(),
      updatedAt: DateTime.now().toJSDate(),
      description: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqa. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      
    },
  });
}
async function main() {
  try {
    const workplace = await prisma.workplace.create({
      data: {
        title: 'test',
        weekPrice: '32',
        saturdayPrice: '23',
        stock: 0,
        valide: true,
        description: 'Darty',
        durationWeekStartHour: 12,
        durationWeekStartMinute: 23,
        durationWeekEndHour: 1,
        durationWeekEndMinute: 0,
        durationSaturdayStartHour: 10,
        durationSaturdayStartMinute: 10,
        durationSaturdayEndHour: 10,
        durationSaturdayEndMinute: 1,
        image: 'https://res.cloudinary.com/dqgxjbltt/image/upload/v1717710952/pahv29bejimucv5rarb2.png',
        alt: 'Description de l\'image'  // Ajoutez ce champ, ou fournissez une valeur par défaut
      },
    });

    console.log('Workplace created:', workplace);
  } catch (error) {
    console.error('Erreur lors de la création du poste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
async function createUser() {
  
  return await prisma.user.create({
    data: {
      image: '',
      gallery: [],
     
      role: UserRole.PERSONAL,
      username: 'demo-personal',
      firstName: 'demo',
      lastName: 'personal',
      address: {},
      enterprise: '',
      homeServiceOnly: false,
      email: 'demo-personal@myflair.fr',
      password: hash('demo-personal'),
      phone: '+33123456789',
      website: '',
      preferences: {
        dates: {
          from: new Date(),
          to: addDays(new Date(), 30),
        },
        notifications: {
          inApp: {
            general: false,
            reservations: true,
          },
          email: {
            general: false,
            reservations: false,
          },
        },
      },
    },
  });

}
async function createWorkplace() {
  return await prisma.workplace.create({
    data: {
      image:
        'http://res.cloudinary.com/dco04zyvn/image/upload/v1714658143/ttybjvngu0fqr1vxbzo5.jpg',
      alt: 'Mon texte alternatif',
      title: 'Mon super titre',
      description: 'Ma description en <b>gras</b> et en <i>italique</i>',
      weekdays: {
        price: 20,
      },
      weekend: {
        price: 15,
      },
    },
  });
}

async function createTraining() {
  return await prisma.training.create({
    data: {
      image: '',
      alt: 'texte alternatif',
      title: 'ma formation',
      description: '<div>ma description</div>',
      price: 200,
    },
  });
}

async function createAdditionalService() {
  return await prisma.additionalService.create({
    data: {
      image:
        'http://res.cloudinary.com/dco04zyvn/image/upload/v1714658143/ttybjvngu0fqr1vxbzo5.jpg',
      alt: 'text alt',
      title: 'titre ici',
      description: 'la description la',
      price: 20,
      sales: 10,
      quantity: 30,
      type: AdditionalServiceType.PER_DAY,
    },
  });
}

async function createBusinessBooster() {
  return await prisma.businessBooster.create({
    data: {
      image:
        'http://res.cloudinary.com/dco04zyvn/image/upload/v1714658143/ttybjvngu0fqr1vxbzo5.jpg',
      alt: 'alternatif',
      title: 'titre du bb',
      description: 'desc du bizz',
      quantity: 20,
      price: 25,
      dates: [
        {
          from: new Date(),
          to: addDays(new Date(), 30),
        },
      ],
    },
  });
}

(async () => {
 //console.log(await createUser());
 console.log(await main());
  //console.log(await createService())

 
  return;

  for (let i = 0; i < 5; i++) {
    console.log(await createWorkplace());
  }

  for (let i = 0; i < 5; i++) {
    console.log(await createTraining());
  }

  return;

  // await prisma.user.deleteMany();

  // http://res.cloudinary.com/dco04zyvn/image/upload/v1714658143/ttybjvngu0fqr1vxbzo5.jpg

  const res = await prisma.workplace.create({
    data: {
      image:
        'http://res.cloudinary.com/dco04zyvn/image/upload/v1714658143/ttybjvngu0fqr1vxbzo5.jpg',
      alt: 'Ma Workplace en images !',
      title: 'Ma première workplace !',
      description: 'Voici ma première <b>workplace</b> !',
      quantity: 5,
      weekend: {
        price: 50,
        schedules: {},
      },
      weekdays: {
        price: 50,
        schedules: {},
      },
    },
  });

  console.log(res);

  return;

  const a = await prisma.reservation.create({
    data: {
      personalId: 'clvl7tmms00033z4xl4gqn7bc',
      professionalId: '456',
      status: 'DONE',
      reason: '',
      price: 50,
      date: new Date(),
    },
  });

  console.log(res);

  return;

  const subscription = await prisma.subscription.create({
    data: {
      title: 'Mensuel',
      description: 'Description',
      price: 20,
      arguments: [
        {
          title: 'Cool',
          type: 'POSITIVE',
        },
      ],
      type: SubscriptionType.MONTHLY,
    },
  });

  console.log('Subscription: ', subscription);

  return;

  const user = await prisma.user.create({
    data: {
      image: '',
      gallery: [],
      service: '',
      role: UserRole.PERSONAL,
      username: 'personal-demo',
      firstName: 'Personal',
      lastName: 'Demo',
      location: {},
      enterprise: '',
      homeServiceOnly: false,
      email: 'personal-demo@myflair.fr',
      password: hash('personal-demo'),
      phone: '0123456789',
      website: '',
      preferences: {
        dates: {
          from: new Date(),
          to: addDays(new Date(), 30),
        },
        notifications: {
          inApp: {
            general: false,
            reservations: false,
          },
          email: {
            general: false,
            reservations: false,
          },
        },
      },
    },
  });

  console.log(user);
})();
