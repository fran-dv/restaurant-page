import '/src/css/styles.css';
import 'animate.css';

import { loadHome, destroyHome } from './home.js';
import { loadMenu, destroyMenu, changeMenuTab } from './menu.js';
import { loadReservations, destroyReservations } from './reservations.js';

const destroyMainContent = () => {
    const main = document.querySelector('#dynamic-main');
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    };
}

const getCurrentSection = () => {
    return document.querySelector('#dynamic-main').dataset.currentSection;
}

const resetMainElement = () => {    
    switch (getCurrentSection()) {
        case 'home':
            destroyHome();
            break;
        case 'menu':
            destroyMenu();
            break;
        case 'reservations':
            destroyReservations();
            break;
    };
    const main = document.querySelector('#dynamic-main');
    main.setAttribute('data-current-section', '');
}

loadHome();

document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (target === null){ return };

    

    switch (target.dataset.action) {
        case 'go-home':
            if (getCurrentSection() !== 'home'){
                resetMainElement();
                loadHome();
            }
            break;
        case 'go-menu':
            if (getCurrentSection() !== 'menu'){
                resetMainElement();
                loadMenu();
            }
            break;
        case 'go-reservations':

            if (getCurrentSection() !== 'reservations') {
                resetMainElement();
                loadReservations();
            }
            break;
        case 'change-menu-tab':
            changeMenuTab(target);
            break;
    }

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
});

export { destroyMainContent };
