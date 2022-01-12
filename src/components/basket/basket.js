let url = 'http://localhost:3000/food';

function getFoodCards() {
    return fetch(url)
        .then(response => response.json())
}

let food_button = document.querySelectorAll('.popup__card-button');
let zakaz__name = document.querySelector('.zakaz__name');
let zakaz__cost = document.querySelector('.zakaz__cost');
let zakaz__piece = document.querySelector('.zakaz__piece');

let foodObj = 0;
getFoodCards()
    .then((data) => {
        for (let btn of food_button) {
            btn.addEventListener('click', () => {
                for (let key of data) {
                        localStorage.setItem('food', JSON.stringify(key));
                        foodObj = JSON.parse(localStorage.getItem("food"));
                        let resName = document.createElement('span');
                        let resCost = document.createElement('span');
                        let resPiece = document.createElement('span');
                        resCost.innerHTML = foodObj.cost;
                        resName.innerHTML = foodObj.name;
                        resPiece.innerHTML = '1 шт';
                        alert(food_button);
                        zakaz__name.append(resName);
                        zakaz__cost.append(resCost);
                        zakaz__piece.append(resPiece);
                    }
            })
        }
    })
    .catch((error) => alert(error))

let formData = {};
let zakaz__end = document.querySelector('.end button');


zakaz__end.addEventListener('click', () => {
    let zakaz__Data = document.querySelectorAll('.popup__basket__content input');
    for (let i = 0; i < zakaz__Data.length; i++) {
        formData[i] = zakaz__Data[i].value;
        console.log(formData);
    }
    updateorders(formData).catch((error) => alert(error));
    for (let i = 0; i < zakaz__Data.length; i++) {
        zakaz__Data[i].value = "";
    }
})

function updateorders(user) {
    return fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
}
