import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Projeler',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Proje Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Link (URL) Yapısı',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Kapak Resmi',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Özet',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
            {title: 'Devam Ediyor', value: 'Devam Ediyor'},
            {title: 'Tamamlandı', value: 'Tamamlandı'},
            {title: 'Planlama', value: 'Planlanıyor'},
        ]
      }
    }),
    defineField({
      name: 'content',
      title: 'Detaylı İçerik',
      type: 'array',
      of: [{type: 'block'}], // Bu, yazıya başlık, liste, kalın yazı eklemeyi sağlar
    }),
  ],
})