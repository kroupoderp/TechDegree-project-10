

document.addEventListener('DOMContentLoaded', () => {


    lightbox.option({
        alwaysShowNavOnTouchDevices: true,
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 1
    });


    let employees = document.querySelectorAll('a');
    let avatar = document.querySelectorAll('img');
    let name_field = document.querySelectorAll("h3");
    let email_field = document.querySelectorAll("p:first-of-type");
    let city_field = document.querySelectorAll("p:last-of-type");

    // cpfl - capitalize first letter

    let regex = /\s{1}/g;

    function cpfl(string) {

        if(!regex.test(string)) {

            return string.charAt(0).toUpperCase() + string.slice(1);

        }

        else  {

            let town = string.charAt(0).toUpperCase() +
                string.slice(1, regex.lastIndex -1) + ' ' +
                string.charAt(regex.lastIndex).toUpperCase() +
                string.slice(regex.lastIndex + 1);

            return town;

        }
    }


    // AJAX request

    let xhr = new XMLHttpRequest();

    xhr.open('GET', "https://randomuser.me/api/?results=12&nat=us", true);



    let data;

    xhr.onreadystatechange = function() {

        if(xhr.readyState === 4 && xhr.status === 200) {

            data = JSON.parse(xhr.responseText);

            for(let x = 0; x < data.results.length; x++) {

                let photo = data.results[x].picture.large;
                avatar[x].setAttribute('src', photo);
                employees[x].setAttribute('href', photo);

                let name = cpfl(data.results[x].name.first) + ' ' +
                            cpfl(data.results[x].name.last);

                name_field[x].textContent = name;

                let email = data.results[x].email;
                email_field[x].textContent = email;

                let city = data.results[x].location.city;
                city_field[x].textContent = cpfl(city);

            }
        }
    };

    xhr.send();



    let summary = document.createElement('div');
    let cross = document.createElement('span');

    let icon = `<svg class="cross" viewPort="0 0 12 12" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <line x1="1" y1="11"
                          x2="11" y2="1"
                          stroke="white"
                          stroke-width="3"/>
                    <line x1="1" y1="1"
                          x2="11" y2="11"
                          stroke="white"
                          stroke-width="3"/>
                </svg>`;

    cross.innerHTML = icon;


    for(let i = 0; i < employees.length; i++) {

        employees[i].addEventListener('click', function() {

            summary.className = 'cont';

            let obj = data.results[i];

            let name = cpfl(obj.name.first) + ' ' +
                        cpfl(obj.name.last);

            let email = obj.email;

            let city = cpfl(obj.location.city);
            let num = obj.cell;

            let addr = obj.location.street + ' ' + obj.location.postcode;

            let bday = 'Birthday: ' + obj.dob.slice(0, 9);

            summary.innerHTML =
                `
                  <div class="first">
                    <h3>${name}</h3>
                    <p>${email}</p>
                    <p>${city}</p>
                  </div>
                  <div class="last">
                    <p>${num}</p>
                    <p>${addr}</p>
                    <p>${bday}</p>
                  </div>
                `;

            let lightbox_cont = document.querySelector('.lb-outerContainer');
            lightbox_cont.appendChild(summary);
            lightbox_cont.appendChild(cross);

            let close = document.querySelectorAll('.cross')[0];
                close.addEventListener('click', () => {
                    $("#lightbox, #lightbox-panel, #lightboxOverlay").fadeOut(300);
            });
        });
    }
});