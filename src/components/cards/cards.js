let url = 'http://localhost:3000/restaraunts';
fetch(url)
    .then(response => response.json())
    .then((data) => {
        addRestaurant(data);
        return data;
    })
    .then((data) => {
        let btnSort = document.querySelector('.sorting button');
        btnSort.addEventListener('click', () => {
            let li = document.querySelectorAll('.cards-item')
            return li.forEach(item => {
                item.remove()
            })
        })
        btnSort.addEventListener('click', () => {
            let sort = data.sort(sorting);
            return addRestaurant(sort);
        })
    })
    .catch((error) => alert(error))

function addRestaurant(arr) {
    const ulCards = getCards();
    for (let restaraunt of arr) {
        const liCards = document.createElement('li');
        liCards.classList.add('cards-item');
        liCards.addEventListener('click', e => {
            window.location.replace(window.location.href + '#popup');
            let url = 'http://localhost:3000/food';
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    let popup_content = document.getElementsByClassName('popup__content')[0];
                    data.forEach(item => {
                        let popup_card = document.createElement('div');
                        popup_card.classList.add('popup__card');
                        popup_content.append(popup_card);
                        let popup_card_img = document.createElement('div');
                        popup_card_img.classList.add('popup__card-img');
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
                        span.innerText = item.cost;
                        popup_card_price.append(span);
                        let popup_card_button = document.createElement('button');
                        popup_card_button.classList.add('popup__card-button');
                        popup_card_price.append(popup_card_button);
                        let popup_card_basket = document.createElement('span');
                        popup_card_basket.classList.add('popup__card-basket');
                        popup_card_basket.innerText = 'В корзину';
                        popup_card_button.append(popup_card_basket);
                    })
                })

            .catch((error) => alert(error))
        })
        ulCards.append(liCards);

        const divImg = cardImg(liCards, restaraunt);
        cardBenefit(divImg, restaraunt);
        const ulConditions = cardDescription(liCards, restaraunt);
        cardRating(ulConditions, restaraunt);

    }

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
        getfavorite(restaraunt);
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
        liRating.classList.add('cards-item__rating', 'rating_set');

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
        initRatings(ratings)

        function ratingValue(restaraunt) {
            const spanRatingValue = document.createElement('span');
            spanRatingValue.classList.add('rating__value');
            spanRatingValue.innerText = restaraunt.rating;
            liRating.append(spanRatingValue);
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

function getfavorite() {
    const like = document.querySelectorAll('.like');
    for (let item of like) {
        item.addEventListener('click', () => {
            item.style.background = 'url("src/image/lovered.png")';
            item.style.backgroundSize = 'cover';
        })
    }

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

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }

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
                ratingValue.innerHTML = (parseInt(ratingValue.innerHTML) + (i + 1)) / 2;
                setRatingActiveWidth();

            })
        }
    }

}