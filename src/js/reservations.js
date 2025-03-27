import '/src/css/reservations.css';
import { destroyMainContent } from "./index.js";


const destroyReservations = () => {
    destroyMainContent();
}

const generateInput = (type, name, id = name, placeholder = null, required = null, min = null, max = null) => {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = id;
    if (placeholder) {
        input.placeholder = placeholder;
    }
    if (required === true || required === false){
        input.required = required;
    }
    if (min) {
        input.min = min;
    }
    if (max){
        input.max = max;
    }
    return input;
}

const generateReservationForm = () => {
    const form = document.createElement('form');
    form.id = 'reservation-form';
    form.action = '#';

    const div1 = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'name';
    nameLabel.textContent = 'Full name';
    div1.appendChild(nameLabel);
    const nameInput = generateInput('text', 'name', 'name', 'Your name', true);
    div1.appendChild(nameInput);
    form.appendChild(div1);

    const div2 = document.createElement('div');
    const phoneLabel = document.createElement('label');
    phoneLabel.htmlFor = 'phone';
    phoneLabel.textContent = 'Phone number';
    div2.appendChild(phoneLabel);
    const phoneInput = generateInput('tel', 'phone', 'phone', 'Your phone', true);
    div2.appendChild(phoneInput);
    form.appendChild(div2);

    const div3 = document.createElement('div');
    const dateLabel = document.createElement('label');
    dateLabel.htmlFor = 'date';
    dateLabel.textContent = 'Date';
    div3.appendChild(dateLabel);
    const dateInput = generateInput('date', 'date', 'date', null, true);
    div3.appendChild(dateInput);
    const dateNote = document.createElement('p');
    const dateNoteI = document.createElement('i');
    dateNoteI.textContent = 'We will contact you if there is no availability';
    dateNote.appendChild(dateNoteI);
    div3.appendChild(dateNote);
    form.appendChild(div3);

    const div4 = document.createElement('div');
    const guestsLabel = document.createElement('label');
    guestsLabel.htmlFor = 'guests';
    guestsLabel.textContent = 'Guests';
    div4.appendChild(guestsLabel);
    const guestsInput = generateInput('number', 'guests', 'guests', null, true, 1, 25);
    div4.appendChild(guestsInput);
    form.appendChild(div4);

    const div5 = document.createElement('div');
    const messageLabel = document.createElement('label');
    messageLabel.htmlFor = 'message';
    messageLabel.textContent = 'Message (optional)';
    div5.appendChild(messageLabel);
    const messageTextarea = document.createElement('textarea');
    messageTextarea.name = 'message';
    messageTextarea.id = 'message';
    messageTextarea.placeholder = 'Here optional clarifications or questions';
    div5.appendChild(messageTextarea);
    form.appendChild(div5);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submit-form';
    submitButton.setAttribute('data-action', 'go-reservations')
    const submitButtonText = document.createElement('p');
    submitButtonText.textContent = 'Confirm Booking';
    submitButton.appendChild(submitButtonText);
    form.appendChild(submitButton);

    return form;
}

const loadReservations = () => {
    document.querySelector('header').classList.add('scrolled');
    const main = document.querySelector('#dynamic-main');
    main.setAttribute('data-current-section', 'reservations');

    const reservationSection = document.createElement('section');
    reservationSection.id = 'reservations';

    const title = document.createElement('h1');
    const titleI = document.createElement('i');
    titleI.textContent = 'BOOK A TABLE';
    title.appendChild(titleI);
    reservationSection.appendChild(title);

    const reservationForm = generateReservationForm();
    reservationSection.appendChild(reservationForm);


    main.appendChild(reservationSection);    
}

export { destroyReservations, loadReservations };