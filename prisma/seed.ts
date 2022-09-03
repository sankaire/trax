import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ArtistData } from "../interfaces";
import { artistsData } from "./songsData";
import { SongData } from "../interfaces";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist: ArtistData) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song: SongData) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
        update: {},
      });
    })
  );
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@me.com" },
    update: {},
    create: {
      email: "user@me.com",
      password: bcrypt.hashSync("password", salt),
    },
  });
  const songs = prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: (await songs).map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
