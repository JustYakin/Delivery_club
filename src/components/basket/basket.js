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

let res = [];
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
                    res.push(data)
                    localStorage.setItem('res', JSON.stringify(res));
                });
        } else if (tagName === 'SPAN') {
            fetch(urlfood + `/${parrent_id}`)
                .then(response => response.json())
                .then(data => {
                    res.push(data)
                    localStorage.setItem('res', JSON.stringify(res));
                });
        }

    });
});

let zakaz__name = document.querySelector('.zakaz__name');
let zakaz__cost = document.querySelector('.zakaz__cost');
let zakaz__piece = document.querySelector('.zakaz__piece');

let basket__button = document.querySelector('.basket__button');
basket__button.addEventListener('click',  () => {
    let res = localStorage.getItem('res');
    let parseRes = JSON.parse(res);
        for (let key of parseRes) {
            let resName = document.createElement('span');
            let resCost = document.createElement('span');
            let resPiece = document.createElement('span');
            resCost.innerHTML = key.cost;
            resName.innerHTML = key.name;
            resPiece.innerHTML = '1 шт';

            zakaz__name.append(resName);
            zakaz__cost.append(resCost);
            zakaz__piece.append(resPiece);
        }
    }
)


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
