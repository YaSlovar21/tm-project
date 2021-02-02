    
var path = document.querySelector('.circle_wow');
var len_dash = path.getTotalLength();
console.log(len_dash);


var swiper_text_on_sborka = new Swiper('.slider-text-sborka', {
    speed: 1000,
    mousewheel: true,
    autoplay: false,
    spacebetween: 350,
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
    
});

var slider_sborka = new Swiper('.slider-sborka', {
  // Optional parameters
  direction: 'horizontal',
  //loop: true,
  effect: 'fade',
  parallax: true,
  speed: 1000,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  cssMode: false,
  mousewheel: true,
  autoplay: true,
  // If we need pagination
  pagination: {
    type: 'custom',
    el: '.slider-sborka_pagination',
    renderCustom: function (slider_sborka, current, total) {
        let a = current + ' of ' + total;
        console.log(a);
        dash_current = (1- current/total)*len_dash;
        console.log(dash_current);
        console.log()
        anime({
            targets: '.circle_wow',
            strokeDashoffset: [anime.setDashoffset, dash_current],
            duration: 100,
        });
        return a;
    } 
  },


});

slider_sborka.controller.control = swiper_text_on_sborka;
swiper_text_on_sborka.controller.control = slider_sborka;

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });


function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName);
    resolve('Animation ended');
  }


slider_sborka.on('slideChange', function () {
    //var ggg = $('.content-slider .content-slide').eq(swiper.activeIndex);
    console.log('slide changed');
    let arr = slider_sborka.slides[slider_sborka.activeIndex].querySelectorAll('.wow1');
    console.log(arr);
    console.log(arr.length);
    for (i=0; i<arr.length; i++) {
        animation_class = arr[i].getAttribute("data-class-animaton");
        console.log(animation_class);
        duration_custom = arr[i].getAttribute("data-animaton-duration");
        arr[i].style.setProperty('--animate-duration', duration_custom);
        arr[i].classList.add("animate__animated", animation_class);
    }
    if (slider_sborka.activeIndex > 0) {
      let arr1 = slider_sborka.slides[slider_sborka.activeIndex-1].querySelectorAll('.wow1');
      for (i=0; i<arr1.length; i++) {
        animation_class = arr1[i].getAttribute("data-class-animaton");
        duration_custom = arr1[i].getAttribute("data-animaton-duration");
        //arr1[i].style.setProperty('--animate-duration', duration_custom);
        arr1[i].classList.remove("animate__animated");
        arr1[i].classList.remove(animation_class);
      }
    }
    
  
});
