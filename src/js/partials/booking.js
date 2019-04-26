import axios from "axios";
import Swiper from "swiper";
import SlimSelect from "slim-select"
import datepicker from "js-datepicker";
import queryString from "query-string";
import FormPreloaderInstance from "./form-preloader";


export default class {
    constructor() {
        this.timeChooser = document.querySelector('.reservation-form');
        this.availableHoursForm = document.querySelector('.available-hours');
        this.confirmForm = document.querySelector('.confirm-form');
        this.timeListContainer = document.querySelector('.available-hours__list');
        this.confirnSpecilOffersCheckboxLable = document.querySelector('.form__checkbox-label');
        this.confirnSpecilOffersCheckbox = this.confirnSpecilOffersCheckboxLable.querySelector('.special-offers-checkbox');
        this.firstNameInput = document.querySelector('.confirm-form__first-name');
        this.lastNameInput = document.querySelector('.confirm-form__last-name');
        this.emailInput = document.querySelector('.confirm-form__email');
        this.telInput = document.querySelector('.confirm-form__tel');
        this.notesInput = document.querySelector('.confirm-form__textarea');
        this.orderDescription = document.querySelector('.available-hours__description');
        this.formPreloader = new FormPreloaderInstance();
        this.isSpecialOfferChecked = false;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.tel = '';
        this.notes = '';
        this.bookingSlider = null;
        this.personAmount = 0;
        this.time = '';
        this.date = '';
        this.menuType = '';

        this.datePicker = datepicker('.reservation-form__date-picker', {
            minDate: new Date(),
            onSelect: (instance, date) => {
                this.date = ''
                if (!date) return

                let selectedDate = date;
                let day = this.formatDateToTwoDigit(selectedDate.getDate());
                let month = this.formatDateToTwoDigit(selectedDate.getMonth() + 1);
                document.querySelector('body').click()
                console.log(instance)
                this.date = `${selectedDate.getFullYear()}-${month}-${day}`;
                setTimeout(() => {instance.hide();},0)

            },
            formatter: (input, date, instance) => {
                const weekDay = date.getDay()
                const monthDay = date.getDate()
                const month = instance.months[date.getMonth()]
                input.value = `${instance.days[weekDay]} ${this.formatDatNumber(monthDay)} ${month} ${date.getFullYear()}`
            }
        });

        this.personSelect = new SlimSelect({
            select: '.members-select',
            showSearch: false
        })

        this.menuSelect = new SlimSelect({
            select: '.time-select',
            showSearch: false
        })

        this.bookingSliderSettings = {
            speed: 800,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoHeight: true
        }
    }

    backToFirstForm() {
        this.bookingSlider.slideTo(0)
    }

    addOnchangeListenersForInputs() {
        this.onInputChange(this.firstNameInput, (e) => {
            this.firstName = e.target.value
        })

        this.onInputChange(this.lastNameInput, (e) => {
            this.lastName = e.target.value
        })

        this.onInputChange(this.emailInput, (e) => {
            this.email = e.target.value
        })

        this.onInputChange(this.telInput, (e) => {
            this.tel = e.target.value
        })

        this.onInputChange(this.notesInput, (e) => {
            this.notes = e.target.value
        })
    }

    onInputChange(input, cb) {
        input.addEventListener('input', cb.bind(this))
    }

    formatDateToTwoDigit(elem) {
        return elem > 10 ? elem : `0${elem}`
    }

    isReserveFormValid() {
        if (this.personAmount && this.date && this.menuType) return true;
    }

    getDropDownValue(dropDown) {
        const selectedValue = dropDown.data.data.find(elem => elem.selected);
        if (!selectedValue.placeholder) {
            return selectedValue.value;
        }
    }

    getDropDownText(dropDown) {
        const selectedValue = dropDown.data.data.find(elem => elem.selected);
        if (!selectedValue.placeholder) {
            return selectedValue.text;
        }
    }

    getReserveFormData() {
        this.personAmount = this.getDropDownValue(this.personSelect);
        this.menuType = this.getDropDownText(this.menuSelect);

        return {
            date: this.date,
            party_size: this.personAmount,
            shift: this.menuType
        }
    }

    createBookingSlider() {
        this.bookingSlider = new Swiper('.booking-form', this.bookingSliderSettings);
    }

    toggleCheckbox() {
        this.confirnSpecilOffersCheckboxLable.classList.contains('form__checkbox-label--active')
            ? this.confirnSpecilOffersCheckboxLable.classList.remove('form__checkbox-label--active')
            : this.confirnSpecilOffersCheckboxLable.classList.add('form__checkbox-label--active')

        this.isSpecialOfferChecked = !this.isSpecialOfferChecked;
    }

    addActionSpecialActionCheckbox() {
        this.confirnSpecilOffersCheckbox.addEventListener('change', this.toggleCheckbox.bind(this))
    }

    createTimeSelectorItem(time) {
        const btnWrapper = document.createElement('div');
        const btn = document.createElement('button');

        btnWrapper.classList.add('available-hours__item');
        btn.classList.add('available-hours__btn');
        btn.setAttribute('type', 'button');
        btnWrapper.appendChild(btn);
        btn.textContent = time;

        return btnWrapper;
    }

    generateTimeButtons(timeArr) {
        this.clearTimeButtonsContainer();

        let activeBtn = null;

        timeArr.forEach(text => {
            const timeItem = this.createTimeSelectorItem(text);
            const btn = timeItem.querySelector('.available-hours__btn');
            this.timeListContainer.appendChild(timeItem);
            this.bookingSlider.update();

            btn.addEventListener('click', () => {
                this.time = text;
                if (activeBtn) {
                    activeBtn.classList.remove('active')
                }

                activeBtn = btn;

                activeBtn.classList.add('active')
            })
        })
    }

    clearTimeButtonsContainer() {
        while (this.timeListContainer.firstChild) this.timeListContainer.removeChild(this.timeListContainer.firstChild);
    }

    showNotAvailableTimeError() {
        this.timeListContainer.textContent = 'Unfortunately there are no available times for your desired reservation';
        this.hideOrderDescription();
    }

    hideOrderDescription() {
        this.orderDescription.style.opacity = 0;
        this.orderDescription.style.poinerEvents = 'none';
    }

    showOrderDescription() {
        this.orderDescription.style.opacity = 1;
        this.orderDescription.style.poinerEvents = 'auto';
    }

    createTimeList(timeArr) {

        timeArr.length
            ? this.generateTimeButtons(timeArr)
            : this.showNotAvailableTimeError()

    }

    fetchAvailableTime(data) {
        axios({
            method: 'post',
            url: 'http://soutinewp.bsgdigital.com/api/?availability',
            data: queryString.stringify(data),
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
        .then(response => {
            if (response.data.result === 'success') {
                this.showOrderDescription();
                this.availableTimes = response.data.times;
                this.createTimeList(this.availableTimes);
                this.bookingSlider.slideNext();
                this.changeDescriptionText();

                setTimeout(() => {
                    this.formPreloader.hide();
                }, 300)
            }
        })
    }

    setReservation(data) {
        axios({
            method: 'post',
            url: 'http://soutinewp.bsgdigital.com/api/?reservation',
            data: queryString.stringify(data),
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                this.bookingSlider.slideNext();
                this.changeDescriptionText();

                setTimeout(() => {
                    this.formPreloader.hide();
                }, 400)
            }
        })
    }

    isValidConfirmData() {
        return this.date && this.time && this.personAmount && this.firstName && this.lastName && this.email && this.tel
    }

    getConfirmFormData() {
        return {
            date: this.date,
            time: this.time,
            party_size: this.personAmount,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone: this.tel,
            notes: this.notes,
        }
    }

    onRegistrationSubmit() {
        this.timeChooser.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = this.getReserveFormData();
            console.log(data)

            if (!this.isReserveFormValid()) return

            this.formPreloader.show();
            this.fetchAvailableTime(data);

        })
    }

    onSubmitAvailableHoursForm() {
        this.availableHoursForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.time) return

            this.bookingSlider.slideNext();
        })
    }

    onConfirmFormSubmit() {
        this.confirmForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.isValidConfirmData()) return

            this.formPreloader.show();
            console.log(111)

            this.setReservation(this.getConfirmFormData())
        })
    }

    formatDatNumber(number) {
        if (number === 1) return `${number}st`
        if (number === 2) return `${number}nd`
        if (number === 3) return `${number}rd`
        if (number > 3) return `${number}th`
    }

    changeDescriptionText() {
        const personAmountList = document.querySelectorAll('.available-hours__persons');
        const menuTypeList = document.querySelectorAll('.available-hours__menu');
        const dateList = document.querySelectorAll('.available-hours__time');

        function addText(list, text) {
            Array.from(list).forEach(elem => {
                elem.textContent = text
            })
        }

        const personAmount = this.personAmount > 1 ? `${this.personAmount} people` : `${this.personAmount} person`;
        const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let dateOrder = new Date(this.date);
        let date = `${weekArray[dateOrder.getDay()]} ${this.formatDatNumber(dateOrder.getDate())} ${monthArray[dateOrder.getMonth()]}`


        addText(personAmountList, personAmount)
        addText(menuTypeList, this.menuType)
        addText(dateList, date)
    }

    init() {
        this.addOnchangeListenersForInputs();
        this.createBookingSlider();
        this.addActionSpecialActionCheckbox();
        this.onRegistrationSubmit();
        this.onSubmitAvailableHoursForm();
        this.onConfirmFormSubmit();

        const goToPrevFormBtn = document.querySelectorAll('.confirm-form__search-again');

        Array.from(goToPrevFormBtn).forEach( btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                this.bookingSlider.slidePrev();
            })
        })

        document.querySelector('.success-popup__submit').addEventListener('click', (e) => {
            e.preventDefault();
            this.backToFirstForm();
        })
    }
}
