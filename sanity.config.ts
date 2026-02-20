'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// 1. Eklentiyi import ediyoruz
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// Şemaları buradan çekiyoruz
import { schema } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/studio', 
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      // 2. Menü yapısını özelleştiriyoruz
      // GÜNCELLEME BURADA: (S: any, context: any) diyerek TypeScript'i susturduk
      structure: (S: any, context: any) => {
        return S.list()
          .title('İçerik Yönetimi') // Sol panelin başlığı
          .items([
            // A. Önce sıralanabilir "Ekip Üyeleri" listemizi ekliyoruz
            orderableDocumentListDeskItem({
              type: 'team', // Team şemandaki 'name' alanı burayla AYNI olmalı
              title: 'Ekip Üyeleri',
              S,
              context
            }),

            S.divider(), // Araya şık bir çizgi koyalım

            // B. Diğer tüm şemaları (post, category vb.) altına ekle
            // GÜNCELLEME BURADA: (item: any) diyerek hatayı çözdük
            ...S.documentTypeListItems().filter((item: any) => item.getId() !== 'team')
          ])
      },
    }),
    visionTool(),
  ],
})