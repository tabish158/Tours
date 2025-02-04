function redirectToBooking(tourName, price) {
    localStorage.setItem("selectedTour", tourName);
    localStorage.setItem("selectedPrice", price);
    window.location.href = "booking.html";
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("tourName")) {
        document.getElementById("tourName").innerText = localStorage.getItem("selectedTour");
        document.getElementById("tourPrice").innerText = localStorage.getItem("selectedPrice");
    }
});

function updatePersons(change) {
    let countElement = document.getElementById("personCount");
    let count = parseInt(countElement.innerText);
    count = Math.max(1, count + change);
    countElement.innerText = count;
}

document.getElementById("payButton").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let country = document.getElementById("country").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    
    if (!name || !surname || !country || !phone || !email) {
        alert("Please fill all fields before proceeding.");
        return;
    }

    let personCount = parseInt(document.getElementById("personCount").innerText);
    let tourName = localStorage.getItem("selectedTour");
    let pricePerPerson = parseFloat(localStorage.getItem("selectedPrice"));
    let totalAmount = personCount * pricePerPerson * 100;

    let options = {
        "key": "YOUR_RAZORPAY_KEY", 
        "amount": totalAmount, 
        "currency": "INR",
        "name": "Tours and Travels",
        "description": "Payment for " + tourName,
        "handler": function (response) {
            alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
            window.location.href = "index.html";
        }
    };

    let rzp1 = new Razorpay(options);
    rzp1.open();
});
