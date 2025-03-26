import '/src/css/home.css';
import { destroyMainContent } from './index.js';
import bgVideo from '/src/assets/video/bg-video.webm';
import downArrowSvg from '/src/assets/image/down-arrow.svg';
import aboutImg1 from '/src/assets/image/about-image-1.png';
import aboutImg2 from '/src/assets/image/about-image-2.png';
import aboutImg3 from '/src/assets/image/about-image-3.png';

const generateHeroSection = () => {
    // background video
    const bgVideoContainer = document.createElement('div');
    bgVideoContainer.classList.add('bg-video-container');
    const video = document.createElement('video');
    video.id = 'bg-video';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    const videoSource = document.createElement('source');
    videoSource.setAttribute('src', bgVideo);
    videoSource.setAttribute('type', 'video/webm');
    video.appendChild(videoSource);
    bgVideoContainer.appendChild(video);
    // down arrow button
    const downArrowA = document.createElement('a');
    downArrowA.href = '#about-us';
    const downArrowImg = document.createElement('img');
    downArrowImg.src = downArrowSvg;
    downArrowImg.alt = 'scroll-down';
    downArrowImg.classList.add('down-arrow', 'visible');
    downArrowA.appendChild(downArrowImg);
    // add to hero section
    const heroSection = document.createElement('section');
    heroSection.id = 'hero-section';
    heroSection.appendChild(bgVideoContainer);
    heroSection.appendChild(downArrowA);
    return heroSection;
};

const generateCtaButton = () => {
    const ctaButton = document.createElement('button');
    ctaButton.classList.add('cta');
    ctaButton.setAttribute('data-action', 'go-reservations')
    const buttonText = document.createElement('p');
    buttonText.textContent = 'Book a table';
    ctaButton.appendChild(buttonText);
    return ctaButton;
};

const generateAboutSection = () => {
    const aboutInfo = [
        { 
            image: aboutImg1,
            title: 'Timeless tastes',
            text: `Lumen Maris bridges millennia. Our dining room floats above Mallorc\`s
                    cliffs, where Phoenician traders once anchored. Chef Alessio Valtierra
                    reimagines their spice routes: saffron silk ravioli, octopus glazed in
                    pomegranate molasses, and olives transformed into edible amber. Dine with
                    history beneath your feet - our glass floor reveals 12th-century shipwrecks,
                    lit by the same moon that guided ancient sailors.` ,
        },
        {
            image: aboutImg2,
            title: 'Flavor symphony',
            text: `Every ingredient is a note in our culinary score. Sicilian foragers scale cliffs
                    at dawn for wild capers. Arctic salt voyages three years to crust line-caught
                    sea bass. Even the herbs – thyme from Menton, saffron from Crete – whisper their
                    origins. This isn\’t cooking. It\’s a symphony conducted by the Mediterranean itself.`
        },
        {
            image: aboutImg3,
            title: 'Net to Plate',
            text: `We fish as the ancients did – with respect, never excess. Our nets are cast at dawn,
                    guided by generations of knowledge. Your meal swam freely just hours ago. Through the
                    \‘Salt Bank\’ (5% of every bill), we replant seagrass to shelter tomorrow\’s catch. Here,
                    tradition and progress pull the same net.`
        },
    ];

    const aboutSection = document.createElement('section');
    aboutSection.id = 'about-us';

    for (let i = 0; i < aboutInfo.length; i++){
        const aboutBlockDiv = document.createElement('div');
        aboutBlockDiv.classList.add('about-block');
        const aboutTextDiv = document.createElement('div');
        aboutTextDiv.classList.add('text-block');
        const aboutH2 = document.createElement('h2');
        aboutH2.textContent = aboutInfo[i].title;
        const aboutP = document.createElement('p');
        aboutP.textContent = aboutInfo[i].text;
        aboutTextDiv.appendChild(aboutH2);
        aboutTextDiv.appendChild(aboutP);
        const aboutImg = document.createElement('img');
        aboutImg.src = aboutInfo[i].image;
        const imageComesFirst = i % 2 !== 0;
        if (imageComesFirst) {
            aboutImg.classList.add('image-left');
            aboutBlockDiv.appendChild(aboutImg);
            aboutBlockDiv.appendChild(aboutTextDiv);
        } else {
            aboutImg.classList.add('image-right');
            aboutBlockDiv.appendChild(aboutTextDiv);
            aboutBlockDiv.appendChild(aboutImg);
        }
        
        aboutSection.appendChild(aboutBlockDiv);
    }
    return aboutSection;
}

const handleScroll = () => {
    const header = document.querySelector('header');
    const downArrow = document.querySelector('.down-arrow');
    if (scrollY > 500) {
        header.classList.add('scrolled');
        downArrow.classList.remove('visible');
    } else {
        header.classList.remove('scrolled');
        downArrow.classList.add('visible');
    };
    const ctaButton = document.querySelector('.cta');
    let scrollYInVh = (window.scrollY / window.innerHeight) * 100;
    if (scrollYInVh >= 250) {
        ctaButton.classList.remove('visible');
    } else if (scrollYInVh > 95) {
        ctaButton.classList.add('visible');
    } else {
        ctaButton.classList.remove('visible');
    };
};

const setHomeInteractivity = () => {
    window.addEventListener('scroll', handleScroll);
};

const removeHomeListeners = () => {
    window.removeEventListener('scroll', handleScroll);
}

const loadHome = () => {
    // ensure that header background is transparent
    document.querySelector('header').classList.remove('scrolled');
    const main = document.querySelector('#dynamic-main');
    main.setAttribute('data-current-section', 'home');
    const heroSection = generateHeroSection();
    main.appendChild(heroSection);
    const ctaButton = generateCtaButton();
    main.appendChild(ctaButton);
    const aboutSection = generateAboutSection();
    main.appendChild(aboutSection);
    setHomeInteractivity();
}

const destroyHome = () => {
    destroyMainContent();
    removeHomeListeners();
}


export { loadHome, destroyHome };