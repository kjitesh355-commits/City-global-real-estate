export type LangCode = "en" | "ar" | "hi" | "ur" | "tl" | "zh" | "ru";

export const translations: Record<string, Record<LangCode, string>> = {
  // Navigation & Common
  // Navigation & Common
  "prop.popular": {
    en: "Popular",
    ar: "شائع",
    hi: "लोकप्रिय",
    ur: "مقبول",
    tl: "Sikat",
    zh: "热门推荐",
    ru: "Популярное"
  },
  "prop.match": {
    en: "MATCH",
    ar: "تطابق",
    hi: "मैच",
    ur: "میچ",
    tl: "MATCH",
    zh: "匹配度",
    ru: "СООТВЕТСТВИЕ"
  },
  "prop.startingPrice": {
    en: "Starting Price",
    ar: "السعر المبدئي",
    hi: "प्रारंभिक मूल्य",
    ur: "ابتدائی قیمت",
    tl: "Simulang Presyo",
    zh: "起步价",
    ru: "Начальная цена"
  },
  "prop.fromPrice": {
    en: "From Price",
    ar: "تبدأ من",
    hi: "कीमत से",
    ur: "قیمت سے",
    tl: "Mula sa Presyo",
    zh: "起始价",
    ru: "Цена от"
  },
  "prop.developer": {
    en: "Developer",
    ar: "المطور",
    hi: "डेवलपर",
    ur: "ڈویلپر",
    tl: "Developer",
    zh: "开发商",
    ru: "Застройщик"
  },
  "prop.explore3d": {
    en: "Explore Property in 3D",
    ar: "استكشف العقار ثلاثي الأبعاد",
    hi: "3D में संपत्ति का अन्वेषण करें",
    ur: "3D میں پراپرٹی دریافت کریں",
    tl: "I-explore ang Property sa 3D",
    zh: "在3D中探索房产",
    ru: "Исследуйте недвижимость в 3D"
  },
  "prop.tour3d": {
    en: "3D Tour",
    ar: "جولة ثلاثية الأبعاد",
    hi: "3D टूर",
    ur: "3D ٹور",
    tl: "3D Tour",
    zh: "3D看房",
    ru: "3D Тур"
  },
  "prop.curated": {
    en: "Our Curated Portfolios",
    ar: "محافظنا المنسقة",
    hi: "हमारे क्यूरेटेड पोर्टफोलियो",
    ur: "ہمارے منتخب پورٹ فولیو",
    tl: "Ang Aming Curated Portfolios",
    zh: "精心策划的组合",
    ru: "Наши курируемые портфолио"
  },
  "prop.featured": {
    en: "Featured Properties",
    ar: "عقارات مميزة",
    hi: "विशेष संपत्तियां",
    ur: "نمایاں پراپرٹیز",
    tl: "Mga Sikat na Property",
    zh: "特色房产",
    ru: "Избранные объекты"
  },
  "prop.aiDiscovery": {
    en: "AI Discovery Portal",
    ar: "بوابة اكتشاف الذكاء الاصطناعي",
    hi: "AI डिस्कवरी पोर्टल",
    ur: "AI دریافت پورٹل",
    tl: "AI Discovery Portal",
    zh: "AI 探索门户",
    ru: "Портал AI-поиска"
  },
  "prop.aiCurated": {
    en: "AI Curated Matches",
    ar: "تطابقات منسقة بالذكاء الاصطناعي",
    hi: "AI क्यूरेटेड मैच",
    ur: "AI کے تیار کردہ میچز",
    tl: "Mga Tugmang AI Curated",
    zh: "AI 精选推荐",
    ru: "AI-подобранные варианты"
  },
  "prop.fanDeck": {
    en: "Fan Deck",
    ar: "تصفح المروحة",
    hi: "फैन डेक",
    ur: "فین ڈیک",
    tl: "Fan Deck",
    zh: "卡片层叠",
    ru: "Коллекция карточек"
  },
  "prop.gridView": {
    en: "Grid View",
    ar: "عرض الشبكة",
    hi: "ग्रिड व्यू",
    ur: "ग्रिड ویو",
    tl: "Grid View",
    zh: "网格视图",
    ru: "Вид сеткой"
  },
  "prop.resetAI": {
    en: "Reset AI Search",
    ar: "إعادة ضبط بحث الذكاء الاصطناعي",
    hi: "AI खोज रीसेट करें",
    ur: "AI تلاش دوبارہ ترتیب دیں",
    tl: "I-reset ang AI Search",
    zh: "重置AI搜索",
    ru: "Сбросить AI-поиск"
  },
  "prop.viewAll": {
    en: "View All Properties",
    ar: "عرض جميع العقارات",
    hi: "सभी संपत्तियां देखें",
    ur: "تمام پراپرٹیز دیکھیں",
    tl: "Tingnan ang Lahat ng Property",
    zh: "查看所有房产",
    ru: "Посмотреть все объекты"
  },
  "prop.consulting": {
    en: "Consulting AI Knowledge Graphs...",
    ar: "جاري استشارة الرسوم البيانية لمعرفة الذكاء الاصطناعي...",
    hi: "AI नॉलेज ग्राफ़ से परामर्श किया जा रहा है...",
    ur: "AI نالج گراف سے مشورہ کیا جا رہا ہے...",
    tl: "Sumasangguni sa AI Knowledge Graphs...",
    zh: "正在咨询人工智能知识图谱...",
    ru: "Консультация с AI-графами знаний..."
  },
  "prop.engineParsing": {
    en: "Our real estate engine is parsing your request, auditing luxury inventory, and designing custom matched recommendation profiles.",
    ar: "يقوم محرك العقارات لدينا بتحليل طلبك، وتدقيق المخزون الفاخر، وتصميم ملفات تعريف توصية مطابقة مخصصة.",
    hi: "हमारा रियल एस्टेट इंजन आपके अनुरोध का विश्लेषण कर रहा है, लक्जरी इन्वेंट्री का ऑडिट कर रहा है, और कस्टम मिलान वाले अनुशंसा प्रोफाइल तैयार कर रहा है।",
    ur: "ہمارا رئیل اسٹیٹ انجن آپ کی درخواست کا تجزیہ کر رہا ہے، لگژری انوینٹری کا آڈٹ کر رہا ہے، اور کسٹم مماثل سفارشی پروفائلز ڈیزائن کر رہا ہے۔",
    tl: "Sinusuri ng aming real estate engine ang iyong kahilingan, tinitingnan ang marangyang imbentaryo, at nagdidisenyo ng mga tugmang rekomendasyon.",
    zh: "我们的房地产引擎正在解析您的请求，审核奢华库存，并设计自定义的匹配推荐属性。",
    ru: "Наш движок недвижимости анализирует ваш запрос, проверяет премиальный инвентарь и формирует индивидуальные рекомендации."
  },
  "prop.clearSearch": {
    en: "Clear Search",
    ar: "مسح البحث",
    hi: "खोज साफ़ करें",
    ur: "تلاش صاف کریں",
    tl: "I-clear ang Search",
    zh: "清除搜索",
    ru: "Очистить поиск"
  },
  "prop.bedsUnit": {
    en: "Bed",
    ar: "غرفة",
    hi: "बेड",
    ur: "بیڈ",
    tl: "Bed",
    zh: "卧",
    ru: "Спальня"
  },
  "prop.bathsUnit": {
    en: "Bath",
    ar: "حمام",
    hi: "बाथ",
    ur: "باتھ",
    tl: "Bath",
    zh: "卫",
    ru: "Ванная"
  },
  "prop.exterior": {
    en: "Exterior",
    ar: "الخارجية",
    hi: "बाहरी भाग",
    ur: "بیرونی",
    tl: "Panlabas",
    zh: "外观",
    ru: "Экстерьер"
  },
  "prop.living": {
    en: "Living",
    ar: "المعيشة",
    hi: "लिविंग रूम",
    ur: "رہائشی",
    tl: "Living Room",
    zh: "起居室",
    ru: "Гостиная"
  },
  "prop.kitchen": {
    en: "Kitchen",
    ar: "المطبخ",
    hi: "रसोई",
    ur: "باورچی خانہ",
    tl: "Kusina",
    zh: "厨房",
    ru: "Кухня"
  },
  "prop.bedroom": {
    en: "Bedroom",
    ar: "غرفة النوم",
    hi: "बेडरूम",
    ur: "بیڈ روم",
    tl: "Kuwarto",
    zh: "卧室",
    ru: "Спальня"
  },
  "footer.readyToInvest": {
    en: "Ready to Invest in Dubai?",
    ar: "هل أنت مستعد للاستثمار في دبي؟",
    hi: "दुबई में निवेश करने के लिए तैयार हैं?",
    ur: "دبئی میں سرمایہ کاری کے لیے تیار ہیں؟",
    tl: "Handa nang Mag-invest sa Dubai?",
    zh: "准备好在迪拜投资了吗？",
    ru: "Готовы инвестировать в Дубай?"
  },
  "footer.letExpertsHelp": {
    en: "Let our experts help you find the perfect property. Tap into yields of up to 9% and tax-free capital growth structures.",
    ar: "دع خبرائنا يساعدونك في العثور على العقار المثالي. استفد من عوائد تصل إلى 9٪ وهياكل نمو رأس المال المعفاة من الضرائب.",
    hi: "हमारे विशेषज्ञों को सही संपत्ति खोजने में आपकी मदद करने दें। 9% तक की पैदावार और कर-मुक्त पूंजीगत वृद्धि संरचनाओं का लाभ उठाएं।",
    ur: "ہمارے ماہرین کو بہترین پراپرٹی تلاش کرنے میں مدد کرنے دیں۔ 9٪ تک کے منافع اور ٹیکس فری کیپٹل گروتھ اسٹرکچرز سے فائدہ اٹھائیں۔",
    tl: "Hayaan ang aming mga eksperto na tulungan kang mahanap ang perpektong property. Samantalahin ang yields hanggang 9% at tax-free capital growth.",
    zh: "让我们的专家帮您找到完美的房产。坐享高达9%的收益率和免税资本增值结构。",
    ru: "Позвольте нашим экспертам помочь вам найти идеальную недвижимость. Воспользуйтесь доходностью до 9% и безналоговыми структурами прироста капитала."
  },
  "footer.whatsappUs": {
    en: "WhatsApp Us",
    ar: "راسلنا على واتساب",
    hi: "हमें व्हाट्सएप करें",
    ur: "ہمیں واٹس ایپ کریں",
    tl: "I-WhatsApp Kami",
    zh: "微信/WhatsApp联系",
    ru: "Напишите нам в WhatsApp"
  },
  "footer.callNow": {
    en: "Call Now",
    ar: "اتصل الآن",
    hi: "अभी कॉल करें",
    ur: "ابھی کال کریں",
    tl: "Tawag Na",
    zh: "立即拨打",
    ru: "Позвонить сейчас"
  },
  "footer.brandDesc": {
    en: "Your trusted partner for premium real estate investments in Dubai. We blend boutique personal brokerage with state-of-the-art AI analytics.",
    ar: "شريكك الموثوق للاستثمارات العقارية المتميزة في دبي. نحن نمزج بين الوساطة الشخصية الراقية وتحليلات الذكاء الاصطناعي الحديثة.",
    hi: "दुबई में प्रीमियम रियल एस्टेट निवेश के लिए आपका विश्वसनीय भागीदार। हम अत्याधुनिक एआई विश्लेषण के साथ बुटीक व्यक्तिगत ब्रोकरेज का मिश्रण करते हैं।",
    ur: "دبئی میں پریمیم رئیل اسٹیٹ سرمایہ کاری के लिए آپ کا قابل اعتماد پارٹنر۔ ہم جدید ترین AI تجزیہ کے ساتھ بوتیک ذاتی بروکریج کا امتزاج کرتے ہیں۔",
    tl: "Ang iyong maaasahang kasosyo para sa premium real estate investments sa Dubai. Pinagsasama namin ang personal brokerage at AI analytics.",
    zh: "您在迪拜优质房地产投资的信赖合作伙伴。我们将精品私人经纪业务与最先进的人工智能分析完美融合。",
    ru: "Ваш надёжный партнёр для премиальных инвестиций в недвижимость в Дубае. Мы сочетаем бутик-брокеридж с передовыми аналитическими инструментами на базе ИИ."
  },
  "footer.realEstate": {
    en: "Real Estate",
    ar: "العقارات",
    hi: "रियल एस्टेट",
    ur: "رئیل اسٹیٹ",
    tl: "Real Estate",
    zh: "房产",
    ru: "Недвижимость"
  },
  "footer.quickLinks": {
    en: "Quick Links",
    ar: "روابط سريعة",
    hi: "त्वरित लिंक्स",
    ur: "فوری لنکس",
    tl: "Quick Links",
    zh: "快速链接",
    ru: "Быстрые ссылки"
  },
  "footer.properties": {
    en: "Properties",
    ar: "العقارات",
    hi: "संपत्तियां",
    ur: "پراپرٹیز",
    tl: "Mga Property",
    zh: "房产项目",
    ru: "Объекты"
  },
  "footer.apartments": {
    en: "Apartments",
    ar: "شقق",
    hi: "अपार्टमेंट",
    ur: "اپارٹمنٹس",
    tl: "Mga Apartment",
    zh: "公寓",
    ru: "Квартиры"
  },
  "footer.villas": {
    en: "Villas",
    ar: "فيلات",
    hi: "विला",
    ur: "ولا",
    tl: "Mga Villa",
    zh: "别墅",
    ru: "Виллы"
  },
  "footer.penthouses": {
    en: "Penthouses",
    ar: "بنتهاوس",
    hi: "पेंटहाउस",
    ur: "پینٹ ہاؤسز",
    tl: "Mga Penthouse",
    zh: "空中别墅",
    ru: "Пентхаусы"
  },
  "footer.townhouses": {
    en: "Townhouses",
    ar: "تاون هاوس",
    hi: "टाउनहाउस",
    ur: "ٹاؤن ہاؤسز",
    tl: "Mga Townhouse",
    zh: "联排别墅",
    ru: "Таунхаусы"
  },
  "footer.commercial": {
    en: "Commercial",
    ar: "تجاري",
    hi: "व्यावसायिक",
    ur: "तसारती",
    tl: "Komersyal",
    zh: "商业地产",
    ru: "Коммерческая"
  },
  "footer.offPlanProj": {
    en: "Off Plan Projects",
    ar: "مشاريع قيد الإنشاء",
    hi: "ऑफ प्लान प्रोजेक्ट्स",
    ur: "آف پلان پروجیکٹس",
    tl: "Off Plan Projects",
    zh: "期房项目",
    ru: "Проекты на стадии строительства"
  },
  "footer.services": {
    en: "Services",
    ar: "الخدمات",
    hi: "सेवाएं",
    ur: "خدمات",
    tl: "Mga Serbisyo",
    zh: "专业服务",
    ru: "Услуги"
  },
  "footer.investmentAdvisory": {
    en: "Investment Advisory",
    ar: "الاستشارات الاستثمارية",
    hi: "निवेश सलाहकार",
    ur: "سرمایہ کاری ایڈوائزری",
    tl: "Investment Advisory",
    zh: "投资咨询",
    ru: "Инвестиционный консалтинг"
  },
  "footer.mortgageSupport": {
    en: "Mortgage Support",
    ar: "دعم التمويل العقاري",
    hi: "ऋण सहायता",
    ur: "مارگیج سپورٹ",
    tl: "Suporta sa Mortgage",
    zh: "按揭贷款支持",
    ru: "Поддержка по ипотеке"
  },
  "footer.propertyManagement": {
    en: "Property Management",
    ar: "إدارة العقارات",
    hi: "संपत्ति प्रबंधन",
    ur: "پراپرٹی مینجمنٹ",
    tl: "Pamamahala ng Property",
    zh: "物业托管",
    ru: "Управление недвижимостью"
  },
  "footer.goldenVisa": {
    en: "Golden Visa",
    ar: "الفيزا الذهبية",
    hi: "गोल्डन वीज़ा",
    ur: "گولڈن ویزا",
    tl: "Golden Visa",
    zh: "黄金签证",
    ru: "Золотая виза"
  },
  "footer.afterSales": {
    en: "After Sales Service",
    ar: "خدمة ما بعد البيع",
    hi: "बिक्री के बाद सेवा",
    ur: "فروخت کے بعد سروس",
    tl: "After Sales Service",
    zh: "售后保障服务",
    ru: "Послепродажное обслуживание"
  },
  "footer.roiCalculator": {
    en: "ROI Calculator",
    ar: "حاسبة العائد على الاستثمار",
    hi: "ROI कैलकुलेटर",
    ur: "ROI کیلکولیٹر",
    tl: "Kalkulator ng ROI",
    zh: "投资回报计算器",
    ru: "Калькулятор доходности"
  },
  "footer.newsletter": {
    en: "Newsletter",
    ar: "النشرة البريدية",
    hi: "न्यूज़लेटर",
    ur: "نیوز لیٹر",
    tl: "Newsletter",
    zh: "业内简报",
    ru: "Рассылка"
  },
  "footer.newsletterDesc": {
    en: "Subscribe to get the latest off-market property updates and yield audit analyses in Dubai.",
    ar: "اشترك للحصول على آخر تحديثات العقارات غير المعروضة في السوق وتحليلات تدقيق العوائد في دبي.",
    hi: "दुबई में नवीनतम ऑफ-मार्केट प्रॉपर्टी अपडेट और यील्ड ऑडिट विश्लेषण प्राप्त करने के लिए सदस्यता लें।",
    ur: "دبئی میں تازہ ترین آف مارکیٹ پراپرٹی اپ ڈیٹس اور منافع کا تجزیہ حاصل کرنے کے لیے سبسکرائب کریں۔",
    tl: "Mag-subscribe para sa pinakabagong off-market property updates at yield audit analyses sa Dubai.",
    zh: "订阅以获取迪拜最新的独家房源信息 and 收益率审计分析。",
    ru: "Подпишитесь, чтобы получать последние обновления о рыночных предложениях и аналитику доходности в Дубае."
  },
  "footer.emailPlaceholder": {
    en: "Enter your email",
    ar: "أدخل بريدك الإلكتروني",
    hi: "अपना ईमेल दर्ज करें",
    ur: "اپنا ای میل درج کریں",
    tl: "Ilagay ang iyong email",
    zh: "输入您的邮箱",
    ru: "Введите ваш email"
  },
  "footer.subscribeSuccess": {
    en: "Subscribed successfully. Thank you!",
    ar: "تم الاشتراك بنجاح. شكرًا لك!",
    hi: "सफलतापूर्वक सदस्यता ली गई। धन्यवाद!",
    ur: "کامیابی سے سبسکرائب ہو گیا۔ شکریہ!",
    tl: "Matagumpay na nag-subscribe. Salamat!",
    zh: "订阅成功，非常感谢！",
    ru: "Вы успешно подписались. Спасибо!"
  },
  "footer.allRightsReserved": {
    en: "City Global Real Estate. All Rights Reserved.",
    ar: "سيتي جلوبال العقارية. جميع الحقوق محفوظة.",
    hi: "सिटी ग्लोबल रियल एस्टेट। सर्वाधिकार सुरक्षित।",
    ur: "سٹی گلوبل رئیل اسٹیٹ۔ جملہ حقوق محفوظ ہیں۔",
    tl: "City Global Real Estate. All Rights Reserved.",
    zh: "环球城房地产。保留所有权利。",
    ru: "City Global Real Estate. Все права защищены."
  },
  "footer.privacyPolicy": {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
    hi: "गोपनीयता नीति",
    ur: "پرائیویسی پالیسی",
    tl: "Privacy Policy",
    zh: "隐私政策",
    ru: "Политика конфиденциальности"
  },
  "footer.termsAndConditions": {
    en: "Terms & Conditions",
    ar: "الشروط والأحكام",
    hi: "नियम और शर्तें",
    ur: "شرائط و ضوابط",
    tl: "Terms & Conditions",
    zh: "使用条款与服务协议",
    ru: "Условия использования"
  },
  "nav.home": {
    en: "Home",
    ar: "الرئيسية",
    hi: "होम",
    ur: "ہوم",
    tl: "Home",
    zh: "首页",
    ru: "Главная"
  },
  "nav.buy": {
    en: "Buy",
    ar: "شراء",
    hi: "खरीदें",
    ur: "خریدیں",
    tl: "Bumili",
    zh: "置业",
    ru: "Купить"
  },
  "nav.rent": {
    en: "Rent",
    ar: "إيجار",
    hi: "किराया",
    ur: "کرایہ",
    tl: "Upa",
    zh: "租赁",
    ru: "Арендовать"
  },
  "nav.offplan": {
    en: "Off Plan",
    ar: "على الخارطة",
    hi: "ऑफ प्लान",
    ur: "آف پلان",
    tl: "Off Plan",
    zh: "期房",
    ru: "На стадии строительства"
  },
  "nav.projects": {
    en: "Projects",
    ar: "المشاريع",
    hi: "परियोजनाएं",
    ur: "منصوبے",
    tl: "Mga Proyekto",
    zh: "房产项目",
    ru: "Проекты"
  },
  "nav.developers": {
    en: "Developers",
    ar: "المطورون",
    hi: "डेवलपर्स",
    ur: "ڈویلپرز",
    tl: "Mga Tagabuo",
    zh: "知名开发商",
    ru: "Застройщики"
  },
  "nav.about": {
    en: "About Us",
    ar: "من نحن",
    hi: "हमारे बारे में",
    ur: "ہمارے بارے میں",
    tl: "Tungkol sa Amin",
    zh: "关于我们",
    ru: "О нас"
  },
  "nav.ready": {
    en: "Ready to Move",
    ar: "جاهز للسكن",
    hi: "रहने के लिए तैयार",
    ur: "رہنے کے لیے تیار",
    tl: "Handa Nang Luminahan",
    zh: "现房",
    ru: "Готовые объекты"
  },
  "nav.rentals": {
    en: "Rentals",
    ar: "إيجارات",
    hi: "किराये",
    ur: "کرایے",
    tl: "Mga Paupahan",
    zh: "租赁",
    ru: "Аренда"
  },
  "nav.blogs": {
    en: "Blogs",
    ar: "المدونة",
    hi: "ब्लॉग",
    ur: "بلاگز",
    tl: "Mga Blog",
    zh: "博客",
    ru: "Блог"
  },
  "nav.agents": {
    en: "Agents",
    ar: "الوكلاء",
    hi: "एजेंट्स",
    ur: "ایجنٹس",
    tl: "Mga Ahente",
    zh: "经纪人",
    ru: "Агенты"
  },
  "nav.contact": {
    en: "Contact",
    ar: "اتصل بنا",
    hi: "संपर्क करें",
    ur: "رابطہ کریں",
    tl: "Makipag-ugnayan",
    zh: "联系我们",
    ru: "Контакты"
  },
  "nav.properties": {
    en: "Properties",
    ar: "العقارات",
    hi: "संपत्तियां",
    ur: "جائیدادیں",
    tl: "Mga Ari-arian",
    zh: "房产列表",
    ru: "Объекты"
  },
  "nav.explore": {
    en: "Explore & Compare",
    ar: "استكشف وقارن",
    hi: "खोजें और तुलना करें",
    ur: "تلاش اور موازنہ",
    tl: "I-explore at Ihambing",
    zh: "探索与对比",
    ru: "Исследовать и сравнивать"
  },
  "nav.score": {
    en: "Investment Score",
    ar: "درجة الاستثمار",
    hi: "निवेश स्कोर",
    ur: "سرمایہ کاری کا اسکور",
    tl: "Iskor ng Pamumuhunan",
    zh: "投资评分",
    ru: "Инвестиционная оценка"
  },
  "nav.calculators": {
    en: "Calculators",
    ar: "الحاسبات",
    hi: "कैलकुलेटर",
    ur: "کیلکولیٹر",
    tl: "Mga Calculator",
    zh: "房贷计算器",
    ru: "Калькуляторы"
  },
  "nav.testimonials": {
    en: "Testimonials",
    ar: "آراء العملاء",
    hi: "प्रशंसापत्र",
    ur: "آراء",
    tl: "Mga Patotoo",
    zh: "客户评价",
    ru: "Отзывы"
  },
  "nav.bookConsultation": {
    en: "Book Consultation",
    ar: "حجز استشارة",
    hi: "परामर्श बुक करें",
    ur: "مشاورت بک کریں",
    tl: "Mag-book ng Konsultasyon",
    zh: "预约咨询",
    ru: "Записаться на консультацию"
  },

  // Hero Section
  "hero.subtitle": {
    en: "DUBAI REAL ESTATE EXPERTS",
    ar: "خبراء العقارات في دبي",
    hi: "दुबई रियल एस्टेट विशेषज्ञ",
    ur: "دبئی ریئل اسٹیٹ کے ماہرین",
    tl: "MGA EKSPERTO SA REAL ESTATE SA DUBAI",
    zh: "迪拜房地产专家",
    ru: "ЭКСПЕРТЫ ПО НЕДВИЖИМОСТИ В ДУБАЕ"
  },
  "hero.title1": {
    en: "Your Gateway to",
    ar: "بوابتك إلى",
    hi: "आपका प्रवेश द्वार",
    ur: "آپ کا ہدف",
    tl: "Ang Iyong Pintuan tungo sa",
    zh: "您通往",
    ru: "Ваш портал к"
  },
  "hero.title2": {
    en: "Premium Living",
    ar: "العيش الفاخر",
    hi: "پریمیم رہائش",
    ur: "پریمیم رہائش",
    tl: "Marangyang Pamumuhayan",
    zh: "至臻生活",
    ru: "Премиальному жилью"
  },
  "hero.title3": {
    en: "& Smart Investments",
    ar: "& الاستثمارات الذكية",
    hi: "& स्मार्ट निवेश",
    ur: "& اسمارٹ سرمایہ کاری",
    tl: "at Matalinong Pamumuhunan",
    zh: "与明智投资的门户",
    ru: "и умным инвестициям"
  },
  "hero.desc": {
    en: "Discover exceptional properties in Dubai's most sought-after locations with City Global Real Estate. Experience elite service and smart AI-backed analytics.",
    ar: "اكتشف عقارات استثنائية في أكثر مواقع دبي رواجاً مع سيتي جلوبال للعقارات. اختبر خدمة نخبوية وتحليلات ذكية مدعومة بالذكاء الاصطناعي.",
    hi: "सिटी ग्लोबल रियल एस्टेट के साथ दुबई के सबसे पसंदीदा स्थानों में असाधारण संपत्तियों की खोज करें। विशिष्ट सेवा और स्मार्ट एआई-संचालित विश्लेषण का अनुभव करें।",
    ur: "سٹی گلوبل ریئل اسٹیٹ کے ساتھ دبئی کے بہترین مقامات میں غیر معمولی جائیدادیں تلاش کریں۔ بہترین سروس اور اسمارٹ اے آئی تجزیات کا تجربہ کریں۔",
    tl: "Tuklasin ang mga pambihirang ari-arian sa pinakahinahanap na mga lokasyon sa Dubai kasama ang City Global Real Estate. Damhin ang piling serbisyo at matalinong pagsusuri na suportado ng AI.",
    zh: "与 City Global Real Estate 一起探索迪拜最受追捧地段的卓越房产。体验尊贵服务与智能 AI 赋能的深度解析。",
    ru: "Откройте для себя исключительную недвижимость в самых престижных районах Дубая вместе с City Global Real Estate. Ощутите уровень сервиса премиум-класса и умную аналитику на базе ИИ."
  },
  "hero.explore": {
    en: "Explore Properties",
    ar: "استكشف العقارات",
    hi: "संपत्तियों की खोज करें",
    ur: "جائیدادیں تلاش کریں",
    tl: "I-explore ang mga Ari-arian",
    zh: "探索房产",
    ru: "Исследовать объекты"
  },
  "hero.watch": {
    en: "Watch Investment Guide",
    ar: "شاهد دليل الاستثمار",
    hi: "निवेश गाइड देखें",
    ur: "سرمایہ کاری گائیڈ دیکھیں",
    tl: "Panoorin ang Gabay sa Pamumuhunan",
    zh: "观看投资指南",
    ru: "Смотреть инвестиционное руководство"
  },

  // Search Fields
  "search.location": {
    en: "Location",
    ar: "الموقع",
    hi: "स्थान",
    ur: "مقام",
    tl: "Lokasyon",
    zh: "位置",
    ru: "Местоположение"
  },
  "search.placeholder.location": {
    en: "Enter Location",
    ar: "أدخل الموقع",
    hi: "स्थान दर्ज करें",
    ur: "مقام درج کریں",
    tl: "Ilagay ang Lokasyon",
    zh: "输入位置",
    ru: "Введите местоположение"
  },
  "search.type": {
    en: "Property Type",
    ar: "نوع العقار",
    hi: "संपत्ति का प्रकार",
    ur: "جائیداد کی قسم",
    tl: "Uri ng Ari-arian",
    zh: "房产类型",
    ru: "Тип недвижимости"
  },
  "search.beds": {
    en: "Bedrooms",
    ar: "غرف النوم",
    hi: "बेडरूम",
    ur: "بیڈ رومز",
    tl: "Mga Kuwarto",
    zh: "卧室数量",
    ru: "Спальни"
  },
  "search.budget": {
    en: "Budget",
    ar: "الميزانية",
    hi: "बजट",
    ur: "بجٹ",
    tl: "Badyet",
    zh: "预算",
    ru: "Бюджет"
  },
  "search.developer": {
    en: "Developer",
    ar: "المطور",
    hi: "डेवलपर",
    ur: "ڈویلپر",
    tl: "Tagabuo",
    zh: "开发商",
    ru: "Застройщик"
  },
  "search.button": {
    en: "Search",
    ar: "بحث",
    hi: "खोजें",
    ur: "تلاش کریں",
    tl: "Maghanap",
    zh: "搜索",
    ru: "Поиск"
  },

  // Dropdown option labels
  "opts.allTypes": {
    en: "All Types",
    ar: "جميع الأنواع",
    hi: "सभी प्रकार",
    ur: "تمام اقسام",
    tl: "Lahat ng Uri",
    zh: "所有类型",
    ru: "Все типы"
  },
  "opts.apartment": {
    en: "Apartment",
    ar: "شقة",
    hi: "अपार्टमेंट",
    ur: "اپارٹمنٹ",
    tl: "Apartment",
    zh: "公寓",
    ru: "Квартиры"
  },
  "opts.villa": {
    en: "Villa",
    ar: "فيلا",
    hi: "विला",
    ur: "ولا",
    tl: "Villa",
    zh: "别墅",
    ru: "Виллы"
  },
  "opts.penthouse": {
    en: "Penthouse",
    ar: "بنتهاوس",
    hi: "पेंटहाउस",
    ur: "پینٹ ہاؤس",
    tl: "Penthouse",
    zh: "空中别墅",
    ru: "Пентхаусы"
  },
  "opts.townhouse": {
    en: "Townhouse",
    ar: "تاون هاوس",
    hi: "टाउनहाउस",
    ur: "ٹاؤن ہاؤس",
    tl: "Townhouse",
    zh: "联排别墅",
    ru: "Таунхаусы"
  },
  "opts.any": {
    en: "Any",
    ar: "أي عدد",
    hi: "कोई भी",
    ur: "کوئی بھی",
    tl: "Kahit Ilan",
    zh: "任意",
    ru: "Любое"
  },
  "opts.under10m": {
    en: "Under 10M",
    ar: "أقل من 10 مليون",
    hi: "10 मिलियन से कम",
    ur: "10 ملین سے کم",
    tl: "Mababa sa 10M",
    zh: "1000万以下",
    ru: "До 10 млн"
  },
  "opts.10m20m": {
    en: "10M - 20M",
    ar: "10 مليون - 20 مليون",
    hi: "10M - 20M",
    ur: "10M - 20M",
    tl: "10M - 20M",
    zh: "1000万 - 2000万",
    ru: "10 млн - 20 млн"
  },
  "opts.20m40m": {
    en: "20M - 40M",
    ar: "20 مليون - 40 مليون",
    hi: "20M - 40M",
    ur: "20M - 40M",
    tl: "20M - 40M",
    zh: "2000万 - 4000万",
    ru: "20 млн - 40 млн"
  },
  "opts.40m": {
    en: "40M+",
    ar: "أكثر من 40 مليون",
    hi: "40M+",
    ur: "40M+",
    tl: "40M+",
    zh: "4000万以上",
    ru: "40 млн+"
  },
  "tags.waterfront": {
    en: "Waterfront Villa",
    ar: "فيلا على الواجهة البحرية",
    hi: "वाटरफ्रंट विला",
    ur: "واٹر فرنٹ ولا",
    tl: "Waterfront Villa",
    zh: "海滨别墅",
    ru: "Прибрежная вилла"
  },
  "tags.downtown": {
    en: "Downtown Apartment",
    ar: "شقة في وسط المدينة",
    hi: "डाउनटाउन अपार्टमेंट",
    ur: "ڈاؤن ٹاؤن اپارٹمنٹ",
    tl: "Downtown Apartment",
    zh: "市中心公寓",
    ru: "Квартира в центре"
  },
  "tags.family": {
    en: "Family Home",
    ar: "بيت عائلي",
    hi: "पारिवारिक घर",
    ur: "فیملی ہوم",
    tl: "Tahanan ng Pamilya",
    zh: "家庭住宅",
    ru: "Семейный дом"
  },
  "tags.offplan": {
    en: "Off Plan",
    ar: "على الخارطة",
    hi: "ऑफ प्लान",
    ur: "آف پلان",
    tl: "Off Plan",
    zh: "期房项目",
    ru: "На стадии строительства"
  },
  "opts.allDevs": {
    en: "All Developers",
    ar: "جميع المطورين",
    hi: "सभी डेवलपर्स",
    ur: "تمام ڈویلپرز",
    tl: "Lahat ng Tagabuo",
    zh: "所有开发商",
    ru: "Все застройщики"
  },
  "opts.anyBeds": {
    en: "Any Bedrooms",
    ar: "أي غرف نوم",
    hi: "कोई भी बेडरूम",
    ur: "کوئی بھی بیڈ روم",
    tl: "Kahit Ilang Kuwarto",
    zh: "任意卧室",
    ru: "Любое кол-во спален"
  },
  "opts.anyBudget": {
    en: "Any Budget",
    ar: "أي ميزانية",
    hi: "कोई भी बजट",
    ur: "کوئی بھی بجٹ",
    tl: "Kahit Anong Badyet",
    zh: "任意预算",
    ru: "Любой бюджет"
  },

  // Stats Grid
  "stats.title": {
    en: "Dubai Real Estate Market Insights",
    ar: "رؤى سوق العقارات في دبي",
    hi: "दुबई रियल एस्टेट बाजार अंतर्दृष्टि",
    ur: "دبئی ریئل اسٹیٹ مارکیٹ کی بصیرت",
    tl: "Mga Pananaw sa Market ng Real Estate sa Dubai",
    zh: "迪拜房地产市场动态洞察",
    ru: "Аналитика рынка недвижимости Дубая"
  },
  "stats.transactions": {
    en: "Total Transactions",
    ar: "إجمالي المعاملات",
    hi: "कुल लेनदेन",
    ur: "کل لین دین",
    tl: "Kabuuang Transaksyon",
    zh: "总交易量",
    ru: "Всего сделок"
  },
  "stats.offplan": {
    en: "Off-Plan Sales",
    ar: "مبيعات على الخارطة",
    hi: "ऑफ-प्लान बिक्री",
    ur: "آف پلان فروخت",
    tl: "Benta ng Off-Plan",
    zh: "期房销售额",
    ru: "Продажи на стадии строительства"
  },
  "stats.ready": {
    en: "Ready Properties",
    ar: "العقارات الجاهزة",
    hi: "तैयार संपत्तियां",
    ur: "تیار جائیدادیں",
    tl: "Handang Ari-arian",
    zh: "现房交易量",
    ru: "Готовые объекты"
  },
  "stats.yield": {
    en: "Average Rental Yield",
    ar: "متوسط عائد الإيجار",
    hi: "औसत किराये की उपज",
    ur: "اوسط رینٹل پیداوار",
    tl: "Karaniwang Yield sa Renta",
    zh: "平均租金收益率",
    ru: "Средняя доходность аренды"
  },

  // Featured Properties
  "properties.title": {
    en: "Featured Properties",
    ar: "العقارات المميزة",
    hi: "विशेष संपत्तियाँ",
    ur: "نمایاں جائیدادیں",
    tl: "Mga Itinatampok na Ari-arian",
    zh: "精选奢华房源",
    ru: "Избранные объекты"
  },
  "properties.subtitle": {
    en: "Handpicked luxury listings in prime locations",
    ar: "قائمة عقارات فاخرة مختارة بعناية في مواقع رئيسية",
    hi: "प्रमुख स्थानों में चुनिंदा लक्जरी संपत्तियां",
    ur: "بہترین مقامات پر منتخب کردہ لگژری پراپرٹیز",
    tl: "Mga piling marangyang listahan sa mga pangunahing lokasyon",
    zh: "黄金地段精心挑选的顶级奢华房源",
    ru: "Тщательно отобранные премиальные предложения в лучших локациях"
  },
  "properties.viewDetails": {
    en: "View Details",
    ar: "عرض التفاصيل",
    hi: "विवरण देखें",
    ur: "تفصیلات دیکھیں",
    tl: "Tingnan ang Detalye",
    zh: "查看详情",
    ru: "Подробнее"
  },
  "properties.view3d": {
    en: "3D Walkthrough",
    ar: "جولة ثلاثية الأبعاد",
    hi: "3D वॉकथ्रू",
    ur: "3D واک تھرو",
    tl: "3D Walkthrough",
    zh: "3D 虚拟看房",
    ru: "3D-тур"
  },
  "properties.bookViewing": {
    en: "Book a Viewing",
    ar: "حجز موعد معاينة",
    hi: "अवलोकन बुक करें",
    ur: "معائنہ بک کریں",
    tl: "Mag-book ng Panonood",
    zh: "预约实地看房",
    ru: "Записаться на просмотр"
  },

  // Calculators
  "calc.title": {
    en: "Investment Calculators",
    ar: "حاسبات الاستثمار",
    hi: "निवेश कैलकुलेटर",
    ur: "سرمایہ کاری کیلکولیٹر",
    tl: "Mga Calculator ng Pamumuhunan",
    zh: "房产投资计算器",
    ru: "Инвестиционные калькуляторы"
  },
  "calc.subtitle": {
    en: "Calculate ROI & Mortgages in real-time",
    ar: "احسب العائد على الاستثمار والرهن العقاري في الوقت الفعلي",
    hi: "वास्तविक समय में आरओआई और बंधक की गणना करें",
    ur: "ریئل ٹائم میں منافع اور مارگیج کا حساب لگائیں",
    tl: "Kalkulahin ang ROI at Mortgage sa real-time",
    zh: "实时计算租金回报率与住房抵押贷款",
    ru: "Рассчитайте доходность и ипотеку в реальном времени"
  },
  "calc.roi": {
    en: "ROI Calculator",
    ar: "حاسبة العائد على الاستثمار",
    hi: "आरओआई कैलकुलेटर",
    ur: "ROI کیلکولیٹر",
    tl: "Calculator ng ROI",
    zh: "投资回报率计算",
    ru: "Калькулятор доходности"
  },
  "calc.mortgage": {
    en: "Mortgage Calculator",
    ar: "حاسبة الرهن العقاري",
    hi: "बंधक कैलकुलेटर",
    ur: "مارگیج کیلکولیٹر",
    tl: "Calculator ng Mortgage",
    zh: "住房贷款计算",
    ru: "Ипотечный калькулятор"
  },
  "calc.price": {
    en: "Purchase Price",
    ar: "سعر الشراء",
    hi: "खरीद मूल्य",
    ur: "قیمت خرید",
    tl: "Presyo ng Pagbili",
    zh: "房屋总价",
    ru: "Стоимость покупки"
  },
  "calc.rent": {
    en: "Expected Annual Rent",
    ar: "الإيجار السنوي المتوقع",
    hi: "अपेक्षित वार्षिक किराया",
    ur: "متوقع سالانہ کرایہ",
    tl: "Inaasahang Taunang Renta",
    zh: "预期年租金",
    ru: "Ожидаемая годовая арендная плата"
  },
  "calc.netRoi": {
    en: "Calculated Net ROI",
    ar: "العائد الصافي المحسوب",
    hi: "परिकलित शुद्ध आरओआई",
    ur: "حساب شدہ نیٹ ROI",
    tl: "Kinalkulang Net ROI",
    zh: "计算所得净回报率",
    ru: "Расчётная чистая доходность"
  },
  "calc.loan": {
    en: "Loan Amount",
    ar: "مبلغ القرض",
    hi: "ऋण राशि",
    ur: "قرض کی رقم",
    tl: "Halaga ng Loan",
    zh: "贷款金额",
    ru: "Сумма кредита"
  },
  "calc.rate": {
    en: "Interest Rate",
    ar: "معدل الفائدة",
    hi: "ब्याज दर",
    ur: "شرح سود",
    tl: "Rate ng Interes",
    zh: "贷款利率",
    ru: "Процентная ставка"
  },
  "calc.term": {
    en: "Loan Term",
    ar: "مدة القرض",
    hi: "ऋण की अवधि",
    ur: "قرض کی مدت",
    tl: "Termino ng Loan",
    zh: "贷款期限",
    ru: "Срок кредита"
  },
  "calc.payment": {
    en: "Monthly Payment",
    ar: "الدفع الشهري المتوقع",
    hi: "अनुमानित मासिक भुगतान",
    ur: "متوقع ماہانہ ادائیگی",
    tl: "Buwanang Bayad",
    zh: "每月等额本息",
    ru: "Ежемесячный платёж"
  },
  "calc.down": {
    en: "Down Payment",
    ar: "الدفعة المقدمة",
    hi: "डाउन पेमेंट",
    ur: "ڈاؤن پیمنٹ",
    tl: "Down Payment",
    zh: "首付款",
    ru: "Первоначальный взнос"
  },

  // Testimonials
  "test.title": {
    en: "What Our Clients Say",
    ar: "ماذا يقول عملائنا",
    hi: "हमारे ग्राहक क्या कहते हैं",
    ur: "ہمارے کلائنٹس کا کہنا ہے",
    tl: "Sinasabi ng aming mga Kliyente",
    zh: "尊贵客户寄语",
    ru: "Что говорят наши клиенты"
  },
  "test.rating": {
    en: "Verified Google Reviews",
    ar: "تقييمات جوجل المعتمدة",
    hi: "सत्यापित Google समीक्षाएं",
    ur: "تصدیق شدہ گوگل ریویوز",
    tl: "Mga Na-verify na Review sa Google",
    zh: "谷歌五星真实房客评价",
    ru: "Проверенные отзывы в Google"
  },
  "test.active": {
    en: "Active Customers",
    ar: "عملاء نشطون",
    hi: "सक्रिय ग्राहक",
    ur: "فعال صارفین",
    tl: "Aktibong Kliyente",
    zh: "活跃客户数量",
    ru: "Активные клиенты"
  },

  // AI Assistant
  "ai.title": {
    en: "Ask our Smart Assistant",
    ar: "اسأل مساعدنا الذكي",
    hi: "हमारे स्मार्ट सहायक से पूछें",
    ur: "ہمارے اسمارٹ اسسٹنٹ سے پوچھیں",
    tl: "Magtanong sa aming Matalinong Assistant",
    zh: "智能AI顾问",
    ru: "Задайте вопрос нашему умному помощнику"
  },
  "ai.curator": {
    en: "AI Property Curator",
    ar: "منسق العقارات بالذكاء الاصطناعي",
    hi: "एआई संपत्ति क्यूरेटर",
    ur: "اے آئی پراپرٹی کیوریٹر",
    tl: "AI Curator ng Ari-arian",
    zh: "AI智能房源检索助手",
    ru: "AI-куратор недвижимости"
  },
  "ai.desc": {
    en: "Ask our smart AI curated assistant to find properties or calculate investments.",
    ar: "اسأل مساعدنا الذكي المخصص للعثور على العقارات أو حساب الاستثمارات.",
    hi: "संपत्तियां खोजने या निवेश की गणना करने के लिए हमारे स्मार्ट एआई क्यूरेटेड सहायक से पूछें।",
    ur: "جائیدادیں تلاش کرنے یا سرمایہ کاری کا حساب لگانے کے لیے ہمارے سمارٹ اے آئی اسسٹنٹ سے پوچھیں۔",
    tl: "Magtanong sa aming matalinong assistant para maghanap ng ari-arian o magkalkula ng pamumuhunan.",
    zh: "咨询我们的AI房产规划助手，为您智能检索迪拜优质房源并实时提供收益精算。",
    ru: "Задайте вопрос нашему умному AI-помощнику, чтобы найти недвижимость или рассчитать инвестиции."
  },
  "ai.placeholder": {
    en: "Type your request...",
    ar: "اكتب طلبك هنا...",
    hi: "अपनी प्रार्थना लिखें...",
    ur: "اپنا پیغام لکھیں...",
    tl: "I-type ang iyong kahilingan...",
    zh: "请输入您的搜房或置业需求...",
    ru: "Введите ваш запрос..."
  },
  "ai.searchBtn": {
    en: "Search with AI",
    ar: "بحث بالذكاء الاصطناعي",
    hi: "एआई के साथ खोजें",
    ur: "اے آئی سے تلاش کریں",
    tl: "Maghanap gamit ang AI",
    zh: "AI智能检索",
    ru: "Поиск с AI"
  },
  "ai.analyzing": {
    en: "AI is analyzing properties...",
    ar: "يقوم الذكاء الاصطناعي بتحليل العقارات...",
    hi: "एआई संपत्तियों का विश्लेषण कर रहा है...",
    ur: "اے آئی جائیدادوں کا تجزیہ کر رہا ہے...",
    tl: "Sinusuri ng AI ang mga ari-arian...",
    zh: "AI正在为您精算最佳房源，请稍候...",
    ru: "AI анализирует объекты..."
  },

  // StatsGrid
  "statsGrid.yearsExperience": {
    en: "Years Experience",
    ar: "سنوات من الخبرة",
    hi: "वर्षों का अनुभव",
    ur: "سالوں کا تجربہ",
    tl: "Taon ng Karanasan",
    zh: "年经验",
    ru: "Лет опыта"
  },
  "statsGrid.propertiesSold": {
    en: "Properties Sold",
    ar: "عقارات تم بيعها",
    hi: "संपत्तियां बिकी",
    ur: "پراپرٹیز فروخت",
    tl: "Mga Naibentang Property",
    zh: "已售房产",
    ru: "Проданных объектов"
  },
  "statsGrid.happyInvestors": {
    en: "Happy Investors",
    ar: "مستثمرون سعداء",
    hi: "खुश निवेशक",
    ur: "خوش سرمایہ کار",
    tl: "Masayang Mamumuhunan",
    zh: "满意投资者",
    ru: "Довольных инвесторов"
  },
  "statsGrid.googleRating": {
    en: "Google Rating",
    ar: "تقييم جوجل",
    hi: "गूगल रेटिंग",
    ur: "گوگل ریٹنگ",
    tl: "Rating sa Google",
    zh: "谷歌评分",
    ru: "Оценка Google"
  },
  "statsGrid.certifiedAgency": {
    en: "Certified Agency",
    ar: "وكالة معتمدة",
    hi: "प्रमाणित एजेंसी",
    ur: "تصدیق شدہ ایجنسی",
    tl: "Sertipikadong Ahensiya",
    zh: "认证机构",
    ru: "Сертифицированное агентство"
  },

  // Our Services
  "services.label": {
    en: "Our Services",
    ar: "خدماتنا",
    hi: "हमारी सेवाएं",
    ur: "ہماری خدمات",
    tl: "Ang Aming mga Serbisyo",
    zh: "我们的服务",
    ru: "Наши услуги"
  },
  "services.title": {
    en: "What We Do?",
    ar: "ماذا نقدم؟",
    hi: "हम क्या करते हैं?",
    ur: "ہم کیا کرتے ہیں؟",
    tl: "Ano ang Ginagawa Namin?",
    zh: "我们做什么？",
    ru: "Что мы делаем?"
  },
  "services.desc": {
    en: "Providing comprehensive real estate solutions tailored for investors, homeowners, and tenants across the UAE.",
    ar: "توفير حلول عقارية شاملة مصممة خصيصاً للمستثمرين وأصحاب المنازل والمستأجرين في جميع أنحاء الإمارات.",
    hi: "संयुक्त अरब अमीरात में निवेशकों, घर मालिकों और किरायेदारों के लिए व्यापक रियल एस्टेट समाधान प्रदान करना।",
    ur: "امارات میں سرمایہ کاروں، گھر مالکان اور کرایہ داروں کے لیے جامع ریئل اسٹیٹ حل فراہم کرنا۔",
    tl: "Nagbibigay ng komprehensibong real estate solutions para sa mga mamumuhunan, may-ari ng bahay, at mga umuupa sa buong UAE.",
    zh: "为阿联酋的投资者、房主和租户提供量身定制的全方位房地产解决方案。",
    ru: "Предлагаем комплексные решения в сфере недвижимости для инвесторов, владельцев и арендаторов по всей ОАЭ."
  },
  "services.offPlan": {
    en: "Off Plan Projects",
    ar: "مشاريع على الخارطة",
    hi: "ऑफ प्लान प्रोजेक्ट्स",
    ur: "آف پلان پروجیکٹس",
    tl: "Off Plan Projects",
    zh: "期房项目",
    ru: "Проекты на стадии строительства"
  },
  "services.offPlanDesc": {
    en: "Discover premium off-plan developments from Dubai's leading developers with expert investment guidance and flexible payment plans.",
    ar: "اكتشف المشاريع العقارية المتميزة قيد الإنشاء من كبار مطورين دبي مع إرشادات استثمارية متخصصة وخطط دفع مرنة.",
    hi: "दुबई के प्रमुख डेवलपर्स से प्रीमियम ऑफ-प्लान विकास की खोज करें, विशेषज्ञ निवेश मार्गदर्शन और लचीली भुगतान योजनाओं के साथ।",
    ur: "دبئی کے معروف ڈویلپرز سے پریمیم آف پلان ڈیویلپمنٹس دریافت کریں، مخصوص سرمایہ کاری رہنمائی اور لچیلدا پیمنٹ پلانوں کے ساتھ۔",
    tl: "Tuklasin ang mga premium off-plan development mula sa mga nangungunang developer ng Dubai na may ekspertong investment guidance at flexible payment plans.",
    zh: "发现迪拜顶级开发商的优质期房项目，享受专业投资指导和灵活付款计划。",
    ru: "Откройте для себя премиальные проекты от ведущих застройщиков Дубая с экспертным инвестиционным сопровождением и гибкими планами оплаты."
  },
  "services.offPlanBtn": {
    en: "Explore Projects",
    ar: "استكشف المشاريع",
    hi: "प्रोजेक्ट्स देखें",
    ur: "پروجیکٹس دیکھیں",
    tl: "Tingnan ang mga Proyekto",
    zh: "探索项目",
    ru: "Исследовать проекты"
  },
  "services.secondary": {
    en: "Secondary Property",
    ar: "عقارات مستعملة",
    hi: "सेकेंडरी प्रॉपर्टी",
    ur: "سیکنڈری پراپرٹی",
    tl: "Secondary Property",
    zh: "二手房",
    ru: "Вторичная недвижимость"
  },
  "services.secondaryDesc": {
    en: "Buy and invest in ready properties across Dubai with verified listings, transparent pricing, and professional advisory support.",
    ar: "اشترِ واستثمر في العقارات الجاهزة في جميع أنحاء دبي مع قوائم موثقة وأسعار شفافة ودعم استشاري متخصص.",
    hi: "दुबई भर में तैयार संपत्तियों में खरीदें और निवेश करें, सत्यापित लिस्टिंग, पारदर्शी मूल्य निर्धारण और पेशेवर सलाहकारी सहायता के साथ।",
    ur: "دبئی بھر میں تیار پراپرٹیز میں خریداری اور سرمایہ کاری کریں، تصدیق شدہ لسٹنگ، شفاف قیمت اور پیشہ ورانہ مشاورتی معاونت کے ساتھ۔",
    tl: "Bumili at mag-invest sa mga handang ari-arian sa buong Dubai na may verified listings, transparent na presyo, at propesyonal na advisory support.",
    zh: "在迪拜各地购买和投资现房，享受经过验证的房源、透明定价和专业顾问支持。",
    ru: "Покупайте и инвестируйте в готовые объекты по всему Дубаю с проверенными предложениями, прозрачными ценами и профессиональной поддержкой."
  },
  "services.secondaryBtn": {
    en: "View Properties",
    ar: "عرض العقارات",
    hi: "संपत्तियां देखें",
    ur: "پراپرٹیز دیکھیں",
    tl: "Tingnan ang mga Property",
    zh: "查看房产",
    ru: "Посмотреть объекты"
  },
  "services.rentals": {
    en: "Rental Properties",
    ar: "عقارات للإيجار",
    hi: "किराये की संपत्तियां",
    ur: "کرایے کی پراپرٹیز",
    tl: "Rental Properties",
    zh: "租赁房产",
    ru: "Аренда недвижимости"
  },
  "services.rentalsDesc": {
    en: "Find luxury apartments, villas, and commercial spaces that perfectly match your lifestyle and investment requirements.",
    ar: "ابحث عن شقق وفيلات ومساحات تجارية فاخرة تتناسب تماماً مع نمط حياتك ومتطلبات استثمارك.",
    hi: "अपनी जीवनशैली और निवेश आवश्यकताओं के अनुरूप लक्जरी अपार्टमेंट, विला और वाणिज्यिक स्थान खोजें।",
    ur: "اپنی لائف اسٹائل اور سرمایہ کاری کی ضروریات سے بالکل ملتی جلتی لگژری اپارٹمنٹس، ولا اور تجارتی جگہیں تلاش کریں۔",
    tl: "Humanap ng mga marangyang apartment, villa, at commercial space na perpektong tumutugma sa iyong lifestyle at investment requirements.",
    zh: "寻找完美契合您生活方式和投资需求的豪华公寓、别墅和商业空间。",
    ru: "Найдите премиальные квартиры, виллы и коммерческие помещения, идеально соответствующие вашему стилю жизни и инвестиционным целям."
  },
  "services.rentalsBtn": {
    en: "Find Rentals",
    ar: "البحث عن الإيجارات",
    hi: "किराये खोजें",
    ur: "کرایے تلاش کریں",
    tl: "Maghanap ng Paupahan",
    zh: "寻找租赁",
    ru: "Найти аренду"
  },
  "services.popular": {
    en: "Popular",
    ar: "شائع",
    hi: "लोकप्रिय",
    ur: "مقبول",
    tl: "Sikat",
    zh: "热门",
    ru: "Популярное"
  },

  // Why Choose Us
  "why.label": {
    en: "Our Benefits",
    ar: "مميزاتنا",
    hi: "हमारे फायदे",
    ur: "ہمارے فوائد",
    tl: "Ang Aming mga Pakinabang",
    zh: "我们的优势",
    ru: "Наши преимущества"
  },
  "why.title": {
    en: "Why Choose City Global Real Estate?",
    ar: "لماذا تختار سيتي جلوبال العقارية؟",
    hi: "सिटी ग्लोबल रियल एस्टेट क्यों चुनें؟",
    ur: "سٹی گلوبل ریئل اسٹیٹ کیوں منتخب کریں؟",
    tl: "Bakit Pumili ng City Global Real Estate?",
    zh: "为什么选择 City Global 房地产？",
    ru: "Почему выбирают City Global Real Estate?"
  },
  "why.expertise": {
    en: "Market Expertise",
    ar: "خبرة السوق",
    hi: "बाजार विशेषज्ञता",
    ur: "مارکیٹ مہارت",
    tl: "Kaalaman sa Market",
    zh: "市场专业知识",
    ru: "Рыночная экспертиза"
  },
  "why.expertiseDesc": {
    en: "Extensive understanding of the UAE luxury and commercial property market, helping clients make informed investment decisions.",
    ar: "فهم واسع لسوق العقارات الفاخرة والتجارية في الإمارات، لمساعدة العملاء على اتخاذ قرارات استثمارية مدروسة.",
    hi: "UAE की लक्जरी और वाणिज्यिक संपत्ति बाजार की व्यापक समझ, ग्राहकों को सूचित निवेश निर्णय लेने में मदद करना।",
    ur: "امارات میں لگژری اور تجارتی جائیداد مارکیٹ کا وسیع فہم، کلائنٹس کو آگاہ سرمایہ کاری فیصلے کرنے میں مدد کرنا۔",
    tl: "Malawak na pag-unawa sa UAE luxury at commercial property market, tumutulong sa mga kliyente na gumawa ng matalinong investment decisions.",
    zh: "深入了解阿联酋豪华商业地产市场，帮助客户做出明智的投资决策。",
    ru: "Глубокое понимание рынка премиальной и коммерческой недвижимости ОАЭ, помогающее клиентам принимать обоснованные инвестиционные решения."
  },
  "why.tailored": {
    en: "Tailored Service",
    ar: "خدمة مخصصة",
    hi: "अनुकूलित सेवा",
    ur: "حسب الطلب سروس",
    tl: "Personalized na Serbisyo",
    zh: "定制服务",
    ru: "Индивидуальный подход"
  },
  "why.tailoredDesc": {
    en: "Personalized support throughout the buying and investment journey with complete transparency and professionalism.",
    ar: "دعم شخصي طوال رحلة الشراء والاستثمار مع الشفافية والاحترافية التامتين.",
    hi: "खरीद और निवेश यात्रा में पूर्ण पारदर्शिता और पेशेवरपन के साथ व्यक्तिगत सहायता।",
    ur: "خریداری اور سرمایہ کاری کے سفر میں مکمل شفافیت اور پیشہ ورانگی کے ساتھ ذاتی معاونت۔",
    tl: "Personalized na suporta sa buong pagbili at investment journey na may kumpletong transparency at propesyonalismo.",
    zh: "在整个购房和投资过程中提供个性化支持，确保完全透明和专业。",
    ru: "Персональная поддержка на протяжении всего процесса покупки и инвестирования с полной прозрачностью и профессионализмом."
  },
  "why.connections": {
    en: "Worldwide Connections",
    ar: "علاقات عالمية",
    hi: "विश्वव्यापी संपर्क",
    ur: "دنیا بھر کے تعلقات",
    tl: "Mga Ugnayang Pandaigdig",
    zh: "全球资源",
    ru: "Глобальные связи"
  },
  "why.connectionsDesc": {
    en: "Strong international investor network combined with deep knowledge of UAE real estate opportunities.",
    ar: "شبكة مستثمرين دولية قوية مدعومة بمعرفة عميقة بفرص العقارات في الإمارات.",
    hi: "UAE रियल एस्टेट अवसरों के गहन ज्ञान के साथ मजबूत अंतरराष्ट्रीय निवेशक नेटवर्क।",
    ur: "امارات کے ریئل اسٹیٹ مواقع کے گہرے علم کے ساتھ مضبوط بین الاقوامی سرمایہ کاروں کا نیٹ ورک۔",
    tl: "Malakas na international investor network na pinagsama sa malalim na kaalaman sa mga oportunidad ng UAE real estate.",
    zh: "强大的国际投资者网络，结合对阿联酋房地产机会的深入了解。",
    ru: "Мощная международная сеть инвесторов в сочетании с глубоким знанием возможностей недвижимости ОАЭ."
  },
  "why.strategy": {
    en: "Investment Strategy",
    ar: "استراتيجية الاستثمار",
    hi: "निवेश रणनीति",
    ur: "سرمایہ کاری کی حکمت عملی",
    tl: "Estratehiya sa Pamumuhunan",
    zh: "投资策略",
    ru: "Инвестиционная стратегия"
  },
  "why.strategyDesc": {
    en: "Data-driven investment advice focused on maximizing returns and long-term value.",
    ar: "نصائح استثمارية مبنية على البيانات تركز على تعظيم العوائد والقيمة طويلة الأجل.",
    hi: "रिटर्न और दीर्घकालिक मूल्य को अधिकतम करने पर केंद्रित डेटा-संचालित निवेश सलाह।",
    ur: "منافع اور طویل مدتی قیمت کو زیادہ سے زیادہ بنانے پر مرکز ڈیٹا پر مبنی سرمایہ کاری مشورہ۔",
    tl: "Data-driven investment advice na nakatuon sa pag-maximize ng returns at long-term value.",
    zh: "以数据驱动的投资建议，专注于最大化回报和长期价值。",
    ru: "Данные-ориентированные инвестиционные рекомендации, ориентированные на максимизацию доходности и долгосрочной ценности."
  },

  // AI Concierge
  "ai.welcome": {
    en: "Welcome to City Global Real Estate. How can I assist you today?",
    ar: "مرحبًا بك في سيتي جلوبال العقارية. كيف يمكنني مساعدتك اليوم؟",
    hi: "सिटी ग्लोबल रियल एस्टेट में आपका स्वागत है। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    ur: "سٹی گلوبل ریئل اسٹیٹ میں خوش آمدید۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
    tl: "Maligayang pagdating sa City Global Real Estate. Paano kita matutulungan ngayon?",
    zh: "欢迎来到 City Global Real Estate。请问今天我能为您做些什么？",
    ru: "Добро пожаловать в City Global Real Estate. Чем я могу вам помочь сегодня?"
  },
  "ai.header": {
    en: "Global Elite Consultant",
    ar: "مستشار عالمي متميز",
    hi: "ग्लोबल एलीट सलाहकार",
    ur: "گلوبل الیٹ مشیر",
    tl: "Global Elite Consultant",
    zh: "全球精英顾问",
    ru: "Глобальный элитный консультант"
  },
  "ai.poweredBy": {
    en: "Powered by Gemini AI",
    ar: "بدعم من Gemini AI",
    hi: "Gemini AI द्वारा संचालित",
    ur: "Gemini AI کی طرف سے چلایا جاتا ہے",
    tl: "Pinapagana ng Gemini AI",
    zh: "由 Gemini AI 驱动",
    ru: "На базе Gemini AI"
  },
  "ai.loading": {
    en: "Analyzing market data...",
    ar: "جاري تحليل بيانات السوق...",
    hi: "बाजार डेटा का विश्लेषण हो रहा है...",
    ur: "مارکیٹ ڈیٹا کا تجزیہ ہو رہا ہے...",
    tl: "Sinusuri ang data ng market...",
    zh: "正在分析市场数据...",
    ru: "Анализ рыночных данных..."
  },
  "ai.inputPlaceholder": {
    en: "Ask about Dubai Real Estate...",
    ar: "اسأل عن العقارات في دبي...",
    hi: "दुबई रियल एस्टेट के बारे में पूछें...",
    ur: "دبئی ریئل اسٹیٹ کے بارے میں پوچھیں...",
    tl: "Magtanong tungkol sa Dubai Real Estate...",
    zh: "咨询迪拜房地产相关问题...",
    ru: "Задайте вопрос о недвижимости в Дубае..."
  },
  "ai.clearChat": {
    en: "Clear chat",
    ar: "مسح المحادثة",
    hi: "चैट साफ़ करें",
    ur: "چیٹ صاف کریں",
    tl: "I-clear ang chat",
    zh: "清除对话",
    ru: "Очистить чат"
  },
  "ai.copy": {
    en: "Copy",
    ar: "نسخ",
    hi: "कॉपी",
    ur: "کاپی",
    tl: "Kopyahin",
    zh: "复制",
    ru: "Копировать"
  },
  "ai.chip1": {
    en: "Best investment under AED 5M?",
    ar: "أفضل استثمار تحت 5 مليون درهم؟",
    hi: "50 लाख AED से कम में सबसे अच्छा निवेश?",
    ur: "50 لاکھ AED سے کم میں بہترین سرمایہ کاری؟",
    tl: "Pinakamainam na investment sa ilalim ng AED 5M?",
    zh: "500万迪拉姆以下的最佳投资？",
    ru: "Лучшая инвестиция до 5 млн AED?"
  },
  "ai.chip2": {
    en: "Compare Downtown vs Dubai Marina",
    ar: "قارن بين وسط مدينة دبي ودبي مارينا",
    hi: "डाउनटाउन बनाम दुबई मारिना की तुलना करें",
    ur: "ڈاؤن ٹاؤن بنام دبئی مارینا کا موازنہ کریں",
    tl: "Ihambing ang Downtown vs Dubai Marina",
    zh: "对比市中心与迪拜码头",
    ru: "Сравните Downtown и Dubai Marina"
  },
  "ai.chip3": {
    en: "Show me off plan projects",
    ar: "اعرض لي المشاريع على الخارطة",
    hi: "मुझे ऑफ प्लान प्रोजेक्ट्स दिखाएं",
    ur: "مجھے آف پلان پروجیکٹس دکھائیں",
    tl: "Ipakita sa akin ang mga off plan project",
    zh: "显示期房项目",
    ru: "Покажите проекты на стадии строительства"
  },
  "ai.chip4": {
    en: "Book a property viewing",
    ar: "احجز موعد معاينة عقار",
    hi: "संपत्ति देखने का समय बुक करें",
    ur: "پراپرٹی دیکھنے کا وقت بک کریں",
    tl: "Mag-book ng property viewing",
    zh: "预约看房",
    ru: "Записаться на просмотр объекта"
  },
  "ai.chip5": {
    en: "ROI analysis for Palm Jumeirah",
    ar: "تحليل العائد على الاستثمار لنخلة جميرا",
    hi: "पाम जुमेराह के लिए ROI विश्लेषण",
    ur: "پام جمیرہ کے لیے ROI تجزیہ",
    tl: "ROI analysis para sa Palm Jumeirah",
    zh: "棕榈岛投资回报分析",
    ru: "Анализ доходности Palm Jumeirah"
  },
  "ai.chip6": {
    en: "Golden Visa requirements",
    ar: "متطلبات التأشيرة الذهبية",
    hi: "गोल्डन वीज़ा आवश्यकताएं",
    ur: "گولڈن ویزا کی تقاضائیں",
    tl: "Mga kinakailangan para sa Golden Visa",
    zh: "黄金签证要求",
    ru: "Требования к золотой визе"
  },
  "ai.errorConnection": {
    en: "Failed to consult AI. Please try again.",
    ar: "فشل في استشارة الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.",
    hi: "AI से परामर्श करने में विफल। कृपया पुनः प्रयास करें।",
    ur: "AI سے مشورہ کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔",
    tl: "Nabigo ang pagkonsulta sa AI. Mangyaring subukan muli.",
    zh: "AI咨询失败。请重试。",
    ru: "Не удалось подключиться к AI. Пожалуйста, попробуйте снова."
  },
  "ai.errorGeneral": {
    en: "I apologize, but I'm unable to connect to our AI service at the moment. Please try again in a few moments, or contact our team directly for assistance.",
    ar: "أعتذر، لكنني غير قادر على الاتصال بخدمة الذكاء الاصطناعي في الوقت الحالي. يرجى المحاولة مرة أخرى بعد بضع لحظات، أو الاتصال بفريقنا مباشرة للحصول على المساعدة.",
    hi: "मुझे खेद है, लेकिन मैं इस समय हमारी AI सेवा से कनेक्ट करने में असमर्थ हूं। कृपया कुछ क्षणों में पुनः प्रयास करें, या सहायता के लिए सीधे हमारी टीम से संपर्क करें।",
    ur: "مجھے معذرت ہے، لیکن میں اس وقت ہماری AI سروس سے رابطہ قائم کرنے سے قاصر ہوں۔ براہ کرم چند لمحوں میں دوبارہ کوشش کریں، یا مدد کے لیے ہماری ٹیم سے براہ راست رابطہ کریں۔",
    tl: "Paumanhin, ngunit hindi ako makakonekta sa aming AI service sa ngayon. Mangyaring subukan muli pagkatapos ng ilang sandali, o makipag-ugnayan nang direkta sa aming team para sa tulong.",
    zh: "很抱歉，我暂时无法连接到我们的AI服务。请稍后重试，或直接联系我们的团队获取帮助。",
    ru: "Приносим извинения, но в данный момент невозможно подключиться к нашему AI-сервису. Пожалуйста, повторите попытку через несколько минут или свяжитесь с нашей командой напрямую."
  },

  // Testimonials
  "test.partners": {
    en: "Our Partners",
    ar: "شركاؤنا",
    hi: "हमारे साझेदार",
    ur: "ہمارے پارٹنرز",
    tl: "Ang Aming mga Kasosyo",
    zh: "合作伙伴",
    ru: "Наши партнёры"
  },
  "test.trustedDevs": {
    en: "Our Trusted Developers",
    ar: "مطورونا الموثوقون",
    hi: "हमारे विश्वसनीय डेवलपर्स",
    ur: "ہمارے قابل اعتماد ڈویلپرز",
    tl: "Ang Aming mga Pinagkakatiwalaang Developer",
    zh: "信赖的开发商",
    ru: "Наши проверенные застройщики"
  },
  "test.partnersDesc": {
    en: "Partnered with Dubai's most prestigious real estate developers",
    ar: "شراكة مع أرقى مطورين عقاريين في دبي",
    hi: "दुबई के सबसे प्रतिष्ठित रियल एस्टेट डेवलपर्स के साथ साझेदारी",
    ur: "دبئی کے سب سے معروف ریئل اسٹیٹ ڈویلپرز کے ساتھ شراکت داری",
    tl: "Kasosyo sa mga pinakaprestihiyosong real estate developer ng Dubai",
    zh: "与迪拜最负盛名的房地产开发商合作",
    ru: "Партнёрство с самыми престижными застройщиками Дубая"
  },
  "test.endorsements": {
    en: "Endorsements",
    ar: "توصيات",
    hi: "समर्थन",
    ur: "تائیدات",
    tl: "Mga Endorsement",
    zh: "权威认可",
    ru: "Рекомендации"
  },
  "test.auditScore": {
    en: "Audit Score",
    ar: "نتيجة التدقيق",
    hi: "ऑडिट स्कोर",
    ur: "آڈٹ اسکور",
    tl: "Audit Score",
    zh: "审计评分",
    ru: "Оценка аудита"
  },
  "test.googleReviews": {
    en: "Google Reviews",
    ar: "تقييمات جوجل",
    hi: "Google समीक्षाएं",
    ur: "گوگل ریویوز",
    tl: "Mga Review sa Google",
    zh: "谷歌评价",
    ru: "Отзывы в Google"
  },
  "test.basedOn": {
    en: "Based on 320+ premium client reviews and RERA audits.",
    ar: "مبني على أكثر من 320 تقييم من العملاء المميزين وتدقيقات RERA.",
    hi: "320+ प्रीमियम क्लाइंट समीक्षाओं और RERA ऑडिट पर आधारित।",
    ur: "320+ پریمیم کلائنٹ ریویوز اور RERA آڈٹس پر مبنی۔",
    tl: "Nabase sa 320+ premium client review at RERA audit.",
    zh: "基于320+优质客户评价与RERA审计数据。",
    ru: "На основе 320+ премиальных отзывов клиентов и аудитов RERA."
  },
  "test.verifiedReviews": {
    en: "Verified Client Reviews",
    ar: "تقييمات عملاء موثقة",
    hi: "सत्यापित ग्राहक समीक्षाएं",
    ur: "تصدیق شدہ کلائنٹ ریویوز",
    tl: "Mga Na-verify na Client Review",
    zh: "客户真实评价",
    ru: "Проверенные отзывы клиентов"
  },

  // Calculators
  "calc.investTitle": {
    en: "Investment Calculators",
    ar: "حاسبات الاستثمار",
    hi: "निवेश कैलकुलेटर",
    ur: "سرمایہ کاری کیلکولیٹر",
    tl: "Mga Calculator ng Pamumuhunan",
    zh: "投资计算器",
    ru: "Инвестиционные калькуляторы"
  },
  "calc.investDesc": {
    en: "Calculate mortgage payments and projected returns for Dubai properties.",
    ar: "احسب مدفوعات الرهن العقاري والعوائد المتوقعة للعقارات في دبي.",
    hi: "दुबई की संपत्तियों के लिए बंधक भुगतान और अनुमानित प्रतिफल की गणना करें।",
    ur: "دبئی کی پراپرٹیز کے لیے مارگیج ادائیگیاں اور منصوبہ بندی منافع کا حساب لگائیں۔",
    tl: "Kalkulahin ang mortgage payment at projected returns para sa mga property sa Dubai.",
    zh: "计算迪拜房产的按揭付款和预期回报。",
    ru: "Рассчитайте ипотечные платежи и прогнозируемую доходность объектов в Дубае."
  },
  "calc.mortgageTitle": {
    en: "Mortgage Calculator",
    ar: "حاسبة الرهن العقاري",
    hi: "बंधक कैलकुलेटर",
    ur: "مارگیج کیلکولیٹر",
    tl: "Calculator ng Mortgage",
    zh: "按揭计算器",
    ru: "Ипотечный калькулятор"
  },
  "calc.monthlyEmi": {
    en: "Monthly EMI",
    ar: "القسط الشهري",
    hi: "मासिक ईएमआई",
    ur: "ماہانہ ای ایم آئی",
    tl: "Buwanang EMI",
    zh: "每月供款",
    ru: "Ежемесячный платёж"
  },
  "calc.propertyPrice": {
    en: "Property Price",
    ar: "سعر العقار",
    hi: "संपत्ति की कीमत",
    ur: "پراپرٹی کی قیمت",
    tl: "Presyo ng Property",
    zh: "房产价格",
    ru: "Стоимость недвижимости"
  },
  "calc.downPayment": {
    en: "Down Payment",
    ar: "الدفعة المقدمة",
    hi: "डाउन पेमेंट",
    ur: "ڈاؤن پیمنٹ",
    tl: "Down Payment",
    zh: "首付",
    ru: "Первоначальный взнос"
  },
  "calc.interestRate": {
    en: "Interest Rate",
    ar: "معدل الفائدة",
    hi: "ब्याज दर",
    ur: "شرح سود",
    tl: "Rate ng Interes",
    zh: "利率",
    ru: "Процентная ставка"
  },
  "calc.loanTenure": {
    en: "Loan Tenure",
    ar: "مدة القرض",
    hi: "ऋण अवधि",
    ur: "قرض کی مدت",
    tl: "Termino ng Loan",
    zh: "贷款年限",
    ru: "Срок кредита"
  },
  "calc.breakdown": {
    en: "Breakdown",
    ar: "تفاصيل",
    hi: "विवरण",
    ur: "تفصیل",
    tl: "Breakdown",
    zh: "明细",
    ru: "Детали"
  },
  "calc.principalLoan": {
    en: "Principal Loan",
    ar: "قرض رئيسي",
    hi: "मूल ऋण",
    ur: "اصلی قرض",
    tl: "Principal Loan",
    zh: "贷款本金",
    ru: "Основная сумма кредита"
  },
  "calc.totalInterest": {
    en: "Total Interest",
    ar: "إجمالي الفائدة",
    hi: "कुल ब्याज",
    ur: "کل سود",
    tl: "Kabuuang Interes",
    zh: "总利息",
    ru: "Общая сумма процентов"
  },
  "calc.totalPayment": {
    en: "Total Payment",
    ar: "إجمالي الدفع",
    hi: "कुल भुगतान",
    ur: "کل ادائیگی",
    tl: "Kabuuang Bayad",
    zh: "总还款额",
    ru: "Общая сумма выплат"
  },
  "calc.roiTitle": {
    en: "ROI Calculator",
    ar: "حاسبة العائد على الاستثمار",
    hi: "ROI कैलकुलेटर",
    ur: "ROI کیلکولیٹر",
    tl: "Calculator ng ROI",
    zh: "投资回报计算器",
    ru: "Калькулятор доходности"
  },
  "calc.netAnnualRoi": {
    en: "Net Annual ROI",
    ar: "العائد السنوي الصافي",
    hi: "शुद्ध वार्षिक ROI",
    ur: "خالص سالانہ ROI",
    tl: "Net Annual ROI",
    zh: "年度净回报率",
    ru: "Чистая годовая доходность"
  },
  "calc.expectedRent": {
    en: "Expected Annual Rent",
    ar: "الإيجار السنوي المتوقع",
    hi: "अपेक्षित वार्षिक किराया",
    ur: "متوقع سالانہ کرایہ",
    tl: "Inaasahang Taunang Renta",
    zh: "预期年租金",
    ru: "Ожидаемая годовая арендная плата"
  },
  "calc.expenses": {
    en: "Annual Service & Expenses",
    ar: "الخدمات والمصاريف السنوية",
    hi: "वार्षिक सेवा और व्यय",
    ur: "سالانہ خدمات اور اخراجات",
    tl: "Taunang Serbisyo at Gastos",
    zh: "年度服务与费用",
    ru: "Годовые расходы на обслуживание"
  },
  "calc.appreciation": {
    en: "Est. Property Appreciation",
    ar: "تقدير ارتفاع قيمة العقار",
    hi: "अनुमानित संपत्ति वृद्धि",
    ur: "تخمینی پراپرٹی کی قیمت میں اضافہ",
    tl: "Tinatayang Pagtaas ng Halaga ng Property",
    zh: "预估房产增值",
    ru: "Прогнозируемый рост стоимости"
  },
  "calc.projection": {
    en: "5-Year Projection",
    ar: "توقعات 5 سنوات",
    hi: "5 वर्ष का अनुमान",
    ur: "5 سال کا اندازہ",
    tl: "5-Taong Projection",
    zh: "5年预测",
    ru: "Прогноз на 5 лет"
  },
  "calc.year": {
    en: "Yr",
    ar: "سنة",
    hi: "वर्ष",
    ur: "سال",
    tl: "Taon",
    zh: "年",
    ru: "Год"
  },
  "calc.ratingOutstanding": {
    en: "Outstanding",
    ar: "ممتاز",
    hi: "उत्कृष्ट",
    ur: "شاندار",
    tl: "Outstanding",
    zh: "杰出",
    ru: "Превосходно"
  },
  "calc.ratingVeryGood": {
    en: "Very Good",
    ar: "جيد جداً",
    hi: "बहुत अच्छा",
    ur: "بہت اچھا",
    tl: "Napakabuti",
    zh: "非常好",
    ru: "Очень хорошо"
  },
  "calc.ratingGood": {
    en: "Good",
    ar: "جيد",
    hi: "अच्छा",
    ur: "اچھا",
    tl: "Mabuti",
    zh: "好",
    ru: "Хорошо"
  },
  "calc.ratingModerate": {
    en: "Moderate",
    ar: "مقبول",
    hi: "मध्यम",
    ur: "درمیانہ",
    tl: "Katamtaman",
    zh: "中等",
    ru: "Умеренно"
  },

  // Explore & Compare
  "explore.title": {
    en: "Explore & Compare",
    ar: "استكشف وقارن",
    hi: "खोजें और तुलना करें",
    ur: "تلاش اور موازنہ",
    tl: "I-explore at Ihambing",
    zh: "探索与对比",
    ru: "Исследовать и сравнивать"
  },
  "explore.desc": {
    en: "Discover Dubai's prime neighborhoods and compare investment potential side by side.",
    ar: "اكتشف الأحياء الراقية في دبي وقارن الاستثمارات المحتملة جنباً إلى جنب.",
    hi: "दुबई के प्रमुख मोहल्लों की खोज करें और निवेश क्षमता की तुलना करें।",
    ur: "دبئی کے بہترین علاقوں کو دریافت کریں اور سرمایہ کاری کی صلاحیت کا موازنہ کریں۔",
    tl: "Tuklasin ang mga pangunahing kapitbahayan ng Dubai at ihambing ang potensyal na pamumuhunan.",
    zh: "探索迪拜核心地段，并对比各区域的投资潜力。",
    ru: "Откройте для себя престижные районы Дубая и сравните инвестиционный потенциал."
  },
  "explore.dubaiMap": {
    en: "Dubai Map",
    ar: "خريطة دبي",
    hi: "दुबई मानचित्र",
    ur: "دبئی کا نقشہ",
    tl: "Mapa ng Dubai",
    zh: "迪拜地图",
    ru: "Карта Дубая"
  },
  "explore.viewAll": {
    en: "View All",
    ar: "عرض الكل",
    hi: "सभी देखें",
    ur: "سب دیکھیں",
    tl: "Tingnan Lahat",
    zh: "查看全部",
    ru: "Посмотреть все"
  },
  "explore.properties": {
    en: "properties",
    ar: "عقارات",
    hi: "संपत्तियां",
    ur: "پراپرٹیز",
    tl: "mga property",
    zh: "处房产",
    ru: "объектов"
  },
  "explore.from": {
    en: "From",
    ar: "تبدأ من",
    hi: "से",
    ur: "سے",
    tl: "Mula sa",
    zh: "起",
    ru: "От"
  },
  "explore.compareTitle": {
    en: "Compare Properties",
    ar: "قارن العقارات",
    hi: "संपत्तियों की तुलना करें",
    ur: "پراپرٹیز کا موازنہ کریں",
    tl: "Ihambing ang mga Property",
    zh: "对比房产",
    ru: "Сравнить объекты"
  },
  "explore.vs": {
    en: "VS",
    ar: "ضد",
    hi: "बनाम",
    ur: "برابر",
    tl: "VS",
    zh: "对比",
    ru: "ПРОТИВ"
  },
  "explore.propertyA": {
    en: "Property A",
    ar: "العقار أ",
    hi: "संपत्ति A",
    ur: "پراپرٹی A",
    tl: "Property A",
    zh: "房产 A",
    ru: "Объект A"
  },
  "explore.propertyB": {
    en: "Property B",
    ar: "العقار ب",
    hi: "संपत्ति B",
    ur: "پراپرٹی B",
    tl: "Property B",
    zh: "房产 B",
    ru: "Объект B"
  },
  "explore.price": {
    en: "Price",
    ar: "السعر",
    hi: "कीमत",
    ur: "قیمت",
    tl: "Presyo",
    zh: "价格",
    ru: "Цена"
  },
  "explore.yield": {
    en: "Yield",
    ar: "العائد",
    hi: "उपज",
    ur: "پیداوار",
    tl: "Yield",
    zh: "回报率",
    ru: "Доходность"
  },
  "explore.size": {
    en: "Size",
    ar: "المساحة",
    hi: "आकार",
    ur: "سائز",
    tl: "Laki",
    zh: "面积",
    ru: "Площадь"
  },
  "explore.config": {
    en: "Config",
    ar: "التكوين",
    hi: "कॉन्फ़िग",
    ur: "کنفیگریشن",
    tl: "Config",
    zh: "户型",
    ru: "Планировка"
  },
  "explore.status": {
    en: "Status",
    ar: "الحالة",
    hi: "स्थिति",
    ur: "حالت",
    tl: "Status",
    zh: "状态",
    ru: "Статус"
  },
  "explore.sqft": {
    en: "sqft",
    ar: "قدم مربع",
    hi: "वर्ग फुट",
    ur: "مربع فٹ",
    tl: "sqft",
    zh: "平方英尺",
    ru: "кв.фут"
  },
  "explore.higherYield": {
    en: "higher yield",
    ar: "عائد أعلى",
    hi: "अधिक उपज",
    ur: "زیادہ پیداوار",
    tl: "mas mataas na yield",
    zh: "更高回报",
    ru: "более высокая доходность"
  },
  "explore.than": {
    en: "than",
    ar: "مقارنة بـ",
    hi: "से",
    ur: "کے مقابلے",
    tl: "kaysa sa",
    zh: "高于",
    ru: "по сравнению с"
  },

  // Investment Score
  "score.title": {
    en: "Investment Score",
    ar: "درجة الاستثمار",
    hi: "निवेश स्कोर",
    ur: "سرمایہ کاری کا اسکور",
    tl: "Iskor ng Pamumuhunan",
    zh: "投资评分",
    ru: "Инвестиционная оценка"
  },
  "score.desc": {
    en: "Real-time analysis of rental yields, capital appreciation, and risk factors across Dubai's real estate market.",
    ar: "تحليل فوري لعوائد الإيجار وارتفاع رأس المخاطر في سوق العقارات في دبي.",
    hi: "दुबई के रियल एस्टेट बाजार में किराये की उपज, पूंजी वृद्धि और जोखिम कारकों का वास्तविक समय विश्लेषण।",
    ur: "دبئی کے ریئل اسٹیٹ مارکیٹ میں رینٹل پیداوار، کیپٹل اپریشیشن اور خطرے کے عوامل کا ریئل ٹائم تجزیہ۔",
    tl: "Real-time analysis ng rental yields, capital appreciation, at risk factors sa real estate market ng Dubai.",
    zh: "实时分析迪拜房地产市场的租金收益、资本增值与风险因素。",
    ru: "Анализ доходности аренды, прироста капитала и рисков на рынке недвижимости Дубая в реальном времени."
  },
  "score.analyzing": {
    en: "Analyzing:",
    ar: "تحليل:",
    hi: "विश्लेषण:",
    ur: "تجزیہ:",
    tl: "Sinusuri:",
    zh: "分析中:",
    ru: "Анализ:"
  },
  "score.investmentScore": {
    en: "Investment Score",
    ar: "درجة الاستثمار",
    hi: "निवेश स्कोर",
    ur: "سرمایہ کاری کا اسکور",
    tl: "Investment Score",
    zh: "投资评分",
    ru: "Инвестиционная оценка"
  },
  "score.excellent": {
    en: "Excellent",
    ar: "ممتاز",
    hi: "उत्कृष्ट",
    ur: "شاندار",
    tl: "Outstanding",
    zh: "优秀",
    ru: "Отлично"
  },
  "score.good": {
    en: "Good",
    ar: "جيد",
    hi: "अच्छा",
    ur: "اچھا",
    tl: "Mabuti",
    zh: "良好",
    ru: "Хорошо"
  },
  "score.average": {
    en: "Average",
    ar: "متوسط",
    hi: "औसत",
    ur: "اوسط",
    tl: "Katamtaman",
    zh: "中等",
    ru: "Умеренно"
  },
  "score.investment": {
    en: "Investment",
    ar: "الاستثمار",
    hi: "निवेश",
    ur: "سرمایہ کاری",
    tl: "Pamumuhunan",
    zh: "投资",
    ru: "Инвестиции"
  },
  "score.rentalYield": {
    en: "Rental Yield",
    ar: "عائد الإيجار",
    hi: "किराये की उपज",
    ur: "رینٹل پیداوار",
    tl: "Yield sa Renta",
    zh: "租金收益率",
    ru: "Доходность аренды"
  },
  "score.appreciation": {
    en: "Appreciation",
    ar: "الارتفاع",
    hi: "वृद्धि",
    ur: "اپریشیشن",
    tl: "Pagtaas ng Halaga",
    zh: "增值",
    ru: "Прирост стоимости"
  },
  "score.capitalGrowth": {
    en: "Capital Growth",
    ar: "نمو رأس المال",
    hi: "पूंजी वृद्धि",
    ur: "کیپٹل گروتھ",
    tl: "Paglaki ng Kapital",
    zh: "资本增值",
    ru: "Рост капитала"
  },
  "score.riskLevel": {
    en: "Risk Level",
    ar: "مستوى المخاطرة",
    hi: "जोखिम स्तर",
    ur: "خطرے کی سطح",
    tl: "Antas ng Panganib",
    zh: "风险等级",
    ru: "Уровень риска"
  },
  "score.high": {
    en: "High",
    ar: "مرتفع",
    hi: "उच्च",
    ur: "زیادہ",
    tl: "Mataas",
    zh: "高",
    ru: "Высокий"
  },
  "score.veryHigh": {
    en: "Very High",
    ar: "مرتفع جداً",
    hi: "बहुत उच्च",
    ur: "بہت زیادہ",
    tl: "Napakataas",
    zh: "很高",
    ru: "Очень высокий"
  },
  "score.verySafe": {
    en: "Very Safe",
    ar: "آمن جداً",
    hi: "बहुत सुरक्षित",
    ur: "بہت محفوظ",
    tl: "Napakaligtas",
    zh: "非常安全",
    ru: "Очень безопасно"
  },
  "score.reraMonitored": {
    en: "RERA Monitored",
    ar: "مراقبة من RERA",
    hi: "RERA द्वारा निगरानी",
    ur: "RERA نگرانی",
    tl: "Sinusubaybayan ng RERA",
    zh: "RERA 监管",
    ru: "Под контролем RERA"
  },
  "score.escrowProtection": {
    en: "Government Escrow Protection",
    ar: "حماية الضمان الحكومي",
    hi: "सरकारी एस्क्रो सुरक्षा",
    ur: "حکومتی ایسکرو حفاظت",
    tl: "Proteksyon ng Government Escrow",
    zh: "政府托管保护",
    ru: "Государственная эскроу-защита"
  },
  "score.scoresUpdated": {
    en: "Scores updated in real-time using market analysis",
    ar: "تتحدث الدرجات في الوقت الفعلي باستخدام تحليل السوق",
    hi: "बाजार विश्लेषण का उपयोग करके स्कोर वास्तविक समय में अपडेट होते हैं",
    ur: "مارکیٹ تجزیے کا استعمال کرتے ہوئے اسکور ریئل ٹائم میں اپ ڈیٹ ہوتے ہیں",
    tl: "Na-update ang mga iskor sa real-time gamit ang market analysis",
    zh: "评分通过市场分析实时更新",
    ru: "Оценки обновляются в реальном времени на основе анализа рынка"
  },
  "score.howItWorks": {
    en: "How it Works",
    ar: "كيف يعمل",
    hi: "यह कैसे काम करता है",
    ur: "یہ کیسے کام کرتا ہے",
    tl: "Paano Gumagana",
    zh: "运作原理",
    ru: "Как это работает"
  },

  // Hero Stats
  "hero.statProperties": {
    en: "Properties Sold",
    ar: "عقارات تم بيعها",
    hi: "बेची गई संपत्तियां",
    ur: "فروخت شدہ پراپرٹیز",
    tl: "Mga Naibentang Property",
    zh: "已售房产",
    ru: "Проданных объектов"
  },
  "hero.statInvestors": {
    en: "Happy Investors",
    ar: "مستثمرون سعداء",
    hi: "खुश निवेशक",
    ur: "خوش سرمایہ کار",
    tl: "Masayang Mamumuhunan",
    zh: "满意投资者",
    ru: "Довольных инвесторов"
  },
  "hero.statCountries": {
    en: "Countries Served",
    ar: "الدول المخدومة",
    hi: "देशों में सेवा",
    ur: "خدمت یافتہ ممالک",
    tl: "Mga Bansang Pinagsilbihan",
    zh: "服务国家",
    ru: "Стран обслуживания"
  },
  "hero.statRoi": {
    en: "ROI Achieved",
    ar: "العائد المحقق",
    hi: "प्राप्त ROI",
    ur: "حاصل کردہ ROI",
    tl: "Nakamit na ROI",
    zh: "已实现回报率",
    ru: "Достигнутая доходность"
  },
  "hero.scrollExplore": {
    en: "Scroll to Explore",
    ar: "مرر للاستكشاف",
    hi: "खोजने के लिए स्क्रॉल करें",
    ur: "تلاش کے لیے سکرول کریں",
    tl: "Mag-scroll para Mag-explore",
    zh: "向下滚动探索",
    ru: "Прокрутите для просмотра"
  },
  "hero.popularSearches": {
    en: "Popular Searches",
    ar: "البحث الشائع",
    hi: "लोकप्रिय खोजें",
    ur: "مقبول تلاشیں",
    tl: "Mga Sikat na Search",
    zh: "热门搜索",
    ru: "Популярные запросы"
  },

  // Footer Extra
  "footer.freeConsultation": {
    en: "Free Consultation",
    ar: "استشارة مجانية",
    hi: "मुफ्त परामर्श",
    ur: "مفت مشاورت",
    tl: "Libreng Konsultasyon",
    zh: "免费咨询",
    ru: "Бесплатная консультация"
  },
  "footer.startJourney": {
    en: "Start Your Investment Journey",
    ar: "ابدأ رحلة الاستثمار",
    hi: "अपनी निवेश यात्रा शुरू करें",
    ur: "اپنی سرمایہ کاری کا سفر شروع کریں",
    tl: "Simulan ang Iyong Paglalakbay sa Pamumuhunan",
    zh: "开启您的投资之旅",
    ru: "Начните свой инвестиционный путь"
  }
};

export function t(key: string, lang: string): string {
  const code = (lang || "en") as LangCode;
  const entry = translations[key];
  if (!entry) return key;
  return entry[code] || entry["en"] || key;
}
