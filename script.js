let meals1 = ['Pizza Margherita [Ø 32cm] ', 'Pizza Tonno [Ø 32cm] ', 'Pizza Funghi [Ø 32cm] ', 'Pizza Spinaci [Ø 32cm]'];
let description1 = ['mit extra viel Käse', 'mit Thunfisch', 'mit extra großen Champignons', 'mit Spinat und Knoblauch'];
let prices1 = [6.90, 8.90, 8.90, 8.90];
let meals2 = ['Pizza Döner [Ø 32cm] ', 'Pizza Sucuk [Ø 32cm] ', 'Pizza Chicken [Ø 32cm] ', 'Pizza Hawaii [Ø 32cm]'];
let description2 = ['mit Kalbs Dönerfleisch', 'mit Sucukscheiben', 'mit Putenbrust ', 'mit Schinken und Ananas'];
let prices2 = [10.90, 10.90, 11.90, 11.90];
let basketMeals = [];
let basketPrices = [];
let basketDescription = [];
let amount = [];
let sum = 0;
const delievery = 2.95;
let endsum = sum + delievery;
// param {number} i - iterator index for meals1,descritptions1 prices1
function generateMeal1HTML(i) {
    return `
    <div class="food-container">
      <div class"containertop"
      <span>${meals1[i]}</span>
      <a href="#" class="p-info">Produktinfo</a>
     <button onclick="addToBasket1(${i})" class="addbtn"><b>+</b></button>
      </div>
      <div class"containermiddle">
      <p class="containermiddle2"><em>${description1[i]}</em></p>
      </div>
      <div class="containerbottom">
      <span class="containerbottom2" type="number">${prices1[i].toFixed(2).replace('.', ',')}€</span>
      </div>
    </div>  `;
}
// param {number} i - iterator index for meals2,descritptions2, prices2
function generateMeals2HTML(i) {
    return `
    <div class="food-container">
       <div class"containertop">
        <span>${meals2[i]}</span>
        <a href="#" class="p-info">Produktinfo</a>
        <button onclick="addToBasket2(${i})" class="addbtn"><b>+</b></button>
        </div>
        <div class="containermiddle">
        <p class="containermiddle2"><em>${description2[i]}</em></p>
        </div>
        <div class"containerbottom">
        <span class="containerbottom2" type="number">${prices2[i].toFixed(2).replace('.', ',')}€</span>
        </div>
     </div>   `;
}
// Anzeigen der Gerichte
function renderMenu() {
    for (let i = 0; i < meals1.length; i++) {
        document.getElementById('container').innerHTML += generateMeal1HTML(i);
    }
    for (let i = 0; i < meals2.length; i++) {
        document.getElementById('container2').innerHTML += generateMeals2HTML(i);
    }
}
// Warenkorb hinzufügen
// param {number} i - iterator index for meals1,descritptions1 prices1
function addToBasket1(i) {
    if (basketMeals.length == 0) {
        document.getElementById('basketchange').classList.add('d-none');
    }
    if (basketMeals.includes(meals1[i])) {
        let pos = basketMeals.indexOf(meals1[i]);
        amount[pos]++;
    } else {
        basketMeals.push(meals1[i]);
        basketDescription.push(description1[i]);
        basketPrices.push(prices1[i]).toFixed(2).replace('.', ',');
        amount.push(1);
    }
    updateBasket();
}
// param {number} i - iterator index for meals2,descritptions2, prices2
function addToBasket2(i) {
    if (basketMeals.length == 0) {
        document.getElementById('basketchange').classList.add('d-none');
    }
    if (basketMeals.includes(meals2[i])) {
        let pos = basketMeals.indexOf(meals2[i]);
        amount[pos]++;
    } else {
        basketMeals.push(meals2[i]);
        basketDescription.push(description2[i]);
        basketPrices.push(prices2[i]).toFixed(2).replace('.', ',');
        amount.push(1);
    }
    updateBasket();
}
// param {number} i - iterator index for basketMeals,amount, basketDescription, basketPrices
function generateBasketHTML(i) {
    return `
    <div class="basketnew"> 
     <div class="class4">
     <div class="itemAmount"><b>${amount[i]}</b></div>
        <div class="class1"><b>${basketMeals[i]}</b></div>
        <div class="class3"><b>${(basketPrices[i] * amount[i]).toFixed(2).replace('.', ',')} €</b></div>
      </div>
       <div class="class2"><em>${basketDescription[i]}</em></div> 
       <div class="class5" >
       <a href="#" class="classcolor"><b>Anmerkung hinzufügen</b></a>
       <div class="frogbox">
         <button onclick="removeAmount(${i})"class="btnpizza1"><b>–</b></button> 
         <button onclick="addAmount(${i})"class="btnpizza2"><b>+</b></button>
         <button onclick="closebasket(${i})"class="btnx1"<b>X</b></button>
       </div>
       </div>
    </div> `;
}
// Warenkorb aktualisieren
function updateBasket() {
    sum = 0;
    let basket = document.getElementById('basket')
    basket.innerHTML = '';
    for (let i = 0; i < basketMeals.length; i++) {
        sum += basketPrices[i] * amount[i];
        basket.innerHTML += generateBasketHTML(i);
    }
    endsum = sum + delievery;
    if (basketMeals.length > 0) {
        basket.innerHTML += generatSumHTML(sum, endsum)
    } else {
        basket.innerHTML += generateEmptyBasketHTML();

    }
    if (basketMeals.length == 0) {
        endsum = 0;
        document.getElementById('basket-mobile').innerHTML = `
    <span class="waren" type="button"><b>Warenkorb</b>(${endsum.toFixed(2).replace('.', ',')}€)</span> `;

    } else {
        endsum = sum + delievery;
        document.getElementById('basket-mobile').innerHTML = `
    <span class="waren" type="button" ><b>Warenkorb</b>(${endsum.toFixed(2).replace('.', ',')}€)</span> `;
    }
}

function generatSumHTML(sum, endsum) {
    return `
    <div class="price-calc">
           <span>Zwischensumme</span>
           <span>${sum.toFixed(2).replace('.', ',')}€</span>
    </div>
    <div class="price-calc">
           <span>Lieferkosten</span>
           <span>2,95€</span>
    </div>
    <div class="price-calc" >
           <span>Gesamt</span>
           <span>${endsum.toFixed(2).replace('.', ',')}€</span>
     </div>
     <div class="pay-container"> 
       <button type="button" onclick="alert('Der Kurierfahrer hat heute keine Lust')" class="pay">Bezahlen(${endsum.toFixed(2).replace('.', ',')}€)</button>
     </div>  `;
}

function generateEmptyBasketHTML() {
    return `
    <div id="basketchange" class="baskettext">
    <img class="basketpic" src="piccs/2211057.png">
    <span class="baskethead"><b>Fülle deinen Warenkorb</b></span>
    <span class="basketunderhead"> Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
    </div>
     </div>
    </div>`;

}

// Gerichte im Warenkorb erweitern/reduzieren
function addAmount(i) {
    amount[i]++;;
    updateBasket();
    showbasket();
}

function removeAmount(i) {
    if (amount[i] <= 1) {
        basketMeals.splice(i, 1);
        basketDescription.splice(i, 1);
        basketPrices.splice(i, 1);
        amount.splice(i, 1);
        updateBasket();
        showbasket();
    } else {
        amount[i]--;
        updateBasket();
        showbasket();
    }
}
window.onscroll = function() {
    if (window.scrollY == 0) {
        document.getElementById('basket').style.top = '75px';
    } else {
        document.getElementById('basket').style.top = '0px';
    }
}
window.onscroll = function() {
    if (window.scrollY == 0) {
        document.getElementById('scroll').style.top = '75px';
    } else {
        document.getElementById('scroll').style.top = '0px';
    }
}

function hideBasket() {
    let viewmobile = document.getElementById('viewmobile');
    viewmobile.classList.add('d-none');
    if (basketMeals.length == 0)
        endsum = 0;
    updateBasket();
}
// ab hier beginnt die Mobile Ansicht
function showbasket() {
    sum = 0;


    let viewmobile = document.getElementById('viewmobile');
    viewmobile.classList.remove('d-none');
    viewmobile.innerHTML = '<button onclick="hideBasket()"class="btnxv"<b>⏎</b></button>';
    for (let i = 0; i < basketMeals.length; i++) {
        sum += basketPrices[i] * amount[i];
        document.getElementById('viewmobile').innerHTML += generateKevin1HTML(amount, basketMeals, basketPrices, basketDescription, i)
    }


    if (basketMeals.length > 0) {

        document.getElementById('viewmobile').innerHTML += generatemobile1HTML(sum, endsum)
    } else {
        document.getElementById('viewmobile').innerHTML += generatemobile2HTML()
    }

    document.getElementById('basket-mobile').innerHTML = `
    <span class="waren" type="button" onclick="alert('Der Kurierfahrer hat heute keine Lust')"><b>Bezahlen</b>(${endsum.toFixed(2).replace('.', ',')}€)</span> `;

}


function generateKevin1HTML(amount, basketMeals, basketPrices, basketDescription, i) {
    return `
<div class="basketnew"> 
 <div class="class4">
 <div class="itemAmount"><b>${amount[i]}</b></div>
    <div class="class1"><b>${basketMeals[i]}</b></div>
    <div class="class3"><b>${(basketPrices[i] * amount[i]).toFixed(2).replace('.', ',')} €</b></div>
  </div>
   <div class="class2"><em>${basketDescription[i]}</em></div> 
   <div class="class5" >
   <a href="#" class="classcolor"><b>Anmerkung hinzufügen</b></a>
   <div class="frogbox">
       <button onclick="removeAmount(${i})"class="btnpizza1"><b>–</b></button> 
       <button onclick="addAmount(${i})"class="btnpizza2"><b>+</b></button>
       <button onclick="closebasket(${i})"class="btnx"<b>X</b></button>
   </div> 
   </div>
</div> `;
}

function generatemobile1HTML(sum, endsum) {

    return `
    <div class="price-calc">
           <span>Zwischensumme</span>
           <span>${sum.toFixed(2).replace('.', ',')}€</span>
    </div>
    <div class="price-calc">
           <span>Lieferkosten</span>
           <span>2,95€</span>
    </div>
    <div class="price-calc" >
           <span>Gesamt</span>
           <span>${endsum.toFixed(2).replace('.', ',')}€</span>
     </div> `;
}

function generatemobile2HTML() {
    return `
    <div id="basketchange" class="baskettext">
   <img class="basketpic" src="piccs/2211057.png">
   <span class="baskethead"><b>Fülle deinen Warenkorb</b></span>
   <span class="basketunderhead"> Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
   </div>
    </div>
   </div>`;
}



// Gerichte vom Warenkorb entfernen
function closebasket(i) {
    basketMeals.splice(i, 1);
    basketDescription.splice(i, 1);
    basketPrices.splice(i, 1);
    amount.splice(i, 1);
    updateBasket();
    showbasket();
}

function closebasket1(i) {
    basketMeals.splice(i, 1);
    basketDescription.splice(i, 1);
    basketPrices.splice(i, 1);
    amount.splice(i, 1);
    updateBasket();
    showbasket();
}