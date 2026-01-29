import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Clock, Smartphone, Instagram, 
  Car, Truck, Bike, MapPin, FileText
} from 'lucide-react';

// --- ДАННЫЕ ВАШЕГО ПАРКА ---
const PHONE_DISPLAY = "+7 776 102 5965";
const PHONE_CLEAN = "77761025965";
const WHATSAPP_LINK = "https://wa.me/+77761025965"; // Новая ссылка на WhatsApp
const PARK_NAME = "Биік Шың!";
const ADDRESS_RU = "Республика Казахстан, г. Астана, ул. Жанибека Тархана, 9";
const ADDRESS_KZ = "Қазақстан Республикасы, Астана қ., Жәнібек Тархан көшесі, 9";
const REGISTRATION_LINK = "https://forms.fleet.yandex.kz/forms?specification=taxi&ref_id=b14945c65dc449f286207cdfb1650fc6";
const API_URL = "http://localhost:3001/api/baiga-leaderboard"; 
const LOGO_URL = "5462928930428882216.jpg"; 

// --- ПЕРЕВОДЫ (ТЕКСТЫ) ---
const TRANSLATIONS = {
  ru: {
    nav: {
      work: "Работа",
      kaspi: "Kaspi QR",
      baiga: "Байга",
      about: "О Нас",
      driver: "Водителем",
      courier: "Курьером",
      cargo: "Водителем грузового авто",
      conditions: "Условия Таксопарка",
      contacts: "Контакты",
      work_desc_driver: "Безопасные поездки и стабильный доход",
      work_desc_courier: "Доставка заказов на гибких условиях",
      work_desc_cargo: "Перевозка грузов с выгодой",
      apply: "Подать заявку",
      call: "Позвонить"
    },
    hero: {
      call: "Позвонить",
      become_driver: "Стать Водителем",
      title: "Станьте водителем Яндекс такси по Казахстану"
    },
    benefits: {
      fast_connect: "Быстрое подключение",
      fast_connect_desc: "Подключим Вас к Яндекс такси с лучшими условиями по всему Казахстану за кратчайшие сроки!",
      app: "Удобное приложение",
      app_desc: "Даже если у Вас нет опыта работы вы быстро научитесь, благодаря удобному интерфейсу.",
      support: "Круглосуточная поддержка",
      support_desc: "Если у Вас возникнут вопросы по работе, Вы в любое время можете написать в тех. поддержку."
    },
    faq: {
      title: "Частые вопросы",
      q1: "Как зарегистрироваться в Яндекс такси по Казахстану на своем автомобиле?",
      a1: `Для регистрации отправьте фотографии лицевых сторон водительского удостоверения и техпаспорта через WhatsApp на номер телефона: ${PHONE_DISPLAY}`,
      q2: "Какой таксопарк выбрать в Яндекс такси Казахстан?",
      a2: `При выборе таксопарка нужно учитывать рентабельность комиссии и своевременное подключение техподдержки в сложных ситуациях. Мы рекомендуем таксопарк "${PARK_NAME}".`
    },
    kaspi: {
      title: "Kaspi QR",
      generate: "СГЕНЕРИРОВАТЬ QR",
      desc: "Сгенерируйте QR код для пополнения счёта пассажиром",
      placeholder: "+7 (702) 888-4911"
    },
    baiga: {
      title: "Байга",
      subtitle: "Участники проекта «Шаңырақ» получают призы в 2 раза больше.",
      list_title: "Список лидеров",
      tab_almaty: "Алматы и Астана",
      tab_regions: "Регионы",
      th_place: "Место",
      th_driver: "Водитель",
      th_amount: "Сумма заказов (₸)",
      th_city: "Город",
      footer_update: "Данные по состоянию на",
      footer_rule: "Призы в акции «Бәйге» получают водители, выполнившие заказы на сумму не менее 150 000 тенге."
    },
    rules: {
      title: `Условия таксопарка ${PARK_NAME}`,
      intro: `Таксопарк ${PARK_NAME} предлагает самые выгодные условия для своих водителей.`,
      r1: "1. Круглосуточная техподдержка 24/7. Мы работаем без выходных. Ответим на ваши вопросы даже в выходные и праздничные дни.",
      r2: "2. У нас самая низкая комиссия. Для наших водителей мы установили низкую комиссию - 1%.",
      r3: "3. Моментальная выплата. Вам не придётся писать и ждать свой заработок. Напрямую через приложение Яндекс.Про, без скачивания сторонних программ, можете моментально вывести свои деньги.",
      r4: "4. Для своих водителей мы предлагаем самую низкую цену на страхование и техосмотр.",
      r5: "5. Индивидуальные условия для лучших водителей.",
      outro: "Приходите регистрацию и начните зарабатывать с лучшим таксопарком в регионе."
    },
    contacts: {
      title: "Контакты",
      address_label: "Адрес",
      phone_label: "Телефон",
      address_value: ADDRESS_RU
    },
    footer: {
      support: "Поддержка",
      legal: "Юридическое",
      phone: "телефон",
      whatsapp: "WhatsApp",
      policy: "Политика Конфиденциальности",
      terms: "Условия",
      copyright: `Партнер Яндекс GO таксопарк ${PARK_NAME}.`
    }
  },
  kz: {
    nav: {
      work: "Жұмыс",
      kaspi: "Kaspi QR",
      baiga: "Бәйге",
      about: "Біз туралы",
      driver: "Жүргізуші",
      courier: "Курьер",
      cargo: "Жүк көлігі жүргізушісі",
      conditions: "Таксопарк шарттары",
      contacts: "Байланыс",
      work_desc_driver: "Қауіпсіз сапарлар және тұрақты табыс",
      work_desc_courier: "Икемді шарттармен тапсырыс жеткізу",
      work_desc_cargo: "Жүктерді тиімді тасымалдау",
      apply: "Өтініш қалдыру",
      call: "Қоңырау шалу"
    },
    hero: {
      call: "Қоңырау шалу",
      become_driver: "Жүргізуші болу",
      title: "Қазақстан бойынша Яндекс такси жүргізушісі болыңыз"
    },
    benefits: {
      fast_connect: "Тез қосылу",
      fast_connect_desc: "Сізді Қазақстан бойынша ең жақсы шарттармен Яндекс таксиге қысқа мерзімде қосамыз!",
      app: "Ыңғайлы қосымша",
      app_desc: "Тәжірибесі жоқ болса да, ыңғайлы интерфейс арқылы тез үйреніп кетесіз.",
      support: "Тәуліктік қолдау",
      support_desc: "Жұмыс барысында сұрақтарыңыз болса, кез келген уақытта техникалық қолдауға жаза аласыз."
    },
    faq: {
      title: "Жиі қойылатын сұрақтар",
      q1: "Өз автокөлігіммен Қазақстан бойынша Яндекс таксиге қалай тіркелуге болады?",
      a1: `Тіркелу үшін жүргізуші куәлігі мен техпаспорттың беттерін WhatsApp арқылы мына нөмірге жіберіңіз: ${PHONE_DISPLAY}`,
      q2: "Қазақстанда қандай таксопарк таңдау керек?",
      a2: `Таксопарк таңдағанда комиссия мен техникалық қолдаудың сапасына назар аудару керек. Біз "${PARK_NAME}" таксопаркін ұсынамыз.`
    },
    kaspi: {
      title: "Kaspi QR",
      generate: "QR ГЕНЕРАЦИЯЛАУ",
      desc: "Жолаушы шотыңызды толтыру үшін QR кодты генерациялаңыз",
      placeholder: "+7 (702) 888-4911"
    },
    baiga: {
      title: "Бәйге",
      subtitle: "«Шаңырақ» жобасының қатысушылары сыйлықтарды 2 есе көп алады.",
      list_title: "Көшбасшылар тізімі",
      tab_almaty: "Алматы және Астана",
      tab_regions: "Аймақтар",
      th_place: "Орын",
      th_driver: "Жүргізуші",
      th_amount: "Тапсырыс сомасы (₸)",
      th_city: "Қала",
      footer_update: "Мәлімет жаңартылды:",
      footer_rule: "«Бәйге» акциясында 150 000 теңгеден кем емес сомаға тапсырыс орындаған жүргізушілер сыйлық алады."
    },
    rules: {
      title: `${PARK_NAME} таксопарк шарттары`,
      intro: `${PARK_NAME} таксопаркі жүргізушілер үшін ең тиімді шарттарды ұсынады.`,
      r1: "1. Тәуліктік техникалық қолдау 24/7. Біз демалыссыз жұмыс істейміз. Сұрақтарыңызға демалыс және мереке күндері де жауап береміз.",
      r2: "2. Бізде ең төмен комиссия. Жүргізушілер үшін 1% комиссия бекіттік.",
      r3: "3. Жедел төлем. Табысыңызды күтпей-ақ аласыз. Яндекс.Про қосымшасы арқылы ақшаңызды бірден шығарып ала аласыз.",
      r4: "4. Жүргізушілер үшін сақтандыру мен техникалық тексерістен өту ең төмен бағамен.",
      r5: "5. Үздік жүргізушілерге жеке шарттар.",
      outro: "Тіркеліп, аймақтағы үздік таксопаркпен табыс табуды бастаңыз."
    },
    contacts: {
      title: "Байланыс",
      address_label: "Мекенжай",
      phone_label: "Телефон",
      address_value: ADDRESS_KZ
    },
    footer: {
      support: "Қолдау",
      legal: "Заңдық",
      phone: "телефон",
      whatsapp: "WhatsApp",
      policy: "Құпиялылық саясаты",
      terms: "Ережелер",
      copyright: `Яндекс GO серіктес таксопаркі ${PARK_NAME}.`
    }
  }
};

// --- ИКОНКИ (SVG) ---
// Добавил width/height прямо в тег, чтобы они не растягивались без CSS
const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// --- ДАННЫЕ ЛИДЕРБОРДА (ЗАГЛУШКА) ---
const MOCK_DRIVERS = [
  { id: 1, fullName: "Ермаганбетов Адиль Кайратович", amount: 682230, city: "Астана" },
  { id: 2, fullName: "Ахат Темірғали Тимурбулатұлы", amount: 652590, city: "Астана" },
  { id: 3, fullName: "Кайсар Нурсултан Бакытжанулы", amount: 631530, city: "Астана" },
  { id: 4, fullName: "Бақытжанұлы Абылайхан", amount: 604720, city: "Астана" },
  { id: 5, fullName: "Ахметов Жадигер Кемелбекович", amount: 457770, city: "Астана" },
  { id: 6, fullName: "Құдайберген Айбек Нұрқанатұлы", amount: 441590, city: "Алматы" },
];

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200/50 last:border-0">
      <button 
        className="w-full py-6 flex justify-between items-start text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg md:text-xl text-[#1d1d1d] pr-8 group-hover:text-yellow-600 transition-colors">
          {question}
        </span>
        <span className="text-2xl font-light leading-none text-gray-400">
          {isOpen ? '—' : '+'}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed text-base">{answer}</p>
      </div>
    </div>
  );
};

// ================== СТРАНИЦЫ ==================

// 1. ГЛАВНАЯ
const HomePage = ({ t }) => (
  <div className="w-full bg-[#FFD600] min-h-screen flex flex-col">
    {/* HERO CONTAINER */}
    <div className="flex-grow flex flex-col container mx-auto px-4 md:px-8 relative">
      
      {/* КНОПКИ (Слева сверху) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-12 z-20 self-start">
        <a 
          href={`tel:${PHONE_CLEAN}`} 
          className="bg-[#2C2C2C] hover:bg-black text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition text-center min-w-[160px]"
        >
          {t.hero.call}
        </a>
        <a 
          href={WHATSAPP_LINK} 
          target="_blank" 
          rel="noreferrer" 
          className="bg-[#00D756] hover:bg-[#00c04b] text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition flex items-center justify-center gap-2 min-w-[220px]"
        >
          {t.hero.become_driver} <WhatsappIcon />
        </a>
      </div>

      {/* МАШИНА (Центр) */}
      <div className="flex-grow flex items-center justify-center relative my-8">
         <div className="relative w-full max-w-5xl">
            <img 
              src="https://taxipark.kz/wp-content/uploads/2021/04/optim_yandex_taxi_car.png" 
              alt="Yandex Taxi Yellow Car" 
              className="w-full h-auto object-contain drop-shadow-2xl" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
         </div>
      </div>

      {/* ЗАГОЛОВОК (Низ) */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-12 lg:mb-16 text-[#1d1d1d]">
        {t.hero.title}
      </h1>
    </div>

    {/* ПРЕИМУЩЕСТВА (Белый фон) */}
    <div className="bg-white py-24 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-left">
          {/* Card 1 */}
          <div className="group">
             <div className="mb-6">
                <div className="w-20 h-20 border-2 border-[#FFD600] rounded-2xl flex items-center justify-center relative group-hover:bg-[#FFD600] transition duration-300">
                   <div className="absolute inset-0 border-2 border-[#FFD600] rounded-2xl rotate-6 group-hover:rotate-12 transition duration-300"></div>
                   <div className="bg-white z-10 w-full h-full rounded-2xl flex items-center justify-center border-2 border-[#FFD600]">
                      <span className="font-black text-2xl text-[#FFD600]">24</span>
                   </div>
                </div>
             </div>
             <h3 className="text-2xl font-bold mb-4 text-[#1d1d1d]">{t.benefits.fast_connect}</h3>
             <p className="text-gray-600 text-lg leading-relaxed">{t.benefits.fast_connect_desc}</p>
          </div>

          {/* Card 2 */}
          <div className="group">
             <div className="mb-6">
                <div className="w-20 h-20 border-2 border-[#FFD600] rounded-2xl flex items-center justify-center relative group-hover:bg-[#FFD600] transition duration-300">
                   <div className="absolute inset-0 border-2 border-[#FFD600] rounded-2xl rotate-6 group-hover:rotate-12 transition duration-300"></div>
                   <div className="bg-white z-10 w-full h-full rounded-2xl flex items-center justify-center border-2 border-[#FFD600]">
                      <Smartphone size={36} className="text-[#FFD600]" strokeWidth={2} />
                   </div>
                </div>
             </div>
             <h3 className="text-2xl font-bold mb-4 text-[#1d1d1d]">{t.benefits.app}</h3>
             <p className="text-gray-600 text-lg leading-relaxed">{t.benefits.app_desc}</p>
          </div>

          {/* Card 3 */}
          <div className="group">
             <div className="mb-6">
                <div className="w-20 h-20 border-2 border-[#FFD600] rounded-full flex items-center justify-center relative group-hover:bg-[#FFD600] transition duration-300">
                   <div className="absolute inset-0 border-2 border-[#FFD600] rounded-full scale-110 group-hover:scale-125 transition duration-300 opacity-50"></div>
                   <div className="bg-white z-10 w-full h-full rounded-full flex items-center justify-center border-2 border-[#FFD600]">
                      <Clock size={36} className="text-[#FFD600]" strokeWidth={2} />
                   </div>
                </div>
             </div>
             <h3 className="text-2xl font-bold mb-4 text-[#1d1d1d]">{t.benefits.support}</h3>
             <p className="text-gray-600 text-lg leading-relaxed">{t.benefits.support_desc}</p>
          </div>
        </div>
      </div>
    </div>

    {/* FAQ (Белый фон) */}
    <div className="bg-white pb-24 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-10 text-[#1d1d1d]">{t.faq.title}</h2>
        <div className="border-t border-gray-200/70">
          <FaqItem question={t.faq.q1} answer={t.faq.a1} />
          <FaqItem question={t.faq.q2} answer={t.faq.a2} />
        </div>
      </div>
    </div>
  </div>
);

// 2. KASPI QR
const KaspiQrPage = ({ t }) => (
  <div className="flex-grow bg-white py-20 min-h-[60vh] flex flex-col items-start justify-center animate-fade-in w-full">
    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-10 text-[#1d1d1d]">{t.kaspi.title}</h1>
      <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">
        <input type="text" placeholder={t.kaspi.placeholder} className="bg-[#EFF2F7] border-none rounded-md px-6 py-4 text-lg w-full md:w-2/3 outline-none focus:ring-2 focus:ring-[#FFD600] text-gray-700" />
        <button className="bg-[#FFD600] hover:bg-[#e6c200] text-[#1d1d1d] font-bold px-8 py-4 rounded-md uppercase tracking-wide transition shadow-sm w-full md:w-1/3">{t.kaspi.generate}</button>
      </div>
      <p className="text-gray-500 mt-8 text-lg">{t.kaspi.desc}</p>
    </div>
  </div>
);

// 3. БАЙГА
const BaigaPage = ({ t }) => {
  const [activeTab, setActiveTab] = useState('almaty');
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Server not responding");
        const data = await response.json();
        setDrivers(data.almaty_astana || []);
      } catch (err) {
        setDrivers(MOCK_DRIVERS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-grow bg-white py-12 animate-fade-in w-full">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#1d1d1d]">{t.baiga.title}</h1>
          <p className="text-gray-600 text-sm md:text-base max-w-md text-right md:text-right">{t.baiga.subtitle}</p>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl text-gray-600">{t.baiga.list_title}</h2>
          {isLoading && <span className="text-sm text-yellow-600 font-bold animate-pulse">Загрузка данных...</span>}
        </div>
        
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('almaty')} className={`px-6 py-3 font-bold text-sm uppercase tracking-wide rounded transition ${activeTab === 'almaty' ? 'bg-[#FFD600] text-[#1d1d1d]' : 'bg-[#FFD600] text-[#1d1d1d] opacity-50 hover:opacity-100'}`}>{t.baiga.tab_almaty}</button>
          <button onClick={() => setActiveTab('regions')} className={`px-6 py-3 font-bold text-sm uppercase tracking-wide rounded transition ${activeTab === 'regions' ? 'bg-[#FFD600] text-[#1d1d1d]' : 'bg-[#FFD600] text-[#1d1d1d] opacity-50 hover:opacity-100'}`}>{t.baiga.tab_regions}</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="py-4 font-bold text-[#1d1d1d] w-20">{t.baiga.th_place}</th>
                <th className="py-4 font-bold text-[#1d1d1d]">{t.baiga.th_driver}</th>
                <th className="py-4 font-bold text-[#1d1d1d]">{t.baiga.th_amount}</th>
                <th className="py-4 font-bold text-[#1d1d1d] text-right pr-4">{t.baiga.th_city}</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={driver.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="py-5 font-medium text-[#1d1d1d]">{index + 1}</td>
                  <td className="py-5 text-gray-600">{driver.fullName}</td>
                  <td className="py-5 text-gray-600">{driver.amount.toLocaleString()}</td>
                  <td className="py-5 text-gray-400 text-right pr-4">{driver.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12 space-y-4 text-gray-800 text-sm md:text-base">
           <p>{t.baiga.footer_update} {new Date().toISOString().split('T')[0]} 04:15</p>
           <p className="max-w-4xl">{t.baiga.footer_rule}</p>
        </div>
      </div>
    </div>
  );
};

// 4. СТРАНИЦА: УСЛОВИЯ
const RulesPage = ({ t }) => (
  <div className="w-full bg-[#FFD600] min-h-[85vh] flex items-center relative overflow-hidden animate-fade-in">
    <div className="container mx-auto px-4 md:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      
      <div className="text-[#1d1d1d]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{t.rules.title}</h1>
        <p className="text-lg md:text-xl mb-10 opacity-90">{t.rules.intro}</p>
        <div className="space-y-6 text-base md:text-lg font-medium leading-snug">
          <p>{t.rules.r1}</p>
          <p>{t.rules.r2}</p>
          <p>{t.rules.r3}</p>
          <p>{t.rules.r4}</p>
          <p>{t.rules.r5}</p>
        </div>
        <p className="mt-10 text-lg opacity-80">{t.rules.outro}</p>
      </div>

      <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
         <div className="absolute top-[20%] right-[-20px] md:right-[50px] bg-[#E53935] text-white p-4 md:p-6 rounded-2xl shadow-xl z-20 transform rotate-2 max-w-[280px] text-center">
            <h3 className="font-black text-xl md:text-2xl uppercase leading-none mb-1">РАБОТАЙТЕ В<br/>САМОМ</h3>
            <h3 className="font-black text-2xl md:text-3xl uppercase leading-none text-yellow-300">ВЫГОДНОМ</h3>
            <h3 className="font-black text-xl md:text-2xl uppercase leading-none">ТАКСОПАРКЕ</h3>
         </div>
         <img 
           src="https://img.freepik.com/free-photo/portrait-young-beautiful-woman-gesturing_23-2148145521.jpg?t=st=1738155000~exp=1738158600~hmac=e58e390c50550300d86e0c058763566115844855a80587680005080005" 
           alt="Happy Driver" 
           className="w-full max-w-[500px] object-cover rounded-3xl shadow-2xl z-10 border-4 border-white/20"
           style={{clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)"}}
         />
      </div>
    </div>
  </div>
);

// 5. СТРАНИЦА: КОНТАКТЫ
const ContactsPage = ({ t }) => (
  <div className="w-full bg-white flex-grow animate-fade-in">
    <div className="container mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-[#1d1d1d]">{t.contacts.title}</h1>
      {/* Сетка изменена на grid-cols-2 для двух элементов (Адрес и Телефон) */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="pl-6 border-l-[4px] border-[#FFD600]">
              <h4 className="font-bold text-xl mb-3 text-[#1d1d1d]">{t.contacts.address_label}</h4>
              <p className="text-gray-600 leading-relaxed text-base">{t.contacts.address_value}</p>
            </div>
            <div className="pl-6 border-l-[4px] border-[#FFD600]">
              <h4 className="font-bold text-xl mb-3 text-[#1d1d1d]">{t.contacts.phone_label}</h4>
              <p className="text-gray-600 text-base font-medium">{PHONE_DISPLAY}</p>
            </div>
            {/* Instagram и TikTok удалены */}
      </div>
    </div>
  </div>
);


// ================== MAIN APP ==================
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('ru'); // 'ru' or 'kz'

  const t = TRANSLATIONS[language]; // Текущие переводы

  // === АВТОМАТИЧЕСКАЯ ПОДГРУЗКА СТИЛЕЙ (ЕСЛИ ИХ НЕТ) ===
  useEffect(() => {
    const checkAndLoadTailwind = () => {
      const existingScript = document.querySelector('script[src*="tailwindcss"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        script.async = true;
        document.head.appendChild(script);
      }
    };
    checkAndLoadTailwind();
  }, []);

  return (
    <div className="font-sans antialiased text-[#1d1d1d] bg-white min-h-screen flex flex-col">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
      
      {/* HEADER */}
      <div className="bg-[#FFD600]">
        <header className="w-full py-4 lg:py-6 z-50">
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setCurrentView('home')}>
                {/* ЛОГОТИП */}
                <img 
                  src={LOGO_URL} 
                  alt="Logo" 
                  className="w-16 h-16 rounded-full border-2 border-yellow-200 object-cover shadow-md"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="w-14 h-14 bg-black rounded-full border-2 border-[#444] shadow-lg hidden items-center justify-center">
                   <span className="text-[#FFD600] font-bold text-xl italic">Б</span>
                </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 xl:gap-12 font-semibold text-[15px] text-[#1d1d1d]">
              {/* Dropdown "Работа" */}
              <div className="relative group" onMouseEnter={() => setIsWorkDropdownOpen(true)} onMouseLeave={() => setIsWorkDropdownOpen(false)}>
                <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition py-2">
                  {t.nav.work} <ChevronDown size={14} />
                </div>
                {isWorkDropdownOpen && (
                  <div className="absolute top-full left-[-50px] w-[380px] bg-white shadow-2xl rounded-2xl p-2 z-50 animate-fade-in mt-2 border border-gray-100">
                    <div className="flex flex-col p-2">
                      <a href={REGISTRATION_LINK} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition group/item">
                         <div className="text-gray-400 group-hover/item:text-[#FFD600] mt-1"><Car size={20} /></div>
                         <div><div className="font-bold text-base text-gray-900">{t.nav.driver}</div><div className="text-xs text-gray-500 mt-1">{t.nav.work_desc_driver}</div></div>
                      </a>
                      <a href={REGISTRATION_LINK} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition group/item">
                         <div className="text-gray-400 group-hover/item:text-[#FFD600] mt-1"><Bike size={20} /></div>
                         <div><div className="font-bold text-base text-gray-900">{t.nav.courier}</div><div className="text-xs text-gray-500 mt-1">{t.nav.work_desc_courier}</div></div>
                      </a>
                      <a href={REGISTRATION_LINK} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition group/item">
                         <div className="text-gray-400 group-hover/item:text-[#FFD600] mt-1"><Truck size={20} /></div>
                         <div><div className="font-bold text-base text-gray-900">{t.nav.cargo}</div><div className="text-xs text-gray-500 mt-1">{t.nav.work_desc_cargo}</div></div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setCurrentView('kaspi')} className={`hover:opacity-70 transition ${currentView === 'kaspi' ? 'opacity-70' : ''}`}>{t.nav.kaspi}</button>
              <button onClick={() => setCurrentView('baiga')} className={`hover:opacity-70 transition ${currentView === 'baiga' ? 'opacity-70' : ''}`}>{t.nav.baiga}</button>
              
              {/* Dropdown "О Нас" */}
              <div className="relative group" onMouseEnter={() => setIsAboutDropdownOpen(true)} onMouseLeave={() => setIsAboutDropdownOpen(false)}>
                <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition py-2">
                   {t.nav.about} <ChevronDown size={14} />
                </div>
                {isAboutDropdownOpen && (
                  <div className="absolute top-full left-[-20px] w-[240px] bg-white shadow-2xl rounded-2xl p-2 z-50 animate-fade-in mt-2 border border-gray-100">
                    <div className="flex flex-col">
                       <button onClick={() => { setCurrentView('rules'); setIsAboutDropdownOpen(false); }} className="text-left flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition font-medium">
                          <FileText size={18} className="text-[#FFD600]" /> {t.nav.conditions}
                       </button>
                       <button onClick={() => { setCurrentView('contacts'); setIsAboutDropdownOpen(false); }} className="text-left flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition font-medium">
                          <MapPin size={18} className="text-[#FFD600]" /> {t.nav.contacts}
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <a href={`tel:${PHONE_CLEAN}`} className="flex items-center gap-2 font-bold text-lg hover:opacity-70 transition"><WhatsappIcon /> {PHONE_DISPLAY}</a>
              
              {/* ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ */}
              <div className="relative group">
                  <button className="font-bold cursor-pointer flex items-center gap-1 uppercase">
                      {language === 'ru' ? 'РУС' : 'ҚАЗ'} <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full right-0 w-24 bg-white shadow-lg rounded-lg p-2 hidden group-hover:block border border-gray-100 z-50">
                      <button onClick={() => setLanguage('ru')} className={`block w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm font-bold ${language === 'ru' ? 'text-[#FFD600]' : ''}`}>РУС</button>
                      <button onClick={() => setLanguage('kz')} className={`block w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm font-bold ${language === 'kz' ? 'text-[#FFD600]' : ''}`}>ҚАЗ</button>
                  </div>
              </div>
            </div>

            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-[#FFD600] shadow-2xl p-6 z-50 border-t border-black/5">
              <nav className="flex flex-col gap-6 text-xl font-bold">
                <div onClick={() => setIsMenuOpen(false)}>{t.nav.work}</div>
                <button className="text-left" onClick={() => { setCurrentView('kaspi'); setIsMenuOpen(false); }}>{t.nav.kaspi}</button>
                <button className="text-left" onClick={() => { setCurrentView('baiga'); setIsMenuOpen(false); }}>{t.nav.baiga}</button>
                <button className="text-left" onClick={() => { setCurrentView('rules'); setIsMenuOpen(false); }}>{t.nav.conditions}</button>
                <button className="text-left" onClick={() => { setCurrentView('contacts'); setIsMenuOpen(false); }}>{t.nav.contacts}</button>
                <div className="flex gap-4 mt-2">
                    <button onClick={() => setLanguage('ru')} className={`font-bold ${language === 'ru' ? 'text-white' : ''}`}>РУС</button>
                    <button onClick={() => setLanguage('kz')} className={`font-bold ${language === 'kz' ? 'text-white' : ''}`}>ҚАЗ</button>
                </div>
                <a href={`tel:${PHONE_CLEAN}`} className="flex items-center gap-3 text-2xl mt-4"><WhatsappIcon /> {PHONE_DISPLAY}</a>
              </nav>
            </div>
          )}
        </header>
      </div>

      {/* CONTENT SWITCHER */}
      <div className="flex-grow flex flex-col w-full">
         {currentView === 'home' && <HomePage t={t} />}
         {currentView === 'kaspi' && <KaspiQrPage t={t} />}
         {currentView === 'baiga' && <BaigaPage t={t} />}
         {currentView === 'rules' && <RulesPage t={t} />}
         {currentView === 'contacts' && <ContactsPage t={t} />}
      </div>

      {/* FOOTER */}
      <footer className="bg-[#191919] text-white pt-20 pb-10 relative overflow-hidden mt-auto w-full">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-12 pb-16 border-b border-gray-800 relative z-10">
          <div>
            <div className="flex-shrink-0 mb-5">
               <img 
                  src={LOGO_URL} 
                  alt="Logo" 
                  className="w-20 h-20 rounded-full border-2 border-gray-600 object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
               />
               <div className="w-20 h-20 bg-black rounded-full border border-gray-600 hidden items-center justify-center text-[#FFD600] font-bold text-2xl">Б</div>
            </div>
            <div className="text-gray-400 font-medium text-sm mb-8 tracking-wide">{PARK_NAME.toUpperCase()}</div>
            <div className="flex gap-5 text-gray-500"><Instagram className="hover:text-white cursor-pointer transition" /><TiktokIcon /><WhatsappIcon /></div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">{t.footer.support}</h4>
            <ul className="space-y-5 text-gray-400 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition">{t.footer.phone}</li>
              <li className="hover:text-white cursor-pointer transition">{t.footer.whatsapp}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">{t.footer.legal}</h4>
            <ul className="space-y-5 text-gray-400 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition">{t.footer.policy}</li>
              <li className="hover:text-white cursor-pointer transition">{t.footer.terms}</li>
              <li className="pt-2 leading-relaxed font-normal text-gray-400">{t.contacts.address_value}</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 pt-8 text-gray-600 text-xs relative z-10">© {new Date().getFullYear()} {t.footer.copyright}</div>
        <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-[#FFD600] rounded-full opacity-10 pointer-events-none blur-3xl"></div>
      </footer>
    </div>
  );
}