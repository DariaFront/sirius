/**
 * Инициализация бегущей строки партнёров
 * @param {string[]} logoFiles - массив имён файлов: ['logo1.png', 'logo2.png']
 * @param {string} basePath - путь к папке с логотипами
 */
function initPartnerLogos(logoFiles, basePath = 'img/logo/') {
    const container = document.getElementById('brands-logos');
    if (!container) return;

    // Очищаем контейнер
    container.innerHTML = '';

    // Создаём трек для анимации
    const track = document.createElement('div');
    track.className = 'brands-logos__track';

    // Функция создания изображения
    const createLogo = (filename) => {
        const img = document.createElement('img');
        img.src = `${basePath}${filename}`;
        img.alt = filename.replace('.png', '');
        img.loading = 'lazy';
        img.decoding = 'async';
        return img;
    };

    // Добавляем оригинальные логотипы
    logoFiles.forEach(file => {
        track.appendChild(createLogo(file));
    });

    // 🔁 Дублируем контент для бесшовной петли (важно для анимации!)
    logoFiles.forEach(file => {
        track.appendChild(createLogo(file));
    });

    container.appendChild(track);

    // 🎯 Динамическая корректировка скорости анимации
    // Чем больше контента — тем медленнее прокрутка (визуально комфортнее)
    const updateAnimationSpeed = () => {
        const trackWidth = track.scrollWidth / 2; // половина — оригинальный контент
        const containerWidth = container.clientWidth;
        // Базовая скорость: ~50px в секунду
        const duration = (trackWidth / 50);
        track.style.animationDuration = `${Math.max(duration, 15)}s`; // мин. 15 сек
    };

    // Пересчитываем при загрузке и ресайзе
    window.addEventListener('load', updateAnimationSpeed);
    window.addEventListener('resize', updateAnimationSpeed);

    // Запускаем пересчёт после отрисовки изображений
    track.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            updateAnimationSpeed();
        } else {
            img.addEventListener('load', updateAnimationSpeed, { once: true });
        }
    });
}

// 🚀 Инициализация (укажи свои файлы!)
// 💡 Совет: этот массив можно генерировать на бэкенде и передавать в шаблон
const LOGO_FILES = [
    'go.jpg',
    'poyal.jpg',
    'proplan.jpg',
    'now.jpg',
    'organik.jpg',
    'almo.jpg',
    'sheba.jpg',
    'avanse.jpg',
    'florida.jpg',
    'one.jpg',
    'savita.jpg',
    'taorima.jpg',
    // Добавляй или удаляй файлы по необходимости
];

// Запускаем после DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initPartnerLogos(LOGO_FILES);
});