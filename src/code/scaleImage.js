import { range, getDistance } from '../uitls'

function scaleImage(swiper) {
    this.swiper = swiper;
    this.store = {
        scale: 1
    };

    this.move = {
        moving: false,
        startX: '',
        startY: '',
        startMoveX: 0,
        startMoveY: 0,
        moveX: 0,
        moveY: 0
    };

    this.documentEvent();
}

scaleImage.prototype = {
    documentEvent: function() {
        // const self = this;
        this._dblclick = 0

        this.documnetTouchStart = (event) => {
            // console.log(event.touches)
            var touches = event.touches;
            var events = touches[0];
            var events2 = touches[1];
            // event.preventDefault();
            
            this.store.pageX = events.pageX;
            this.store.pageY = events.pageY;

            this.move.moveable = true;
            this.move.moveing = touches.length === 1;
            this.move.startMoveX = this.move.moveX;
            this.move.startMoveY = this.move.moveY;
            this.move.startX = events.clientX;
            this.move.startY = events.clientY;

            if(events2) {
                this.store.pageX2 = events2.pageX;
                this.store.pageY2 = events2.pageY;
                this.swiper.disable();
            }

            this.store.originScale = this.store.scale || 1;

            this.imgageSacaleAnimate(false)
            this.imageScale();
        }

        this.documnetTouchMove = (event) => {
            if(!this.move.moveable) {
                return;
            }
            
            const touches = event.touches;
            const events = touches[0];
            const events2 = touches[1];

            // console.log(touches, events2)
            // return
            if (events2) {
                this.swiper.disable();

                if(!this.store.pageX2) {
                    this.store.pageX2 = events2.pageX;
                }

                if(!this.store.pageY2) {
                    this.store.pageY2 = events2.pageY;
                }

                
                const zoom = getDistance({
                    x: events.pageX,
                    y: events.pageY
                }, {
                    x: events2.pageX,
                    y: events2.pageY
                }) / 
                getDistance({
                    x: this.store.pageX,
                    y: this.store.pageY
                }, {
                    x: this.store.pageX2,
                    y: this.store.pageY2
                })

                let newScale = this.store.originScale * zoom;

                if(newScale > 3) {
                    newScale = 3;
                }

                // if(newScale < 1) {
                //     newScale = 1;
                // }

                this.store.scale = newScale;

                this.imageScale();
            }

            if(this.move.moveing) {
                event.preventDefault();
                const deltaX = events.clientX - this.move.startX;
                const deltaY = events.clientY - this.move.startY;

                const moveX = deltaX + this.move.startMoveX;
                const moveY = deltaY + this.move.startMoveY;
                this.distanceX = this.maxMoveX();
                this.distanceY = this.maxMoveY();
                // console.log(this.store.scale, moveX, distance, '----------------->', range(moveX, -distance, distance))
                // console.log(distanceY)
                this.move.moveX = range(moveX, -this.distanceX, this.distanceX);
                this.move.moveY = range(moveY, -this.distanceY, this.distanceY);

                this.imgageSacaleAnimate(false)
                this.imageScale();
            }

            // event.preventDefault();
        }

        this.documnetTouchEnd = (event) => {
            console.log('触摸结束')
            
            if(this.store.scale < 1) {
                this.store.scale = 1
            }

            if(this.store.scale === 1) {
                this.swiper.enable()
            }else {
                this.swiper.disable();
            }
            
            if(!event.touches.length) {
                // event.preventDefault();
                this.distanceX = this.maxMoveX();
                this.distanceY = this.maxMoveY();

                this.move.moveX = range(this.move.moveX, -this.distanceX, this.distanceX);
                this.move.moveY = range(this.move.moveY, -this.distanceY, this.distanceY);
                this.imgageSacaleAnimate(true)
                this.imageScale();
            }

            this.move.moveing = false;
            this.move.moveable = false;

            // this.move.moveX = range(this.move.moveX, -this.distanceX, this.distanceX);
            // this.move.moveY = range(this.move.moveX, -this.distanceY, this.distanceY);

            // this.imgageSacaleAnimate(true)
            // this.imageScale();
        }

        this.documentDblClick = (event) => {
            this._dblclick++;
            
            setTimeout(() => {
                this._dblclick = 0;
            }, 500)

            if(this._dblclick > 1) {
                // debugger
                console.log('双击结束')
                this.store.scale = this.store.scale === 3 ? 1 : 3;
                this.move.moveX = 0;
                this.move.moveY = 0;
                
                this.imgageSacaleAnimate(true)
                this.imageScale();
            }
        }

        document.addEventListener('touchstart', this.documnetTouchStart, { passive: false })
        document.addEventListener('touchmove', this.documnetTouchMove, { passive: false })
        document.addEventListener('touchend', this.documnetTouchEnd, { passive: false })
        document.addEventListener('click', this.documentDblClick)

        // const { index, swiperLis } = this.swiper;
        // const image = swiperLis[index].querySelector('img')

        // image.onclick = function() {
        //     alert(1)
        // }
    },
    imageScale() {
        const { index, swiperLis } = this.swiper;
        const scale = this.store.scale;

        // if (scale !== 1) { 
            const offsetX = this.move.moveX / scale;
            const offsetY = this.move.moveY / scale;

            const image = swiperLis[index].querySelector('.swiper-wrap-preview__image')
            image.style.transform = `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`;
        // }
       
        
        // alert(window.innerWidth)
    },
    imgageSacaleAnimate(type) {
        const { index, swiperLis } = this.swiper;
        const image = swiperLis[index].querySelector('.swiper-wrap-preview__image')

        if(type) {
            image.style['transitionDuration'] = '.3s'
        } else {
            image.style['transitionDuration'] = '0s'
            // console.log(image.style['transitionDuration'])
        }
    },
    maxMoveX() {
        let maxMoveX = 0;
        const { index, swiperLis } = this.swiper;
        const image = swiperLis[index].querySelector('.swiper-wrap-preview__image')
        const width = image.offsetWidth;

        if(width * this.store.scale > window.innerWidth) {
            maxMoveX = (width * this.store.scale - window.innerWidth) / 2
            maxMoveX = Math.max(0, maxMoveX)
        }
        

        return maxMoveX;
    },
    maxMoveY() {
        let maxMoveY = 0;
        const { index, swiperLis } = this.swiper;
        const image = swiperLis[index].querySelector('.swiper-wrap-preview__image')
        const height = image.offsetHeight;
        
        // console.log(height * this.store.scale > window.innerHeight)
        if(height * this.store.scale > window.innerHeight) {
            maxMoveY = (height * this.store.scale - window.innerHeight) / 2
            maxMoveY = Math.max(0, maxMoveY)
        }
        
        return maxMoveY
    }
}



export default scaleImage;