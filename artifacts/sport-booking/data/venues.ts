import { Venue } from "@/context/AppContext";

const generateSlots = (available: boolean[] = []) => {
  const times = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  return times.map((time, i) => ({
    id: `slot-${i}`,
    time,
    available: available[i] !== undefined ? available[i] : Math.random() > 0.4,
  }));
};

const todayDate = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

const nextDays = (n: number) => {
  const dates: Record<string, ReturnType<typeof generateSlots>> = {};
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates[d.toISOString().split("T")[0]] = generateSlots();
  }
  return dates;
};

export const venues: Venue[] = [
  // ===== GYMS =====
  {
    id: "gym-1",
    category: "gyms",
    name: "FitPro Elite",
    address: "ул. Спортивная, 12",
    rating: 4.8,
    reviewCount: 312,
    description: "Премиум-зал с новейшим оборудованием и персональными тренерами",
    fullDescription: "FitPro Elite — это современный фитнес-центр площадью 2500 кв.м. с профессиональным оборудованием Technogym и Life Fitness. Зал включает зоны кардио, силовых тренировок, функционального тренинга и растяжки. Работаем 7 дней в неделю.",
    price: "от 1 500 ₽/занятие",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
    ],
    tags: ["Кардио", "Силовые", "Персональный тренер", "Сауна"],
    trainers: [
      {
        id: "t1",
        name: "Алексей Морозов",
        specialization: "Силовые тренировки",
        rating: 4.9,
        experience: "8 лет",
        description: "Специализируюсь на наращивании мышечной массы и силовых показателях. Мастер спорта по пауэрлифтингу.",
        photo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
        price: "2 500 ₽/час",
      },
      {
        id: "t2",
        name: "Мария Ковалёва",
        specialization: "Функциональный тренинг",
        rating: 4.7,
        experience: "5 лет",
        description: "Помогаю клиентам улучшить общую физическую форму, выносливость и гибкость.",
        photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
        price: "2 000 ₽/час",
      },
    ],
    reviews: [
      { id: "r1", author: "Дмитрий К.", rating: 5, text: "Отличный зал! Оборудование новое, чисто, персонал вежливый. Тренер Алексей — профессионал высшего класса.", date: "2025-12-10" },
      { id: "r2", author: "Анна П.", rating: 5, text: "Занимаюсь уже год, очень довольна результатами. Рекомендую Марию как тренера.", date: "2025-11-28" },
      { id: "r3", author: "Игорь С.", rating: 4, text: "Хороший зал, иногда бывает очередь на кардио-тренажёры в час пик.", date: "2025-11-15" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "gym-2",
    category: "gyms",
    name: "PowerZone",
    address: "пр. Победы, 45",
    rating: 4.6,
    reviewCount: 189,
    description: "Зал для настоящих атлетов — тяжёлая атлетика и кроссфит",
    fullDescription: "PowerZone специализируется на тяжёлой атлетике и функциональном тренинге CrossFit. Просторный зал 1800 кв.м. с помостами для тяжёлой атлетики, гантельным рядом от 2 до 100 кг, и специальным CrossFit-пространством.",
    price: "от 1 200 ₽/занятие",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    ],
    tags: ["Тяжёлая атлетика", "CrossFit", "Пауэрлифтинг"],
    trainers: [
      {
        id: "t3",
        name: "Сергей Волков",
        specialization: "CrossFit",
        rating: 4.8,
        experience: "6 лет",
        description: "Сертифицированный тренер CrossFit Level 2. Помогу достичь максимальных результатов.",
        photo: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
        price: "2 200 ₽/час",
      },
    ],
    reviews: [
      { id: "r4", author: "Павел М.", rating: 5, text: "Лучший зал для серьёзного тренинга. Сергей — топовый тренер!", date: "2025-12-05" },
      { id: "r5", author: "Наташа В.", rating: 4, text: "Хорошее оборудование, но парковка ограничена.", date: "2025-11-20" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "gym-3",
    category: "gyms",
    name: "Aqua Sport",
    address: "ул. Набережная, 8",
    rating: 4.9,
    reviewCount: 421,
    description: "Бассейн и спортзал в одном месте — плавание и фитнес",
    fullDescription: "Aqua Sport объединяет 50-метровый олимпийский бассейн и полноценный тренажёрный зал. Идеально для тех, кто хочет совмещать плавание и силовые тренировки. Есть детская секция и водное поло.",
    price: "от 1 800 ₽/занятие",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    ],
    tags: ["Бассейн", "Плавание", "Аквааэробика", "Детский"],
    trainers: [
      {
        id: "t4",
        name: "Ольга Синицына",
        specialization: "Плавание",
        rating: 4.9,
        experience: "12 лет",
        description: "Мастер спорта по плаванию. Работаю как со взрослыми новичками, так и с опытными пловцами.",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        price: "2 800 ₽/час",
      },
    ],
    reviews: [
      { id: "r6", author: "Елена Д.", rating: 5, text: "Великолепный бассейн, вода чистая, тренеры профессиональные.", date: "2025-12-08" },
    ],
    schedule: nextDays(14),
  },

  // ===== SECTIONS =====
  {
    id: "sec-1",
    category: "sections",
    name: "Академия тенниса",
    address: "ул. Корта, 3",
    rating: 4.7,
    reviewCount: 156,
    description: "Теннисные корты с профессиональными тренерами для всех уровней",
    fullDescription: "Академия тенниса предлагает занятия на 8 крытых кортах с покрытием хард. Группы для начинающих, продвинутых и профессионалов. Аренда ракеток и экипировки.",
    price: "от 2 000 ₽/час",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80",
    ],
    tags: ["Теннис", "Корт", "Группы", "Аренда ракеток"],
    trainers: [
      {
        id: "t5",
        name: "Андрей Теннисов",
        specialization: "Большой теннис",
        rating: 4.8,
        experience: "15 лет",
        description: "Бывший профессиональный игрок, победитель ряда региональных турниров. Тренирую от новичков до продвинутых.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        price: "3 000 ₽/час",
      },
    ],
    reviews: [
      { id: "r7", author: "Михаил Р.", rating: 5, text: "Отличная академия! Андрей — прекрасный тренер, за 3 месяца прогресс огромный.", date: "2025-12-01" },
      { id: "r8", author: "Светлана Н.", rating: 4, text: "Хорошие корты, расписание удобное.", date: "2025-11-18" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "sec-2",
    category: "sections",
    name: "Школа боевых искусств",
    address: "ул. Бойцов, 17",
    rating: 4.6,
    reviewCount: 203,
    description: "Бокс, борьба, MMA — тренировки для любого возраста",
    fullDescription: "В нашей школе преподают опытные мастера бокса, самбо, дзюдо и MMA. Безопасная атмосфера, профессиональный инвентарь, регулярные соревнования.",
    price: "от 1 000 ₽/занятие",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80",
      "https://images.unsplash.com/photo-1616279969965-c5f1748c5b64?w=800&q=80",
    ],
    tags: ["Бокс", "MMA", "Борьба", "Самооборона"],
    trainers: [
      {
        id: "t6",
        name: "Руслан Ахмедов",
        specialization: "Бокс и MMA",
        rating: 4.9,
        experience: "10 лет",
        description: "Мастер спорта международного класса по боксу. Подготовлю вас с нуля до соревновательного уровня.",
        photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80",
        price: "2 500 ₽/час",
      },
    ],
    reviews: [
      { id: "r9", author: "Артём К.", rating: 5, text: "Руслан — легенда! Занимаюсь 2 года, результаты отличные.", date: "2025-11-30" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "sec-3",
    category: "sections",
    name: "Студия йоги и пилатеса",
    address: "пр. Здоровья, 22",
    rating: 4.8,
    reviewCount: 287,
    description: "Гармония тела и разума — йога, пилатес и медитация",
    fullDescription: "Студия предлагает классы йоги всех уровней сложности, пилатес на реформерах, медитацию и дыхательные практики. Камерная атмосфера, опытные преподаватели.",
    price: "от 800 ₽/занятие",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    tags: ["Йога", "Пилатес", "Медитация", "Стретчинг"],
    trainers: [
      {
        id: "t7",
        name: "Наталья Лотосова",
        specialization: "Хатха-йога, Пилатес",
        rating: 5.0,
        experience: "9 лет",
        description: "Сертифицированный инструктор йоги (RYT-500) и пилатеса. Помогу обрести гибкость, силу и внутренний покой.",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        price: "2 000 ₽/час",
      },
    ],
    reviews: [
      { id: "r10", author: "Катерина В.", rating: 5, text: "Лучшая студия йоги в городе! Наталья — невероятный педагог.", date: "2025-12-07" },
      { id: "r11", author: "Борис М.", rating: 5, text: "Пришёл за здоровьем спины — получил и это, и удовольствие от тренировок.", date: "2025-11-25" },
    ],
    schedule: nextDays(14),
  },

  // ===== MEDICAL =====
  {
    id: "med-1",
    category: "medical",
    name: "SportMed Clinic",
    address: "ул. Врачей, 5",
    rating: 4.9,
    reviewCount: 512,
    description: "Спортивная медицина и реабилитация — лечение и восстановление",
    fullDescription: "SportMed Clinic — ведущий центр спортивной медицины. Услуги: МРТ и УЗИ суставов, консультации спортивного врача, физиотерапия, PRP-терапия, кинезиотейпирование. Команда из 15 специалистов.",
    price: "от 2 500 ₽/сеанс",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80",
    ],
    tags: ["Спортивный врач", "Реабилитация", "Физиотерапия", "МРТ"],
    trainers: [
      {
        id: "t8",
        name: "Д-р Иванов Пётр",
        specialization: "Спортивная травматология",
        rating: 4.9,
        experience: "20 лет",
        description: "Врач высшей категории, специалист по спортивным травмам и восстановлению. Работал с олимпийской сборной.",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
        price: "5 000 ₽/консультация",
      },
      {
        id: "t9",
        name: "Анна Массажист",
        specialization: "Спортивный массаж",
        rating: 4.8,
        experience: "7 лет",
        description: "Специалист по спортивному и восстановительному массажу. Помогает снять усталость и предотвратить травмы.",
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
        price: "3 000 ₽/час",
      },
    ],
    reviews: [
      { id: "r12", author: "Виктор Б.", rating: 5, text: "Д-р Иванов поставил меня на ноги за 3 недели после разрыва связок!", date: "2025-12-03" },
      { id: "r13", author: "Лена Г.", rating: 5, text: "Отличный массаж у Анны. После каждого сеанса чувствую себя новым человеком.", date: "2025-11-22" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "med-2",
    category: "medical",
    name: "Центр восстановления 'Баланс'",
    address: "ул. Оздоровительная, 33",
    rating: 4.7,
    reviewCount: 178,
    description: "Массаж, физиотерапия и кинезиотерапия для спортсменов",
    fullDescription: "Центр 'Баланс' специализируется на восстановлении спортсменов после нагрузок и травм. Методы: мануальная терапия, ударно-волновая терапия, лечебная физкультура, электрофорез.",
    price: "от 2 000 ₽/сеанс",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    ],
    tags: ["Массаж", "Кинезиотерапия", "Мануальная терапия", "ЛФК"],
    trainers: [
      {
        id: "t10",
        name: "Максим Реабилитолог",
        specialization: "Кинезиотерапия, ЛФК",
        rating: 4.7,
        experience: "11 лет",
        description: "Специалист по восстановлению после операций и спортивных травм. Разрабатываю индивидуальные программы реабилитации.",
        photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80",
        price: "3 500 ₽/час",
      },
    ],
    reviews: [
      { id: "r14", author: "Николай П.", rating: 5, text: "После операции на колене прошёл реабилитацию у Максима. Результат отличный!", date: "2025-11-28" },
    ],
    schedule: nextDays(14),
  },

  // ===== KIDS =====
  {
    id: "kids-1",
    category: "kids",
    name: "Детская футбольная школа",
    address: "ул. Стадионная, 10",
    rating: 4.9,
    reviewCount: 264,
    description: "Футбол для детей 4–14 лет — весело, безопасно, профессионально",
    fullDescription: "Наша школа принимает детей от 4 лет. Тренировки проходят на крытом мини-поле с искусственным покрытием. Группы разделены по возрасту (4–6, 7–10, 11–14 лет). Регулярные соревнования и турниры.",
    price: "от 800 ₽/занятие",
    image: "https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=800&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    ],
    tags: ["Футбол", "4–14 лет", "Группы", "Турниры"],
    trainers: [
      {
        id: "t11",
        name: "Денис Голев",
        specialization: "Детский футбол (4–10 лет)",
        rating: 5.0,
        experience: "8 лет",
        description: "Специализируюсь на работе с малышами. Тренировки проходят в игровой форме — дети в восторге!",
        photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80",
        price: "1 500 ₽/час",
      },
      {
        id: "t12",
        name: "Игорь Крутов",
        specialization: "Детский футбол (11–14 лет)",
        rating: 4.8,
        experience: "6 лет",
        description: "Тренирую старших детей с прицелом на соревнования. Развиваю технику, тактику и командный дух.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        price: "1 500 ₽/час",
      },
    ],
    reviews: [
      { id: "r15", author: "Мама Алёши", rating: 5, text: "Сын (5 лет) в восторге! Денис умеет найти подход к каждому малышу.", date: "2025-12-09" },
      { id: "r16", author: "Папа Кости", rating: 5, text: "Отличная школа, дружный коллектив. Рекомендуем всем!", date: "2025-11-27" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "kids-2",
    category: "kids",
    name: "Гимнастика для малышей",
    address: "ул. Детская, 7",
    rating: 4.8,
    reviewCount: 198,
    description: "Художественная и спортивная гимнастика для детей от 3 лет",
    fullDescription: "Секция гимнастики для детей от 3 лет. Специальные маты, небольшие снаряды и яркое оборудование. Обучаем базовым навыкам: гибкость, координация, равновесие. Выступления и показательные занятия для родителей.",
    price: "от 700 ₽/занятие",
    image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=800&q=80",
    ],
    tags: ["Гимнастика", "3–12 лет", "Гибкость", "Координация"],
    trainers: [
      {
        id: "t13",
        name: "Виктория Грациозная",
        specialization: "Художественная гимнастика",
        rating: 4.9,
        experience: "14 лет",
        description: "КМС по художественной гимнастике. Люблю детей и умею сделать тренировки по-настоящему волшебными!",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        price: "1 800 ₽/час",
      },
    ],
    reviews: [
      { id: "r17", author: "Мама Сони", rating: 5, text: "Дочка обожает гимнастику! Виктория — золотой человек.", date: "2025-12-06" },
    ],
    schedule: nextDays(14),
  },
  {
    id: "kids-3",
    category: "kids",
    name: "Детская секция плавания",
    address: "пр. Водный, 15",
    rating: 4.7,
    reviewCount: 321,
    description: "Плавание для малышей от 2 лет — игровой формат и безопасность",
    fullDescription: "Специализированный детский бассейн с тёплой водой (32°C) и мелкой зоной для малышей. Группы по возрасту: грудничковое плавание (2–12 мес.), дошкольники (2–5 лет), школьники (6–14 лет).",
    price: "от 900 ₽/занятие",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    ],
    tags: ["Плавание", "От 2 лет", "Тёплая вода", "Безопасность"],
    trainers: [
      {
        id: "t14",
        name: "Ирина Дельфинова",
        specialization: "Детское плавание",
        rating: 4.9,
        experience: "10 лет",
        description: "Специалист по обучению детей плаванию с самого раннего возраста. Умею снять страх воды и сделать занятия весёлыми.",
        photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
        price: "2 000 ₽/час",
      },
    ],
    reviews: [
      { id: "r18", author: "Папа Матвея", rating: 5, text: "Ирина научила нашего 3-летнего сына не бояться воды. Чудо, а не тренер!", date: "2025-12-04" },
    ],
    schedule: nextDays(14),
  },
];

export function getVenuesByCategory(category: string) {
  return venues.filter((v) => v.category === category);
}

export function getVenueById(id: string) {
  return venues.find((v) => v.id === id);
}
