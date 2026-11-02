// Newcomer guides. Every guide carries the date it was last checked against its
// official sources. Re-check each guide at least every 6 months.
import type { Locale } from "@/lib/i18n";

type Section = { heading: string; paras?: string[]; list?: string[] };
type GuideText = { title: string; summary: string; sections: Section[] };
export type Guide = {
  slug: string;
  reviewed: string; // ISO date
  sources: { label: string; url: string }[];
  text: Record<Locale, GuideText>;
};

export const guides: Guide[] = [
  {
    slug: "school-enrollment",
    reviewed: "2026-11-02",
    sources: [
      { label: "NYC Public Schools — Family Welcome Centers", url: "https://www.schools.nyc.gov/fwc" },
      { label: "Legal Services NYC — enrolling immigrant children in school", url: "https://www.legalservicesnyc.org/resources/how-can-new-immigrant-children-enroll-in-school/" },
    ],
    text: {
      en: {
        title: "Enrolling your child in school",
        summary: "Every child in New York City has the right to go to public school, whatever their immigration status.",
        sections: [
          {
            heading: "Your child's rights",
            paras: [
              "All children in New York City have a right to a public education regardless of immigration status. School staff are not allowed to ask about the immigration status of a child or their parents.",
            ],
          },
          {
            heading: "Where to go",
            paras: [
              "Enroll at a Family Welcome Center run by NYC Public Schools. Find the nearest one on the official site below, or call 311 and ask for help enrolling a child in school.",
            ],
          },
          {
            heading: "What to bring",
            list: [
              "Proof of your child's age — a birth certificate or passport",
              "Proof of your home address — a lease, a utility bill, a tax return or a letter from your landlord",
              "Your child's immunization (vaccination) records",
            ],
            paras: [
              "If you do not have every document, the school must still let your child attend while you collect them.",
            ],
          },
          {
            heading: "Language help",
            paras: [
              "You have the right to a free interpreter and to translated school letters — ask for one. You will fill in a Home Language Identification Survey; your child may then take an English test and be placed in an English as a New Language (ENL), bilingual or dual-language program.",
            ],
          },
        ],
      },
      uz: {
        title: "Bolangizni maktabga yozish",
        summary: "Nyu-Yorkdagi har bir bola, immigratsiya maqomidan qatʼi nazar, davlat maktabida oʻqish huquqiga ega.",
        sections: [
          {
            heading: "Bolangizning huquqlari",
            paras: [
              "Nyu-Yorkdagi barcha bolalar immigratsiya maqomidan qatʼi nazar bepul taʼlim olish huquqiga ega. Maktab xodimlari bola yoki ota-onaning immigratsiya maqomini soʻrashi mumkin emas.",
            ],
          },
          {
            heading: "Qayerga borish kerak",
            paras: [
              "NYC Public Schools tasarrufidagi Family Welcome Center (Oilalarni kutib olish markazi)ga boring. Eng yaqinini quyidagi rasmiy saytdan toping yoki 311 ga qoʻngʻiroq qilib, bolani maktabga yozishda yordam soʻrang.",
            ],
          },
          {
            heading: "Nimalarni olib borish kerak",
            list: [
              "Bolaning yoshini tasdiqlovchi hujjat — tugʻilganlik haqidagi guvohnoma yoki pasport",
              "Yashash manzilingizni tasdiqlovchi hujjat — ijara shartnomasi, kommunal toʻlov kvitansiyasi, soliq deklaratsiyasi yoki uy egasining xati",
              "Bolaning emlash (vaktsina) hujjatlari",
            ],
            paras: [
              "Agar barcha hujjatlar boʻlmasa ham, hujjatlarni yigʻguningizcha maktab bolangizni darsga qabul qilishi shart.",
            ],
          },
          {
            heading: "Til boʻyicha yordam",
            paras: [
              "Siz bepul tarjimon va maktab xatlarining tarjimasini olish huquqiga egasiz — soʻrang. Siz uyda gaplashadigan til haqida soʻrovnoma (Home Language Identification Survey) toʻldirasiz; keyin bolangiz ingliz tili testini topshirib, ENL (ingliz tili), ikki tilli yoki dual-language dasturiga joylashtirilishi mumkin.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "idnyc",
    reviewed: "2026-11-02",
    sources: [{ label: "IDNYC — Frequently asked questions (NYC.gov)", url: "https://www.nyc.gov/site/idnyc/frequently-asked-questions/frequently-asked-questions.page" }],
    text: {
      en: {
        title: "Getting an IDNYC card",
        summary: "IDNYC is New York City's free photo ID for every resident aged 10 and older. The city does not ask about immigration status.",
        sections: [
          {
            heading: "Who can get it",
            paras: [
              "Every New York City resident aged 10 or older. Your immigration status does not matter and the city will not ask about it. The card is free for applications made through December 31, 2026 — check the official site for later dates.",
            ],
          },
          {
            heading: "What to bring",
            paras: [
              "IDNYC uses a points system: you need documents worth 3 points that prove who you are and 1 point that proves you live in New York City. A passport, for example, counts toward identity; a lease or a utility bill with your NYC address counts toward residency. The official Document Calculator shows how many points each document is worth.",
            ],
          },
          {
            heading: "How to apply",
            list: [
              "Make an appointment on the IDNYC online portal or by calling 311",
              "Or walk in on the days some enrollment centers accept walk-ins (listed on the official site)",
              "Bring your original documents and apply in person",
            ],
          },
          {
            heading: "How long it lasts",
            paras: ["Cards for ages 10–15 are valid for 2 years; cards for ages 16 and older for 5 years."],
          },
        ],
      },
      uz: {
        title: "IDNYC kartasini olish",
        summary: "IDNYC — Nyu-York shahrining 10 yoshdan katta har bir aholisi uchun bepul suratli ID kartasi. Shahar immigratsiya maqomini soʻramaydi.",
        sections: [
          {
            heading: "Kim olishi mumkin",
            paras: [
              "Nyu-York shahrida yashovchi 10 yosh va undan katta har bir kishi. Immigratsiya maqomingiz ahamiyatga ega emas va shahar bu haqda soʻramaydi. 2026-yil 31-dekabrgacha topshirilgan arizalar uchun karta bepul — keyingi muddatlarni rasmiy saytdan tekshiring.",
            ],
          },
          {
            heading: "Nimalarni olib borish kerak",
            paras: [
              "IDNYC ballar tizimida ishlaydi: shaxsingizni tasdiqlovchi 3 ballik va Nyu-Yorkda yashashingizni tasdiqlovchi 1 ballik hujjat kerak. Masalan, pasport shaxsni tasdiqlaydi; Nyu-Yorkdagi manzilingiz yozilgan ijara shartnomasi yoki kommunal toʻlov kvitansiyasi yashash joyini tasdiqlaydi. Har bir hujjat necha ball ekanini rasmiy Document Calculator koʻrsatadi.",
            ],
          },
          {
            heading: "Qanday topshiriladi",
            list: [
              "IDNYC onlayn portalida yoki 311 ga qoʻngʻiroq qilib navbatga yoziling",
              "Yoki baʼzi markazlar navbatsiz qabul qiladigan kunlarda boring (kunlar rasmiy saytda)",
              "Hujjatlarning asl nusxalarini olib, shaxsan topshiring",
            ],
          },
          {
            heading: "Amal qilish muddati",
            paras: ["10–15 yoshdagilar uchun karta 2 yil, 16 yosh va undan kattalar uchun 5 yil amal qiladi."],
          },
        ],
      },
    },
  },
  {
    slug: "english-classes",
    reviewed: "2026-11-02",
    sources: [
      { label: "New York Public Library — free English classes for adults", url: "https://www.nypl.org/english" },
      { label: "Brooklyn Public Library — classes and events", url: "https://www.bklynlibrary.org/calendar" },
    ],
    text: {
      en: {
        title: "Free English classes",
        summary: "New York's public libraries teach English to adults for free, at every level, and do not ask about immigration status.",
        sections: [
          {
            heading: "In Brooklyn",
            paras: [
              "Brooklyn Public Library branches host free English classes, including We Speak NYC conversation classes. Search the library's calendar for “English” or “We Speak NYC” to find a class near you.",
            ],
          },
          {
            heading: "In the Bronx, Manhattan and Staten Island",
            paras: [
              "The New York Public Library offers free English classes for adults aged 18 and older who live, work or study in New York City — beginner, intermediate and advanced. No documents are required and everyone is welcome regardless of immigration status. Longer courses start with an information session and a placement test.",
            ],
          },
          {
            heading: "We Speak NYC",
            paras: [
              "We Speak NYC is the city's free English conversation program for practicing speaking and listening. In-person classes at libraries usually need no registration.",
            ],
          },
        ],
      },
      uz: {
        title: "Bepul ingliz tili kurslari",
        summary: "Nyu-Yorkdagi davlat kutubxonalari kattalarga ingliz tilini har qanday darajada bepul oʻrgatadi va immigratsiya maqomini soʻramaydi.",
        sections: [
          {
            heading: "Bruklinda",
            paras: [
              "Brooklyn Public Library filiallarida bepul ingliz tili darslari, jumladan We Speak NYC suhbat darslari oʻtkaziladi. Yaqiningizdagi darsni topish uchun kutubxona taqvimidan “English” yoki “We Speak NYC” deb qidiring.",
            ],
          },
          {
            heading: "Bronks, Manxetten va Steten-Aylendda",
            paras: [
              "New York Public Library Nyu-Yorkda yashaydigan, ishlaydigan yoki oʻqiydigan 18 yoshdan katta kishilar uchun bepul ingliz tili kurslarini taklif qiladi — boshlangʻich, oʻrta va yuqori darajalar. Hujjat talab qilinmaydi, immigratsiya maqomidan qatʼi nazar hamma qabul qilinadi. Uzoq kurslar maʼlumot sessiyasi va daraja testidan boshlanadi.",
            ],
          },
          {
            heading: "We Speak NYC",
            paras: [
              "We Speak NYC — shaharning gapirish va tinglashni mashq qilish uchun bepul ingliz tili suhbat dasturi. Kutubxonalardagi jonli darslar uchun odatda roʻyxatdan oʻtish shart emas.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "legal-help",
    reviewed: "2026-11-02",
    sources: [
      { label: "Documented — how the ActionNYC hotline works", url: "https://documentedny.com/?p=28175" },
      { label: "Legal Services NYC", url: "https://www.legalservicesnyc.org/" },
    ],
    text: {
      en: {
        title: "Finding free immigration legal help",
        summary: "New York City funds free, confidential immigration legal help. Here is how to reach it — and how to avoid fraud.",
        sections: [
          {
            heading: "ActionNYC",
            paras: [
              "ActionNYC connects New Yorkers with free, safe immigration legal help from trusted city partners, in more than 200 languages. Call the ActionNYC hotline at 1-800-354-0365 (Monday–Friday, 9 a.m.–6 p.m.) or call 311 and say “ActionNYC”. Hours can change — confirm when you call.",
            ],
          },
          {
            heading: "Other free help",
            paras: ["Legal Services NYC offers free civil legal help to low-income New Yorkers: 917-661-4500."],
          },
          {
            heading: "Protect yourself from fraud",
            list: [
              "Only a licensed attorney or a DOJ-accredited representative may give immigration legal advice",
              "A “notario”, travel agent or translator cannot represent you, even if they promise results",
              "Never sign a form you do not understand, and keep copies of everything you submit",
            ],
          },
        ],
      },
      uz: {
        title: "Bepul immigratsiya yuridik yordamini topish",
        summary: "Nyu-York shahri bepul va maxfiy immigratsiya yuridik yordamini moliyalashtiradi. Unga qanday murojaat qilish va firibgarlikdan qanday saqlanish haqida.",
        sections: [
          {
            heading: "ActionNYC",
            paras: [
              "ActionNYC nyu-yorkliklarni shaharning ishonchli hamkorlaridan bepul va xavfsiz immigratsiya yuridik yordami bilan bogʻlaydi, 200 dan ortiq tilda. ActionNYC qaynoq liniyasiga qoʻngʻiroq qiling: 1-800-354-0365 (dushanba–juma, 9:00–18:00) yoki 311 ga qoʻngʻiroq qilib “ActionNYC” deng. Ish vaqti oʻzgarishi mumkin — qoʻngʻiroq qilganda aniqlang.",
            ],
          },
          {
            heading: "Boshqa bepul yordam",
            paras: ["Legal Services NYC kam daromadli nyu-yorkliklarga bepul fuqarolik yuridik yordamini koʻrsatadi: 917-661-4500."],
          },
          {
            heading: "Firibgarlikdan saqlaning",
            list: [
              "Immigratsiya boʻyicha yuridik maslahatni faqat litsenziyali advokat yoki DOJ akkreditatsiyasiga ega vakil berishi mumkin",
              "“Notarius”, sayohat agenti yoki tarjimon sizni vakil sifatida himoya qila olmaydi, natija vaʼda qilsa ham",
              "Tushunmagan hujjatingizga hech qachon imzo chekmang va topshirgan hamma narsaning nusxasini saqlang",
            ],
          },
        ],
      },
    },
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
