import type { LocaleCode } from "@/RTL/LocaleProvider";

export type LocalizedText = Record<LocaleCode, string>;
export type VehicleModel = {
  id: string;
  slug: string;
  headline: LocalizedText;
  shortDescription: LocalizedText;
  name: LocalizedText;
  image?: string | null;
  imageAlt: LocalizedText;
  description: LocalizedText;
  isMock: boolean;
  pageHero?: {
    title: LocalizedText;
    paragraphs: LocalizedText[];
  };
  featureStory?: {
    image: string;
    imageAlt: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
  };
  lifestyleBanner?: {
    image: string;
    title: LocalizedText;
    description: LocalizedText;
  };
  factorySection?: {
    image: string;
    description: LocalizedText;
  };
  lineupSection?: {
    image: string;
    description: LocalizedText;
  };
};
export type VehicleBrand = {
  id: string;
  name: string;
  logo?: string | null;
  headline: LocalizedText;
  description: LocalizedText;
  models: [VehicleModel, ...VehicleModel[]];
};

// Entries marked isMock are demonstrations, not a confirmed company lineup.
// All marketing headlines are original website copy, not manufacturer slogans.
export const vehicleBrands: [VehicleBrand, ...VehicleBrand[]] = [
  {
    id: "jaecoo", name: "JAECOO", logo: null,
    headline: { en: "Adventure, with a refined edge.", ar: "روح المغامرة بلمسة راقية." },
    description: { en: "Explore a distinctive design identity, with a conversation shaped around your taste and the way you travel.", ar: "اكتشف هوية تصميم متفرّدة، وحواراً ينطلق من ذوقك وطريقتك في التنقّل." },
    models: [
      {
        id: "jaecoo-j8",
        slug: "j8",
        lineupSection: {
          image: "/images/jaecooj8/ALL-JAECOO.png",
          description: {
            en: "One brand. Four distinct personalities. A collection built for every road and every story.",
            ar: "علامة واحدة، أربع شخصيات مختلفة. تشكيلة صُمّمت لتناسب كل طريق وكل حكاية.",
          },
        },
        factorySection: {
          image: "/images/jaecoo7/FACTORY.png",
          description: {
            en: "Engineered from the inside out: every layer, every joint, built for strength, safety, and a ride you can trust.",
            ar: "هندسة متقنة من الداخل إلى الخارج, كل طبقة وكل وصلة صُمّمت لتمنحك القوة والأمان وقيادة تثق بها.",
          },
        },
        lifestyleBanner: {
          image: "/images/jaecooj8/section6-product-jaecoo-j8-pic1.webp",
          title: { en: "FROM CLASSIC, BEYOND CLASSIC", ar: "من الكلاسيكية إلى ما يتجاوزها" },
          description: {
            en: "Through O-UNIVERSE's GREEN OJ & Entertainment OJ , we can accommodate diverse cultural and personalized fields",
            ar: "من خلال GREEN OJ وEntertainment OJ في عالم O-UNIVERSE، نحتضن مجالات ثقافية متنوعة وتجارب تلائم التطلعات الفردية.",
          },
        },
        featureStory: {
          image: "/images/jaecooj8/j8-see.png",
          imageAlt: { en: "JAECOO J8 surrounded by water spray beneath golden sunlight", ar: "جايكو J8 وسط رذاذ المياه تحت أشعة الشمس الذهبية" },
          title: { en: "JAECOO J8 — A Commanding Presence", ar: "جايكو J8 — حضور يخطف الأنظار" },
          description: {
            en: "The JAECOO J8 cuts through the water beneath rays of golden sunlight, sending dramatic waves of spray across the scene. Its bold vertical grille, sculpted bonnet, and striking headlights command attention, while the panoramic glass roof completes its refined silhouette. A cinematic expression of elegance and adventure.",
            ar: "تشق جايكو J8 المياه تحت أشعة الشمس الذهبية، ويتناثر الرذاذ من حولها في مشهد يجسّد الفخامة وروح المغامرة. من شبكها الأمامي الجريء إلى خطوط غطاء المحرك المنحوتة ومصابيحها اللافتة، تتألق كل تفاصيلها بحضور آسر، ويكتمل المشهد بسقف زجاجي بانورامي يفتح أمامك آفاق الرحلة.",
          },
        },
        pageHero: {
          title: { en: "ABOUT US", ar: "من نحن" },
          paragraphs: [
            {
              en: "OMODA JAECOO are redefining modern mobility through innovation, technology, and design.",
              ar: "تعيد OMODA JAECOO تعريف التنقّل العصري من خلال الابتكار والتكنولوجيا والتصميم.",
            },
            {
              en: "We don’t just build vehicles — we craft experiences that inspire new ways of living, driving, and connecting with the world. Rooted in the spirit of the O-Universe, our brands unite technology, sustainability, culture, and entertainment creating a seamless ecosystem that elevates every journey.",
              ar: "نحن لا نصنع المركبات فحسب، بل نبتكر تجارب تُلهم طرقاً جديدة للحياة والقيادة والتواصل مع العالم. وانطلاقاً من روح O-Universe، تجمع علاماتنا بين التكنولوجيا والاستدامة والثقافة والترفيه لتصنع منظومة متكاملة ترتقي بكل رحلة.",
            },
            {
              en: "With every model, we unlock imagination for the road ahead — shaping the future of intelligent, stylish, and sustainable travel.",
              ar: "مع كل طراز، نفتح آفاق الخيال للطريق أمامنا، ونرسم ملامح مستقبل التنقّل الذكي والأنيق والمستدام.",
            },
          ],
        },
        name: { en: "JAECOO J8", ar: "JAECOO J8" },
        image: "/images/jaecooj8/j8.png",
        imageAlt: { en: "JAECOO J8", ar: "صورة JAECOO J8" },
        headline: {"en": "Above the Ordinary.", "ar": "رقيّ يتجاوز المألوف."},
        description: {"en": "Against rugged peaks and a sea of clouds, the blue JAECOO J8 brings a composed presence to an extraordinary landscape. Sculpted lines and an expansive horizon capture the appeal of seeing the world from a different perspective.", "ar": "أمام قمم شامخة وبحر من السحب، يطلّ جايكو J8 الأزرق بحضور واثق ينسجم مع مشهد استثنائي. خطوط منحوتة وأفق رحب يجسّدان شغف اكتشاف العالم من منظور مختلف."},
        shortDescription: {"en": "A striking presence. A wider perspective.", "ar": "حضور لافت وآفاق أبعد."},
        isMock: false,
      },
      {
        id: "jaecoo-j7",
        slug: "j7",
        name: { en: "JAECOO J7", ar: "JAECOO J7" },
        image: "/images/jaecoo7/j7-black.png",
        imageAlt: { en: "Black JAECOO J7", ar: "JAECOO J7 باللون الأسود" },
        headline: {"en": "Black Luxury. Untamed Presence.", "ar": "فخامة سوداء. حضور جامح."},
        description: {"en": "Deep black bodywork, sculpted shadows and the untamed spirit of a wolf set the scene for the JAECOO J7. A bold expression of individuality, where striking design meets a darker kind of elegance.", "ar": "بلونه الأسود العميق وبين ظلال مدروسة، يبرز جايكو J7 بحضور يستلهم جرأة الذئب وروحه الجامحة. تعبير جريء عن التفرّد، يلتقي فيه التصميم اللافت بأناقة يكسوها الغموض."},
        shortDescription: {"en": "Dark tones. Distinctive character.", "ar": "درجات داكنة وشخصية لا تشبه سواها."},
        isMock: false,
      },
      {
        id: "jaecoo-j5",
        slug: "j5",
        name: { en: "JAECOO J5", ar: "JAECOO J5" },
        image: "/images/jaecooj5/J5-CINEMATIC.png",
        imageAlt: { en: "JAECOO J5", ar: "صورة JAECOO J5" },
        headline: {"en": "Everyday Life, Beautifully Framed.", "ar": "أناقة تليق بتفاصيل يومك."},
        description: {"en": "Framed by lush greenery, warm sunlight and contemporary architecture, the green JAECOO J5 feels naturally at home. Its clean lines and distinctive color bring a fresh sense of style to familiar places and everyday moments.", "ar": "بين خضرة الحدائق ودفء الشمس وأناقة العمارة الحديثة، يجد جايكو J5 الأخضر مكانه بانسجام. خطوط واضحة ولون متفرّد يمنحان الأماكن المألوفة واللحظات اليومية لمسة متجددة من الأناقة."},
        shortDescription: {"en": "Fresh character for familiar surroundings.", "ar": "حضور متجدّد في تفاصيل الحياة اليومية."},
        isMock: false,
      },
    ],
  },
  {
    id: "omoda", name: "OMODA", logo: null,
    headline: { en: "Distinctive design. A progressive outlook.", ar: "تصميم متفرّد برؤية عصرية." },
    description: { en: "Discover a fresh design perspective and explore the details that connect with your own sense of style.", ar: "اكتشف منظوراً جديداً للتصميم، وتأمّل التفاصيل التي تنسجم مع أسلوبك الخاص." },
    models: [
      {
        id: "omoda-c7",
        slug: "c7",
        name: { en: "OMODA C7", ar: "OMODA C7" },
        image: "/images/OMODAC7/1.png",
        imageAlt: { en: "OMODA C7", ar: "صورة OMODA C7" },
        headline: {"en": "Own the Night.", "ar": "حضورك يضيء الليل."},
        description: {"en": "Cool blue light, architectural lines and reflections on the pavement frame the OMODA C7 with an unmistakably urban attitude. Its expressive silhouette turns an evening arrival into a statement of personal style.", "ar": "تحت إضاءة زرقاء وبين خطوط العمارة وانعكاسات الطريق، يظهر أومودا C7 بروح عصرية تنبض بإيقاع المدينة. ملامح معبّرة تجعل الوصول في المساء لحظة تحمل بصمتك الخاصة."},
        shortDescription: {"en": "City lights. Your signature.", "ar": "أضواء المدينة وبصمتك الخاصة."},
        isMock: false,
      },
      {
        id: "omoda-c5",
        slug: "c5",
        name: { en: "OMODA C5", ar: "OMODA C5" },
        image: "/images/OMODAC5/C5.png",
        imageAlt: { en: "OMODA C5", ar: "صورة OMODA C5" },
        headline: {"en": "A Bold First Impression.", "ar": "حضور يخطف النظرة الأولى."},
        description: {"en": "Emerging through blue mist, the OMODA C5 places its sculpted front and distinctive grille in the spotlight. Contrasting light and a confident stance create a design statement that holds your attention from the first glance.", "ar": "من بين ضباب أزرق، يبرز أومودا C5 بواجهة منحوتة وشبك أمامي متفرّد تتجه إليهما الأنظار. تباين الضوء ووقفة واثقة يصنعان حضوراً تصميمياً يأسر الاهتمام من النظرة الأولى."},
        shortDescription: {"en": "Distinctive from the first glance.", "ar": "تفرّد تراه من النظرة الأولى."},
        isMock: false,
      },
    ],
  },
  {
    id: "icaur", name: "ICAUR", logo: null,
    headline: { en: "Bold character. Individual expression.", ar: "شخصية جريئة تعبّر عنك." },
    description: { en: "Make room for your individual point of view. Explore design with a team ready to listen to what matters to you.", ar: "امنح رؤيتك الخاصة مساحة للتعبير. استكشف التصميم مع فريق يصغي لما يهمّك." },
    models: [
      {
        id: "icaur-v27",
        slug: "v27",
        name: { en: "ICAUR V27", ar: "ICAUR V27" },
        image: "/images/ICAURV27/BORN-TOPLAY-SAND.png",
        imageAlt: { en: "ICAUR V27", ar: "صورة ICAUR V27" },
        headline: {"en": "BORN TO PLAY.", "ar": "وُلد للمغامرة."},
        description: {"en": "Golden dunes, drifting sand and a dramatic sky set the stage for the ICAUR V27. Its bold silhouette captures the energy of the desert and the spirit of turning an ordinary day into a memorable escape.", "ar": "بين كثبان ذهبية ورمال متطايرة وسماء درامية، يطلّ آي كار V27 بملامح جريئة تعكس حيوية الصحراء. مشهد يجسّد روح المغامرة والرغبة في تحويل اليوم المعتاد إلى تجربة تبقى في الذاكرة."},
        shortDescription: {"en": "Golden dunes. A restless spirit.", "ar": "كثبان ذهبية وروح تتوق للاكتشاف."},
        isMock: false,
      },
      {
        id: "icaur-o3",
        slug: "o3",
        name: { en: "ICAUR O3", ar: "ICAUR O3" },
        image: "/images/ICAURV03/desert-water.png",
        imageAlt: { en: "ICAUR O3", ar: "صورة ICAUR O3" },
        headline: {"en": "Find Your Own Escape.", "ar": "للمغامرة وجه آخر."},
        description: {"en": "Bright yellow bodywork and a black roof create a playful contrast with turquoise water and towering canyon walls. This ICAUR scene celebrates a different side of adventure: discovering a place where bold character meets complete stillness.", "ar": "بلون أصفر لافت وسقف أسود، تتباين ملامح آي كار مع صفاء المياه الفيروزية وشموخ جدران الوادي. هنا تأخذ المغامرة شكلاً مختلفاً، يجتمع فيه الحضور الجريء مع هدوء الطبيعة."},
        shortDescription: {"en": "Bold color. A quieter escape.", "ar": "لون جريء ووجهة تنبض بالهدوء."},
        isMock: false,
      },
    ],
  },
  {
    id: "hongqi", name: "HONGQI", logo: null,
    headline: { en: "A commanding presence. Refined in every detail.", ar: "حضور مهيب ورقيّ في كل تفصيل." },
    description: { en: "Consider the finer details of design in a personal conversation about your preferences and aspirations.", ar: "تأمّل جمال تفاصيل التصميم في حوار شخصي حول تفضيلاتك وتطلعاتك." },
    models: [
      {
        id: "hongqi-sh5",
        slug: "sh5",
        name: { en: "HONGQI SH5", ar: "HONGQI SH5" },
        image: "/images/honqi-sh5/hs5.png",
        imageAlt: { en: "HONGQI SH5", ar: "صورة HONGQI SH5" },
        headline: {"en": "An Arrival of Distinction.", "ar": "وصول يليق بمكانتك."},
        description: {"en": "Set against contemporary architecture and warm interior light, this white HONGQI SUV makes an arrival feel considered. Its sculpted bodywork and prominent grille bring a confident focal point to a setting defined by understated elegance.", "ar": "أمام عمارة معاصرة وإضاءة داخلية دافئة، يمنح هونشي الأبيض لحظة الوصول طابعاً مميزاً. هيكل منحوت وشبك أمامي بارز يصنعان حضوراً واثقاً في مشهد عنوانه الأناقة الهادئة."},
        shortDescription: {"en": "A confident presence in a refined setting.", "ar": "حضور واثق في أجواء راقية."},
        isMock: false,
      },
      {
        id: "hongqi-sh6",
        slug: "sh6",
        name: { en: "HONGQI SH6", ar: "HONGQI SH6" },
        image: "/images/HONGQI-HS6/H6.png",
        imageAlt: { en: "HONGQI SH6", ar: "صورة HONGQI SH6" },
        headline: {"en": "Elegance Along the Horizon.", "ar": "أناقة تعانق الأفق."},
        description: {"en": "Soft turquoise paint catches the evening light beside a refined waterfront terrace. With a flowing silhouette framed by distant hills and contemporary architecture, this HONGQI sedan captures an unhurried expression of elegance.", "ar": "يلتقط اللون الفيروزي ضوء المساء على شرفة راقية تطلّ على المياه. وبين التلال البعيدة والعمارة المعاصرة، يرسم هونشي السيدان بخطوطه الانسيابية مشهداً من الأناقة الهادئة."},
        shortDescription: {"en": "Flowing lines. An open horizon.", "ar": "خطوط انسيابية وأفق مفتوح."},
        isMock: false,
      },
    ],
  },
  {
    id: "dongfeng", name: "DONGFENG", logo: null,
    headline: { en: "A fresh perspective. A personal journey.", ar: "رؤية جديدة. ورحلة تعبّر عنك." },
    description: {
      en: "Discover DONGFENG through a conversation about design, your preferences, and the details that matter to you.",
      ar: "اكتشف DONGFENG من خلال حوار حول التصميم وتفضيلاتك والتفاصيل التي تهمّك.",
    },
    models: [
      {
        id: "dongfeng-007",
        slug: "007",
        name: { en: "DONGFENG 007", ar: "DONGFENG 007" },
        image: "/images/DONGFENG/007.png",
        imageAlt: { en: "DONGFENG 007", ar: "صورة DONGFENG 007" },
        headline: {"en": "The City, After Hours.", "ar": "أناقة المدينة بعد الغروب."},
        description: {"en": "Warm windows and evening reflections frame the DONGFENG 007 against a contemporary urban backdrop. Its clean white silhouette brings a fresh, composed presence to the city as daylight gives way to a quieter rhythm.", "ar": "بين دفء النوافذ وانعكاسات المساء، يظهر دونغ فينغ 007 وسط مشهد حضري معاصر. ملامحه البيضاء الواضحة تمنح المدينة حضوراً متجدداً وهادئاً مع انحسار ضوء النهار."},
        shortDescription: {"en": "Clean lines for the city’s evening rhythm.", "ar": "خطوط أنيقة تنسجم مع إيقاع المساء."},
        isMock: false,
      },
      {
        id: "dongfeng-ax7-mach",
        slug: "ax7-mach",
        name: { en: "DONGFENG AX7 Mach", ar: "DONGFENG AX7 Mach" },
        image: "/images/DONGFENG-ax7/AX7-MACH.png",
        imageAlt: { en: "DONGFENG AX7 Mach", ar: "صورة DONGFENG AX7 Mach" },
        headline: {"en": "A Presence to Match the Skyline.", "ar": "حضور يواكب طموح المدينة."},
        description: {"en": "With Riyadh’s skyline as its backdrop, the DONGFENG AX7 Mach pairs silver bodywork with vivid red accents. Warm light and bold architectural forms create a distinctly urban scene, full of character and forward-looking energy.", "ar": "على خلفية أفق الرياض، يجمع دونغ فينغ AX7 Mach بين هيكل فضي ولمسات حمراء لافتة. ضوء دافئ وعمارة شامخة يرسمان مشهداً حضرياً يعكس الشخصية والطموح والتطلع إلى الأمام."},
        shortDescription: {"en": "City ambition. Distinctive character.", "ar": "طموح المدينة بشخصية متفرّدة."},
        isMock: false,
      },
      {
        id: "dongfeng-shine",
        slug: "shine",
        name: { en: "DONGFENG SHINE", ar: "DONGFENG SHINE" },
        image: "/images/dongfeng-shine/dongfeng-shine-2026.png",
        imageAlt: { en: "DONGFENG SHINE", ar: "صورة DONGFENG SHINE" },
        headline: {"en": "Chase the Golden Hour.", "ar": "انطلق نحو وهج الغروب."},
        description: {"en": "Red and yellow silhouettes follow the coastline as golden light moves across the road. The DONGFENG SHINE brings a vivid sense of movement to a scene shaped by open water, warm reflections and the pleasure of the journey.", "ar": "على امتداد الساحل، تتألق ملامح دونغ فينغ شاين بالأحمر والأصفر تحت ضوء ذهبي ينساب على الطريق. مشهد مفعم بالحركة، تصنعه المياه المفتوحة والانعكاسات الدافئة ومتعة الرحلة."},
        shortDescription: {"en": "Vivid color. Moments in motion.", "ar": "ألوان نابضة ولحظات تنبض بالحركة."},
        isMock: false,
      },
      {
        id: "dongfeng-huge",
        slug: "huge",
        name: { en: "DONGFENG HUGE", ar: "DONGFENG HUGE" },
        image: "/images/DONGFENG/HUGE.png",
        imageAlt: { en: "DONGFENG HUGE in warm evening light", ar: "DONGFENG HUGE في ضوء المساء الدافئ" },
        headline: { en: "Defined by Light and Shadow.", ar: "حضور ترسمه الأضواء والظلال." },
        description: {
          en: "Warm evening light meets cool shadows around the DONGFENG HUGE. Its sculpted silhouette and prominent grille stand out against an industrial backdrop, while reflections on the paving complete a scene of quiet confidence.",
          ar: "يلتقي ضوء المساء الدافئ بظلال باردة حول دونغ فينغ HUGE. تبرز ملامحه المنحوتة وشبكه الأمامي اللافت أمام خلفية صناعية، وتُكمل انعكاسات الأرضية مشهداً من الثقة الهادئة.",
        },
        shortDescription: { en: "Sculpted shadows. A composed presence.", ar: "ظلال ترسم الملامح وحضور متّزن." },
        isMock: false,
      },
      {
        id: "dongfeng-forthing-t5-evo",
        slug: "forthing-t5-evo",
        name: { en: "DONGFENG FORTHING T5 EVO", ar: "DONGFENG FORTHING T5 EVO" },
        image: "/images/DONGFENG/Forthing-T5-EVO-2026.png",
        imageAlt: { en: "DONGFENG FORTHING T5 EVO beside the water at dusk", ar: "DONGFENG FORTHING T5 EVO بجوار المياه عند الغسق" },
        headline: { en: "Your Moment by the Water.", ar: "لحظتك على ضفاف الهدوء." },
        description: {
          en: "Beside still water and hillside homes, the DONGFENG FORTHING T5 EVO shares a quiet moment at dusk. Dark bodywork, warm lights and a figure beside the car create a personal scene where the journey pauses and the view takes over.",
          ar: "بجوار مياه هادئة ومنازل تتدرّج على سفح الجبل، يشارك دونغ فينغ FORTHING T5 EVO لحظة سكون عند الغسق. هيكل داكن وأضواء دافئة وشخص يقف بجوار السيارة يرسمون مشهداً شخصياً تتوقّف فيه الرحلة لتفسح المجال لجمال الإطلالة.",
        },
        shortDescription: { en: "Evening stillness. Individual style.", ar: "هدوء المساء وأسلوب يعكس شخصيتك." },
        isMock: false,
      },
      {
        id: "dongfeng-zna-z9",
        slug: "zna-z9",
        name: { en: "ZNA Z9", ar: "ZNA Z9" },
        image: "/images/DongFeng-Z9-2026/ZNA.png",
        imageAlt: { en: "ZNA Z9 pickup among rocky mountains in golden sunlight", ar: "بيك أب ZNA Z9 بين جبال صخرية تحت أشعة الشمس الذهبية" },
        headline: { en: "Golden Light. Rugged Character.", ar: "ضوء ذهبي وشخصية جريئة." },
        description: {
          en: "Framed by rocky peaks and golden sunlight, the ZNA Z9 brings a bold presence to the mountain landscape. Its prominent grille, sculpted bodywork and striking headlights create a scene filled with the spirit of adventure.",
          ar: "بين قمم صخرية وأشعة شمس ذهبية، تطلّ ZNA Z9 بحضور جريء ينسجم مع المشهد الجبلي. شبك أمامي بارز وهيكل منحوت ومصابيح لافتة ترسم مشهداً مفعماً بروح المغامرة.",
        },
        shortDescription: { en: "Mountain horizons. A bold presence.", ar: "آفاق جبلية وحضور جريء." },
        isMock: false,
      },
    ],
  },
  {
    id: "mhero", name: "MHERO", logo: null,
    headline: { en: "Bold design. Unmistakable character.", ar: "تصميم جريء وشخصية متفرّدة." },
    description: {
      en: "Explore MHERO and discover a distinctive approach to design, shaped around your individual sense of adventure.",
      ar: "اكتشف MHERO وتعرّف على رؤية متفرّدة للتصميم تنسجم مع روح المغامرة لديك.",
    },
    models: [
      {
        id: "mhero-h1",
        slug: "h1",
        name: { en: "MHEOR H1", ar: "MHEOR H1" },
        image: "/images/MHERO1/MHERO-H1.webp",
        imageAlt: { en: "MHEOR H1 on the road beneath a warm evening sky", ar: "MHEOR H1 على الطريق تحت سماء المساء الدافئة" },
        headline: { en: "A Bold Presence in Motion.", ar: "حضور جريء ينبض بالحركة." },
        description: {
          en: "Angular bodywork, a prominent grille and dark green tones give the MHEOR H1 a striking presence on the road. Framed by a warm evening sky, its sculpted silhouette captures the energy of a journey in motion.",
          ar: "بخطوط حادة وشبك أمامي بارز ودرجات خضراء داكنة، يطلّ MHEOR H1 بحضور لافت على الطريق. وتحت سماء المساء الدافئة، تعكس ملامحه المنحوتة حيوية الرحلة ومتعة الانطلاق.",
        },
        shortDescription: { en: "Strong lines. Distinctive spirit.", ar: "خطوط قوية وروح متفرّدة." },
        isMock: false,
      },
      {
        id: "mhero-h2",
        slug: "h2",
        name: { en: "MHERO H2", ar: "MHERO H2" },
        image: "/images/MHERO1/MHERO-H2.webp",
        imageAlt: { en: "Silver MHERO H2 outside a warmly lit modern building", ar: "MHERO H2 فضية أمام مبنى عصري بإضاءة دافئة" },
        headline: { en: "A Striking Arrival After Dusk.", ar: "وصول لافت بعد الغروب." },
        description: {
          en: "Against glass facades and warm architectural lighting, the silver MHERO H2 brings a composed presence to the evening. Angular lines, distinctive headlights and bold wheels stand out in a setting of quiet urban elegance.",
          ar: "أمام واجهات زجاجية وإضاءة معمارية دافئة، تطلّ MHERO H2 الفضية بحضور متّزن في المساء. خطوط حادة ومصابيح متفرّدة وعجلات لافتة تبرز في مشهد يعكس أناقة المدينة الهادئة.",
        },
        shortDescription: { en: "Sculpted lines. Evening elegance.", ar: "خطوط منحوتة وأناقة مسائية." },
        isMock: false,
      },
    ],
  },
];
