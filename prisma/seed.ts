import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    const email = (await process.env.SEED_EMAIL) as string

    // cleanup the existing database
    await prisma.user.delete({ where: { email: email } }).catch(() => {
      // no worries if it doesn't exist yet
    })

    const hashedPassword = (await process.env.HASHEDPASSWORD) as string

    return await prisma.user.create({
      data: {
        email,
       password: hashedPassword,
       username:'DCH'
        }
    })


      }

    console.log(`Database has been seeded. 🌱`);




seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });