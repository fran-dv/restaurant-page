import '/src/css/menu.css';
import mainCoursesImg from '/src/assets/image/main-courses.jpg';
import startersImg from '/src/assets/image/starters.jpg';
import cocktailsImg from '/src/assets/image/cocktails.jpg';
import { destroyMainContent } from './index';

const menuImages = {
    mainCourses: mainCoursesImg,
    starters: startersImg,
    cocktails: cocktailsImg,
};




const destroyMenu = () => {
    destroyMainContent();
}

const deselectMenuTabs = () => {
    const menuTabs = document.querySelectorAll('.menu-tab');
    menuTabs.forEach((tab) => {
        tab.classList.remove('selected');
    });
}

const menuData = {
    starters: [
        {
            name: 'Octopus "Papyrus"',
            description: 'Charred tentacle pressed between edible rice paper, sumac ash',
            price: 24
        },
        {
            name: 'Liquid Olive Sphere',
            description: 'Olive essence encapsulated in almond milk foam, basil air',
            price: 22
        },
        {
            name: 'Forbidden Reef Ceviche',
            description: 'Amberjack, sea grapes, pickled murex shells (dyed with Tyrian purple)',
            price: 28
        },
        {
            name: 'Sicilian Caponata',
            description: 'Eggplant, pine nuts, golden raisins, aged balsamic',
            price: 19
        },
        {
            name: 'Black Ink Orzo',
            description: 'Aegean sea urchin, squid ink, lemon zest',
            price: 26
        }
    ],
    mainCourses: [
        {
            name: 'John Dory "en Papillote"',
            description: 'Steamed in fig leaves with samphire, fennel pollen, Mastiha resin',
            price: 42
        },
        {
            name: '48-Hour Lamb Shoulder',
            description: 'Za\'atar crust, black garlic jus, freekeh risotto',
            price: 46
        },
        {
            name: 'Phoenician Silk Ravioli',
            description: 'Saffron pasta, wild boar ragù, Pecorino di Fossa',
            price: 38
        },
        {
            name: 'Minoan Quail',
            description: 'Pomegranate-glazed, stuffed with pistachio, juniper smoke',
            price: 40
        },
        {
            name: 'Vegetarian Odyssey',
            description: 'Charred leek heart, black garlic tahini, fermented mushroom "bresaola"',
            price: 36
        }
    ],
    cocktails: [
        {
            name: 'Aegean Breeze',
            description: 'Citrus-infused vodka, mastiha resin, fresh thyme, lime foam',
            price: 16
        },
        {
            name: 'Phoenician Negroni',
            description: 'Cretan tsikoudia代替 gin, blood orange Campari, vermouth',
            price: 18
        },
        {
            name: 'Saffron Smoke',
            description: 'Mezcal, saffron honey syrup, grapefruit bitters, smoked rosemary',
            price: 17
        },
        {
            name: 'Al-Andalus',
            description: 'Pedro Ximénez sherry, cardamom, edible gold leaf',
            price: 19
        },
        {
            name: 'Salt Bank Spritz',
            description: 'Prosecco, sea buckthorn, rosemary seawater',
            price: 15
        }
    ]
};

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

const loadMenuContent = (contentToLoad) => {
    const menuContentDiv = document.querySelector('.menu-content');
    const content = kebabToCamel(contentToLoad);
    if (!(content in menuData)) {
        console.log(`loadMenuContent() ERROR: ${content} is not a property of menuData`);
        return;
    }
    // set the data-content value in kebab case format
    menuContentDiv.setAttribute('data-content', contentToLoad);
    const menuOptionsDiv = document.querySelector('.menu-options');
    // remove current content
    while (menuOptionsDiv.firstChild){
        menuOptionsDiv.removeChild(menuOptionsDiv.firstChild);
    }
    // insert new content
    for (let i = 0; i < menuData[content].length; i++) {
        const option = menuData[content][i]; 

        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        const optionName = document.createElement('h2');
        optionName.classList.add('name');
        optionName.textContent = option.name;
        optionDiv.appendChild(optionName);
        const optionDescription = document.createElement('p');
        optionDescription.classList.add('description');
        optionDescription.textContent = option.description;
        optionDiv.appendChild(optionDescription);
        const optionPrice = document.createElement('p');
        optionPrice.classList.add('price');
        optionPrice.textContent = option.price;
        optionDiv.appendChild(optionPrice);

        menuOptionsDiv.appendChild(optionDiv);
    }

    // load image
    const menuImageDiv = document.querySelector('.menu-image');
    while (menuImageDiv.firstChild) {
        menuImageDiv.removeChild(menuImageDiv.firstChild);
    };
    const img = document.createElement('img');
    img.src = menuImages[content];
    menuImageDiv.appendChild(img);
}

const changeMenuTab = (tab) => {
    if (!tab.dataset.target) { return };
    deselectMenuTabs();
    tab.classList.add('selected');
    loadMenuContent(tab.dataset.target);
}

const generateTitle = () => {
    const title = document.createElement('h1');
    const titleI = document.createElement('i');
    titleI.textContent = 'MENU';
    title.appendChild(titleI);
    return title;
}

const generateNavBar = () => {
    const nav = document.createElement('nav');
    nav.classList.add('menu-nav');
    const menuSubsections = ['starters', 'main-courses', 'cocktails'];
    menuSubsections.forEach((subSection) => {
        const button = document.createElement('button');
        button.classList.add('menu-tab');
        button.setAttribute('data-action', 'change-menu-tab');
        button.setAttribute('data-target', subSection);
        const p = document.createElement('p');
        p.textContent = subSection;
        button.appendChild(p);
        nav.appendChild(button);
    });
    return nav;
}

const generateMenuContent = () => {
    const menuContentDiv = document.createElement('div');
    menuContentDiv.classList.add('menu-content');
    menuContentDiv.setAttribute('data-content', ' ');
    const menuOptionsDiv = document.createElement('div');
    menuOptionsDiv.classList.add('menu-options');
    menuContentDiv.appendChild(menuOptionsDiv);
    const menuImageDiv = document.createElement('div');
    menuImageDiv.classList.add('menu-image');
    menuContentDiv.appendChild(menuImageDiv);

    return menuContentDiv;
}


const loadMenu = () => {
    document.querySelector('header').classList.add('scrolled');
    const main = document.querySelector('#dynamic-main');
    main.setAttribute('data-current-section', 'menu');
    // menu section generation
    const menuSection = document.createElement('div');
    menuSection.id = 'menu';

    const title = generateTitle();
    menuSection.appendChild(title);

    const navBar = generateNavBar();
    menuSection.appendChild(navBar);

    const menuContentDiv = generateMenuContent();
    menuSection.appendChild(menuContentDiv);

    main.appendChild(menuSection);
    // load starters as default
    changeMenuTab(document.querySelector('[data-target=starters]'));
}


export { loadMenu, destroyMenu, changeMenuTab };