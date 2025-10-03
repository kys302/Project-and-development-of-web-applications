const users = [
  { id: 1, login: 'admin', password: '123456', name: 'Админ' },
  { id: 2, login: 'user', password: 'password', name: 'Пользователь' }
];


const products = [
  { 
    id: 1, 
    name: 'Классический массаж', 
    description: 'Снимает усталость, улучшает кровообращение и общее самочувствие.', 
    price: 1500, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage1.jpg' 
  },
  { 
    id: 2, 
    name: 'Расслабляющий массаж', 
    description: 'Помогает расслабить мышцы и восстановить силы после напряжённого дня.', 
    price: 1700, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage2.jpg' 
  },
  { 
    id: 3, 
    name: 'Тайский массаж', 
    description: 'Уникальная техника с элементами йоги и растяжки для глубокого расслабления.', 
    price: 2000, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage3.jpg' 
  },
  { 
    id: 4, 
    name: 'Антицеллюлитный массаж', 
    description: 'Эффективно борется с неровностями кожи, улучшает тонус и упругость.', 
    price: 2200, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage4.jpg' 
  },
  { 
    id: 5, 
    name: 'Спортивный массаж', 
    description: 'Снимает мышечное напряжение, помогает быстрее восстановиться после тренировок.', 
    price: 1800, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage5.jpg' 
  },
  { 
    id: 6, 
    name: 'Аромамассаж', 
    description: 'Сочетает массаж и ароматерапию для глубокого расслабления и улучшения сна.', 
    price: 1900, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage6.jpg' 
  },
  { 
    id: 7, 
    name: 'Массаж спины', 
    description: 'Облегчает боли в спине, убирает зажимы и улучшает осанку.', 
    price: 1600, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage7.jpg' 
  },
    { 
    id: 8, 
    name: 'Тайский массаж', 
    description: 'Уникальная древняя техника, улучшающая гибкость тела', 
    price: 1300, 
    image: 'https://iczsblxnxztvzdvfrgul.supabase.co/storage/v1/object/public/masajii/massage8.jpg' 
  }
];

export { users, products };
