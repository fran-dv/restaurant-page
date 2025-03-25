import '../css/styles.css';
import 'animate.css';
import './home.js';

document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (target === null){ return };

    switch (target.dataset.action) {

        

    }

});


