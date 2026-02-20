import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Sanity Webhook → Anında Güncelleme (On-Demand ISR)
 *
 * Bu endpoint, Sanity Studio'da bir içerik değiştiğinde
 * Sanity'nin webhook'u tarafından çağrılır ve ilgili sayfaları
 * 60 saniye beklemeden ANINDA günceller.
 *
 * Kurulum:
 * 1. Vercel'de SANITY_REVALIDATE_SECRET adında bir env değişkeni oluştur
 *    (örn: openssl rand -base64 32 ile rastgele bir değer üret)
 * 2. Sanity → Manage → API → Webhooks bölümünden yeni webhook ekle:
 *    - URL: https://siten.vercel.app/api/revalidate?secret=SENIN_SECRET_DEGEN
 *    - Trigger: Create, Update, Delete
 *    - Dataset: production
 */
export async function POST(request: NextRequest) {
  // 1. Güvenlik: Secret token kontrolü
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Geçersiz token. Erişim reddedildi." },
      { status: 401 }
    );
  }

  try {
    // 2. Webhook body'sinden hangi içerik tipinin değiştiğini al
    const body = await request.json();
    const documentType = body?._type as string | undefined;

    console.log(`[Revalidate] Tetiklendi. Döküman tipi: ${documentType}`);

    // 3. İçerik tipine göre ilgili sayfaları yenile
    if (documentType === "post") {
      revalidatePath("/");           // Ana sayfa istatistikleri
      revalidatePath("/projeler");   // Proje listesi
      revalidatePath("/projeler/[slug]", "page"); // Tüm proje detay sayfaları
    } else if (documentType === "publication") {
      revalidatePath("/");           // Ana sayfa istatistikleri
      revalidatePath("/yayinlar");   // Yayın listesi
      revalidatePath("/yayinlar/[slug]", "page"); // Tüm yayın detay sayfaları
    } else if (documentType === "team") {
      revalidatePath("/");           // Ana sayfa istatistikleri
      revalidatePath("/hakkimizda"); // Ekip sayfası
    } else {
      // Bilinmeyen tip: tüm sayfaları yenile
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      documentType: documentType ?? "bilinmiyor",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Revalidate] Hata:", err);
    return NextResponse.json(
      { message: "Revalidation sırasında hata oluştu.", error: String(err) },
      { status: 500 }
    );
  }
}

// GET isteği ile manuel test imkânı (tarayıcıdan kontrol için)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Geçersiz token." },
      { status: 401 }
    );
  }

  // Tüm sayfaları yenile
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    message: "Tüm sayfalar yenilendi.",
    timestamp: new Date().toISOString(),
  });
}
