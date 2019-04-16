export default class {
    constructor() {
        this.minuteArrow = document.querySelector('.custom-clock__minute');
        this.hourArrow = document.querySelector('.custom-clock__hour');
        this.minutesAngle = this.getMinuteArrowAngle();
        this.hourAngle = this.getHourArrowAngle();
    }

    setRotation(elem, angle) {
        elem.style.transform = `rotate(${angle}deg)`;
    }

    getMinuteArrowAngle() {
        const date = new Date();
        const minutes = date.getMinutes();
        const ratio = 360 / 60;

        return minutes * ratio;
    }

    getHourArrowAngle() {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const ratio = 360 / 60 / 12;

        return (minutes + hours * 60) * ratio;
    }

    moveMinuteArrow () {
        requestAnimationFrame( ()=> {
            const angle = this.getMinuteArrowAngle();

            if(this.minutesAngle !== angle) {
                this.minutesAngle = angle;
                this.setRotation(this.minuteArrow, angle);
            }

            requestAnimationFrame(this.moveMinuteArrow.bind(this))
        })
    }

    moveHourArrow () {
        requestAnimationFrame( ()=> {
            const angle = this.getHourArrowAngle();

            if(this.hourAngle !== angle) {
                this.hourAngle = angle;
                this.setRotation(this.hourArrow, angle);
            }
            requestAnimationFrame(this.moveHourArrow.bind(this))
        })
    }

    init() {
        this.setRotation(this.minuteArrow, this.minutesAngle);
        this.setRotation(this.hourArrow, this.hourAngle);
        this.moveMinuteArrow();
        this.moveHourArrow();
    }
}
