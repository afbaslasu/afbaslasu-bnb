$(document).ready(function () {
  // Room data
  const rooms = [
    {
      id: 1,
      title: "Luxury Suite",
      type: "suite",
      price: "$120/night",
      img: "images/room1.jpg",
    },
    {
      id: 2,
      title: "Cozy Apartment",
      type: "apartment",
      price: "$100/night",
      img: "images/room2.jpg",
    },
    {
      id: 3,
      title: "Standard Room",
      type: "standard",
      price: "$80/night",
      img: "images/room3.jpg",
    },
    {
      id: 4,
      title: "Another Standard Room",
      type: "standard",
      price: "$80/night",
      img: "images/room4.jpg",
    },
  ];

  // Load rooms dynamically
  function loadRooms(filter = "") {
    const filteredRooms = rooms.filter((room) =>
      room.type.includes(filter.toLowerCase())
    );
    $("#room-list").html(""); // Clear existing room cards
    filteredRooms.forEach((room) => {
      $("#room-list").append(`
      <div class="col-md-6"> <!-- Adjusted for 2 per row -->
        <div class="room-card">
          <img src="${room.img}" class="img-fluid" alt="${room.title}">
          <div class="p-3">
            <h4>${room.title}</h4>
            <p>${room.price}</p>
          </div>
        </div>
      </div>
    `);
    });
  }

  // Initial load
  loadRooms();

  // Filter rooms by type
  $("#search").on("input", function () {
    const filter = $(this).val();
    loadRooms(filter);
  });

  // Handle booking form submission
  $("#booking-form").on("submit", function (e) {
    e.preventDefault();
    alert("Booking submitted successfully!");
    $(this).trigger("reset");
  });

  // Review Section Animation
  let currentReview = 0;
  const reviews = $(".review");
  const totalReviews = reviews.length;

  // Initially show the first review
  reviews.eq(currentReview).css({ opacity: 1, top: 0 });

  function showNextReview() {
    reviews.eq(currentReview).animate({ opacity: 0, top: "100%" }, 1000);
    currentReview = (currentReview + 1) % totalReviews;
    reviews
      .eq(currentReview)
      .css({ top: "-100%" })
      .animate({ opacity: 1, top: 0 }, 1000);
  }

  // Automatically switch reviews every 6 seconds
  let reviewInterval = setInterval(showNextReview, 6000);

  // Pause the animation on hover
  $(".reviews-container").hover(
    function () {
      clearInterval(reviewInterval);
    },
    function () {
      reviewInterval = setInterval(showNextReview, 6000);
    }
  );

  // Phone Number Validity
  document
    .getElementById("booking-form")
    .addEventListener("submit", function (e) {
      // Prevent form submission
      e.preventDefault();

      let isValid = true; // Flag to track form validity

      // Full Name validation (only letters)
      const fullNameInput = document.getElementById("fullName");
      const fullNameRegex = /^[A-Za-z\s\-]+$/; // Letters, spaces, and hyphens only

      if (!fullNameRegex.test(fullNameInput.value)) {
        fullNameInput.classList.add("is-invalid");
        isValid = false; // Mark the form as invalid
      } else {
        fullNameInput.classList.remove("is-invalid");
      }

      // Phone number validation (Nigerian format)
      const phoneInput = document.getElementById("phone");
      const phoneRegex = /^(0|\+234)[7-9]{1}[0-1]{1}[0-9]{8}$/; // Nigerian phone number format

      if (!phoneRegex.test(phoneInput.value)) {
        phoneInput.classList.add("is-invalid");
        isValid = false; // Mark the form as invalid
      } else {
        phoneInput.classList.remove("is-invalid");
      }

      // If all fields are valid, proceed with form submission
      if (isValid) {
        alert("Booking submitted successfully!");
        // Form submission logic here (e.g., send data to the server)
        // Optionally, clear the form:
        document.getElementById("booking-form").reset();
      }
    });

  // Slider.js
  (function () {
    let currentIndex = 0;
    let isTransitioning = false;
    const slides = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide");
    const totalSlides = slideElements.length - 1; // Subtract the clone
    const slideWidth = 100; // in percentage
    let autoScroll;

    const updateSlider = () => {
      if (!isTransitioning) {
        isTransitioning = true;
        slides.style.transition = "transform 1s ease";
        slides.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      }
    };

    const nextSlide = () => {
      if (isTransitioning) return;
      currentIndex = (currentIndex + 1) % (totalSlides + 1); // Loop to the cloned slide
      updateSlider();
    };

    const prevSlide = () => {
      if (isTransitioning) return;
      currentIndex = (currentIndex - 1 + totalSlides + 1) % (totalSlides + 1); // Handle wrap-around
      updateSlider();
    };

    slides.addEventListener("transitionend", () => {
      if (currentIndex === totalSlides) {
        slides.style.transition = "none"; // Remove transition to snap back
        currentIndex = 0;
        slides.style.transform = `translateX(0%)`; // Snap to the first real slide
      }
      isTransitioning = false;
    });

    // Arrow navigation
    document.querySelector(".arrow-right").addEventListener("click", nextSlide);
    document.querySelector(".arrow-left").addEventListener("click", prevSlide);

    // Automatic scrolling every 5 seconds
    const startAutoScroll = () => {
      autoScroll = setInterval(nextSlide, 5000);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScroll);
    };

    // Pause auto-scroll on hover
    document
      .querySelector(".slider")
      .addEventListener("mouseenter", stopAutoScroll);
    document
      .querySelector(".slider")
      .addEventListener("mouseleave", startAutoScroll);

    startAutoScroll(); // Start auto-scroll initially
  })();
});

// Bonanza JS
(function () {
  //   creating the hotel object
  var hotel = {
    name: "October, November, December",
    roomRate: 150000000, // amount in dollars
    discount: 10, // percentage of discount
    offerPrice: function () {
      var offerRate = this.roomRate * ((100 - this.discount) / 100);
      return offerRate;
    },
  };

  //   write out the hotel name, standard rate, amd the special rate
  var hotelName, roomRate, specialRate; //declare variables
  //   linking the javascript variables to the id selectors
  hotelName = document.getElementById("hotel-name");
  roomRate = document.getElementById("original-price");
  specialRate = document.getElementById("sale-price");

  //   declaring the text content
  hotelName.textContent = hotel.name; //hotel name
  roomRate.textContent = "#" + hotel.roomRate; //room rate
  specialRate.textContent = "#" + hotel.offerPrice(); //offer price

  // calculating the expire details
  var expiryMsg; //message displayed to users
  var today; //today's date
  var endDate; //element that shows the message

  function offerExpires(today) {
    //declare variables within the function for local scope
    var weekFromToday, day, date, month, year, dayNames, monthNames;
    //add 7 days time (added in milliseconds)
    weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    // creating an array to holds the names of days and months
    dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // collect the parts of the date to show on the page
    day = dayNames[weekFromToday.getDay()];
    date = weekFromToday.getDate();
    month = monthNames[weekFromToday.getMonth()];
    year = weekFromToday.getFullYear();
    // creating the message
    expiryMsg = "Offer expires next ";
    expiryMsg += day + " <br />(" + date + " " + month + " " + year + ")";
    return expiryMsg;
  }

  today = new Date();
  endDate = document.getElementById("offer-ends");
  endDate.innerHTML = offerExpires(today);

  // close the entire function
})();