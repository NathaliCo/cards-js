let deckID;
const getDeck= ()=>{
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(function(response) {
      if (response.status != 200) {
        window.alert("Fail to get deck");
        return;
      }response.json().then(function(data) {
        let api = data;
         deckID = api.deck_id;fetch('https://deckofcardsapi.com/api/deck/'+deckID+'/draw/?count=52').then(function(response) {
            if (response.status != 200) {
              window.alert("Fail to get cards");
              return;
            }response.json().then(function(data) {
                decks=data.cards;
                console.log(data)
            }).then (function(){
        document.querySelector(".diamonds").innerHTML= ``;  
        document.querySelector(".hearts").innerHTML= ``;  
        document.querySelector(".spades").innerHTML= ``;  
        document.querySelector(".clubs").innerHTML= ``;  

              delay = setInterval(deal,1000)
            })
        })
    })
})
}


let index =0;
document.querySelector(".start").addEventListener("click", getDeck );

let decks=[];
let hearts=[];
let spades=[];
let diamonds=[];
let clubs =[];
let queens =[];

//Repartir cartas
const deal = ()=>{
    if (queens.length==4) { 
     results();
    }

        else{
            if(decks[index].value=='QUEEN'){
            queens.push(decks[index])
         }
    
    save(decks[index], decks[index].suit)
    document.querySelector(".showCards").src=decks[index].image
        index++
}
}

//Guardas en su respectivo array
const save=(card, key)=>{
    switch (key) {
        case 'DIAMONDS':
            diamonds.push(card)
            break;
        case 'HEARTS':
            hearts.push(card)
            break;
        case 'SPADES':
            spades.push(card)
            break
        case 'CLUBS':
            clubs.push(card)
        default:
            break;
    }
}

//Mostar resultados finales
const results =()=>{
        diamonds.sort(sorter);
        hearts.sort(sorter);
        spades.sort(sorter);
        clubs.sort(sorter);

        const diamondsImages= saveImages(diamonds)
        diamondsImages.forEach(element => {
        document.querySelector(".diamonds").innerHTML+= `<br> <img class = "img" src=${element} />`;  
        })        
  
        const heartsImages= saveImages(hearts) 
        heartsImages.forEach(element => {
          document.querySelector(".hearts").innerHTML+= `<br> <img class = "img" src=${element} />`;  
          })        
    
        const spadesImages= saveImages(spades) 
        spadesImages.forEach(element => {
          document.querySelector(".spades").innerHTML+= `<br> <img class = "img" src=${element} />`;  
          })        
    
        const clubsImages= saveImages(clubs) 
        clubsImages.forEach(element => {
          document.querySelector(".clubs").innerHTML+= `<br> <img class = "img" src=${element} />`;  
          })        
    
       
          clearInterval(delay)
    }

    //Ordenar resultados
function sorter(a, b) {
    if (b.value=="10"){
        b.value=10
    }else if(b.value=="JACK"){
        b.value=11
    }else if(b.value=="QUEEN"){
        b.value=12
    }else if(b.value =="QUEEN"){
        b.value=13
    }else if (b.value== "ACE"){
        b.value=14
    }else if (a.value=="10"){
        a.value=10
    }else if(a.value=="JACK"){
        a.value=11
    }else if(a.value=="QUEEN"){
        a.value=12
    }else if(a.value =="QUEEN"){
        a.value=13
    }else if (a.value== "ACE"){
        a.value=14
    }
    if (a.value < b.value) return -1;  
    if (a.value > b.value) return 1;   
    return 0; 
  }

  //Separar imágenes
  const saveImages=(suit)=>{
    let suitImages=[]
    suit.forEach(element => {
    suitImages.push(element.image)    
});
return suitImages
  }

