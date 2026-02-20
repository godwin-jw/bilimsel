import { defineField, defineType } from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Yayınlar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Yayın Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'authors',
      title: 'Yazarlar',
      type: 'string',
      description: 'Örn: Talha, Hasan',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
            {title: 'Makale', value: 'Makale'},
            {title: 'Bildiri', value: 'Bildiri'},
            {title: 'Tez', value: 'Tez'},
            {title: 'Derleme', value: 'Derleme'},
        ]
      }
    }),
    defineField({
      name: 'summary',
      title: 'Kısa Özet',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'PDF Dosyası',
      type: 'file', // Sanity'ye dosya yükleme özelliği
    }),
    defineField({
      name: 'link',
      title: 'Harici Link (Varsa)',
      type: 'url',
    }),
    defineField({
      name: 'slug',
      title: 'URL Kısmı (Slug)',
      type: 'slug',
      options: {
        source: 'title', // Başlıktan otomatik üretir
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})