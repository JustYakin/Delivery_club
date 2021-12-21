let restaraunts = [{
        'name': 'Мак',
        'imgRestauran': "src/image/rest.jpg",
        'raiting': '4.95',
        'price': 'от 15р',
        'time': '40-50 мин',
        'benefit': 'Выгодно',

    },
    {
        'name': 'Terra',
        'imgRestauran': "src/image/rest.jpg",
        'raiting': '4.95',
        'price': 'от 1р',
        'time': '30 мин',
        'benefit': 'Выгодно',

    },
    {
        'name': 'Темпо',
        'imgRestauran': "src/image/rest.jpg",
        'raiting': '4.95',
        'price': 'от 13',
        'time': '20 мин',
        'benefit': 'Выгодно',

    },
    {
        'name': 'KFC',
        'imgRestauran': "src/image/rest.jpg",
        'raiting': '4.95',
        'price': 'от 1р',
        'time': '30 мин',
        'benefit': 'Выгодно',

    }, {
        'name': 'Васильки',
        'imgRestauran': "src/image/rest.jpg",
        'raiting': '4.95',
        'price': 'от 1р',
        'time': '30 мин',
        'benefit': 'Выгодно',

    }
]


const cards = document.querySelector('.cards .container');
const ulCards = document.createElement('ul');
ulCards.classList.add('restaurant');
cards.append(ulCards);


function addRestaurant(arr) {
    for (let restaraunt of arr) {
        const liCards = document.createElement('li');
        liCards.classList.add('cards-item');
        ulCards.append(liCards);
        const divImg = document.createElement('div');
        divImg.classList.add('card-item__image');
        liCards.append(divImg);
        const imgRestauran = document.createElement('img');
        imgRestauran.src = restaraunt.imgRestauran;
        imgRestauran.classList.add('img-restaurant');
        divImg.append(imgRestauran);
        const divBenefit = document.createElement('div');
        divBenefit.classList.add('card-item__benefit');
        divImg.append(divBenefit);
        const imgBenefit = document.createElement('img');
        imgBenefit.classList.add('lightning');
        imgBenefit.src = "src/image/lightning.png";
        divBenefit.append(imgBenefit);
        const p = document.createElement('p');
        p.innerText = restaraunt.benefit;
        divBenefit.append(p);
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');
        divImg.append(triangle);
        const like = document.createElement('div');
        like.classList.add('like');
        divImg.append(like);

        const divDescription = document.createElement('div');
        divDescription.classList.add('cards-item__description');
        liCards.append(divDescription);
        const h3 = document.createElement('h3');
        h3.classList.add('cards-item__tittle');
        h3.innerText = restaraunt.name;
        divDescription.append(h3);
        const ulConditions = document.createElement('ul');
        ulConditions.classList.add('cards-item__conditions');
        divDescription.append(ulConditions);

        const liDelivery = document.createElement('li');
        liDelivery.classList.add('cards-item__time-of-delivery');
        ulConditions.append(liDelivery);
        const imgDelivery = document.createElement('img');
        imgDelivery.classList.add('delivery');
        imgDelivery.src = "src/image/delivery.png";
        liDelivery.append(imgDelivery);
        const spanDelivery = document.createElement('span');
        spanDelivery.innerText = restaraunt.time;
        liDelivery.append(spanDelivery);

        const liPrice = document.createElement('li');
        liPrice.classList.add('cards-item__price');
        liPrice.innerText = restaraunt.price;
        ulConditions.append(liPrice);

        const liRating = document.createElement('li');
        liRating.classList.add('cards-item__rating');
        liRating.innerText = restaraunt.raiting;
        ulConditions.append(liRating);
    }
}

addRestaurant(restaraunts);