import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "feed" | "profile" | "search" | "subscriptions" | "messenger" | "support" | "notifications";

const MOCK_POSTS = [
  {
    id: 1,
    author: "Алина Сова",
    avatar: "🦉",
    level: 42,
    badge: "Мастер",
    time: "2 мин назад",
    tag: "Наука",
    tagColor: "bg-cyan-500/20 text-cyan-400",
    title: "Почему небо голубое? Объясняю за 60 секунд",
    text: "Всё дело в рэлеевском рассеянии! Молекулы воздуха рассеивают коротковолновый синий свет сильнее, чем красный. Именно поэтому мы видим синее небо днём и красные закаты вечером.",
    likes: 1284,
    comments: 87,
    shares: 203,
    isLiked: false,
    isPremium: false,
  },
  {
    id: 2,
    author: "Дима Кодер",
    avatar: "💻",
    level: 78,
    badge: "Легенда",
    time: "15 мин назад",
    tag: "Технологии",
    tagColor: "bg-purple-500/20 text-purple-400",
    title: "Как работает искусственный интеллект — простыми словами",
    text: "ИИ — это математика + данные. Нейронная сеть обучается на миллионах примеров и учится находить закономерности. Никакой магии, только статистика.",
    likes: 3421,
    comments: 256,
    shares: 891,
    isLiked: true,
    isPremium: true,
  },
  {
    id: 3,
    author: "Марина Шеф",
    avatar: "👩‍🍳",
    level: 25,
    badge: "Эксперт",
    time: "1 час назад",
    tag: "Кулинария",
    tagColor: "bg-orange-500/20 text-orange-400",
    title: "Секрет идеальной пасты: три ошибки которые вы делаете",
    text: "Первая — мало воды. Вторая — недосоленная вода. Третья — промываете пасту холодной водой после варки. Исправьте это — и результат вас удивит.",
    likes: 892,
    comments: 143,
    shares: 67,
    isLiked: false,
    isPremium: false,
  },
];

const MOCK_STORIES = [
  { id: 1, name: "Вы", avatar: "➕", isAdd: true, isLive: false },
  { id: 2, name: "Алина", avatar: "🦉", isAdd: false, isLive: false },
  { id: 3, name: "Дима", avatar: "💻", isAdd: false, isLive: true },
  { id: 4, name: "Марина", avatar: "👩‍🍳", isAdd: false, isLive: false },
  { id: 5, name: "Артём", avatar: "🎸", isAdd: false, isLive: false },
  { id: 6, name: "Катя", avatar: "🎨", isAdd: false, isLive: true },
  { id: 7, name: "Игорь", avatar: "🏋️", isAdd: false, isLive: false },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, icon: "❤️", text: "Алина Сова лайкнула ваш пост", time: "2 мин", isNew: true },
  { id: 2, icon: "💬", text: "Дима Кодер ответил на ваш комментарий", time: "10 мин", isNew: true },
  { id: 3, icon: "🔔", text: "Новый подписчик: Марина Шеф", time: "1 час", isNew: true },
  { id: 4, icon: "💰", text: "Вы получили донат 500₽ от Артёма", time: "3 часа", isNew: false },
  { id: 5, icon: "🏆", text: "Новое достижение: «Популярный автор»", time: "вчера", isNew: false },
  { id: 6, icon: "⭐", text: "Ваш пост попал в рекомендации", time: "вчера", isNew: false },
];

const MOCK_CHATS = [
  { id: 1, name: "Алина Сова", avatar: "🦉", msg: "Спасибо за комментарий!", time: "сейчас", unread: 2, online: true },
  { id: 2, name: "Дима Кодер", avatar: "💻", msg: "Давай коллаборацию?", time: "5 мин", unread: 0, online: true },
  { id: 3, name: "Марина Шеф", avatar: "👩‍🍳", msg: "Рецепт скоро пришлю", time: "1 час", unread: 1, online: false },
  { id: 4, name: "Артём Гитара", avatar: "🎸", msg: "Новый трек вышел!", time: "вчера", unread: 0, online: false },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Популярный автор", desc: "1000+ лайков", unlocked: true },
  { icon: "🔥", title: "На волне", desc: "7 дней подряд", unlocked: true },
  { icon: "💎", title: "Легенда", desc: "10 000 подписчиков", unlocked: false },
  { icon: "🚀", title: "Запуск", desc: "Первый пост", unlocked: true },
  { icon: "🎯", title: "В яблочко", desc: "100 репостов", unlocked: true },
  { icon: "⚡", title: "Молния", desc: "Пост за день", unlocked: false },
];

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const navItems = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "feed", icon: "LayoutGrid", label: "Лента" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "Уведомления" },
    { id: "messenger", icon: "MessageCircle", label: "Сообщения" },
    { id: "subscriptions", icon: "Users", label: "Подписки" },
    { id: "profile", icon: "User", label: "Профиль" },
    { id: "support", icon: "LifeBuoy", label: "Поддержка" },
  ] as const;

  return (
    <div className="min-h-screen mesh-bg font-golos">
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-glow px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤔</span>
          <span className="font-oswald text-xl font-bold gradient-text">ПОЧЕМУЧКА</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage("notifications")}
            className="relative p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <Icon name="Bell" size={20} className="text-white/70" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500"></span>
          </button>
          <button
            onClick={() => setActivePage("messenger")}
            className="p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <Icon name="MessageCircle" size={20} className="text-white/70" />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-16 pb-28 min-h-screen">
        {activePage === "home" && <HomePage setActivePage={setActivePage} posts={posts} toggleLike={toggleLike} />}
        {activePage === "feed" && <FeedPage posts={posts} toggleLike={toggleLike} />}
        {activePage === "search" && <SearchPage />}
        {activePage === "notifications" && <NotificationsPage />}
        {activePage === "messenger" && <MessengerPage activeChat={activeChat} setActiveChat={setActiveChat} />}
        {activePage === "subscriptions" && <SubscriptionsPage />}
        {activePage === "profile" && <ProfilePage />}
        {activePage === "support" && <SupportPage />}
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 nav-glow px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as Page)}
              className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
                activePage === item.id
                  ? "text-purple-400"
                  : "text-white/35 hover:text-white/70"
              }`}
            >
              <div className={`relative ${activePage === item.id ? "scale-110" : ""} transition-transform`}>
                <Icon name={item.icon} size={20} />
                {item.id === "notifications" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-500"></span>
                )}
              </div>
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ setActivePage, posts, toggleLike }: {
  setActivePage: (p: Page) => void;
  posts: typeof MOCK_POSTS;
  toggleLike: (id: number) => void;
}) {
  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <div className="px-4 pt-4 pb-5">
        <div className="relative rounded-3xl overflow-hidden p-6" style={{
          background: "linear-gradient(135deg, #1a1040 0%, #2d1060 50%, #1a0830 100%)",
          border: "1px solid rgba(168,85,247,0.3)"
        }}>
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.4), transparent 60%)"
          }}></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="live-badge text-white text-xs font-bold px-2 py-0.5 rounded-full">● ПРЯМОЙ ЭФИР</span>
              <span className="text-white/50 text-xs">2 830 зрителей</span>
            </div>
            <h1 className="font-oswald text-3xl font-bold text-white mb-1">
              Дима Кодер
            </h1>
            <p className="text-white/70 text-sm mb-4">«Пишем мобильное приложение с нуля»</p>
            <button
              onClick={() => setActivePage("feed")}
              className="btn-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            >
              Смотреть эфир
            </button>
          </div>
        </div>
      </div>

      {/* STORIES */}
      <div className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {MOCK_STORIES.map((s) => (
            <div key={s.id} className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl ${s.isAdd ? "bg-white/10 border-2 border-dashed border-white/30" : "story-ring"}`}>
                <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl ${!s.isAdd ? "bg-[#0f0f1a]" : ""}`}>
                  {s.avatar}
                </div>
                {s.isLive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">LIVE</span>
                )}
              </div>
              <span className="text-[10px] text-white/60">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING TAGS */}
      <div className="px-4 mb-3">
        <h2 className="font-oswald text-lg font-semibold text-white/90 mb-2">🔥 В тренде</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {["Наука", "Технологии", "Кулинария", "Музыка", "Спорт", "Психология"].map((tag) => (
            <button key={tag} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-white/8 text-white/70 hover:bg-purple-500/30 hover:text-purple-300 border border-white/10 transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* POSTS */}
      <div className="px-4 pt-1 space-y-4">
        {posts.slice(0, 2).map((post, i) => (
          <PostCard key={post.id} post={post} toggleLike={toggleLike} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

/* ─── FEED PAGE ─── */
function FeedPage({ posts, toggleLike }: { posts: typeof MOCK_POSTS; toggleLike: (id: number) => void }) {
  return (
    <div className="px-4 pt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-oswald text-2xl font-bold text-white">Лента</h2>
        <div className="flex gap-1.5">
          {["Все", "Подписки", "Рекомендации"].map((f, i) => (
            <button key={f} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${i === 0 ? "btn-gradient text-white" : "bg-white/8 text-white/60 border border-white/10"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} toggleLike={toggleLike} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}

/* ─── POST CARD ─── */
function PostCard({ post, toggleLike, delay = 0 }: {
  post: typeof MOCK_POSTS[0];
  toggleLike: (id: number) => void;
  delay?: number;
}) {
  return (
    <div
      className="card-glow rounded-2xl p-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-white">{post.author}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
              Ур. {post.level}
            </span>
            {post.isPremium && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">
                💎 PRO
              </span>
            )}
          </div>
          <span className="text-xs text-white/40">{post.time}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${post.tagColor}`}>
          {post.tag}
        </span>
      </div>

      <h3 className="font-oswald text-lg font-semibold text-white mb-2 leading-tight">{post.title}</h3>
      <p className="text-sm text-white/60 leading-relaxed mb-4">{post.text}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleLike(post.id)}
            className={`flex items-center gap-1.5 text-sm transition-all ${post.isLiked ? "text-pink-400" : "text-white/40 hover:text-pink-400"}`}
          >
            <Icon name="Heart" size={18} />
            <span className="font-medium">{post.likes.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-white/40 hover:text-cyan-400 transition-all">
            <Icon name="MessageCircle" size={18} />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-white/40 hover:text-purple-400 transition-all">
            <Icon name="Share2" size={18} />
            <span>{post.shares}</span>
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-pink-500/15 text-pink-400 hover:bg-pink-500/25 transition-all border border-pink-500/20">
          <Icon name="Gift" size={14} />
          Донат
        </button>
      </div>
    </div>
  );
}

/* ─── SEARCH PAGE ─── */
function SearchPage() {
  const [query, setQuery] = useState("");
  const categories = [
    { icon: "🔬", label: "Наука", color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/20" },
    { icon: "💻", label: "Технологии", color: "from-purple-500/20 to-indigo-500/20 border-purple-500/20" },
    { icon: "🎵", label: "Музыка", color: "from-pink-500/20 to-rose-500/20 border-pink-500/20" },
    { icon: "🍕", label: "Кулинария", color: "from-orange-500/20 to-amber-500/20 border-orange-500/20" },
    { icon: "🎨", label: "Творчество", color: "from-rose-500/20 to-pink-500/20 border-rose-500/20" },
    { icon: "🏋️", label: "Спорт", color: "from-green-500/20 to-emerald-500/20 border-green-500/20" },
    { icon: "🧠", label: "Психология", color: "from-violet-500/20 to-purple-500/20 border-violet-500/20" },
    { icon: "📸", label: "Фото/Видео", color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/20" },
  ];
  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-white mb-4">Поиск</h2>
      <div className="relative mb-6">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Авторы, темы, посты..."
          className="w-full bg-white/8 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
        />
      </div>
      <p className="text-xs text-white/40 mb-3 uppercase tracking-wider font-medium">Категории</p>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button key={cat.label} className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${cat.color} border text-left hover:scale-105 transition-transform`}>
            <span className="text-2xl">{cat.icon}</span>
            <span className="font-semibold text-white text-sm">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── NOTIFICATIONS PAGE ─── */
function NotificationsPage() {
  return (
    <div className="px-4 pt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-oswald text-2xl font-bold text-white">Уведомления</h2>
        <button className="text-xs text-purple-400 hover:text-purple-300">Прочитать все</button>
      </div>
      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 p-4 rounded-2xl transition-all ${n.isNew ? "card-glow" : "bg-white/4 border border-white/5"}`}>
            <span className="text-2xl mt-0.5">{n.icon}</span>
            <div className="flex-1">
              <p className={`text-sm ${n.isNew ? "text-white" : "text-white/60"}`}>{n.text}</p>
              <span className="text-xs text-white/30">{n.time}</span>
            </div>
            {n.isNew && <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></span>}
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
      <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
        <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-white/8">
          <button onClick={() => setActiveChat(null)} className="p-2 rounded-full hover:bg-white/10">
            <Icon name="ArrowLeft" size={20} className="text-white/70" />
          </button>
          <span className="text-2xl">{chat?.avatar}</span>
          <div>
            <p className="font-semibold text-white text-sm">{chat?.name}</p>
            <p className="text-xs text-green-400">{chat?.online ? "онлайн" : "не в сети"}</p>
          </div>
        </div>
        <div className="flex-1 px-4 py-4 flex flex-col justify-end gap-3 overflow-y-auto">
          <div className="self-start max-w-[75%] bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5">
            <p className="text-sm text-white">{chat?.msg}</p>
            <span className="text-[10px] text-white/30">12:30</span>
          </div>
          <div className="self-end max-w-[75%] btn-gradient rounded-2xl rounded-tr-sm px-4 py-2.5">
            <p className="text-sm text-white">Привет! Да, звучит интересно 👋</p>
            <span className="text-[10px] text-white/70">12:31</span>
          </div>
        </div>
        <div className="px-4 py-3 flex gap-2">
          <input placeholder="Сообщение..." className="flex-1 bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50" />
          <button className="btn-gradient w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-white mb-4">Сообщения</h2>
      <div className="space-y-2">
        {MOCK_CHATS.map((chat) => (
          <button key={chat.id} onClick={() => setActiveChat(chat.id)} className="w-full flex items-center gap-3 p-4 rounded-2xl card-glow text-left">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">{chat.avatar}</div>
              {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0f0f1a]"></span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-semibold text-sm text-white">{chat.name}</span>
                <span className="text-xs text-white/30">{chat.time}</span>
              </div>
              <p className="text-xs text-white/50 truncate">{chat.msg}</p>
            </div>
            {chat.unread > 0 && (
              <span className="w-5 h-5 rounded-full btn-gradient flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
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
function SubscriptionsPage() {
  const authors = [
    { id: 1, name: "Алина Сова", avatar: "🦉", category: "Наука", followers: "12.4K", level: 42, subscribed: true },
    { id: 2, name: "Дима Кодер", avatar: "💻", category: "Технологии", followers: "89.1K", level: 78, subscribed: true },
    { id: 3, name: "Марина Шеф", avatar: "👩‍🍳", category: "Кулинария", followers: "34.2K", level: 25, subscribed: false },
    { id: 4, name: "Артём Гитара", avatar: "🎸", category: "Музыка", followers: "56.7K", level: 61, subscribed: true },
  ];
  const [subs, setSubs] = useState(authors);

  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-white mb-4">Подписки</h2>
      <div className="flex gap-2 mb-4">
        {["Мои подписки", "Рекомендации"].map((t, i) => (
          <button key={t} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "btn-gradient text-white" : "bg-white/8 text-white/60 border border-white/10"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {subs.map((a) => (
          <div key={a.id} className="card-glow rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">{a.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-semibold text-white text-sm">{a.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Ур. {a.level}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>{a.category}</span>
                <span>•</span>
                <span>{a.followers} подписчиков</span>
              </div>
            </div>
            <button
              onClick={() => setSubs(subs.map(s => s.id === a.id ? { ...s, subscribed: !s.subscribed } : s))}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${a.subscribed ? "bg-white/10 text-white/60 border border-white/15" : "btn-gradient text-white"}`}
            >
              {a.subscribed ? "Отписаться" : "Подписаться"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PROFILE PAGE ─── */
function ProfilePage() {
  return (
    <div className="animate-fade-in">
      <div className="h-36 w-full" style={{
        background: "linear-gradient(135deg, #4c1d95, #be185d, #0e7490)"
      }}></div>
      <div className="px-4 pb-6">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <div className="story-ring w-20 h-20 rounded-full">
            <div className="w-[76px] h-[76px] rounded-full bg-[#0f0f1a] flex items-center justify-center text-4xl">
              😎
            </div>
          </div>
          <button className="px-4 py-2 rounded-full border border-purple-500/40 text-purple-300 text-sm font-medium hover:bg-purple-500/10 transition-all">
            Редактировать
          </button>
        </div>

        <h2 className="font-oswald text-2xl font-bold text-white">Александр Иванов</h2>
        <p className="text-white/50 text-sm mb-4">@alex_curious · Спрашиваю обо всём 🤔</p>

        {/* LEVEL BAR */}
        <div className="card-glow rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white font-medium">Уровень 34 — Исследователь</span>
            <span className="text-xs text-purple-400">2 340 / 3 000 XP</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{
              width: "78%",
              background: "linear-gradient(90deg, #a855f7, #ec4899)"
            }}></div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Подписчики", value: "4 280" },
            { label: "Посты", value: "127" },
            { label: "Донаты", value: "18.4K₽" },
          ].map((s) => (
            <div key={s.label} className="card-glow rounded-xl p-3 text-center">
              <p className="font-oswald text-xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ACHIEVEMENTS */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white/80">Достижения</p>
            <button className="text-xs text-purple-400">Все →</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className={`rounded-xl p-3 text-center transition-all ${a.unlocked ? "card-glow" : "bg-white/4 border border-white/5 opacity-40"}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <p className="text-[10px] text-white/70 font-medium leading-tight">{a.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MONETIZATION */}
        <div className="card-glow rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💰</span>
            <p className="font-semibold text-white text-sm">Монетизация</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/20 text-center hover:bg-purple-500/25 transition-all">
              <p className="text-2xl mb-1">🎁</p>
              <p className="text-xs text-purple-300 font-medium">Подписки</p>
            </button>
            <button className="p-3 rounded-xl bg-pink-500/15 border border-pink-500/20 text-center hover:bg-pink-500/25 transition-all">
              <p className="text-2xl mb-1">💎</p>
              <p className="text-xs text-pink-300 font-medium">Продажи</p>
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
    { icon: "💳", title: "Оплата и монетизация", desc: "Выводы, донаты, подписки" },
    { icon: "🔒", title: "Безопасность", desc: "Пароль, аккаунт, конфиденциальность" },
    { icon: "🐛", title: "Сообщить об ошибке", desc: "Что-то не работает?" },
    { icon: "💡", title: "Предложить идею", desc: "Хотите новую функцию?" },
    { icon: "📋", title: "Правила платформы", desc: "Что можно, что нельзя" },
    { icon: "📞", title: "Связаться с нами", desc: "Живой чат с поддержкой" },
  ];
  return (
    <div className="px-4 pt-4 animate-fade-in">
      <h2 className="font-oswald text-2xl font-bold text-white mb-1">Поддержка</h2>
      <p className="text-white/40 text-sm mb-5">Чем можем помочь?</p>
      <div className="relative mb-5">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          placeholder="Поиск по справке..."
          className="w-full bg-white/8 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
        />
      </div>
      <div className="space-y-2">
        {topics.map((t) => (
          <button key={t.title} className="w-full card-glow rounded-2xl p-4 flex items-center gap-4 text-left hover:scale-[1.01] transition-transform">
            <span className="text-2xl">{t.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">{t.title}</p>
              <p className="text-xs text-white/40">{t.desc}</p>
            </div>
            <Icon name="ChevronRight" size={18} className="text-white/20" />
          </button>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-2xl text-center" style={{
        background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))",
        border: "1px solid rgba(168,85,247,0.2)"
      }}>
        <p className="text-2xl mb-2">🚀</p>
        <p className="font-semibold text-white text-sm mb-1">Среднее время ответа</p>
        <p className="text-2xl font-oswald font-bold gradient-text">~15 минут</p>
      </div>
    </div>
  );
}
