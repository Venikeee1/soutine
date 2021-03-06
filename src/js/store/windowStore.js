export default {
    width: window.innerWidth,
    height: window.innerHeight,
    breakPoints: {
        sm: 459,
        md: 767,
        lg: 1024,
        xl: 1200,
        burgerBreakPoint: 1280
    },
    isIntroSlideFullPaged: window.innerWidth < 1200 || window.innerHeight <= 600,
    isMobile() {
        return window.innerWidth <= this.breakPoints.sm;
    },
    isTablet() {
        return window.innerWidth <= this.breakPoints.lg;
    },
    isBurgerShown() {
        return window.innerWidth <= this.breakPoints.burgerBreakPoint;
    },
    windowHeight() {
        return window.innerHeight;
    }

}
