import axios from "axios";

export default class {
    constructor() {
        this.minuteArrow = document.querySelector('.custom-clock__minute');
        this.hourArrow = document.querySelector('.custom-clock__hour');
        this.minutesAngle = this.getMinuteArrowAngle();
        this.hourAngle = this.getHourArrowAngle();
        this.startTime = null;
        this.currentTime = null;
        this.userTimeDifference = 0;
    }

    setRotation(elem, angle) {
        elem.style.transform = `rotate(${angle}deg)`;
    }

    getMinuteArrowAngle() {
        const date = new Date(this.currentTime);
        const minutes = date.getMinutes();
        const ratio = 360 / 60;

        return minutes * ratio;
    }

    getHourArrowAngle() {
        const date = new Date(this.currentTime);
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
            const userTime = new Date();
            this.currentTime = userTime.getTime() + this.userTimeDifference;
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

        axios.get('/time.php')
            .then(response => {

                const londonTime = response.data.substring(0, response.data.indexOf('+'));
                const userDate = new Date();
                this.startTime = new Date(londonTime);

                this.userTimeDifference = this.startTime.getTime() - userDate.getTime();
                console.log(this.startTime)
            })
    }
}
