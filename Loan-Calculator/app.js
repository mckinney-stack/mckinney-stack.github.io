// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);
// Get submit btn
const submitBtn = document.querySelector('.submit-btn');
// Get results body
const results = document.querySelector('.results-body');
// Get loading gif
const loadingGif = document.querySelector('.loading-gif');
// Get gif container
const gifContainer = document.querySelector('.gif-container');

// Define counter 
let counter = 0;

// Define reusable UI functions 
function fadeGif() {
    loadingGif.style.opacity = 0;
}
function fadeResultsBackIn() {
    results.style.opacity = 1;
  };

// UI Vars
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const yearSlider = document.getElementById('year-slider');
const yearSliderValue = document.getElementById('year-slider-value');
const resultsInputFade = document.querySelector('.results-input-fade');

// Calculate Results
function calculateResults(e){

    const principal = parseFloat(amount.value); // takes value of amount input and turning it into a decimal/'float' with parseFloat 
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly Payments 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); // toFixed sets the number of decimals
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        // Temporarily change btn content
        submitBtn.textContent = "CALCULATING...";
        setTimeout(calculatingEnd, 1700);

        function calculatingEnd(){
            submitBtn.textContent = "CALCULATE";
        }

        // Scroll down to results
        setTimeout(scrollDown, 100)
        function scrollDown(){
            window.scroll(0, 400);
        }

        // Temporarily show loading gif - then fade out
        loadingGif.style.opacity = 1;
        setTimeout(fadeGif, 1000);

        // fade results in
        results.style.opacity = 1;

        // Align year slider values
        yearSlider.value = years.value;
        yearSliderValue.value = years.value;

        // Increase counter value to change animation after 1st form submit
        counter++;
        if (counter >= 2) {
            loadingGif.style.opacity = 1;
            setTimeout(fadeGif, 500);
            results.style.transition = 'opacity 300ms ease-in-out';
            results.style.opacity = 0.04;
            setTimeout(fadeResultsBackIn, 1000);
            function fadeResultsBackIn() {
                results.style.opacity = 1;
            }
          };
    } else {
        showError('Please check your numbers');

        // Temporarily Disable Submit Btn 
        submitBtn.disabled = true;
        setTimeout(submitBtnActive, 3000);

        function submitBtnActive(){
            document.querySelector('.submit-btn').disabled = false;
        }
    }
    
    e.preventDefault();
}


// Show Error
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.calculator-body');
    const heading = document.querySelector('.calculator-heading');

    // Add class
    errorDiv.className = 'alert';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Extend calculator body height to accomodate alert + others
    card.setAttribute('style', 'height : 436px');
    errorDiv.setAttribute('style', 'opacity : 1');
    errorDiv.setAttribute('style', 'transition : opacity 600ms ease-out');

    // Add z-depth class
    errorDiv.classList.add('z-depth-1');


    // Fade error after 3 seconds
    setTimeout(fadeError, 2400)

    function fadeError(){
        errorDiv.style.opacity = 0;
    }

    // Clear error after 3.3 seconds
    setTimeout(clearError, 3000);

    function clearError(){
        document.querySelector('.alert').remove();
        card.setAttribute('style', 'height : 396px');
    }
}

// Change results based on years value/slider position
function updateYearSliderValue(val) {
    document.getElementById('year-slider-value').value = val;
    
    const principal = parseFloat(amount.value); // takes value of amount input and turning it into a decimal/'float' with parseFloat 
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearSliderValue.value) * 12;

    // Compute Monthly Payments 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    monthlyPayment.value = monthly.toFixed(2); // toFixed sets the number of decimals
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    
  }


  
  

