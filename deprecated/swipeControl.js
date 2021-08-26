let myElement = document.getElementsByClassName('page-container')[0]
console.log(document.getElementsByClassName('page-container')[0])
let hammertime = new Hammer(myElement);
let deltaX=0
let hasSwiped = false
hammertime.on('swipe', function(ev) {
    if (ev.deltaX>0){
        deltaX = deltaX>=0 ? 0 : deltaX + window.innerWidth;
    }
    else{
        deltaX = (deltaX - window.innerWidth);

    }
    let translate3d = 'translate3d(' + deltaX + 'px, 0, 0)';
    myElement.style.transition = "all 0.4s ease-in-out"
    myElement.style.transform = translate3d
    hasSwiped=true
});

hammertime.on('panstart', function (ev){
    hasSwiped = false
})

hammertime.on('panmove', function (ev){
    let translate3d = 'translate3d(' + (deltaX + ev.deltaX)  + 'px, 0, 0)';
    myElement.style.transition = "all 0s"
    myElement.style.transform = translate3d
})

hammertime.on('panend', function (ev){
    if (!hasSwiped){
        let translate3d = 'translate3d(' + (deltaX)  + 'px, 0, 0)';
        myElement.style.transition = "all 0.4s ease-in-out"
        myElement.style.transform = translate3d
    }
})