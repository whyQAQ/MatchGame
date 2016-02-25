
var MG={};
MG.matchinggame={};
MG.matchinggame.cardWidth=80;
MG.matchinggame.cardHeight=120;
MG.matchinggame.cardArray=[
    "cardAK","cardAK",
    "cardAQ","cardAQ",
    "cardAJ","cardAJ",
    "cardBK","cardBK",
    "cardBQ","cardBQ",
    "cardBJ","cardBJ"
];
function shuffle(){
    return Math.random()>0.5?-1:1;
}
function selectedCard(){
    if($(".card-flipped").length>1){
        return;
    }
    $(this).addClass("card-flipped");
    var $fcards=$(".card-flipped");
    if($fcards.length==2){
        setTimeout(function(){checkPattern($fcards)},700);
    }
}

//检查用以检测翻动的2张牌是否一致
function checkPattern(cards){
    var pattern1=$(cards[0]).data("pattern");
    var pattern2=$(cards[1]).data("pattern");
    if(pattern1!=pattern2){
        $(cards).removeClass("card-flipped");
    }
    else{
        $(cards).addClass("card-removed");
        $(cards).removeClass("card-flipped");
    }
}

$(function(){
    var randomArray= MG.matchinggame.cardArray;
    randomArray.sort(shuffle);
    var $card=$(".card");
    for(var i=0;i<randomArray.length-1;i++){
        $card.clone().appendTo($("#cards"));
    }
    $(".card").each(function(index){
        $(this).css({
            "left":(MG.matchinggame.cardWidth+20)*(index%4)+"px",
            "top":(MG.matchinggame.cardHeight+20)*Math.floor(index/4)+"px"
        });
        var pattern=MG.matchinggame.cardArray.pop();
        $(this).data("pattern",pattern);
        $(this).find(".back").addClass(pattern);
        $(this).click(selectedCard);
    });
});

