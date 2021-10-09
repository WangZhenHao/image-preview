function scaleImage(swiper) {
    this.swiper = swiper;
    this.store = {}
    this.documentEvent();
}

scaleImage.prototype = {
    documentEvent: function() {
        const self = this;

        this.documnetTouchStart = function(event) {
            var touches = event.touches;
            var events = touches[0];
            var events2 = touches[1];
            event.preventDefault();
            
            console.log(event)
        }

        this.documnetTouchMove = function(e) {

        }

        this.documnetTouchEnd = function(e) {

        }

        document.addEventListener('touchstart', this.documnetTouchStart)
        document.addEventListener('touchstart', this.documnetTouchMove)
        document.addEventListener('touchstart', this.documnetTouchEnd)
    }
}



export default scaleImage;