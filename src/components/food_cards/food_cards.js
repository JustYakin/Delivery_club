document.getElementsByClassName('container')[0].addEventListener('click', e => {
    if (e.target.classList.contains('cards-item')) {
        let url = 'http://localhost:3000/food';
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                // return data;
            })
            // .then((data) => {
            //     let btnSort = document.querySelector('.sorting button');
            //     btnSort.addEventListener('click', () => {
            //         let li = document.querySelectorAll('.cards-item')
            //         return li.forEach(item => {
            //             item.remove()
            //         })
            //     })
            //     btnSort.addEventListener('click', () => {
            //         let sort = data.sort(sorting);
            //         return addRestaurant(sort);
            //     })
            // })
            .catch((error) => alert(error))
    }
});


// liCards.addEventListener('click', e => {
//     if (window.location.href[window.location.href.length - 1]) {
//         window.location.replace(window.location.href + '#popup');
//     } else {
//         window.location.replace(window.location.href + '#popup');
//     }
// })


// let url = 'http://localhost:3000/restaraunts';
// fetch(url)
//     .then(response => response.json())
//     .then((data) => {
//         addRestaurant(data);
//         return data;
//     })
//     .then((data) => {
//         let btnSort = document.querySelector('.sorting button');
//         btnSort.addEventListener('click', () => {
//             let li = document.querySelectorAll('.cards-item')
//             return li.forEach(item => {
//                 item.remove()
//             })
//         })
//         btnSort.addEventListener('click', () => {
//             let sort = data.sort(sorting);
//             return addRestaurant(sort);
//         })
//     })
//     .catch((error) => alert(error))