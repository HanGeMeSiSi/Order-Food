let myCarousel=document.getElementById("myCarousel");
let myCarouselShow=myCarousel.parentNode;
let carouselUl=myCarousel.getElementsByClassName("carousel-ul")[0];
//找到轮播块中小圆点的所有li
let comCarli=myCarousel.children[0].children[0];
//记录当前显示的是哪一个div 的下标
let comCarIndex=0;
//是否可以拖拽轮播div
let canMove=false;

//=====================================
//easy order nav部分
let easyOrderLun=document.getElementsByClassName("easy-order-lun")[0];
let easyOrderLunLi=easyOrderLun.getElementsByTagName("div");
let easyOrderLunShow=easyOrderLun.parentNode;
let isEasyLun=true;
let easyOrderButton=document.getElementsByClassName("easy-order-lun-button")[0];
let eobLeft=easyOrderButton.firstElementChild;
let eobRight=easyOrderButton.lastElementChild;
//当前正在显示第几张图片
let easyNowShowIndex=0;
//每次轮播动画持续的时间
let duration=500;
//定时器
let timer;
//给按钮添加事件
$(easyOrderButton).on("mouseover","button",function(){
    clearInterval(timer);
    timer=null;
});
$(easyOrderButton).on("mouseout","button",function(){
    timer=setInterval(setEasyOrderUlMove,3000);
});
$(eobLeft).click(function (e) {
    if(isEasyLun==true){
        setEasyOrderUlMove2();
        isEasyLun=false;
        setTimeout(()=>{
            isEasyLun=true;
        },1000);  
    }
});
$(eobRight).click(function (e) { 
    if(isEasyLun==true){
        setEasyOrderUlMove(easyNowShowIndex+1);
        isEasyLun=false;
        setTimeout(()=>{
            isEasyLun=true;
        },1000);
    }
});

// 给easyOrderLun添加鼠标进入时 将是否可以播放设为false
$(easyOrderLun).on("mouseover",function(){
    isEasyLun=false;
    clearInterval(timer);
    timer=null;
})
$(easyOrderLun).on("mouseout",function(){
    isEasyLun=true;
    timer=setInterval(setEasyOrderUlMove,3000);
})


window.addEventListener("resize",comCarSize);
window.addEventListener("load",function(){
    comCarSize();
    moveComCarUl(comCarIndex);
    // 自动播放
    timer=setInterval(setEasyOrderUlMove,3000);
});
//委托给轮播中的li添加事件绑定
$(comCarli).on("click","li",comCarLiAct);
$(carouselUl).on("mousedown","div",function(e){
    canMove=true;
    myCarouselShow.onmousemove = e=> { 
        if(canMove==true){
            var x=e.offsetX;
            $(carouselUl).css({
                // "margin-left":-x+"px"
            });
        }
    } 
});
$(carouselUl).on("mouseup","div",function () { 
    canMove=false;
}); 
function comCarLiAct() {  
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    comCarIndex=$(this).data("index");
    moveComCarUl(comCarIndex);
}
function moveComCarUl(moveToIndex){
    $(carouselUl).css({
        "margin-left":-moveToIndex*(myCarouselShow.offsetWidth+8)
    })
}        
//设置轮播的每个div的宽高和显示div的宽高
function comCarSize(){
    var myCarousel=document.getElementById("myCarousel");
    var myCarouselShow=myCarousel.parentNode;
    var carouselUl=myCarousel.getElementsByClassName("carousel-ul")[0];
    for(let i=0;i<carouselUl.children.length;i++){
        carouselUl.children[i].style=`width:${myCarouselShow.offsetWidth}px`;
    }
    carouselUl.style=`height:${carouselUl.children[0].offsetHeight}px; width:${carouselUl.children.length*(myCarouselShow.offsetWidth+16)}px`;
    myCarouselShow.style=`height:${carouselUl.children[0].offsetHeight}px`;
    moveComCarUl(comCarIndex);   
    setEasyOrderUlWidth()
}
function setEasyOrderUlWidth() {  
    for(var i=0;i<easyOrderLunLi.length;i++){
        easyOrderLunLi[i].style=`width:${easyOrderLunShow.offsetWidth}px`
    }
    easyOrderLun.style=`width:${(easyOrderLunLi[0].offsetWidth+10)*easyOrderLunLi.length}px`;
}
function setEasyOrderUlMove(n){
    if(isEasyLun==true){
        if(n===undefined){
            n=easyNowShowIndex+1;
        }
        if(easyNowShowIndex==0){
            $(easyOrderLun).addClass("transition");
        }
        easyNowShowIndex=n;
        
        $(easyOrderLun).css({ 
            "margin-left":-(easyOrderLunLi[0].offsetWidth+10)*easyNowShowIndex+"px"
        });
        if(n>=2){
            easyNowShowIndex=0;
            setTimeout(() => {
                $(easyOrderLun).removeClass("transition");
                $(easyOrderLun).css({ 
                    "margin-left":0
                })
            }, 800);
        }
    }
}
function setEasyOrderUlMove2(){
    if(isEasyLun==true){
        if(easyNowShowIndex<=0){
            easyNowShowIndex=2;
            $(easyOrderLun).removeClass("transition");
            $(easyOrderLun).css({ 
            "margin-left":-(easyOrderLunLi[0].offsetWidth+10)*easyNowShowIndex+"px"
        })
        easyNowShowIndex--;
        
        setTimeout(() => {
            $(easyOrderLun).addClass("transition");
            $(easyOrderLun).css({ 
                "margin-left":-(easyOrderLunLi[0].offsetWidth+10)*easyNowShowIndex+"px"
            });
        },150);
        }else{
            easyNowShowIndex--;
            $(easyOrderLun).css({ 
                "margin-left":-(easyOrderLunLi[0].offsetWidth+10)*easyNowShowIndex+"px"
            });
        }
    }
}


