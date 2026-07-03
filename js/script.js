document.addEventListener('DOMContentLoaded', () => {
    // ===== ДАННЫЕ КАТЕГОРИЙ И ПОДКАТЕГОРИЙ =====
    const categoryData = {
        cats: {
            title: 'Товары для кошек',
            items: ['Сухие корма', 'Влажные корма / Паучи', 'Наполнители', 'Когтеточки и домики', 'Игрушки и амуниция', 'Ветеринарные аптеки']
        },
        dogs: {
            title: 'Товары для собак',
            items: ['Сухие корма', 'Влажные корма / Паучи', 'Лакомства и кости', 'Амуниция и ошейники', 'Игрушки для собак', 'Ветеринарные аптеки']
        },
        puppies: {
            title: 'Для малышей',
            items: ['Корм для котят', 'Корм для щенков', 'Игрушки для малышей', 'Лежанки и домики', 'Лакомства для котят', 'Лакомства для щенков']
        },
        other: {
            title: 'Для других питомцев',
            items: ['Для птиц', 'Для грызунов', 'Для рыб', 'Для рептилий', 'Корма и смеси', 'Террариумы и клетки']
        },
        pharmacy: {
            title: 'Ветеринарные препараты',
            items: ['Противопаразитарные', 'Витамины и добавки', 'Лекарства', 'Средства от блох и клещей', 'Вакцины', 'Ветдиеты']
        }
    };

    // ===== ПОЛУЧАЕМ ЭЛЕМЕНТЫ =====
    const navLinks = document.querySelectorAll('.nav-links a[data-category]');
    const dropdownTitle = document.getElementById('dropdownTitle');
    const dropdownItems = document.getElementById('dropdownItems');
    const sidebar = document.getElementById('sidebar');
    const sidebarTitle = sidebar?.querySelector('.sidebar__title');
    const sidebarItems = sidebar?.querySelectorAll('.sidebar__item');

    // ===== ФУНКЦИЯ ОБНОВЛЕНИЯ ПОДКАТЕГОРИЙ =====
    function updateSubcategories(categoryKey) {
        const data = categoryData[categoryKey];
        if (!data) return;

        // Обновляем дропдаун (планшет)
        if (dropdownTitle && dropdownItems) {
            dropdownTitle.textContent = data.title;

            // Очищаем и заполняем пункты
            dropdownItems.innerHTML = '';
            data.items.forEach(item => {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'nav-categories-dropdown__item';
                link.innerHTML = `${item} <span class="arrow">›</span>`;
                dropdownItems.appendChild(link);
            });

            // Добавляем "Все категории"
            const allLink = document.createElement('a');
            allLink.href = '#';
            allLink.className = 'nav-categories-dropdown__item highlight';
            allLink.textContent = 'Все категории ➔';
            dropdownItems.appendChild(allLink);
        }

        // Обновляем сайдбар (десктоп)
        if (sidebarTitle && sidebarItems) {
            sidebarTitle.textContent = data.title;

            // Обновляем пункты сайдбара
            sidebarItems.forEach((item, index) => {
                const link = item.querySelector('a');
                if (link && index < data.items.length) {
                    link.innerHTML = `${data.items[index]} <span class="arrow">›</span>`;
                }
            });

            // Последний пункт - "Все категории"
            const lastItem = sidebarItems[sidebarItems.length - 1];
            if (lastItem) {
                const link = lastItem.querySelector('a');
                if (link) {
                    link.textContent = 'Все категории ➔';
                }
                lastItem.classList.add('highlight');
            }
        }
    }

    // ===== ФУНКЦИЯ АКТИВАЦИИ КАТЕГОРИИ =====
    function activateCategory(categoryKey, clickedElement) {
        // Убираем active со всех табов
        navLinks.forEach(link => link.classList.remove('active'));

        // Добавляем active на кликнутый
        if (clickedElement) {
            clickedElement.classList.add('active');
        } else {
            // Если элемент не передан, ищем по data-category
            navLinks.forEach(link => {
                if (link.dataset.category === categoryKey) {
                    link.classList.add('active');
                }
            });
        }

        // Обновляем подкатегории
        updateSubcategories(categoryKey);

        // Закрываем дропдаун если открыт
        const dropdown = document.getElementById('navCategoriesDropdown');
        const toggle = document.getElementById('navCategoriesToggle');
        if (dropdown?.classList.contains('open')) {
            dropdown.classList.remove('open');
            toggle?.classList.remove('active');
        }
    }

    // ===== ОБРАБОТЧИКИ КЛИКОВ ПО ТАБАМ =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            if (category) {
                activateCategory(category, link);
            }
        });
    });

    // ===== ИНИЦИАЛИЗАЦИЯ (активная по умолчанию - Кошки) =====
    const defaultCategory = 'cats';
    const defaultLink = document.querySelector(`.nav-links a[data-category="${defaultCategory}"]`);
    if (defaultLink) {
        activateCategory(defaultCategory, defaultLink);
    }

    // ===== КНОПКА КАТЕГОРИЙ (планшет) =====
    const categoriesToggle = document.getElementById('navCategoriesToggle');
    const categoriesDropdown = document.getElementById('navCategoriesDropdown');

    if (categoriesToggle && categoriesDropdown) {
        categoriesToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            categoriesDropdown.classList.toggle('open');
            categoriesToggle.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            const nav = document.getElementById('mainNav');
            if (nav && !nav.contains(e.target) && categoriesDropdown.classList.contains('open')) {
                categoriesDropdown.classList.remove('open');
                categoriesToggle.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && categoriesDropdown.classList.contains('open')) {
                categoriesDropdown.classList.remove('open');
                categoriesToggle.classList.remove('active');
            }
        });
    }

    // ===== МОБИЛЬНОЕ МЕНЮ (аккордеон + бургер) =====
    const navContainer = document.getElementById('navContainer');
    const menuToggle = document.getElementById('mobileMenuToggle');

    const updateMenuButtonState = (isOpen) => {
        if (!menuToggle) return;
        if (isOpen) {
            menuToggle.classList.add('active');
            menuToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            `;
        } else {
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 5h16"/>
                    <path d="M4 12h16"/>
                    <path d="M4 19h16"/>
                </svg>
            `;
        }
    };

    const openMenu = () => {
        navContainer.classList.add('container--open');
        document.body.style.overflow = 'hidden';
        updateMenuButtonState(true);
    };

    const closeMenu = () => {
        navContainer.classList.remove('container--open');
        document.body.style.overflow = '';
        updateMenuButtonState(false);
        document.querySelectorAll('.nav-mobile__parent.open').forEach(el => {
            el.classList.remove('open');
        });
    };

    if (menuToggle && navContainer) {
        updateMenuButtonState(false);

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navContainer.classList.contains('container--open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('click', (e) => {
            const nav = document.getElementById('mainNav');
            if (nav && !nav.contains(e.target) && navContainer.classList.contains('container--open')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 770 && navContainer.classList.contains('container--open')) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('container--open')) {
                closeMenu();
            }
        });
    }

    // ===== АККОРДЕОН В МОБИЛЬНОМ МЕНЮ =====
    const parents = document.querySelectorAll('.nav-mobile__parent');

    parents.forEach(parent => {
        const title = parent.querySelector('.nav-mobile__parent-title');
        if (title) {
            title.addEventListener('click', (e) => {
                e.stopPropagation();

                const targetId = title.getAttribute('data-target');
                const subMenu = document.getElementById(targetId);

                if (!subMenu) {
                    closeMenu();
                    return;
                }

                // Закрываем другие аккордеоны
                parents.forEach(p => {
                    if (p !== parent && p.classList.contains('open')) {
                        p.classList.remove('open');
                    }
                });

                parent.classList.toggle('open');
            });
        }
    });

    // Закрываем меню при клике на пункт подменю
    document.querySelectorAll('.nav-mobile__sub-item').forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // ===== МОБИЛЬНЫЙ ПОИСК =====
    const searchToggle = document.getElementById('mobileSearchToggle');
    const mobileSearch = document.getElementById('mobileSearch');
    const searchClose = document.getElementById('mobileSearchClose');
    const searchInput = mobileSearch?.querySelector('input');

    const updateSearchButtonState = (isOpen) => {
        if (!searchToggle) return;
        if (isOpen) {
            searchToggle.classList.add('active');
            searchToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            `;
        } else {
            searchToggle.classList.remove('active');
            searchToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m21 21-4.34-4.34"/>
                    <circle cx="11" cy="11" r="8"/>
                </svg>
            `;
        }
    };

    if (searchToggle && mobileSearch) {
        updateSearchButtonState(false);

        const openSearch = () => {
            mobileSearch.classList.add('active');
            setTimeout(() => searchInput?.focus(), 100);
            document.body.style.overflow = 'hidden';
            updateSearchButtonState(true);
        };

        const closeSearch = () => {
            mobileSearch.classList.remove('active');
            document.body.style.overflow = '';
            if (searchInput) searchInput.value = '';
            updateSearchButtonState(false);
        };

        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileSearch.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
        });

        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileSearch.classList.contains('active')) {
                closeSearch();
            }
        });

        mobileSearch.addEventListener('click', (e) => {
            if (e.target === mobileSearch) {
                closeSearch();
            }
        });

        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    console.log('Поиск:', searchInput.value);
                    closeSearch();
                }
            });
        }
    }

    // ===== САЙДБАР (адаптив) =====
    const updateSidebarVisibility = () => {
        const width = window.innerWidth;
        if (sidebar) {
            if (width <= 1100) {
                sidebar.style.display = 'none';
            } else {
                sidebar.style.display = 'block';
            }
        }
    };

    updateSidebarVisibility();
    window.addEventListener('resize', updateSidebarVisibility);

    // ===== ОБНОВЛЕНИЕ ПРИ ИЗМЕНЕНИИ РАЗМЕРА =====
    // При переключении между десктопом и планшетом сохраняем активную категорию
    let currentCategory = defaultCategory;

    // Перехватываем клики по табам для сохранения текущей категории
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            currentCategory = link.dataset.category;
        });
    });

    // ===== ИНИЦИАЛИЗАЦИЯ БЕГУЩЕЙ СТРОКИ БРЕНДОВ =====
    const LOGO_FILES = [
        'go.jpg', 'poyal.jpg', 'proplan.jpg', 'now.jpg',
        'organik.jpg', 'almo.jpg', 'sheba.jpg', 'avanse.jpg',
        'florida.jpg', 'one.jpg', 'savita.jpg', 'taorima.jpg',
    ];

    if (typeof initPartnerLogos === 'function') {
        initPartnerLogos(LOGO_FILES);
    }

    // ===== АНИМАЦИЯ ЛОГОТИПА =====
    const logoLink = document.querySelector('.logo a');
    const logoSvg = document.querySelector('.logo svg');

    if (logoSvg) {
        logoSvg.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease';
        logoSvg.style.opacity = '0';
        logoSvg.style.transform = 'scale(0.8) rotate(-10deg)';

        setTimeout(() => {
            logoSvg.style.opacity = '1';
            logoSvg.style.transform = 'scale(1) rotate(0deg)';
        }, 100);

        if (logoLink) {
            logoLink.addEventListener('mouseenter', () => {
                logoSvg.style.transform = 'rotate(12deg) scale(1.08)';
            });
            logoLink.addEventListener('mouseleave', () => {
                logoSvg.style.transform = 'rotate(0deg) scale(1)';
            });
        }
    }
});