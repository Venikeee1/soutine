import axios from "axios";
import Swiper from "swiper";
import SlimSelect from 'slim-select'
import datepicker from "js-datepicker";


export default class {
    constructor() {
        this.timeChooser = document.querySelector('.reservation-form');
        this.availableHoursForm = document.querySelector('.available-hours');
        this.timeListContainer = document.querySelector('.available-hours__list');
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.instruction = '';
        this.isSignUpForSpecialOffers = false;
        this.bookingSlider = null;
        this.personAmount = 0;
        this.time = '';
        this.date = '';
        this.menuType = '';

        this.datePicker = datepicker('.reservation-form__date-picker', {
            minDate: new Date(),
            onSelect: (instance, date) => {
                // Both instances will be set because they are linked by `id`.
                let selectedDate = date;
                let day = this.formatDateToTwoDigit(selectedDate.getDate())
                let month = this.formatDateToTwoDigit(selectedDate.getMonth())
                this.date = `${selectedDate.getFullYear()}-${month}-${day}`
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
            // allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoHeight: true
        }
    }

    formatDateToTwoDigit(elem) {
        return elem > 10 ? elem : `0${elem}`
    }

    formatBookingDay() {
        return 'day';
    }

    isReserveFormValid() {
        console.log(this.personAmount, this.date, this.menuType)
        if (this.personAmount && this.date && this.menuType) return true;
    }

    getDropDownValue(dropDown) {
        const selectedValue = dropDown.data.data.find( elem => elem.selected);
        if(!selectedValue.placeholder) {
            return selectedValue.value;
        }
    }

    getDropDownText(dropDown) {
        const selectedValue = dropDown.data.data.find( elem => elem.selected);
        if(!selectedValue.placeholder) {
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
        this.bookingSlider = new Swiper( '.booking-form', this.bookingSliderSettings);
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

    generateTimeButtons(timeArr){
        this.clearTimeButtonsContainer();

        let activeBtn = null;

        timeArr.forEach( text => {
            const timeItem = this.createTimeSelectorItem(text);
            const btn = timeItem.querySelector('.available-hours__btn');
            this.timeListContainer.appendChild(timeItem);
            this.bookingSlider.update();

            btn.addEventListener('click', () => {
                this.time = text;
                if(activeBtn) {
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

    createTimeList(timeArr) {

        timeArr.length
            ? this.generateTimeButtons(timeArr)
            : this.timeListContainer.textContent = 'Sorry no available tables for current time'

    }

    fetchAvailableTime(data) {

        axios({
            method: 'post',
            url: 'http://soutinewp.bsgdigital.com/api/?availability',
            data: data,
            date: this.date,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                if(response.result === 'success') {
                    this.availableTimes = response.times;
                }
            })
    }

    onSubmitAvailableHoursForm() {
        this.availableHoursForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if(!this.time) return

            this.bookingSlider.slideNext();
        })
    }

    onRegistrationSubmit() {
        this.timeChooser.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = this.getReserveFormData();

            if(!this.isReserveFormValid()) return

            this.bookingSlider.slideTo(1);

            const arr = [10,12,15,16]
            this.createTimeList(arr);
            // this.fetchAvailableTime(data);

        })
    }

    init() {
        this.createBookingSlider();
        this.onRegistrationSubmit();
        this.onSubmitAvailableHoursForm();
        // axios.get('/time.php')
        //     .then(response => {
        //
        //     })
    }
}
