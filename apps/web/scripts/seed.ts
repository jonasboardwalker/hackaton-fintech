// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany({});
    // Create category with translations
    await database.category.create({
      data: {
        translations: {
          createMany: {
            data: [
              { locale: "en", name: "Beauty and Cosmetics" },
              { locale: "cs", name: "Krása a kosmetika" },
              { locale: "ru", name: "Красота и косметика" },
            ],
          },
        },
      },
    });
    console.log("Success");
  } catch (error) {
    console.log("Erro seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
