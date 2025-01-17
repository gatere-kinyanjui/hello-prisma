import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Mac",
      email: "mac@prisma.com",
      posts: {
        create: { title: "Hello world!" },
      },
      profile: {
        create: { bio: "I like turtles!" },
      },
    },
  });

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect;
    process.exit(1);
  });
