import { defineField, defineType } from 'sanity'
// 1. EKLENTİ İMPORTU: Gerekli fonksiyonları çekiyoruz
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const teamType = defineType({
  name: 'team',
  title: 'Ekip Üyeleri',
  type: 'document',
  
  // 2. SIRALAMA AYARI: Sanity'ye varsayılan sıralamanın bu olduğunu söylüyoruz
  orderings: [orderRankOrdering],
  
  fields: [
    // 3. GİZLİ SIRALAMA ALANI:
    // Bu alan, sürükle-bırak yaptığında verinin tutulduğu yerdir.
    // type: "team" kısmı, şemanın kendi "name" değeriyle aynı olmalıdır.
    orderRankField({ type: "team" }),

    defineField({
      name: 'name',
      title: 'İsim Soyisim',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Unvan / Görev',
      type: 'string',
      description: 'Örn: Kurucu, Yazılım Geliştirici',
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Kısa Biyografi (İsteğe bağlı)',
      type: 'text',
    }),
  ],
})