let acc_Open_btn=document.querySelector(".btn-open_acc");
let signUp_btn=document.querySelector(".sign-up_btn");
let modelElm=document.querySelector(".model");
let overlayElm=document.querySelector(".overlay");
let close_model_btn=document.querySelector(".cross_btn");
// let navElm=document.querySelector(".nav_warper");s
console.log(acc_Open_btn)
/////////////////////////////////////////
// create Event start 
acc_Open_btn.addEventListener("click",openModel);
signUp_btn.addEventListener("click",openModel);
close_model_btn.addEventListener("click",closeModal)
function openModel(e){
        e.preventDefault();
        // openModel.style=" left:50%;transform:translateX(-50%)";
        modelElm.classList.add("popup-center")
        modelElm.classList.remove("hidden");
        overlayElm.classList.remove("hidden")
       
}
//////////////////////////////////////


////////////////////////////////////////////
// create close modal
function closeModal(){
    modelElm.classList.add("hidden");
        overlayElm.classList.add("hidden")
}

//  create nav link smooth
document.querySelector(".menue").addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("nav_link")){
        let id=e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({behavior:'smooth'})
    }
})
///////////////////////////////////////////



////////////////////////////////////
// *create cookies card
let elm=document.createElement("div");
elm.className="cookies--msg"
elm.innerHTML="our website can use cookies for track your fav items? <button class='cookies--close--btn'>click</button>"
document.body.prepend(elm)
elm.style.background="rgba(0,0,0,0.7)"

document.querySelector(".cookies--close--btn").addEventListener("click",function(){
    elm.style.display="none"
    elm.remove(); 
})
//////////////////////////////////

////////////////////////////////
//// code readMore_btn smooth
let readMore_btn=document.querySelector(".learn_more_btn");
readMore_btn.addEventListener("click",(e)=>{
    let section1=document.querySelector("#section--1");
    let sec1Code=section1.getBoundingClientRect();
    section1.scrollIntoView({behavior:"smooth"})
})
///////////////////////////////


//////////////////////////////////
///////Tab componetent
let operation_btn_wraper=document.querySelector(".operation-btn-wraper");
let operation_btnALL=document.querySelectorAll(".operation_btn");
let operations__content=document.querySelectorAll(".operation--summary_wraper");

operation_btn_wraper.addEventListener("click",(e)=>{
    
    // Create Tab 
    let tabElm=e.target.closest(".operation_btn");
    if(!tabElm)return;
    
    // Remove active class in Tab
         operation_btnALL.forEach((tab)=>{tab.classList.remove("operation_btn_active")})

    // Add class active in Tab     
        tabElm.classList.add("operation_btn_active");


    //  Remove content active class 
    operations__content.forEach((tab)=>{tab.classList.remove("operations__content--active")})

    //   Slide content acc to Tab 
    document.querySelector(`.operations__tab--${tabElm.getAttribute("data-tab")}`).classList.add("operations__content--active")  
})
/////////////////////////////////
 
////////////////////////////////////////
// nav fade Animation
let handleHOver=function(e,opacity){
    if(e.target.classList.contains("nav_link")){
        
        let link=e.target;
        let sibling=link.closest(".menue").querySelectorAll(".list .nav_link");
        console.log()
        let logo=document.querySelector("#logo");
        sibling.forEach((elm)=>{
            if(link!==elm){
                elm.style=`opacity:${this}`;
                logo.style=`opacity:${this}`;
            }
        })
    }
}
document.querySelector(".menue").addEventListener("mouseover",handleHOver.bind(0.5))
document.querySelector(".menue").addEventListener("mouseout",handleHOver.bind(1))
 //////////////////////////////////////   

 
// window.addEventListener("scroll",()=>{
//     if(window.scrollY > header.top-1){
//         document.querySelector(".nav_warper").classList.add("nav_sticky");
//     }
//     else{
//         document.querySelector(".nav_warper").classList.remove("nav_sticky");
//     }
// })
// const obsCallback=function(entries,observer){
//     entries.forEach(entry=>{
//         if(entry.isIntersecting){
//             navElm.classList.add("nav_sticky")
//         }
//         else{
//             navElm.classList.remove("nav_sticky")
//         }
//     })
// }
// let options={
//     root:null,
//     threshold:0.1,
//     rootMargin:'0px'
// }
// let observer=new IntersectionObserver(obsCallback,options);
// observer.observe(section1Elm)


//////////////////////////////////////////
/// sticky nav
let headerElm=document.querySelector(".header_look");
let navElm=document.querySelector(".nav_warper");
let navHeight=navElm.getBoundingClientRect().height;
let stickyNav=function(entries){
    let [entry]=entries;
    if(!entry.isIntersecting){
        navElm.classList.add("nav_sticky")
        
    }
    else{
        navElm.classList.remove("nav_sticky")
    }
}
let headerObjerver= new IntersectionObserver(stickyNav,{
    root:null,
    threshold:0, 
    rootMargin:`-${navHeight}px`
})
headerObjerver.observe(headerElm)
/////////////////////////////////////////


/////////////////////////////////////////
//// section fade animation

let secAnimat=function(entries,observer){
    let [entry]=entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden")
    // observer.unobserve(entry.target)
}

SectAllObj=new IntersectionObserver(secAnimat,{
    root:null,
    threshold:0.4, 
})
let secAllElm=document.querySelectorAll(".section");
secAllElm.forEach((sec,ind)=>{
    sec.classList.add("section-hidden");
    SectAllObj.observe(sec)
})
/////////////////////////////////////

//////////////////////////////////////////////
///load image
let All_imgElm=document.querySelectorAll("img[data-src]");

let loadImg=function(entries,observer){
    let [entry]=entries;
    if(!entry.isIntersecting) return;

    // replace image from data src image
    entry.target.src=entry.target.dataset.src;
        entry.target.addEventListener("load",()=>{
            entry.target.classList.remove("lagy-image");
        })
}
const imageOBJ=new IntersectionObserver(loadImg, 
    {root:null,
    threshold:0.1, 
    rootMargin:"200px"
}) 
All_imgElm.forEach(image=>{
    imageOBJ.observe(image)

})
//////////////////////////////////////////////

///////////////////////////////////////////
//slider
function Slider(){
let flag=0;
let dotsElm=document.querySelector(".dots")
let sliderElm=document.querySelectorAll(".slider");
let slider_btn_left=document.querySelector(".slider__btn--left");
let slider_btn_right=document.querySelector(".slider__btn--right");
console.log(dotsElm)

function SlideMove(slide){
    sliderElm.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`);
}


function nextSlide (e){
    if(flag==sliderElm.length-1){
       flag=0;
    } 
    else{
        flag++;
    }
    SlideMove(flag);
    activeDot(flag)
}
function prevSlide(e){
    if(flag==0){
       flag=sliderElm.length-1;
    } 
    else{
        flag--;
    }
    SlideMove(flag)
    activeDot(flag)
}
slider_btn_right.addEventListener("click",nextSlide);
slider_btn_left.addEventListener("click",prevSlide)

document.addEventListener("keydown",(e)=>{
    if(e.key=="ArrowRight")nextSlide();
    else if(e.key=="ArrowLeft")prevSlide(); 
})

let createDot=function(){
    sliderElm.forEach((s,i)=>dotsElm.insertAdjacentHTML("beforeend",`<div class="dot" data-set="${i}"></div>`));
}

let removeActive=function(){
    document.querySelectorAll(".dot").forEach((d,i)=>d.classList.remove("active--dot"))
}

let activeDot=function(slide){
    removeActive();
    document.querySelector(`.dot[data-set="${slide}"]`).classList.add("active--dot");
    
}


let init=function(){
    SlideMove(0)
    createDot();
    activeDot(0) 
}
init()
dotsElm.addEventListener("click",function(e){
    if(e.target.classList.contains("dot")){
        let slider=e.target.getAttribute("data-set");
        removeActive();
        e.target.classList.add("active--dot");
        SlideMove(slider)
    }
})
}
Slider()
/////////////////////////////////////////////////////////