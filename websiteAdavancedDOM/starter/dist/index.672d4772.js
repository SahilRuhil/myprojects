"use strict";
///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((btn)=>btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
/////// SCROLLING BUTTON /////////
btnScrollTo.addEventListener("click", function(e) {
    e.preventDefault();
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    console.log(e.target.getBoundingClientRect());
    console.log(window.pageXOffset, window.pageYOffset); //current scroll x/y
    // console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);// viewport of height/width
    // window.scrollTo(
    //   s1coords.left + window.pageXOffset,
    //   s1coords.top + window.pageYOffset
    // )
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: "smooth"
    // });
    section1.scrollIntoView({
        behavior: "smooth"
    });
});
//////////////////////////////////////////////
//// PAGE NAVIGATION  
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// using delegation by bubbling concept
document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    // Matching 
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
/////////  BUILDING A TABBED COMPONENT  ////////////
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function(e) {
    const click = e.target.closest(".operations__tab");
    // console.log(click);
    // console.log(click.dataset.tab);
    // Gaurd cause
    if (!click) return;
    // Remove active content and tabs
    tabs.forEach((t)=>t.classList.remove("operations__tab--active"));
    tabContent.forEach((ct)=>ct.classList.remove("operations__content--active"));
    // Acitve tab
    click.classList.add("operations__tab--active");
    // Active content with dataset
    document.querySelector(`.operations__content--${click.dataset.tab}`).classList.add("operations__content--active");
});
////// Passing Arguments to Event Handler :- Menu Fade Animation 
const nav = document.querySelector(".nav");
const handleHover = function(e) {
    const link = e.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    logo.style.opacity = this;
    sibling.forEach((el)=>{
        if (el !== link) el.style.opacity = this;
    });
};
// here we only pass one argument using this method 
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// orrrrrrrrr
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
/// Sticky   :-nav bar jab window.y is greater o jaye top of the nav tho add krdo sticky class ko and else remove
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
window.addEventListener("scroll", function() {
    if (this.window.scrollY > initialCoords.top) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
});
//// IMPLEMENTING STICKY NAVIGATION : THE SCROLL EVENT :- upper wale ka advance isme humko intersecting point pate lagega
// const callback = function (entries) {
//   entries.forEach(entery => console.log(entery))
// };
// const observer = new IntersectionObserver(callback, { root: null, threshold: 0.1 });
// observer.observe(section1);
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function(entries) {
    // entries.forEach(entry => console.log(entry));// but this is not gonnawork because its for collection of entries but there is one entery 
    // OR
    const [entery] = entries;
    // console.log(entery);
    if (!entery.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};
const headerobserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerobserver.observe(header);
//////////  SECTION REVELING//////////
const allSections = document.querySelectorAll(".section");
const revealSection = function(entries, observer) {
    const [entery] = entries;
    // console.log(entery);
    if (!entery.isIntersecting) return;
    entery.target.classList.remove("section--hidden");
    observer.unobserve(entery.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.20
});
allSections.forEach((sec)=>{
    sectionObserver.observe(sec);
    sec.classList.add("section--hidden");
});
//// LAZY IMAGE  :- loading lazy image using intersecting
const imgTargets = document.querySelectorAll("img[data-src]");
const loading = function(entries, observer) {
    const [entery] = entries;
    // Gaurd class
    if (!entery.isIntersecting) return;
    //replace with data src
    entery.target.src = entery.target.dataset.src;
    entery.target.addEventListener("load", function() {
        entery.target.classList.remove("lazy-img");
    });
    observer.unobserve(entery.target);
};
const imgObserver = new IntersectionObserver(loading, {
    root: null,
    threshold: 0,
    rootMargin: "-200px"
});
imgTargets.forEach(function(img) {
    imgObserver.observe(img);
});
///////// slider 3 : by dots and left and right 
const slider = function() {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");
    let curSlide = 0;
    const maxSlide = slides.length;
    // const slider = document.querySelector('.slider');
    // slider.style.transform = `scale(0.4) translateX(-800px)`;
    // slider.style.overflow = 'visible';
    // slides.forEach((s, i) => (s.style.transform = `translateX( ${100 * i} %)`));
    /// functions
    const createDots = function() {
        slides.forEach((_, i)=>{
            dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    const activateDot = function(slide) {
        document.querySelectorAll(".dots__dot").forEach((dot)=>{
            dot.classList.remove("dots__dot--active");
        });
        // document.querySelector(`.dots__dot[data-slide="${slide}""]`).classList.add('dots__dot--active');
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    };
    const goToSlide = function(slide) {
        slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - slide)}%)`);
    };
    const nextSlide = function() {
        if (curSlide === maxSlide - 1) curSlide = 0;
        else curSlide++;
        goToSlide(curSlide);
        activateDot(curSlide);
    };
    const prevSlide = function() {
        if (curSlide === 0) curSlide = maxSlide - 1;
        else curSlide--;
        goToSlide(curSlide);
        activateDot(curSlide);
    };
    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();
    /// Handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") prevSlide();
        e.key === "ArrowRight" && nextSlide();
    });
    dotContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide  } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();
////////////////////////////////////////////////////////////////////////////////////////////////////
/*
///// Selecting , Creating and Deleting Element
// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));

console.log(document.getElementById('section--1'));
console.log(document.getElementsByTagName('button'));
console.log(document.getElementsByClassName('btn'));


//// Creating
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We increase functionality of this cookie here <button class="btn btn-close-cookie">Got it</button>';

// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
header.after(message);


/// Deleteing
document.querySelector('.btn-close-cookie').addEventListener('click', function () {
  message.remove();
  message.parentElement.removeChild(message);
})

//// Style ,Attribute and Classes
message.style.background = 'Grey';
message.style.color = 'black';
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).background);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) * 3 + 'px';
message.style.height = Number.parseFloat(10) * 13 + 'px';
message.style.fontSize = Number.parseFloat(10) * 2 + 'px';

document.documentElement.style.setProperty('--color-primary', 'lightblue');
// console.log(message.style.'--color-primary');


//// Attribute
const logo = document.querySelector('.nav__logo');
console.log(logo);
console.log(logo.getAttribute('src'));
console.log(logo.getAttribute('href'));
console.log(logo.getAttribute('class'));
console.log(logo.getAttribute('id'));
console.log(logo.getAttribute('desginer'));
console.log(logo.id);
console.log(logo.className);
console.log(logo.src);

console.log(logo.setAttribute('desginer', 'Aakash Yadav'));
console.log(logo.getAttribute('desginer'));
// same for all attribue just put the value of class in querySelector in variable and access and provide(get and set) any value to the Attribut in this there is only show experiment in link kind of class  and there is also give relative and absolute value according to provided

// Date Attribut use if data API
console.log(logo.dataset.versionNumber);

// Classes

logo.classList.add('c');
logo.classList.toggle('c');
logo.classList.contains('c');
logo.classList.remove('c');




/// EVENTS AND EVENTS HANDLER
// Type of events and event Handler so there is lots of method in mdn website so gothrough that if you have curioscity    ..........SO mainly we Remove  and addEvent to making of events by listening
const h1 = document.querySelector('h1');


// this is first way of doing
const alertfun = function (e) {
  alert('hey i am learning how to add events by click');
  // h1.removeEventListener('mouseenter', alertfun);
}
h1.addEventListener('mouseenter', alertfun
);

// this is old school way of doing
// h1.onmouseenter = function (e) {
//   alert('one more way');
// };
// working like hover a mouse

/// at last how to remove
// simply
setTimeout(() => h1.removeEventListener('mouseenter', alertfun), 3000);




//// EVENT PROPOGATION IN PRACTICE /// mainly all method done in COTAINER nav__links wlae mai like this === ele jispe event chala rhae hai , stop propogation , e.currnettarget === this, and bubbling phase tho sab pe
// need to creat rgb(255,255,255);
const creatrgb = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const randomClR = () => `rgb(${creatrgb(0, 255)},${creatrgb(0, 255)},${creatrgb(0, 255)})`;
// links
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomClR();
  console.log('link', e.target);
});
// container of links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomClR();
  console.log('container', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  /// stop propogation
  // e.stopPropagation();
}, true);
// nav section parents of above
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomClR();
  console.log('nav', e.target);
});


//////// DOM TRAVERSING  ////  : -  DOWN , UP parent, closest , siblings :- previous, next;
const h1 = document.querySelector('h1');

console.log(document.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'blue';


// upward
console.log(h1.parentElement);
console.log(h1.parentNode);
console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'orangered';


///sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((el) => {
  if (el !== h1) el.style.color = 'black';
});


///////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
*/ window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
    console.log(e);
    e.returnValue = "";
});

//# sourceMappingURL=index.672d4772.js.map
