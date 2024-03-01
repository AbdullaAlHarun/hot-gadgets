const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phone)
    displayPhones(phones, isShowAll);
}   
const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
const phoneContainer = document.getElementById('phone-container');
 
// clear container card before adding new card! 
 phoneContainer.textContent = '';
    //Display show all button if there are more then 12 items! 
    

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12 && !isShowAll ){
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }

    //display only 12 phone! If not show all! 
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                        <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner 
    toggleLoadingSpinner(false);
}

// Handel Show details modal 

const handelShowDetails = async (id) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await res.json();
    const phone = data.data; 

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
const phoneName = document.getElementById('phone-name');
phoneName.innerText = phone.name;

const showDetailsContainer = document.getElementById('show-details-container');

showDetailsContainer.innerHTML = `
    <img src="${phone.image}" />
    <p><span>Storage: </span> ${phone?.mainFeatures?.storage} </p>
    <p><span>GPS: </span> ${phone?.others?.GPS} </p>

`;
    // show the modal
    show_details_modal.showModal();
}

//handle Search Button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-feild');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// //another search button 
// const handleSearch2 = () => {
//     toggleLoadingSpinner(true)
//     const searchField = document.getElementById('search-feild2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

//handel show all 

const handelShowAll = () => {
    handleSearch(true);
}

loadPhone();