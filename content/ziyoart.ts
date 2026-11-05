// ZiyoArt Academy classes, from ZiyoArt's own flyers (Oct 2026).
// Tuition is not published: families contact ZiyoArt.
import type { Locale } from "@/lib/i18n";

type ClassText = { name: string; schedule?: string; points: string[] };
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
      },
      uz: {
        name: "Maktabdan keyingi dastur",
        schedule: "Dushanba–juma · 15:00–18:00",
        points: ["Uy vazifasiga va darslarga yordam", "Rasm va qoʻl mehnati", "Oʻyinlar va mashgʻulotlar", "Yengil tamaddi"],
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
      },
      uz: {
        name: "Dam olish kunlari dasturi",
        schedule: "Shanba va yakshanba · 10:00–14:00",
        points: ["Oʻzbek tili va madaniyati", "Mental arifmetika", "Qurʼon darslari", "Taʼlimiy oʻyinlar va jamoaviy mashgʻulotlar"],
      },
    },
  },
  {
    id: "dance",
    ages: "5–15",
    text: {
      en: { name: "Uzbek national dance", points: ["Uzbek national dance and other styles", "Builds confidence and discipline"] },
      uz: { name: "Oʻzbek milliy raqsi", points: ["Oʻzbek milliy raqsi va boshqa uslublar", "Ishonch va intizomni oshiradi"] },
    },
  },
  {
    id: "chess",
    text: {
      en: {
        name: "Chess",
        schedule: "Thursday 4–5 PM · Saturday 3–4 PM",
        points: ["Professional coaching for all levels", "Preparation for city, state and national tournaments"],
      },
      uz: {
        name: "Shaxmat",
        schedule: "Payshanba 16:00–17:00 · Shanba 15:00–16:00",
        points: ["Barcha darajalar uchun professional murabbiy", "Shahar, shtat va milliy turnirlarga tayyorlov"],
      },
    },
  },
  {
    id: "robotics",
    ages: "8–16",
    text: {
      en: { name: "IT & robotics", points: ["Programming and coding", "3D modeling and design", "Hands-on STEM projects and robotics"] },
      uz: { name: "IT va robototexnika", points: ["Dasturlash", "3D modellashtirish va dizayn", "Amaliy STEM loyihalari va robototexnika"] },
    },
  },
  {
    id: "piano",
    text: {
      en: { name: "Piano", points: ["Individual and small-group lessons", "Music theory and ear training", "For all ages"] },
      uz: { name: "Pianino", points: ["Yakka va kichik guruh darslari", "Musiqa nazariyasi va eshitish qobiliyati", "Barcha yoshdagilar uchun"] },
    },
  },
  {
    id: "creative-hands",
    ages: "8–15",
    text: {
      en: { name: "Creative hands", points: ["Sewing and knitting", "Cooking, baking and healthy drinks", "Practical life skills"] },
      uz: { name: "Mohir qoʻllar", points: ["Tikuvchilik va toʻqish", "Pazandachilik va shirinliklar", "Amaliy hayotiy koʻnikmalar"] },
    },
  },
  {
    id: "tutoring",
    text: {
      en: { name: "Individual tutoring", points: ["One-on-one help in math, English and other subjects", "Personal learning plan", "College preparation materials"] },
      uz: { name: "Yakka tartibdagi repetitorlik", points: ["Matematika, ingliz tili va boshqa fanlardan yakkama-yakka yordam", "Shaxsiy oʻquv rejasi", "Kollejga tayyorlov materiallari"] },
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
