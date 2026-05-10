import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "feed" | "profile" | "search" | "subscriptions" | "messenger" | "support" | "notifications" | "manager" | "create";

const MOCK_AUTHORS = [
  { id: 1, name: "Алина Сова",    avatar: "🦉", category: "Наука",       followers: 12400, following: 34,  likes: 98200,  level: 42, color: "#00DDFF", about: "Рассказываю о науке простым языком. Кандидат биологических наук." },
  { id: 2, name: "Дима Кодер",    avatar: "💻", category: "Технологии",  followers: 89100, following: 12,  likes: 341000, level: 78, color: "#8800FF", about: "Разработчик с 10 годами опыта. Пишу о коде, карьере и технологиях." },
  { id: 3, name: "Марина Шеф",    avatar: "👩‍🍳", category: "Кулинария", followers: 34200, following: 89,  likes: 187000, level: 25, color: "#FF6600", about: "Шеф-повар, веду кулинарный блог и провожу мастер-классы." },
  { id: 4, name: "Артём Гитара",  avatar: "🎸", category: "Музыка",      followers: 56700, following: 45,  likes: 224000, level: 61, color: "#FF00AA", about: "Музыкант, преподаватель гитары. Снимаю уроки и каверы." },
  { id: 5, name: "Катя Художник", avatar: "🎨", category: "Творчество",  followers: 28900, following: 102, likes: 113000, level: 38, color: "#FFE000", about: "Иллюстратор и дизайнер. Делюсь процессом создания арта." },
  { id: 6, name: "Игорь Спорт",   avatar: "🏋️", category: "Спорт",     followers: 71300, following: 27,  likes: 298000, level: 55, color: "#00CC44", about: "Тренер по силовым видам. Помогаю достичь результата без вреда здоровью." },
];

const MOCK_POSTS = [
  {
    id: 1, author: "Алина Сова", avatar: "🦉", level: 42, time: "2 мин назад",
    tag: "Наука", tagBg: "#00DDFF", tagColor: "#000",
    title: "Почему небо голубое? Объясняю за 60 секунд",
    text: "Всё дело в рэлеевском рассеянии! Молекулы воздуха рассеивают коротковолновый синий свет сильнее, чем красный.",
    likes: 1284, comments: 87, shares: 203, isLiked: false, isPremium: false,
  },
  {
    id: 2, author: "Дима Кодер", avatar: "💻", level: 78, time: "15 мин назад",
    tag: "Технологии", tagBg: "#8800FF", tagColor: "#fff",
    title: "Как работает ИИ — простыми словами",
    text: "ИИ — это математика + данные. Нейронная сеть обучается на миллионах примеров. Никакой магии, только статистика.",
    likes: 3421, comments: 256, shares: 891, isLiked: true, isPremium: true,
  },
  {
    id: 3, author: "Марина Шеф", avatar: "👩‍🍳", level: 25, time: "1 час назад",
    tag: "Кулинария", tagBg: "#FF6600", tagColor: "#fff",
    title: "Секрет идеальной пасты: 3 ошибки",
    text: "Мало воды. Недосоленная вода. Промываете пасту холодной водой после варки. Исправьте — результат удивит.",
    likes: 892, comments: 143, shares: 67, isLiked: false, isPremium: false,
  },
];

const MOCK_CHATS = [
  { id: 1, name: "Алина Сова", avatar: "🦉", msg: "Спасибо за комментарий!", time: "сейчас", unread: 2, online: true },
  { id: 2, name: "Дима Кодер", avatar: "💻", msg: "Давай коллаборацию?", time: "5 мин", unread: 0, online: true },
  { id: 3, name: "Марина Шеф", avatar: "👩‍🍳", msg: "Рецепт скоро пришлю", time: "1 час", unread: 1, online: false },
  { id: 4, name: "Артём Гитара", avatar: "🎸", msg: "Новый трек вышел!", time: "вчера", unread: 0, online: false },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, icon: "❤️", text: "Алина лайкнула ваш пост", time: "2 мин", isNew: true },
  { id: 2, icon: "💬", text: "Дима ответил на ваш комментарий", time: "10 мин", isNew: true },
  { id: 3, icon: "🔔", text: "Новый подписчик: Марина Шеф", time: "1 час", isNew: true },
  { id: 4, icon: "💰", text: "Донат 500₽ от Артёма", time: "3 часа", isNew: false },
  { id: 5, icon: "🏆", text: "Новое достижение: «Популярный автор»", time: "вчера", isNew: false },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Популярный", unlocked: true },
  { icon: "🔥", title: "На волне", unlocked: true },
  { icon: "💎", title: "Легенда", unlocked: false },
  { icon: "🚀", title: "Запуск", unlocked: true },
  { icon: "🎯", title: "В яблочко", unlocked: true },
  { icon: "⚡", title: "Молния", unlocked: false },
];

const MANAGER_STATS = [
  { label: "Просмотры", value: "24 810", change: "+18%", color: "#0044FF" },
  { label: "Доход", value: "18 400₽", change: "+31%", color: "#00CC44" },
  { label: "Подписчики", value: "4 280", change: "+7%", color: "#FF00AA" },
  { label: "Репосты", value: "1 203", change: "+12%", color: "#FF6600" },
];

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [viewingAuthorId, setViewingAuthorId] = useState<number | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(true);
    setActivePage("home");
  };

  const goToAuthor = (id: number) => {
    setViewingAuthorId(id);
    setActivePage("profile");
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const navItems = [
    { id: "home",          icon: "Home",          label: "Главная" },
    { id: "feed",          icon: "LayoutGrid",    label: "Лента" },
    { id: "search",        icon: "Search",        label: "Поиск" },
    { id: "notifications", icon: "Bell",          label: "Уведомл." },
    { id: "messenger",     icon: "MessageCircle", label: "Чат" },
    { id: "subscriptions", icon: "Users",         label: "Подписки" },
    { id: "manager",       icon: "BarChart2",     label: "Менеджер" },
    { id: "profile",       icon: "User",          label: "Профиль" },
    { id: "support",       icon: "LifeBuoy",      label: "Поддержка" },
  ] as const;

  return (
    <div className="min-h-screen bg-white font-golos">
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 top-bar px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤔</span>
          <span className="font-oswald text-xl font-bold text-white tracking-wide">ПОЧЕМУЧКА</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-1" style={{ background: "#FFE000", color: "#000" }}>BETA</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setActivePage("notifications")} className="relative p-2 rounded-full hover:bg-white/10 transition-all">
            <Icon name="Bell" size={20} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
          <button onClick={() => setActivePage("messenger")} className="p-2 rounded-full hover:bg-white/10 transition-all">
            <Icon name="MessageCircle" size={20} className="text-white" />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-14 pb-32 min-h-screen bg-gray-50 stripe-bg">
        {activePage === "home"          && <HomePage setActivePage={setActivePage} onRegister={() => setShowRegister(true)} onLogin={() => setShowLogin(true)} isLoggedIn={isLoggedIn} goToAuthor={goToAuthor} />}
        {activePage === "feed"          && <FeedPage posts={posts} toggleLike={toggleLike} goToAuthor={goToAuthor} />}
        {activePage === "search"        && <SearchPage goToAuthor={goToAuthor} />}
        {activePage === "notifications" && <NotificationsPage />}
        {activePage === "messenger"     && <MessengerPage activeChat={activeChat} setActiveChat={setActiveChat} />}
        {activePage === "subscriptions" && <SubscriptionsPage goToAuthor={goToAuthor} />}
        {activePage === "manager"       && <ManagerPage />}
        {activePage === "profile"       && <ProfilePage authorId={viewingAuthorId} onBack={() => { setViewingAuthorId(null); setActivePage("feed"); }} />}
        {activePage === "support"       && <SupportPage />}
      </main>

      {/* FAB КНОПКА + */}
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: "#FF0033", border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}
      >
        <Icon name="Plus" size={28} className="text-white" />
      </button>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 nav-bar">
        <div className="flex items-center justify-around px-1 py-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as Page)}
                className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl transition-all"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-xl transition-all relative"
                  style={isActive ? { background: "#FF0033", color: "#fff" } : { color: "#555" }}
                >
                  <Icon name={item.icon} size={18} />
                  {item.id === "notifications" && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                  )}
                </div>
                <span className={`text-[8px] font-semibold font-oswald tracking-wide ${isActive ? "text-red-600" : "text-gray-400"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* CREATE MODAL */}
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}

      {/* REGISTER MODAL */}
      {showRegister && (
        <AuthModal
          mode="register"
          onClose={() => setShowRegister(false)}
          onSwitch={() => { setShowRegister(false); setShowLogin(true); }}
          onSuccess={handleLogin}
        />
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <AuthModal
          mode="login"
          onClose={() => setShowLogin(false)}
          onSwitch={() => { setShowLogin(false); setShowRegister(true); }}
          onSuccess={handleLogin}
        />
      )}

      {/* WELCOME MODAL */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
    </div>
  );
}

/* ─── CREATE MODAL ─── */
function CreateModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Наука");
  const tags = ["Наука", "Технологии", "Кулинария", "Музыка", "Спорт", "Психология", "Творчество", "Бизнес"];
  const tagColors: Record<string, { bg: string; color: string }> = {
    "Наука": { bg: "#00DDFF", color: "#000" },
    "Технологии": { bg: "#8800FF", color: "#fff" },
    "Кулинария": { bg: "#FF6600", color: "#fff" },
    "Музыка": { bg: "#FF00AA", color: "#fff" },
    "Спорт": { bg: "#00CC44", color: "#fff" },
    "Психология": { bg: "#0044FF", color: "#fff" },
    "Творчество": { bg: "#FFE000", color: "#000" },
    "Бизнес": { bg: "#FF0033", color: "#fff" },
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div
        className="mt-auto bg-white rounded-t-3xl p-5 animate-pop"
        style={{ border: "3px solid #000", borderBottom: "none", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5"></div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-oswald text-2xl font-bold text-black">НОВЫЙ ПОСТ</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <Icon name="X" size={22} className="text-gray-500" />
          </button>
        </div>

        {/* TYPE BUTTONS */}
        <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
          {[
            { icon: "📝", label: "Текст", active: true },
            { icon: "📸", label: "Фото" },
            { icon: "🎬", label: "Видео" },
            { icon: "🎙️", label: "Аудио" },
            { icon: "📊", label: "Опрос" },
            { icon: "🔴", label: "Эфир" },
          ].map((t) => (
            <button
              key={t.label}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all font-oswald ${
                t.active
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-black"
              }`}
              style={t.active ? { background: "#000", border: "2px solid #000" } : {}}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* TITLE */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок поста..."
          className="w-full bg-gray-50 border-2 border-black rounded-xl px-4 py-3 text-sm font-semibold text-black placeholder-gray-400 focus:outline-none mb-3"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "16px" }}
        />

        {/* TEXT */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="О чём хочешь рассказать?"
          rows={4}
          className="w-full bg-gray-50 border-2 border-black rounded-xl px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none resize-none mb-4"
        />

        {/* PHOTO UPLOAD */}
        <div
          className="w-full rounded-xl mb-4 flex flex-col items-center justify-center gap-2 py-5 cursor-pointer hover:bg-gray-100 transition-all"
          style={{ border: "2px dashed #000", background: "#fafafa" }}
        >
          <Icon name="Image" size={28} className="text-gray-400" />
          <span className="text-sm text-gray-500 font-medium">Добавить фото или видео</span>
        </div>

        {/* TAGS */}
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Категория</p>
        <div className="flex gap-2 flex-wrap mb-5">
          {tags.map((tag) => {
            const tc = tagColors[tag];
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="text-xs font-bold px-3 py-1.5 rounded-full transition-all font-oswald"
                style={selectedTag === tag
                  ? { background: tc.bg, color: tc.color, border: "2px solid #000", boxShadow: "2px 2px 0px #000" }
                  : { background: "#f5f5f5", color: "#555", border: "2px solid #ddd" }
                }
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* MONETIZE */}
        <div className="g-card g-card-yellow p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💰</span>
            <span className="font-oswald font-bold text-sm text-black">Монетизация</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-xl text-xs font-bold font-oswald bg-yellow-400 text-black border-2 border-black">
              🆓 Бесплатно
            </button>
            <button className="flex-1 py-2 rounded-xl text-xs font-bold font-oswald bg-gray-100 text-gray-600 border-2 border-gray-300 hover:border-black transition-all">
              💎 Платно
            </button>
            <button className="flex-1 py-2 rounded-xl text-xs font-bold font-oswald bg-gray-100 text-gray-600 border-2 border-gray-300 hover:border-black transition-all">
              🔒 Подписка
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl text-lg font-bold btn-red"
        >
          ОПУБЛИКОВАТЬ
        </button>
      </div>
    </div>
  );
}

/* ─── WELCOME MODAL ─── */
function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div
        className="w-full bg-white rounded-3xl p-7 text-center animate-pop"
        style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #FF0033", maxWidth: 340 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-3">🎉</div>
        <div className="inline-block text-[10px] font-black px-2 py-0.5 rounded-full mb-2 font-oswald text-white" style={{ background: "#FF0033" }}>ДОБРО ПОЖАЛОВАТЬ</div>
        <h2 className="font-oswald text-2xl font-black text-black mb-2 leading-tight">БЛАГОДАРИМ ЗА РЕГИСТРАЦИЮ НА ПОЧЕМУЧКЕ!</h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Твой аккаунт создан. Публикуй контент, собирай аудиторию и зарабатывай. Всё готово 🚀
        </p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: "📝", label: "Пиши посты" },
            { icon: "🔴", label: "Стримь" },
            { icon: "💰", label: "Зарабатывай" },
          ].map((i) => (
            <div key={i.label} className="g-card p-2 text-center">
              <div className="text-2xl mb-1">{i.icon}</div>
              <p className="text-[10px] font-bold font-oswald text-black">{i.label}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl text-base font-black font-oswald text-white"
          style={{ background: "#FF0033", border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}
        >
          НАЧАТЬ 🤔
        </button>
      </div>
    </div>
  );
}

/* ─── POLICY MODAL ─── */
function PolicyModal({ onClose, onAccept }: { onClose: () => void; onAccept: () => void }) {
  const [checked, setChecked] = useState(false);
  const rules = [
    { n: "1", title: "Возраст пользователей", text: "Сервис доступен лицам, достигшим 14 лет. Пользователи до 18 лет должны получить согласие родителей или законных представителей." },
    { n: "2", title: "Персональные данные", text: "Мы собираем и обрабатываем ваши данные (имя, email, телефон) исключительно для работы платформы в соответствии с ФЗ-152 «О персональных данных»." },
    { n: "3", title: "Запрещённый контент", text: "Запрещено публиковать материалы, нарушающие законодательство РФ: насилие, экстремизм, порнография, дискриминация по любому признаку." },
    { n: "4", title: "Авторские права", text: "Публикуя контент, вы подтверждаете, что являетесь его автором или имеете право на его распространение. Нарушение влечёт удаление аккаунта." },
    { n: "5", title: "Монетизация и платежи", text: "Платформа взимает комиссию 15% с доходов авторов. Вывод средств доступен от 1 000 ₽. Все операции защищены SSL-шифрованием." },
    { n: "6", title: "Конфиденциальность данных", text: "Мы не передаём ваши данные третьим лицам без согласия, кроме случаев, предусмотренных законом. Данные хранятся на серверах в РФ." },
    { n: "7", title: "Блокировка аккаунта", text: "Администрация вправе заблокировать аккаунт за нарушение правил без предупреждения и без возврата средств на балансе." },
    { n: "8", title: "Изменение правил", text: "Платформа оставляет за собой право изменять настоящую политику. Пользователи будут уведомлены за 7 дней до вступления изменений в силу." },
    { n: "9", title: "Хранение данных", text: "После удаления аккаунта ваши данные хранятся 90 дней для возможности восстановления, затем уничтожаются безвозвратно." },
    { n: "10", title: "Применимое право", text: "Настоящая политика регулируется законодательством Российской Федерации. Все споры разрешаются в судах общей юрисдикции по месту нахождения Платформы." },
    { n: "11", title: "Система уровней и XP", text: "Каждый пользователь имеет уровень, который растёт через активность: +10 XP за каждый лайк вашего поста, +25 XP за нового подписчика, +15 XP за комментарий под вашим постом. Уровень влияет на видимость в рекомендациях и открывает новые возможности монетизации." },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-end" style={{ background: "rgba(0,0,0,0.75)" }} onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl animate-pop flex flex-col"
        style={{ border: "3px solid #000", borderBottom: "none", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header fixed */}
        <div className="px-5 pt-5 pb-3 border-b-2 border-black flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block text-[10px] font-black px-2 py-0.5 rounded-full mb-1 font-oswald text-white" style={{ background: "#8800FF" }}>ДОКУМЕНТ</span>
              <h2 className="font-oswald text-xl font-black text-black">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 border-2 border-gray-200">
              <Icon name="X" size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {rules.map((r) => (
            <div key={r.n} className="flex gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5 font-oswald"
                style={{ background: "#000" }}
              >
                {r.n}
              </div>
              <div>
                <p className="font-oswald font-bold text-sm text-black mb-1">{r.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
          <div className="h-2"></div>
        </div>

        {/* Footer fixed */}
        <div className="px-5 pb-5 pt-3 border-t-2 border-black flex-shrink-0">
          <label className="flex items-start gap-3 cursor-pointer mb-4" onClick={() => setChecked(!checked)}>
            <div
              className="w-6 h-6 rounded-md border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
              style={{ background: checked ? "#00CC44" : "#fff", boxShadow: checked ? "2px 2px 0px #000" : "2px 2px 0px #ccc" }}
            >
              {checked && <Icon name="Check" size={14} className="text-white" />}
            </div>
            <span className="text-sm text-black font-medium leading-snug">
              Я прочитал(а) и принимаю политику конфиденциальности и правила использования платформы Почемучка
            </span>
          </label>
          <button
            onClick={() => { if (checked) { onAccept(); onClose(); } }}
            className="w-full py-4 rounded-2xl text-base font-black font-oswald tracking-wide transition-all"
            style={{
              background: checked ? "#00CC44" : "#ccc",
              color: "#fff",
              border: "2px solid #000",
              boxShadow: checked ? "3px 3px 0px #000" : "none",
              cursor: checked ? "pointer" : "not-allowed",
            }}
          >
            {checked ? "ПРИНЯТЬ И ПРОДОЛЖИТЬ ✓" : "ОТМЕТЬТЕ ГАЛОЧКУ ВЫШЕ"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── FORGOT PASSWORD MODAL ─── */
function ForgotModal({ onClose, onBackToLogin }: { onClose: () => void; onBackToLogin: () => void }) {
  const [step, setStep] = useState<"email" | "code" | "newpass">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleCodeChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) {
      const el = document.getElementById(`code-${i + 1}`);
      el?.focus();
    }
  };

  const stepColors = ["#0044FF", "#FF6600", "#00CC44"];
  const stepIdx = step === "email" ? 0 : step === "code" ? 1 : 2;
  const accentColor = stepColors[stepIdx];

  return (
    <div className="fixed inset-0 z-[80] flex items-end" style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-5 animate-pop"
        style={{ border: "3px solid #000", borderBottom: "none", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>

        {/* STEPS INDICATOR */}
        <div className="flex items-center gap-2 mb-5">
          {["Почта", "Код", "Пароль"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-oswald text-white transition-all"
                style={{ background: i <= stepIdx ? accentColor : "#ddd", border: "2px solid #000" }}
              >
                {i < stepIdx ? <Icon name="Check" size={12} className="text-white" /> : i + 1}
              </div>
              <span className={`text-xs font-bold font-oswald ${i <= stepIdx ? "text-black" : "text-gray-400"}`}>{s}</span>
              {i < 2 && <div className="w-6 h-0.5" style={{ background: i < stepIdx ? accentColor : "#ddd" }}></div>}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <div>
            <span
              className="inline-block text-[10px] font-black px-2 py-0.5 rounded-full mb-1 font-oswald text-white"
              style={{ background: accentColor }}
            >
              ШАГ {stepIdx + 1} ИЗ 3
            </span>
            <h2 className="font-oswald text-2xl font-black text-black leading-none">
              {step === "email" && "ЗАБЫЛ ПАРОЛЬ?"}
              {step === "code"  && "ВВЕДИ КОД"}
              {step === "newpass" && "НОВЫЙ ПАРОЛЬ"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 border-2 border-gray-200">
            <Icon name="X" size={20} className="text-gray-500" />
          </button>
        </div>

        {/* STEP 1: EMAIL */}
        {step === "email" && (
          <div>
            <p className="text-sm text-gray-500 mb-4">Укажи почту от аккаунта — отправим код для сброса пароля</p>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider font-oswald">Электронная почта</label>
            <div className="relative mb-5">
              <Icon name="Mail" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                className="w-full bg-gray-50 border-2 border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setStep("code")}
              className="w-full py-4 rounded-2xl text-base font-black font-oswald tracking-wide text-white mb-3"
              style={{ background: accentColor, border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}
            >
              ОТПРАВИТЬ КОД →
            </button>
          </div>
        )}

        {/* STEP 2: CODE */}
        {step === "code" && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Код отправлен на</p>
            <p className="font-oswald font-bold text-black mb-4">{email || "твою почту"}</p>
            <div className="flex gap-2 justify-center mb-2">
              {code.map((c, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={c}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  className="w-11 h-14 text-center text-xl font-black font-oswald border-2 border-black rounded-xl bg-gray-50 focus:outline-none focus:bg-white transition-all"
                  style={{ boxShadow: c ? "2px 2px 0px #FF6600" : "2px 2px 0px #ccc" }}
                />
              ))}
            </div>
            <button className="text-xs font-bold text-gray-400 hover:text-black mb-5 block mx-auto">
              Не пришёл код? Отправить снова
            </button>
            <button
              onClick={() => setStep("newpass")}
              className="w-full py-4 rounded-2xl text-base font-black font-oswald tracking-wide text-white mb-3"
              style={{ background: accentColor, border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}
            >
              ПОДТВЕРДИТЬ КОД →
            </button>
          </div>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === "newpass" && (
          <div>
            <p className="text-sm text-gray-500 mb-4">Придумай новый надёжный пароль</p>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider font-oswald">Новый пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Минимум 8 символов"
                    className="w-full bg-gray-50 border-2 border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider font-oswald">Повтори пароль</label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Ещё раз пароль"
                    className="w-full bg-gray-50 border-2 border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
              {confirmPass && newPass !== confirmPass && (
                <p className="text-xs font-bold" style={{ color: "#FF0033" }}>⚠ Пароли не совпадают</p>
              )}
            </div>
            <button
              onClick={() => { onClose(); onBackToLogin(); }}
              className="w-full py-4 rounded-2xl text-base font-black font-oswald tracking-wide text-white mb-3"
              style={{ background: accentColor, border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}
            >
              СОХРАНИТЬ ПАРОЛЬ ✓
            </button>
          </div>
        )}

        <div className="text-center pb-1">
          <button
            onClick={() => { onClose(); onBackToLogin(); }}
            className="text-sm font-bold text-gray-400 hover:text-black"
          >
            ← Вернуться ко входу
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── AUTH MODAL ─── */
function AuthModal({ mode, onClose, onSwitch, onSuccess }: {
  mode: "register" | "login";
  onClose: () => void;
  onSwitch: () => void;
  onSuccess: () => void;
}) {
  const isReg = mode === "register";
  const [form, setForm] = useState({
    nickname: "", email: "", phone: "", about: "", password: "", confirmPassword: ""
  });
  const [showForgot, setShowForgot] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const fields = isReg
    ? [
        { key: "nickname",        label: "Никнейм",           placeholder: "@твой_никнейм",      type: "text",     icon: "User" },
        { key: "email",           label: "Электронная почта",  placeholder: "example@mail.ru",    type: "email",    icon: "Mail" },
        { key: "phone",           label: "Телефон (необяз.)",  placeholder: "+7 900 000-00-00",   type: "tel",      icon: "PhoneCall" },
        { key: "password",        label: "Пароль",             placeholder: "Минимум 8 символов", type: "password", icon: "Lock" },
        { key: "confirmPassword", label: "Повтори пароль",     placeholder: "Ещё раз пароль",     type: "password", icon: "Lock" },
      ]
    : [
        { key: "email",    label: "Электронная почта", placeholder: "example@mail.ru", type: "email",    icon: "Mail" },
        { key: "password", label: "Пароль",            placeholder: "Твой пароль",     type: "password", icon: "Lock" },
      ];

  const accentColor = isReg ? "#FF0033" : "#0044FF";
  const canSubmit = isReg ? policyAccepted : true;

  return (
    <>
      <div
        className="fixed inset-0 z-[70] flex items-end justify-center"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={onClose}
      >
        <div
          className="w-full bg-white rounded-t-3xl p-5 animate-pop"
          style={{ border: "3px solid #000", borderBottom: "none", maxHeight: "92vh", overflowY: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div
                className="inline-block text-[10px] font-black px-2 py-0.5 rounded-full mb-1 font-oswald"
                style={{ background: accentColor, color: "#fff" }}
              >
                {isReg ? "НОВЫЙ АККАУНТ" : "ВХОД"}
              </div>
              <h2 className="font-oswald text-2xl font-black text-black leading-none">
                {isReg ? "РЕГИСТРАЦИЯ" : "ВОЙТИ В АККАУНТ"}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 border-2 border-gray-200">
              <Icon name="X" size={20} className="text-gray-500" />
            </button>
          </div>

          {/* FIELDS */}
          <div className="space-y-3 mb-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider font-oswald">
                  {f.label}
                </label>
                <div className="relative">
                  <Icon name={f.icon} size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={set(f.key)}
                    placeholder={f.placeholder}
                    className="w-full bg-gray-50 border-2 border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            ))}

            {isReg && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider font-oswald">
                  О себе (необязательно)
                </label>
                <textarea
                  value={form.about}
                  onChange={set("about")}
                  placeholder="Расскажи коротко: кто ты и о чём пишешь..."
                  rows={3}
                  className="w-full bg-gray-50 border-2 border-black rounded-xl px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>
            )}
          </div>

          {/* FORGOT — только для входа */}
          {!isReg && (
            <button
              onClick={() => setShowForgot(true)}
              className="text-xs font-bold mb-4 block hover:underline"
              style={{ color: accentColor }}
            >
              Забыл пароль?
            </button>
          )}

          {/* AGREEMENT — только регистрация */}
          {isReg && (
            <div className="mb-4">
              <label className="flex items-start gap-3 cursor-pointer mb-2" onClick={() => setPolicyAccepted(!policyAccepted)}>
                <div
                  className="w-5 h-5 rounded-md border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={{ background: policyAccepted ? "#00CC44" : "#fff" }}
                >
                  {policyAccepted && <Icon name="Check" size={12} className="text-white" />}
                </div>
                <span className="text-xs text-gray-600 leading-snug">
                  Я принимаю{" "}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setShowPolicy(true); }}
                    className="font-bold text-black underline"
                  >
                    политику конфиденциальности
                  </button>{" "}
                  и{" "}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setShowPolicy(true); }}
                    className="font-bold text-black underline"
                  >
                    условия использования
                  </button>
                </span>
              </label>
              {!policyAccepted && (
                <p className="text-[10px] text-red-500 font-bold font-oswald pl-8">
                  ⚠ Необходимо принять для регистрации
                </p>
              )}
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={() => { if (canSubmit) onSuccess(); }}
            disabled={!canSubmit}
            className="w-full py-4 rounded-2xl text-base font-black font-oswald tracking-wide text-white mb-3 transition-all"
            style={{
              background: canSubmit ? accentColor : "#ccc",
              border: "2px solid #000",
              boxShadow: canSubmit ? "3px 3px 0px #000" : "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            {isReg ? "ЗАРЕГИСТРИРОВАТЬСЯ 🚀" : "ВОЙТИ →"}
          </button>

          {/* SWITCH */}
          <div className="text-center pb-2">
            <span className="text-sm text-gray-500">
              {isReg ? "Уже есть аккаунт? " : "Нет аккаунта? "}
            </span>
            <button onClick={onSwitch} className="text-sm font-black underline" style={{ color: accentColor }}>
              {isReg ? "Войти" : "Зарегистрироваться"}
            </button>
          </div>
        </div>
      </div>

      {/* ВЛОЖЕННЫЕ МОДАЛКИ */}
      {showForgot && (
        <ForgotModal
          onClose={() => setShowForgot(false)}
          onBackToLogin={() => setShowForgot(false)}
        />
      )}
      {showPolicy && (
        <PolicyModal
          onClose={() => setShowPolicy(false)}
          onAccept={() => setPolicyAccepted(true)}
        />
      )}
    </>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ setActivePage, onRegister, onLogin, isLoggedIn, goToAuthor }: {
  setActivePage: (p: Page) => void;
  onRegister: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  goToAuthor: (id: number) => void;
}) {
  // Залогиненная главная — профиль пользователя
  if (isLoggedIn) {
    return (
      <div className="animate-fade-in">
        {/* PROFILE HERO */}
        <div className="h-28 w-full stripe-bg" style={{ background: "#FFE000", borderBottom: "3px solid #000" }}></div>
        <div className="px-4 pb-4">
          <div className="flex items-end justify-between -mt-9 mb-4">
            <div className="w-18 h-18 rounded-2xl bg-white flex items-center justify-center text-4xl border-3 border-black" style={{ width: 72, height: 72, border: "3px solid #000", boxShadow: "3px 3px 0px #000" }}>
              😎
            </div>
            <button className="btn-outline px-4 py-2 rounded-xl text-sm flex items-center gap-1.5">
              <Icon name="Pencil" size={14} />
              Изменить
            </button>
          </div>

          <h2 className="font-oswald text-2xl font-bold text-black">Александр Иванов</h2>
          <p className="text-gray-500 text-sm mb-4">@alex_curious · Спрашиваю обо всём 🤔</p>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Подписчики", value: "4 280", color: "#FF00AA" },
              { label: "Подписки",   value: "138",   color: "#0044FF" },
              { label: "Лайки",      value: "18.4K", color: "#FF0033" },
            ].map((s) => (
              <div key={s.label} className="g-card p-3 text-center" style={{ borderColor: s.color, boxShadow: `3px 3px 0px ${s.color}` }}>
                <p className="font-oswald text-xl font-bold text-black">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* LEVEL BAR */}
          <div className="g-card g-card-yellow p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-oswald font-bold text-sm text-black">Уровень 34 — Исследователь</span>
              <span className="text-xs font-bold text-gray-600">2 340 / 3 000 XP</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
              <div className="h-full rounded-full" style={{ width: "78%", background: "#FFE000" }}></div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">+10 XP за лайк · +25 XP за подписчика · +15 XP за комментарий</p>
          </div>

          {/* MY POSTS */}
          <div className="flex items-center justify-between mb-3">
            <p className="font-oswald font-bold text-black">МОИ ПОСТЫ</p>
            <button onClick={() => setActivePage("manager")} className="text-xs font-bold text-red-600 font-oswald">Все →</button>
          </div>
          <div className="space-y-3 mb-4">
            {MOCK_POSTS.slice(0, 2).map((p) => (
              <div key={p.id} className="g-card p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-oswald font-bold text-sm text-black truncate">{p.title}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>❤️ {p.likes.toLocaleString()}</span>
                    <span>💬 {p.comments}</span>
                    <span>↗ {p.shares}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full font-oswald" style={{ background: p.tagBg, color: p.tagColor, border: "1.5px solid #000" }}>{p.tag}</span>
              </div>
            ))}
          </div>

          {/* ACHIEVEMENTS */}
          <p className="font-oswald font-bold text-black mb-3">ДОСТИЖЕНИЯ</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className={`g-card p-3 text-center ${!a.unlocked ? "opacity-40" : ""}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <p className="text-[10px] font-bold text-black font-oswald">{a.title}</p>
              </div>
            ))}
          </div>

          {/* LIVE */}
          <div className="g-card g-card-red p-4 flex items-center gap-4 cursor-pointer mb-4" onClick={() => setActivePage("feed")}>
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-2xl border-2 border-black flex-shrink-0">💻</div>
            <div className="flex-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white font-oswald" style={{ background: "#FF0033" }}>● LIVE 2 830</span>
              <p className="font-oswald font-bold text-sm text-black mt-1">Дима Кодер — Пишем приложение</p>
            </div>
            <button className="btn-black px-3 py-2 rounded-xl text-xs text-white">СМОТРЕТЬ</button>
          </div>

          {/* SUPPORT */}
          <div className="g-card g-card-green p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "#00CC44", border: "2px solid #000" }}>📞</div>
            <div className="flex-1">
              <p className="font-oswald font-bold text-sm text-black">Поддержка</p>
              <a href="tel:+79521426352" className="font-oswald font-bold text-sm text-green-700">+7 952 142-63-52</a>
            </div>
            <a href="tel:+79521426352" className="btn-yellow px-3 py-2 rounded-xl text-xs text-black">ЗВОНИТЬ</a>
          </div>
        </div>
      </div>
    );
  }

  // Незалогиненная главная — лендинг
  return (
    <div className="animate-fade-in">
      <div className="px-4 pt-5 pb-2">
        <div className="relative rounded-3xl overflow-hidden p-6" style={{ background: "#000", border: "3px solid #000", boxShadow: "5px 5px 0px #FF0033" }}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20" style={{ background: "radial-gradient(circle, #FFE000 0%, transparent 70%)" }}></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 opacity-15" style={{ background: "radial-gradient(circle, #FF00AA 0%, transparent 70%)" }}></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🤔</span>
              <div>
                <h1 className="font-oswald text-3xl font-bold text-white leading-none">ПОЧЕМУЧКА</h1>
                <p className="text-xs text-gray-400">Платформа для авторов</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">Создавай контент, зарабатывай на подписках и донатах, строй свою аудиторию</p>
            <div className="flex gap-2 mb-4">
              {["💰 Заработок", "🔴 Эфиры", "🏆 Достижения"].map((b) => (
                <div key={b} className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5">
                  <span className="text-[11px] text-white/80 font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={onRegister} className="flex-1 py-3 rounded-2xl text-sm font-bold btn-red">ЗАРЕГИСТРИРОВАТЬСЯ</button>
              <button onClick={onLogin} className="px-4 py-3 rounded-2xl text-sm font-bold btn-outline">Войти</button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        <h2 className="font-oswald text-xl font-bold text-black mb-3">ЧТО ТЫ ПОЛУЧИШЬ</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🎬", title: "Прямые эфиры", desc: "Стримь и зарабатывай", color: "g-card-red" },
            { icon: "💎", title: "Подписки", desc: "Эксклюзив для фанатов", color: "g-card-purple" },
            { icon: "🎁", title: "Донаты", desc: "Поддержка от зрителей", color: "g-card-blue" },
            { icon: "🏆", title: "Уровни", desc: "Система достижений", color: "g-card-yellow" },
          ].map((f) => (
            <div key={f.title} className={`g-card ${f.color} p-4`}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <p className="font-oswald font-bold text-sm text-black">{f.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* АВТОРЫ */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-oswald text-xl font-bold text-black mb-3">ТОП АВТОРЫ</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {MOCK_AUTHORS.slice(0, 4).map((a) => (
            <button key={a.id} onClick={() => goToAuthor(a.id)} className="flex-shrink-0 g-card p-3 text-center w-28" style={{ borderColor: a.color, boxShadow: `3px 3px 0px ${a.color}` }}>
              <div className="text-3xl mb-1">{a.avatar}</div>
              <p className="font-oswald font-bold text-xs text-black truncate">{a.name}</p>
              <p className="text-[10px] text-gray-500">{(a.followers / 1000).toFixed(1)}K</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        <div className="g-card g-card-red p-4 flex items-center gap-4 cursor-pointer" onClick={() => setActivePage("feed")}>
          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-2xl flex-shrink-0 border-2 border-black">💻</div>
          <div className="flex-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white font-oswald" style={{ background: "#FF0033" }}>● LIVE 2 830</span>
            <p className="font-oswald font-bold text-sm text-black mt-1">Дима Кодер</p>
            <p className="text-xs text-gray-500">«Пишем мобильное приложение»</p>
          </div>
          <button className="btn-black px-3 py-2 rounded-xl text-xs text-white">СМОТРЕТЬ</button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        <div className="g-card g-card-green p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "#00CC44", border: "2px solid #000" }}>📞</div>
          <div className="flex-1">
            <p className="font-oswald font-bold text-sm text-black">Нужна помощь?</p>
            <a href="tel:+79521426352" className="font-oswald font-bold text-sm text-green-700">+7 952 142-63-52</a>
          </div>
          <a href="tel:+79521426352" className="btn-yellow px-3 py-2 rounded-xl text-xs text-black">ПОЗВОНИТЬ</a>
        </div>
      </div>
    </div>
  );
}

/* ─── FEED PAGE ─── */
function FeedPage({ posts, toggleLike, goToAuthor }: { posts: typeof MOCK_POSTS; toggleLike: (id: number) => void; goToAuthor: (id: number) => void }) {
  const [filter, setFilter] = useState(0);
  return (
    <div className="px-4 pt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-oswald text-2xl font-bold text-black">ЛЕНТА</h2>
        <div className="flex gap-1.5">
          {["Все", "Подписки", "ТОП"].map((f, i) => (
            <button key={f} onClick={() => setFilter(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-oswald transition-all ${filter === i ? "btn-black text-white" : "btn-outline text-black"}`}
            >{f}</button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} toggleLike={toggleLike} delay={i * 70} goToAuthor={goToAuthor} />
        ))}
      </div>
    </div>
  );
}

/* ─── POST CARD ─── */
const MOCK_COMMENTS = [
  { id: 1, author: "Катя Художник", avatar: "🎨", text: "Очень интересно! Спасибо за объяснение 🔥", time: "1 мин" },
  { id: 2, author: "Игорь Спорт",   avatar: "🏋️", text: "Подписался, жду новых постов!", time: "5 мин" },
  { id: 3, author: "Алина Сова",    avatar: "🦉", text: "Согласна полностью, наука рулит 💯", time: "12 мин" },
];

function PostCard({ post, toggleLike, delay = 0, goToAuthor }: {
  post: typeof MOCK_POSTS[0];
  toggleLike: (id: number) => void;
  delay?: number;
  goToAuthor: (id: number) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(MOCK_COMMENTS.slice(0, 2));

  const authorId = MOCK_AUTHORS.find(a => a.name === post.author)?.id ?? 1;

  const sendComment = () => {
    if (!newComment.trim()) return;
    setLocalComments([{ id: Date.now(), author: "Вы", avatar: "😎", text: newComment, time: "сейчас" }, ...localComments]);
    setNewComment("");
  };

  return (
    <div className="g-card p-4 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => goToAuthor(authorId)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl border-2 border-black flex-shrink-0 hover:scale-105 transition-transform">
          {post.avatar}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => goToAuthor(authorId)} className="font-oswald font-bold text-sm text-black hover:underline">{post.author}</button>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-black text-white">Ур.{post.level}</span>
            {post.isPremium && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-black" style={{ background: "#FFE000" }}>💎 PRO</span>}
          </div>
          <span className="text-xs text-gray-400">{post.time}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 font-oswald" style={{ background: post.tagBg, color: post.tagColor, border: "1.5px solid #000" }}>
          {post.tag}
        </span>
      </div>

      <h3 className="font-oswald text-lg font-bold text-black mb-2 leading-tight">{post.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.text}</p>

      <div className="flex items-center justify-between pt-3 border-t-2 border-black mb-0">
        <div className="flex items-center gap-4">
          <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-sm font-bold font-oswald transition-all ${post.isLiked ? "text-red-600" : "text-gray-400 hover:text-red-500"}`}>
            <Icon name="Heart" size={18} />
            <span>{post.likes.toLocaleString()}</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className={`flex items-center gap-1.5 text-sm font-bold font-oswald transition-all ${showComments ? "text-blue-600" : "text-gray-400 hover:text-blue-600"}`}>
            <Icon name="MessageCircle" size={18} />
            <span>{localComments.length + post.comments - 2}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm font-bold font-oswald text-gray-400 hover:text-purple-600 transition-all">
            <Icon name="Share2" size={18} />
            <span>{post.shares}</span>
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold font-oswald" style={{ background: "#FF00AA", color: "#fff", border: "2px solid #000", boxShadow: "2px 2px 0px #000" }}>
          <Icon name="Gift" size={14} />ДОНАТ
        </button>
      </div>

      {/* КОММЕНТАРИИ */}
      {showComments && (
        <div className="mt-3 pt-3 border-t-2 border-dashed border-gray-200">
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base border-2 border-black flex-shrink-0">😎</div>
            <div className="flex-1 flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendComment()}
                placeholder="Написать комментарий..."
                className="flex-1 bg-gray-50 border-2 border-black rounded-xl px-3 py-2 text-xs text-black placeholder-gray-400 focus:outline-none"
              />
              <button onClick={sendComment} className="px-3 py-2 rounded-xl text-xs font-bold font-oswald btn-red text-white">→</button>
            </div>
          </div>
          <div className="space-y-2">
            {localComments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm border-2 border-black flex-shrink-0">{c.avatar}</div>
                <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-oswald font-bold text-xs text-black">{c.author}</span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-700">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SEARCH PAGE ─── */
function SearchPage({ goToAuthor }: { goToAuthor: (id: number) => void }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "authors" | "posts">("all");
  const categories = [
    { icon: "🔬", label: "Наука",       bg: "#00DDFF", color: "#000" },
    { icon: "💻", label: "Технологии",  bg: "#8800FF", color: "#fff" },
    { icon: "🎵", label: "Музыка",      bg: "#FF00AA", color: "#fff" },
    { icon: "🍕", label: "Кулинария",   bg: "#FF6600", color: "#fff" },
    { icon: "🎨", label: "Творчество",  bg: "#FFE000", color: "#000" },
    { icon: "🏋️", label: "Спорт",      bg: "#00CC44", color: "#fff" },
    { icon: "🧠", label: "Психология",  bg: "#0044FF", color: "#fff" },
    { icon: "📸", label: "Фото/Видео",  bg: "#FF0033", color: "#fff" },
  ];

  const filteredAuthors = MOCK_AUTHORS.filter(a =>
    !query || a.name.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())
  );
  const filteredPosts = MOCK_POSTS.filter(p =>
    !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-black mb-4">ПОИСК</h2>
      <div className="relative mb-4">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Авторы, темы, посты..."
          className="w-full bg-white border-2 border-black rounded-2xl pl-11 pr-4 py-3.5 text-sm text-black placeholder-gray-400 focus:outline-none"
          style={{ boxShadow: "3px 3px 0px #000" }}
        />
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-4">
        {(["all", "authors", "posts"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold font-oswald transition-all ${activeTab === t ? "btn-black text-white" : "btn-outline text-black"}`}
          >
            {t === "all" ? "Все" : t === "authors" ? "Авторы" : "Посты"}
          </button>
        ))}
      </div>

      {/* РЕЗУЛЬТАТЫ ПОИСКА */}
      {query ? (
        <div>
          {(activeTab === "all" || activeTab === "authors") && filteredAuthors.length > 0 && (
            <div className="mb-4">
              <p className="font-oswald font-bold text-xs text-gray-500 mb-2 uppercase tracking-wider">Авторы</p>
              <div className="space-y-2">
                {filteredAuthors.map((a) => (
                  <button key={a.id} onClick={() => goToAuthor(a.id)} className="w-full g-card p-3 flex items-center gap-3 text-left" style={{ borderColor: a.color, boxShadow: `3px 3px 0px ${a.color}` }}>
                    <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-2xl border-2 border-black flex-shrink-0">{a.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-oswald font-bold text-sm text-black">{a.name}</p>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-black text-white">Ур.{a.level}</span>
                      </div>
                      <p className="text-xs text-gray-500">{a.category} · {(a.followers / 1000).toFixed(1)}K подписчиков</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {(activeTab === "all" || activeTab === "posts") && filteredPosts.length > 0 && (
            <div>
              <p className="font-oswald font-bold text-xs text-gray-500 mb-2 uppercase tracking-wider">Посты</p>
              <div className="space-y-2">
                {filteredPosts.map((p) => (
                  <div key={p.id} className="g-card p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-oswald font-bold text-sm text-black truncate">{p.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{p.author}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full font-oswald" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">❤️ {p.likes.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {filteredAuthors.length === 0 && filteredPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-4xl mb-2">🔍</p>
              <p className="font-oswald font-bold text-black">Ничего не найдено</p>
              <p className="text-sm text-gray-500">Попробуй другой запрос</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="font-oswald font-bold text-xs text-gray-500 mb-3 uppercase tracking-wider">Популярные авторы</p>
          <div className="space-y-2 mb-5">
            {MOCK_AUTHORS.map((a) => (
              <button key={a.id} onClick={() => goToAuthor(a.id)} className="w-full g-card p-3 flex items-center gap-3 text-left" style={{ borderColor: a.color, boxShadow: `3px 3px 0px ${a.color}` }}>
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-2xl border-2 border-black flex-shrink-0">{a.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-oswald font-bold text-sm text-black">{a.name}</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-black text-white">Ур.{a.level}</span>
                  </div>
                  <p className="text-xs text-gray-500">{a.category} · {(a.followers / 1000).toFixed(1)}K подписчиков</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
          <p className="font-oswald font-bold text-xs text-gray-500 mb-3 uppercase tracking-wider">Категории</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button key={cat.label} className="flex items-center gap-3 p-4 rounded-2xl text-left hover:scale-105 transition-transform font-oswald font-bold text-sm" style={{ background: cat.bg, color: cat.color, border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}>
                <span className="text-2xl">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── NOTIFICATIONS PAGE ─── */
function NotificationsPage() {
  return (
    <div className="px-4 pt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-oswald text-2xl font-bold text-black">УВЕДОМЛЕНИЯ</h2>
        <button className="text-xs font-bold text-red-600 font-oswald hover:underline">Прочитать все</button>
      </div>
      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-4 rounded-2xl ${n.isNew ? "g-card g-card-red" : "g-card"}`}
          >
            <span className="text-2xl mt-0.5">{n.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-black">{n.text}</p>
              <span className="text-xs text-gray-400">{n.time}</span>
            </div>
            {n.isNew && (
              <span className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: "#FF0033" }}></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MESSENGER PAGE ─── */
function MessengerPage({ activeChat, setActiveChat }: {
  activeChat: number | null;
  setActiveChat: (id: number | null) => void;
}) {
  if (activeChat !== null) {
    const chat = MOCK_CHATS.find(c => c.id === activeChat);
    return (
      <div className="flex flex-col h-[calc(100vh-9rem)] animate-fade-in">
        <div className="px-4 pt-3 pb-3 flex items-center gap-3 border-b-2 border-black bg-white">
          <button onClick={() => setActiveChat(null)} className="p-1.5 rounded-xl hover:bg-gray-100 border-2 border-black">
            <Icon name="ArrowLeft" size={18} className="text-black" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl border-2 border-black">{chat?.avatar}</div>
          <div>
            <p className="font-oswald font-bold text-black text-sm">{chat?.name}</p>
            <p className="text-xs" style={{ color: chat?.online ? "#00CC44" : "#999" }}>{chat?.online ? "● онлайн" : "не в сети"}</p>
          </div>
        </div>
        <div className="flex-1 px-4 py-4 flex flex-col justify-end gap-3 overflow-y-auto bg-gray-50">
          <div className="self-start max-w-[78%] bg-white rounded-2xl rounded-tl-none px-4 py-3 border-2 border-black" style={{ boxShadow: "3px 3px 0px #000" }}>
            <p className="text-sm text-black">{chat?.msg}</p>
            <span className="text-[10px] text-gray-400">12:30</span>
          </div>
          <div className="self-end max-w-[78%] rounded-2xl rounded-tr-none px-4 py-3 border-2 border-black" style={{ background: "#FF0033", boxShadow: "3px 3px 0px #000" }}>
            <p className="text-sm text-white">Привет! Да, звучит интересно 👋</p>
            <span className="text-[10px] text-red-200">12:31</span>
          </div>
        </div>
        <div className="px-4 py-3 flex gap-2 bg-white border-t-2 border-black">
          <input
            placeholder="Сообщение..."
            className="flex-1 bg-gray-50 border-2 border-black rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none"
          />
          <button
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 btn-red"
          >
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-black mb-4">СООБЩЕНИЯ</h2>
      <div className="space-y-2">
        {MOCK_CHATS.map((chat) => (
          <button key={chat.id} onClick={() => setActiveChat(chat.id)} className="w-full flex items-center gap-3 p-4 g-card text-left">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl border-2 border-black">{chat.avatar}</div>
              {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ background: "#00CC44" }}></span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-oswald font-bold text-sm text-black">{chat.name}</span>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{chat.msg}</p>
            </div>
            {chat.unread > 0 && (
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 font-oswald"
                style={{ background: "#FF0033", border: "2px solid #000" }}
              >
                {chat.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── SUBSCRIPTIONS PAGE ─── */
function SubscriptionsPage({ goToAuthor }: { goToAuthor: (id: number) => void }) {
  const [subs, setSubs] = useState(
    MOCK_AUTHORS.map(a => ({ ...a, subscribed: [1, 2, 4].includes(a.id) }))
  );
  const [tab, setTab] = useState(0);
  const displayed = tab === 0 ? subs.filter(a => a.subscribed) : subs;

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-black mb-4">ПОДПИСКИ</h2>
      <div className="flex gap-2 mb-4">
        {["Мои подписки", "Все авторы"].map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`px-4 py-2 rounded-full text-sm font-bold font-oswald transition-all ${tab === i ? "btn-black text-white" : "btn-outline text-black"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {displayed.map((a) => (
          <div key={a.id} className="g-card p-4 flex items-center gap-3" style={{ borderColor: a.color, boxShadow: `3px 3px 0px ${a.color}` }}>
            <button onClick={() => goToAuthor(a.id)} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 border-2 border-black hover:scale-105 transition-transform">
              {a.avatar}
            </button>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => goToAuthor(a.id)}>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-oswald font-bold text-black text-sm">{a.name}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-black text-white">Ур.{a.level}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{a.category}</span><span>•</span><span>{(a.followers / 1000).toFixed(1)}K</span>
              </div>
            </div>
            <button
              onClick={() => setSubs(subs.map(s => s.id === a.id ? { ...s, subscribed: !s.subscribed } : s))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-oswald flex-shrink-0 transition-all ${a.subscribed ? "btn-outline text-black" : "btn-red text-white"}`}
            >
              {a.subscribed ? "Отписан" : "Подписаться"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MANAGER PAGE ─── */
function ManagerPage() {
  const posts_mgr = [
    { id: 1, title: "Почему небо голубое?", views: "4 210", income: "320₽", status: "опубликован", statusColor: "#00CC44" },
    { id: 2, title: "Как работает ИИ", views: "12 830", income: "1 840₽", status: "опубликован", statusColor: "#00CC44" },
    { id: 3, title: "Секрет пасты", views: "2 100", income: "0₽", status: "черновик", statusColor: "#FF6600" },
  ];

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-black mb-1">МЕНЕДЖЕР</h2>
      <p className="text-sm text-gray-500 mb-4">Управляй контентом и доходами</p>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {MANAGER_STATS.map((s) => (
          <div
            key={s.label}
            className="g-card p-4"
            style={{ borderColor: s.color, boxShadow: `3px 3px 0px ${s.color}` }}
          >
            <p className="font-oswald text-2xl font-bold text-black">{s.value}</p>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full font-oswald"
              style={{ background: s.color + "22", color: s.color, border: `1.5px solid ${s.color}` }}
            >
              {s.change} этот месяц
            </span>
          </div>
        ))}
      </div>

      {/* ВЫРУЧКА БЛОК */}
      <div
        className="g-card g-card-yellow p-4 mb-5 flex items-center gap-4"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 border-black flex-shrink-0"
          style={{ background: "#FFE000" }}
        >
          💰
        </div>
        <div className="flex-1">
          <p className="font-oswald font-bold text-black">Доступно к выводу</p>
          <p className="font-oswald text-3xl font-bold text-black">12 340₽</p>
        </div>
        <button className="btn-black px-4 py-2.5 rounded-xl text-sm text-white">
          ВЫВЕСТИ
        </button>
      </div>

      {/* POSTS LIST */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-oswald font-bold text-black">МОИ ПОСТЫ</p>
        <button
          className="btn-red px-3 py-1.5 rounded-xl text-xs text-white flex items-center gap-1"
        >
          <Icon name="Plus" size={14} /> СОЗДАТЬ
        </button>
      </div>
      <div className="space-y-2">
        {posts_mgr.map((p) => (
          <div key={p.id} className="g-card p-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-oswald font-bold text-sm text-black truncate">{p.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>👁 {p.views}</span>
                <span>💰 {p.income}</span>
              </div>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-full font-oswald flex-shrink-0"
              style={{ background: p.statusColor + "22", color: p.statusColor, border: `1.5px solid ${p.statusColor}` }}
            >
              {p.status}
            </span>
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <Icon name="MoreVertical" size={16} className="text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* MONETIZE TOOLS */}
      <div className="mt-5 mb-2">
        <p className="font-oswald font-bold text-black mb-3">ИНСТРУМЕНТЫ</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🎁", label: "Подписки", color: "g-card-purple", bg: "#8800FF" },
            { icon: "💳", label: "Продажи", color: "g-card-blue", bg: "#0044FF" },
            { icon: "📊", label: "Аналитика", color: "g-card-green", bg: "#00CC44" },
            { icon: "🎬", label: "Эфиры", color: "g-card-red", bg: "#FF0033" },
          ].map((t) => (
            <button
              key={t.label}
              className={`g-card ${t.color} p-4 flex items-center gap-3 text-left hover:scale-105 transition-transform`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border-2 border-black"
                style={{ background: t.bg }}
              >
                {t.icon}
              </div>
              <span className="font-oswald font-bold text-sm text-black">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PROFILE PAGE ─── */
function ProfilePage({ authorId, onBack }: { authorId: number | null; onBack: () => void }) {
  const author = authorId ? MOCK_AUTHORS.find(a => a.id === authorId) : null;
  const [subscribed, setSubscribed] = useState(false);

  const authorPosts = MOCK_POSTS.filter(p => author ? p.author === author.name : false);

  if (author) {
    // Профиль другого пользователя
    const levelName = author.level >= 70 ? "Легенда" : author.level >= 50 ? "Мастер" : author.level >= 30 ? "Эксперт" : "Автор";
    const xpPct = Math.round((author.level % 10) * 10);
    return (
      <div className="animate-fade-in">
        <div className="h-28 w-full" style={{ background: author.color, borderBottom: "3px solid #000" }}></div>
        <div className="px-4 pb-6">
          <div className="flex items-end justify-between -mt-9 mb-3">
            <div className="w-18 h-18 rounded-2xl bg-white flex items-center justify-center text-4xl border-3 border-black" style={{ width: 72, height: 72, border: "3px solid #000", boxShadow: `3px 3px 0px ${author.color}` }}>
              {author.avatar}
            </div>
            <div className="flex gap-2 mt-10">
              <button className="btn-outline px-3 py-2 rounded-xl text-xs flex items-center gap-1">
                <Icon name="MessageCircle" size={14} />Написать
              </button>
              <button
                onClick={() => setSubscribed(!subscribed)}
                className={`px-3 py-2 rounded-xl text-xs font-bold font-oswald transition-all ${subscribed ? "btn-outline text-black" : "btn-red text-white"}`}
              >
                {subscribed ? "Отписан" : "Подписаться"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-oswald text-2xl font-bold text-black">{author.name}</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white font-oswald">Ур.{author.level}</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">{author.category}</p>
          <p className="text-sm text-gray-600 mb-4">{author.about}</p>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Подписчики", value: (author.followers / 1000).toFixed(1) + "K", color: "#FF00AA" },
              { label: "Подписки",   value: author.following.toString(),               color: "#0044FF" },
              { label: "Лайки",      value: (author.likes / 1000).toFixed(0) + "K",   color: "#FF0033" },
            ].map((s) => (
              <div key={s.label} className="g-card p-3 text-center" style={{ borderColor: s.color, boxShadow: `3px 3px 0px ${s.color}` }}>
                <p className="font-oswald text-xl font-bold text-black">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* LEVEL */}
          <div className="g-card g-card-yellow p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-oswald font-bold text-sm text-black">Уровень {author.level} — {levelName}</span>
              <span className="text-xs font-bold text-gray-600">{xpPct * 30} / 3 000 XP</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
              <div className="h-full rounded-full" style={{ width: `${xpPct}%`, background: author.color }}></div>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <p className="font-oswald font-bold text-black mb-3">ДОСТИЖЕНИЯ</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className={`g-card p-3 text-center ${!a.unlocked ? "opacity-40" : ""}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <p className="text-[10px] font-bold text-black font-oswald">{a.title}</p>
              </div>
            ))}
          </div>

          {/* POSTS */}
          <p className="font-oswald font-bold text-black mb-3">ПОСТЫ АВТОРА</p>
          <div className="space-y-3 mb-4">
            {(authorPosts.length ? authorPosts : MOCK_POSTS).map((p) => (
              <div key={p.id} className="g-card p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-oswald font-bold text-sm text-black truncate">{p.title}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>❤️ {p.likes.toLocaleString()}</span><span>💬 {p.comments}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full font-oswald" style={{ background: p.tagBg, color: p.tagColor, border: "1.5px solid #000" }}>{p.tag}</span>
              </div>
            ))}
          </div>

          {/* DONATE */}
          <button className="w-full py-3.5 rounded-2xl text-sm font-black font-oswald text-white flex items-center justify-center gap-2" style={{ background: "#FF00AA", border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}>
            <Icon name="Gift" size={18} className="text-white" /> ПОДДЕРЖАТЬ ДОНАТОМ
          </button>
        </div>
      </div>
    );
  }

  // Свой профиль (переход из нав-бара без авторId)
  return (
    <div className="animate-fade-in">
      <div className="h-32 w-full stripe-bg" style={{ background: "#FFE000", borderBottom: "3px solid #000" }}></div>
      <div className="px-4 pb-6">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-4xl" style={{ border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}>😎</div>
          <button className="btn-outline px-4 py-2 rounded-xl text-sm flex items-center gap-1.5"><Icon name="Pencil" size={14} />Редактировать</button>
        </div>
        <h2 className="font-oswald text-2xl font-bold text-black">Александр Иванов</h2>
        <p className="text-gray-500 text-sm mb-4">@alex_curious · Спрашиваю обо всём 🤔</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Подписчики", value: "4 280", color: "#FF00AA" },
            { label: "Подписки",   value: "138",   color: "#0044FF" },
            { label: "Лайки",      value: "18.4K", color: "#FF0033" },
          ].map((s) => (
            <div key={s.label} className="g-card p-3 text-center" style={{ borderColor: s.color, boxShadow: `3px 3px 0px ${s.color}` }}>
              <p className="font-oswald text-xl font-bold text-black">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="g-card g-card-yellow p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-oswald font-bold text-sm text-black">Уровень 34 — Исследователь</span>
            <span className="text-xs font-bold text-gray-600">2 340 / 3 000 XP</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
            <div className="h-full rounded-full" style={{ width: "78%", background: "#FFE000" }}></div>
          </div>
        </div>
        <p className="font-oswald font-bold text-black mb-3">ДОСТИЖЕНИЯ</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className={`g-card p-3 text-center ${!a.unlocked ? "opacity-40" : ""}`}>
              <div className="text-2xl mb-1">{a.icon}</div>
              <p className="text-[10px] font-bold text-black font-oswald">{a.title}</p>
            </div>
          ))}
        </div>
        <div className="g-card g-card-red p-4">
          <div className="flex items-center gap-2 mb-3"><span>💰</span><p className="font-oswald font-bold text-black">МОНЕТИЗАЦИЯ</p></div>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 rounded-xl text-center" style={{ background: "#8800FF", border: "2px solid #000", boxShadow: "2px 2px 0px #000" }}>
              <p className="text-2xl mb-1">🎁</p><p className="text-xs text-white font-bold font-oswald">Подписки</p>
            </button>
            <button className="p-3 rounded-xl text-center" style={{ background: "#FF00AA", border: "2px solid #000", boxShadow: "2px 2px 0px #000" }}>
              <p className="text-2xl mb-1">💎</p><p className="text-xs text-white font-bold font-oswald">Продажи</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SUPPORT PAGE ─── */
function SupportPage() {
  const topics = [
    { icon: "💳", title: "Оплата и монетизация", desc: "Выводы, донаты, подписки", color: "#00CC44" },
    { icon: "🔒", title: "Безопасность", desc: "Пароль, аккаунт", color: "#0044FF" },
    { icon: "🐛", title: "Сообщить об ошибке", desc: "Что-то не работает?", color: "#FF0033" },
    { icon: "💡", title: "Предложить идею", desc: "Хотите новую функцию?", color: "#FFE000" },
    { icon: "📋", title: "Правила платформы", desc: "Что можно, что нельзя", color: "#8800FF" },
  ];

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-black mb-1">ПОДДЕРЖКА</h2>
      <p className="text-gray-500 text-sm mb-5">Чем можем помочь?</p>

      {/* PHONE BLOCK */}
      <div
        className="g-card g-card-green p-5 mb-5 flex items-center gap-4"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 border-black flex-shrink-0"
          style={{ background: "#00CC44" }}
        >
          📞
        </div>
        <div className="flex-1">
          <p className="font-oswald font-bold text-black mb-0.5">Живая поддержка</p>
          <a href="tel:+79521426352" className="font-oswald text-xl font-bold text-black block">
            +7 952 142-63-52
          </a>
          <p className="text-xs text-gray-500">Пн–Пт 9:00–21:00</p>
        </div>
        <a
          href="tel:+79521426352"
          className="btn-yellow px-4 py-3 rounded-xl text-sm font-bold text-black"
        >
          ПОЗВОНИТЬ
        </a>
      </div>

      {/* TOPICS */}
      <div className="space-y-2">
        {topics.map((t) => (
          <button
            key={t.title}
            className="w-full g-card p-4 flex items-center gap-4 text-left hover:scale-[1.01] transition-transform"
            style={{ borderColor: t.color, boxShadow: `3px 3px 0px ${t.color}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border-2 border-black"
              style={{ background: t.color + "33" }}
            >
              {t.icon}
            </div>
            <div className="flex-1">
              <p className="font-oswald font-bold text-black text-sm">{t.title}</p>
              <p className="text-xs text-gray-400">{t.desc}</p>
            </div>
            <Icon name="ChevronRight" size={18} className="text-gray-300" />
          </button>
        ))}
      </div>

      <div className="mt-5 g-card g-card-yellow p-4 text-center">
        <p className="text-2xl mb-1">⚡</p>
        <p className="font-oswald font-bold text-black mb-0.5">Среднее время ответа</p>
        <p className="font-oswald text-3xl font-black text-black">~15 минут</p>
      </div>
    </div>
  );
}