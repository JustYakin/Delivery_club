let url = 'http://localhost:3000/restaraunts';

function getRestaurants() {
    return fetch(url)
        .then(response => response.json())
}

function updateRestaurants(restaurant) {
    return fetch(`${url}/${restaurant.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurant),
    })
}

const logo = document.querySelector('.logo');
logo.style.cursor = 'pointer';
logo.addEventListener('click', () => {
    deleteRestaraunts();
    getRestaurants()
        .then((data) => {
            addRestaurant(data);
            return data;
        })
})

getRestaurants()
    .then((data) => {
        addRestaurant(data);
        return data;
    })
    .then((data) => {       
        let btnSort = document.querySelector('.sorting button');
        btnSort.addEventListener('click', () => {
            deleteRestaraunts();
        })
        btnSort.addEventListener('click', () => {
            let sort = data.sort(sorting);
            return addRestaurant(sort);
        })
        let btnFavorite = document.querySelector('.favorite');
        btnFavorite.addEventListener('click', () => {
            deleteRestaraunts();
        })
        btnFavorite.addEventListener('click', () => {
            let arrLike = [];
            for (let key of data) {
                if (key.favorite) {
                    arrLike.push(key);
                }
            }
            addRestaurant(arrLike);
            if ((arrLike.length == 1) || (arrLike.length == 2)) {
                const cardItem = document.querySelectorAll('.cards-item');
                cardItem.forEach(item => {
                    item.style.maxWidth = `${480}px`;
                })
            } else if (!arrLike.length) {
                alert('Нет добавленных рестаранов в "Любимые"')
                deleteRestaraunts();
                addRestaurant(data)
            }
        })

    })
    .catch((error) => alert(error))

function deleteRestaraunts() {
    let ulRestaurant = document.querySelector('.restaurant');
    ulRestaurant.remove();
}

let search_input = document.querySelector('.searsh__input');

function search() {
    search_input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (search_input.value !== "") {
                deleteRestaraunts();
                fetch(`${url}?name=${search_input.value}`)
                    .then(response => response.json())
                    .then(data => {
                        addRestaurant(data)
                        let cardItem = document.querySelectorAll('.cards-item');
                        cardItem.forEach(item => {
                            item.style.maxWidth = `${480}px`;
                        })
                    })
            }
            else
            {
                alert('Таких ресторанов не найдено!')
            }
        }

    })
}

search();

function addRestaurant(arr) {
    const ulCards = getCards();
    for (let restaraunt of arr) {
        const liCards = document.createElement('li');
        liCards.classList.add('cards-item');
        liCards.addEventListener('click', event => {
            let idRestaraunt = restaraunt.id;
            let e = event.target;
            if ((e.classList != 'like') && (e.classList != 'rating__item') && (e.classList != 'cards-item__rating')) {
                //window.location.replace(window.location.href + '#popup');
                document.getElementById('popup').style.display = "block";
                document.getElementById('popup').style.opacity = "1";
                document.getElementById('popup').style.visibility = "visible";
                let url = 'http://localhost:3000/food';
                fetch(url)
                    .then(response => response.json())
                    .then((data) => {
                        let popup_content = document.getElementsByClassName('popup__content_cards')[0];
                        data.forEach((item, i) => {
                            let id = item.rest_id;
                            if (id === idRestaraunt) {
                                let popup_card = document.createElement('div');
                                popup_card.classList.add('popup__card');
                                popup_content.append(popup_card);
                                let popup_card_img = document.createElement('div');
                                popup_card_img.classList.add('popup__card-img');
                                popup_card_img.style.backgroundImage = `url(${item.imgFood})`;
                                popup_card.append(popup_card_img);
                                let popup_card_inform = document.createElement('div');
                                popup_card_inform.classList.add('popup__card-inform');
                                popup_card.append(popup_card_inform);
                                let h4 = document.createElement('h4');
                                h4.innerText = item.name;
                                popup_card_inform.append(h4);
                                let popup_card_price = document.createElement('div');
                                popup_card_price.classList.add('popup__card-price');
                                popup_card_inform.append(popup_card_price);
                                let span = document.createElement('span');
                                span.style.fontSize = '15px';
                                span.innerText = item.cost;
                                popup_card_price.append(span);
                                let popup_card_button = document.createElement('button');
                                popup_card_button.setAttribute('id', i);
                                popup_card_button.classList.add('popup__card-button');
                                popup_card_price.append(popup_card_button);
                                let popup_card_basket = document.createElement('span');
                                popup_card_basket.classList.add('popup__card-basket');
                                popup_card_basket.innerText = 'В корзину';
                                popup_card_button.append(popup_card_basket);
                            }
                        })
                    })

                    .catch((error) => alert(error))
            }
        })
        ulCards.append(liCards);

        const divImg = cardImg(liCards, restaraunt);
        cardBenefit(divImg, restaraunt);
        const ulConditions = cardDescription(liCards, restaraunt);
        cardRating(ulConditions, restaraunt);

    }

    document.getElementsByClassName('popup__content')[0].addEventListener('click', e => {
        if (e.target.classList.contains('popup__close')) {
            document.getElementById('popup').style.display = "none";
            document.getElementById('popup').style.opacity = "0";
            document.getElementById('popup').style.visibility = "hidden";
            let popup_content = document.getElementsByClassName('popup__content_cards')[0];
            popup_content.innerHTML = "";
        }
    })
  
    function getCards() {
        const cards = document.querySelector('.cards .container');
        const ulCards = document.createElement('ul');
        ulCards.classList.add('restaurant');
        cards.append(ulCards);
        return ulCards;
    }

    function cardDescription(liCards, restaraunt) {
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
        return ulConditions;
    }

    function cardBenefit(divImg, restaraunt) {
        const divBenefit = document.createElement('div');
        divBenefit.classList.add('card-item__benefit');
        divImg.append(divBenefit);
        const imgBenefit = document.createElement('img');
        imgBenefit.classList.add('lightning');
        imgBenefit.src = "src/image/lightning.jpg";
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

        setFavoriteStyles()

        like.addEventListener('click', () => {
            restaraunt.favorite = !restaraunt.favorite
            setFavoriteStyles();
            updateRestaurants(restaraunt).catch((error) => alert(error));
        })

        function setFavoriteStyles() {
            if (restaraunt.favorite) {
                like.style.background = 'url("src/image/lovered.png")';
                like.style.backgroundSize = 'cover';
            } else {
                like.style.background = null;
                like.style.backgroundSize = null;
            }
        }
    }

    function cardImg(liCards, restaraunt) {
        const divImg = document.createElement('div');
        divImg.classList.add('card-item__image');
        liCards.append(divImg);
        const imgRestauran = document.createElement('img');
        imgRestauran.src = restaraunt.imgRestauran;
        imgRestauran.classList.add('img-restaurant');
        divImg.append(imgRestauran);
        return divImg;
    }

    function cardRating(ulConditions, restaraunt) {
        const liRating = document.createElement('li');
        liRating.classList.add('cards-item__rating');

        const divRatingBody = document.createElement('div');
        divRatingBody.classList.add('rating__body');
        liRating.append(divRatingBody);

        const divRatingActive = document.createElement('div');
        divRatingActive.classList.add('rating__active');
        divRatingBody.append(divRatingActive);

        const divRatingItems = document.createElement('div');
        divRatingItems.classList.add('rating__items');
        divRatingBody.append(divRatingItems);

        ratingItem();
        ratingValue(restaraunt);
        ulConditions.append(liRating);

        const ratings = document.querySelectorAll('.cards-item__rating');
        initRatings(ratings);

        function ratingValue(restaraunt) {
            const spanRatingValue = document.createElement('span');
            spanRatingValue.classList.add('rating__value');
            spanRatingValue.innerText = parseFloat(restaraunt.rating).toFixed(1);
            liRating.append(spanRatingValue);
            divRatingItems.addEventListener('click', () => {
                restaraunt.rating = (parseFloat(restaraunt.rating) + parseFloat(spanRatingValue.innerHTML)) / 2;
                spanRatingValue.innerHTML = parseFloat(restaraunt.rating).toFixed(1);
                updateRestaurants(restaraunt).catch((error) => alert(error));
            })
        }

        function ratingItem() {
            for (let i = 0; i < 5; i++) {
                const inputRatingItem = document.createElement('input');
                inputRatingItem.type = 'radio';
                inputRatingItem.classList.add('rating__item');
                inputRatingItem.name = 'rating';
                inputRatingItem.value = i + 1;
                divRatingItems.append(inputRatingItem);
            }
        }
    }
}

function sorting(x, y) {
    if (x.name < y.name) {
        return -1;
    }
    if (x.name > y.name) {
        return 1;
    }
    return 0;
}

function initRatings(ratings) {
    let ratingActive, ratingValue;
    //Проходим по всем рейтингам на странице
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];
        initRating(rating);
    }

    //инициализируем конкретный рейтинг
    function initRating(rating) {
        initRatingVars(rating);
        setRatingActiveWidth();
        setRating(rating);
    }

    //инициализация переменных
    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    //изменяем ширину актив звезд
    function setRatingActiveWidth(i = ratingValue.innerHTML) {
        const ratingActiveWidth = i / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`
    }

    //возможность указывать оценку
    function setRating(rating) {

        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let i = 0; i < ratingItems.length; i++) {

            const ratingItem = ratingItems[i];

            ratingItem.addEventListener("mouseenter", () => {
                //обновление переменных
                initRatingVars(rating);
                //обновление активных звезд
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", () => {
                //обновление активных звезд
                setRatingActiveWidth()
            });

            ratingItem.addEventListener("click", () => {
                initRatingVars(rating);
                ratingValue.innerHTML = i + 1;
                setRatingActiveWidth();
            })

        }
    }


}
