import { defineCollection, z } from 'astro:content';

const menuCollection = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.enum(['Entradas', 'Principales', 'Para Compartir']),
    name: z.string(),
    description: z.string(),
    price: z.string(),
    image: z.string(),
    active: z.boolean().default(true),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    day: z.string(),
    band: z.string(),
    description: z.string(),
    time: z.string(),
    image: z.string(),
    eventDate: z.date(),
    active: z.boolean().default(true),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    heroImage: z.string(),
    author: z.string().default('Vieja Estación'),
    published: z.boolean().default(false),
  }),
});

export const collections = {
  menu: menuCollection,
  events: eventsCollection,
  blog: blogCollection,
};
