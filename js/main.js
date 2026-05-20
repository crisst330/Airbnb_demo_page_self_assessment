console.log("Hello, here is my main.js file loaded (test console)!");

// Selects the important HTML elements from the webpage
const carouselInner = document.querySelector("#carousel-inner");
const listingDetails = document.querySelector("#listing-details");

// Stores the listings data and keeps track of the
// currently selected carousel item
let listings = [];
let currentIndex = 0;

// Fetch the Airbnb listings data from the JSON file,
// store the first 50 listings,
// then render the carousel and first listing
async function loadListings() {
  // Fetch the airbnb listings data from the JSON file
  const response = await fetch("./airbnb_sf_listings_500.json");

  // Stores all of the JSON data initially
  const data = await response.json();

  // Keep only the first 50 listings
  listings = data.slice(0, 50);

  // Displays/renders the carousel images
  showCarousel();

  // Displays/renders the first listing details initially
  showListing(0);
}

// Creates the Boostrap carousel items dynamically using
// the listing pictures URLs from the JSON file.
function showCarousel() {
  carouselInner.innerHTML = "";

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];

    let activeClass = "";

    // Bootstrap requires the first carousel item to have the "active" class
    // https://getbootstrap.com/docs/5.3/components/carousel/ - "You must add the .active class..."
    if (i === 0) {
      activeClass = "active";
    }
    // Dynamically adds/appends the carousel item HTML for each listing
    carouselInner.innerHTML += `
            <div class="carousel-item ${activeClass}">
                <img
                    src="${listing.picture_url}"
                    class="d-block w-100"
                    alt="${listing.name}"
                    onerror="this.src='images/default-listing.jpeg'"
                />
            </div>
            `;
  }
}

// Displays/renders the detailed information about a selected listing,
// including the listing name (title), description, amenities, host (name & photo),
// and price
function showListing(index) {
  const listing = listings[index];

  // Converts the amenities string into a JavaScript array for indexing
  let amenities = JSON.parse(listing.amenities);

  listingDetails.innerHTML = `
        <article class="card">
            <div class="card-body">
                <h3>${listing.name}</h3>
                
                <p>
                    <strong>Price:</strong>
                    ${listing.price} per night
                </p>

                <img 
                    src="${listing.host_picture_url}"
                    alt="Photo of ${listing.host_name}"
                    width="80"
                    class="rounded-circle"
                />

                <p>
                    <strong>Host:</strong>
                    ${listing.host_name}
                </p>

                <p>${listing.description}</p>

                <h4>Amenities</h4>

                <ul>
                    <li>${amenities[0]}</li>
                    <li>${amenities[1]}</li>
                    <li>${amenities[2]}</li>
                    <li>${amenities[3]}</li>
                    <li>${amenities[4]}</li>
                </ul>

            </div>
            </article>
    `;
}

// Handles event handling (clicking) to next carousel button
// Moving forward through the listings array.
document
.querySelector(".carousel-control-next")
.addEventListener("click", function () {

    currentIndex++;

    // Restarts the carousel at the beginning if the end if reached
    if (currentIndex >= listings.length) {
        currentIndex = 0;
    }

    showListing(currentIndex);

});

// Handles event handling (clicking) to the previous carousel button
// Moves backwards through the listings array
document
    .querySelector(".carousel-control-prev")
    .addEventListener("click", function () {
        
        currentIndex--;

        // Goes to the end of the list (last) in the listings array if the beginning is reached
        if (currentIndex < 0) {
            currentIndex = listings.length - 1;
        }

        showListing(currentIndex);
    });

// Finally, initialize and start the application here.
loadListings();

// Course demo variables below from lecture video (W3)
// const inTitle = document.querySelector("#input-title");
// const inPrice = document.querySelector("#input-price");
// const inDescription = document.querySelector("#input-description");
// const btnCancel = document.querySelector("#button-cancel");

// const onClickCancel = (evt) => {
//     Don't navigate to a different page
//     evt.preventDefault();

//     inTitle.value = "";
//     inPrice.value = 80;
//     inDescription.value = "";
// };
// btnCancel.addEventListener("click", onClickCancel)
