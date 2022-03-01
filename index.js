const search = () => {
    const inputField = document.getElementById('input-field').value;
    // bouns marks => case sensative section add
    const inputFieldText = inputField.toLowerCase();
    // API call
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data));
}


const showSearchResult = (data) => {
    const searchResultShow = document.getElementById('search-result-show');
    console.log(data);

    // clear the pervious content on the page 
    document.getElementById('mobile-not-found-message').style.display = 'none';
    searchResultShow.textContent = '';

    if (data.status == true) {
        const dataArray = data.data;
        for (const item of dataArray) {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card">
                        <div class="p-4 m-auto">
                        <img src=${item.image} alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Model : ${item.phone_name}</h5>
                            <p class="card-text">Brand : ${item.brand}</p>
    
                            <!-- Button trigger modal and showing more details -->
                            <div class="text-left">
                                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails('${item.slug}')">See
                                    Details</a>
                            </div>
                        </div>
                    </div>
            `
            searchResultShow.appendChild(div);
        }
    } else {
        document.getElementById('mobile-not-found-message').style.display = 'block';
    }

}


// show details on page after it selecting 
const showDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`

    // api load
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsOnPage(data));

}

const showDetailsOnPage = (data) => {
    console.log(data);
    const maindiv = document.getElementById('product-page-details');

    maindiv.textContent = '';
    const div = document.createElement('div');
    const mobileData = data.data;

    if (data.status == true && data.data.others) {



        let releaseDateChecking = mobileData.releaseDate;
        if(releaseDateChecking === ""){
            releaseDateChecking = "Date isn't found";
        }


        let otherChecking = mobileData.others;
        if(otherChecking == undefined){

        }




        div.innerHTML = `
                    <div class="modal-content close-button">
                         <div class="modal-header">
                            <h2 class="modal-title text-danger" id="exampleModalLabel"> ${mobileData.brand} ${mobileData.name}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="d-flex m-2  flex-wrap">
                                    <div class="border-0 shadow-none ">
                                        <div class="p-3">
                                            <img src="${mobileData.image}" class=" img-fluied rounded-start" alt="...">
                                        </div>
                                        <p><span class='fw-bold'>Brand : </span> ${mobileData.brand}</p>
                                        <p><span class='fw-bold'>Relese Date : </span><span class="text-primary">${releaseDateChecking}</span></p>
                                    </div>

                                    

                                    <div class="features-items">
                                        <h5 class="text-danger">Main Features</h5>
                                        <p><span class='fw-bold'>Display : </span>${mobileData.mainFeatures.displaySize}</p>
                                        <p><span class='fw-bold'>Chipset : </span>${mobileData.mainFeatures.chipSet}</p>
                                        <p><span class='fw-bold'>Storage : </span>${mobileData.mainFeatures.storage}</p>
                                        <p><span class='fw-bold'>Memory : </span>${mobileData.mainFeatures.memory}</p>
                                        <p><span class='fw-bold'>Sensor : </span>${mobileData.mainFeatures.sensors} </p>
                                          
                                        <!-- showing more Features details part  -->

                                        <h5 class="text-danger">Others Features</h5>
                                        <p><span class='fw-bold'>NFC : </span>${mobileData.others.NFC}</p>
                                        <p><span class='fw-bold'>Bluetooth : </span>${mobileData.others.Bluetooth}</p>
                                        <p><span class='fw-bold'>Radio : </span>${mobileData.others.Radio}</p>
                                        <p><span class='fw-bold'>USB : </span>${mobileData.others.USB}</p>
                                        <p><span class='fw-bold'>GPS : </span>${mobileData.others.GPS}</p>
                                        <p><span class='fw-bold'>WALN : </span>${mobileData.others.WLAN}</p>
                                    </div>


                                  

                            </div>
                        </div>
                    </div>
  `
        maindiv.appendChild(div);

    } else {
        console.log('mobile details is not founded');
    }
}