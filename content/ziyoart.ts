// ZiyoArt Academy classes and tuition, from ZiyoArt's own flyers (Oct 2026).
// Update prices here when they change.
import type { Locale } from "@/lib/i18n";

type ClassText = { name: string; schedule?: string; points: string[]; prices: string[] };
export type ZiyoClass = { id: string; ages?: string; text: Record<Locale, ClassText> };

export const ziyoClasses: ZiyoClass[] = [
  {
    id: "after-school",
    ages: "5–12",
    text: {
      en: {
        name: "After-school program",
        schedule: "Monday–Friday · 3:00–6:00 PM",
        points: ["Homework help and academic support", "Arts and crafts", "Games and activities", "Snacks"],
        prices: ["5 days a week — $475/month", "3 days a week — $350/month", "2 days a week — $265/month"],
      },
      uz: {
        name: "Maktabdan keyingi dastur",
        schedule: "Dushanba–juma · 15:00–18:00",
        points: ["Uy vazifasiga va darslarga yordam", "Rasm va qoʻl mehnati", "Oʻyinlar va mashgʻulotlar", "Yengil tamaddi"],
        prices: ["Haftasiga 5 kun — oyiga $475", "Haftasiga 3 kun — oyiga $350", "Haftasiga 2 kun — oyiga $265"],
      },
    },
  },
  {
    id: "weekend",
    ages: "6–10",
    text: {
      en: {
        name: "Weekend program",
        schedule: "Saturday & Sunday · 10:00 AM–2:00 PM",
        points: ["Uzbek language and culture", "Mental arithmetic", "Qur'an classes", "Educational games and group activities"],
        prices: ["2 days a week — $450/month", "1 day a week — $275/month", "Qur'an class only — $200/month"],
      },
      uz: {
        name: "Dam olish kunlari dasturi",
        schedule: "Shanba va yakshanba · 10:00–14:00",
        points: ["Oʻzbek tili va madaniyati", "Mental arifmetika", "Qurʼon darslari", "Taʼlimiy oʻyinlar va jamoaviy mashgʻulotlar"],
        prices: ["Haftasiga 2 kun — oyiga $450", "Haftasiga 1 kun — oyiga $275", "Faqat Qurʼon darsi — oyiga $200"],
      },
    },
  },
  {
    id: "dance",
    ages: "5–15",
    text: {
      en: { name: "Uzbek national dance", points: ["Uzbek national dance and other styles", "Builds confidence and discipline"], prices: ["8 lessons — $350/month"] },
      uz: { name: "Oʻzbek milliy raqsi", points: ["Oʻzbek milliy raqsi va boshqa uslublar", "Ishonch va intizomni oshiradi"], prices: ["8 dars — oyiga $350"] },
    },
  },
  {
    id: "chess",
    text: {
      en: {
        name: "Chess",
        schedule: "Thursday 4–5 PM · Saturday 3–4 PM",
        points: ["Professional coaching for all levels", "Preparation for city, state and national tournaments"],
        prices: ["8 lessons — $350/month"],
      },
      uz: {
        name: "Shaxmat",
        schedule: "Payshanba 16:00–17:00 · Shanba 15:00–16:00",
        points: ["Barcha darajalar uchun professional murabbiy", "Shahar, shtat va milliy turnirlarga tayyorlov"],
        prices: ["8 dars — oyiga $350"],
      },
    },
  },
  {
    id: "robotics",
    ages: "8–16",
    text: {
      en: { name: "IT & robotics", points: ["Programming and coding", "3D modeling and design", "Hands-on STEM projects and robotics"], prices: ["8 lessons — $350/month"] },
      uz: { name: "IT va robototexnika", points: ["Dasturlash", "3D modellashtirish va dizayn", "Amaliy STEM loyihalari va robototexnika"], prices: ["8 dars — oyiga $350"] },
    },
  },
  {
    id: "piano",
    text: {
      en: { name: "Piano", points: ["Individual and small-group lessons", "Music theory and ear training", "For all ages"], prices: ["8 lessons — $350/month"] },
      uz: { name: "Pianino", points: ["Yakka va kichik guruh darslari", "Musiqa nazariyasi va eshitish qobiliyati", "Barcha yoshdagilar uchun"], prices: ["8 dars — oyiga $350"] },
    },
  },
  {
    id: "creative-hands",
    ages: "8–15",
    text: {
      en: { name: "Creative hands", points: ["Sewing and knitting", "Cooking, baking and healthy drinks", "Practical life skills"], prices: ["8 lessons — $350/month"] },
      uz: { name: "Mohir qoʻllar", points: ["Tikuvchilik va toʻqish", "Pazandachilik va shirinliklar", "Amaliy hayotiy koʻnikmalar"], prices: ["8 dars — oyiga $350"] },
    },
  },
  {
    id: "tutoring",
    text: {
      en: { name: "Individual tutoring", points: ["One-on-one help in math, English and other subjects", "Personal learning plan", "College preparation materials"], prices: ["8 lessons — $350/month", "12 lessons — $500/month"] },
      uz: { name: "Yakka tartibdagi repetitorlik", points: ["Matematika, ingliz tili va boshqa fanlardan yakkama-yakka yordam", "Shaxsiy oʻquv rejasi", "Kollejga tayyorlov materiallari"], prices: ["8 dars — oyiga $350", "12 dars — oyiga $500"] },
    },
  },
];

/** Free weekly program open to every family. */
export const funSunday: Record<Locale, { title: string; schedule: string; points: string[]; note: string }> = {
  en: {
    title: "Fun Sunday — ZiyoArt Kids Club",
    schedule: "Every Sunday · 11:00 AM–2:00 PM · Free",
    points: ["Quizzes and riddles", "Drawing and crafts", "Cartoons and short films in Uzbek", "Stories, proverbs and tongue twisters", "Team games", "Uzbek traditions and good manners"],
    note: "Spaces are limited — register in advance.",
  },
  uz: {
    title: "Quvnoq yakshanba — ZiyoArt bolalar davrasi",
    schedule: "Har yakshanba · 11:00–14:00 · Bepul",
    points: ["Viktorinalar va topishmoqlar", "Rasm chizish va «Mohir qoʻllar»", "Oʻzbek tilida multfilmlar", "Ertaklar, maqollar va tez aytishlar", "Jamoaviy oʻyinlar", "Milliy urf-odatlar va odob"],
    note: "Joylar cheklangan — oldindan roʻyxatdan oʻting.",
  },
};
