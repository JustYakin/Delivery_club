const urlfood = 'http://localhost:3000/food';

document.getElementById('popup__basket').style.display = "none";
document.getElementById('popup__basket').style.opacity = "0";
document.getElementById('popup__basket').style.visibility = "hidden";
document.querySelector(".basket__button").addEventListener('click', () => {
    document.getElementById('popup__basket').style.display = "block";
    document.getElementById('popup__basket').style.opacity = "1";
    document.getElementById('popup__basket').style.visibility = "visible";
})


document.getElementsByClassName('popup__basket__content')[0].addEventListener('click', e => {
    if (e.target.classList.contains('popup__basket__close')) {
        document.getElementById('popup__basket').style.display = "none";
        document.getElementById('popup__basket').style.opacity = "0";
        document.getElementById('popup__basket').style.visibility = "hidden";
    }
})

let res = 0;


let zakaz__name = document.querySelector('.zakaz__name');
let zakaz__cost = document.querySelector('.zakaz__cost');
let zakaz__piece = document.querySelector('.zakaz__piece');
window.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.popup__content_cards');
    content.addEventListener('click', (e) => {
        const tagName = e.target.tagName;
        const id = parseInt(e.target.id) + 1;
        const parrent_id = parseInt(e.target.parentNode.id) + 1;

        if (tagName === 'BUTTON') {
            fetch(urlfood + `/${id}`)
                .then(response => response.json())
                .then(data => {
                    let resName = document.createElement('span');
                    let resCost = document.createElement('span');
                    let resPiece = document.createElement('span');
                    resCost.innerHTML = data.cost;
                    resName.innerHTML = data.name;
                    resPiece.innerHTML = '1 шт';

                    resName.classList.add('remove_span');
                    resCost.classList.add('remove_span');
                    resPiece.classList.add('remove_span');

                    zakaz__name.append(resName);
                    zakaz__cost.append(resCost);
                    zakaz__piece.append(resPiece);

                    let summ = document.querySelector('.summ');
                    let summSpan = document.createElement('span');

                    let summSpanFinal = data.cost.split(' ');
                    parseFloat(res)
                    res = res + parseFloat(summSpanFinal[0]);
                    console.log(summSpanFinal[0]);
                    console.log(res);

                    summ.append(summSpan);

                });
        } else if (tagName === 'SPAN') {
            fetch(urlfood + `/${parrent_id}`)
                .then(response => response.json())
                .then(data => {
                    let resName = document.createElement('span');
                    let resCost = document.createElement('span');
                    let resPiece = document.createElement('span');

                    resName.classList.add('remove_span');
                    resCost.classList.add('remove_span');
                    resPiece.classList.add('remove_span');

                    resCost.innerHTML = data.cost;
                    resName.innerHTML = data.name;
                    resPiece.innerHTML = '1 шт';

                    zakaz__name.append(resName);
                    zakaz__cost.append(resCost);
                    zakaz__piece.append(resPiece);


                    let summSpan = document.querySelector('.summSpan')

                    let summSpanFinal = data.cost.split(' ');
                    parseFloat(res)
                    res = res + parseFloat(summSpanFinal[0]);
                    console.log(summSpanFinal[0]);
                    console.log(res);
                    summSpan.innerHTML = res + " p";
                });
        }

    });
});


//
// let basket__button = document.querySelector('.basket__button');
// basket__button.addEventListener('click',  () => {
//     let res = localStorage.getItem('res');
//     let parseRes = JSON.parse(res);
//         for (let key of parseRes) {
//             let resName = document.createElement('span');
//             let resCost = document.createElement('span');
//             let resPiece = document.createElement('span');
//             resCost.innerHTML = key.cost;
//             resName.innerHTML = key.name;
//             resPiece.innerHTML = '1 шт';
//
//             zakaz__name.append(resName);
//             zakaz__cost.append(resCost);
//             zakaz__piece.append(resPiece);
//         }
//     }
// )


let formData = {};
let zakaz__end = document.querySelector('.end button');

let food_zakaz = 0;
zakaz__end.addEventListener('click', () => {
    food_zakaz++;
    let zakaz__Data = document.querySelectorAll('.popup__basket__content input');
    for (let i = 0; i < zakaz__Data.length; i++) {
        if (i === 0) {
            formData.id = `zakaz_${food_zakaz}`;
        }
        formData[i] = zakaz__Data[i].value;
    }
    updateorders(formData).catch((error) => alert(error));
    for (let i = 0; i < zakaz__Data.length; i++) {
        zakaz__Data[i].value = "";
    }

    let last_remove_span = document.querySelectorAll('.remove_span')
    for (let x of last_remove_span) {
        x.remove();
    }
    let sumSpan = document.querySelector('.summSpan');
    sumSpan.remove();
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