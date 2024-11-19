const carContainer = document.getElementById("cars-container");
const filterButton = document.getElementById("filter-apply");

function DisplayCars(cars) {
  carContainer.innerHTML = ""; //For clearing the carContainer

  for (let car of cars) {
    // Partially from w3schools https://www.w3schools.com/howto/howto_css_product_card.asp
    carContainer.innerHTML += `
    <div class="card">
        <p class="year">Year: ${car.year}</p>
        <p class="make">Make: ${car.make}</p>
        <p class="model">Model: ${car.model}</p>
        <p class="mileage">Mileage: ${car.mileage} Miles</p>
        <p class="price">Price: ${car.price}$</p>
        <p class="color">Color: ${car.color}</p>
        <p class="gasMileage">Gas Mileage: ${car.gasMileage}</p>
        <p><button>Add to Cart</button></p>
        </div>
    `;
  }

  //Below displays a message telling the user that the filter options they chose resulted in no car being able to display
  if (carContainer.innerHTML == "") {
    carContainer.innerHTML += `
    <div class="empty">
        <h1>Empty</h1>
        <p class="empty-p">There are no cars that match the filter</p>
    </div>
    `;
  }
}

function FilterCars(cars) {
  const minYear = document.getElementById("min-car-year").value;
  const maxYear = document.getElementById("max-car-year").value;
  //Below array methods were partially learned and taken from https://www.w3schools.com/js/js_array_iteration.asp
  let make = Array.from(
    document.getElementsByClassName("filter-make-checkbox")
  ).filter((checkbox) => {
    return checkbox.checked;
  });
  const mileage = document.getElementById("car-mileage").value;
  const minPrice = document.getElementById("min-car-price").value;
  const maxPrice = document.getElementById("max-car-price").value;
  let color = Array.from(
    document.getElementsByClassName("filter-color-checkbox")
  ).filter((checkbox) => {
    return checkbox.checked;
  });

  return cars.filter((car) => {
    return (
      (car.year >= minYear || minYear == "") &&
      (car.year <= maxYear || maxYear == "") &&
      make.some((carMake) => {
        return carMake.value == car.make;
      }) &&
      (car.mileage <= mileage || mileage == "") &&
      (car.price >= minPrice || minPrice == "") &&
      (car.price <= maxPrice || maxPrice == "") &&
      color.some((carColor) => {
        return carColor.value == car.color;
      })
    );
  });
}

DisplayCars(usedCars); //Displays on first page load
filterButton.addEventListener("click", () => {
  DisplayCars(FilterCars(usedCars));
});
