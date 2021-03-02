// Materialize/JQuery Initialisations

  // Initialise Sidenav
    const elem = document.querySelector('.sidenav');
    let instance = new M.Sidenav(elem);

  // Initialise Parallaxes 
    document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.parallax');
    let instances = M.Parallax.init(elems);
  });




  // Add/Remove Large/Small Navbar Headings on Window Resize

  navHeading = document.getElementById("navHeading");
  
  var myScrollFunc = function() {
    var y = window.scrollY;
    if (y >= 200) {
      navHeading.style.opacity = "1";
    } else {
      navHeading.style.opacity = "0";
    }
  };

  window.addEventListener("scroll", myScrollFunc);

  // Create Elements
  const smallMedNav = document.createElement("a");
  const medNavStrong = document.createElement("strong");

  // Grab Nav Element
  const nav = document.getElementById("nav");

  // Append Elements and Add Properties
  nav.appendChild(smallMedNav);
  smallMedNav.appendChild(medNavStrong);
  medNavStrong.innerHTML = "Defying Hangry.";
  smallMedNav.setAttribute("href", "#");
  smallMedNav.setAttribute("class", "small-med-nav-heading black-text spaced-letters section scrollspy");
  smallMedNav.setAttribute("id", "smallMedNav");
  smallMedNav.setAttribute("style", "opacity: 0;"); 

  // Add Resize Event Listener
  window.addEventListener('resize', resizeFunction);

  // Define Resize Function
  var resizeFunction = function (event) {

      let smallMedNav = document.getElementById('smallMedNav');
      let w = window.innerWidth;
      
      // Change Opacity/Visibility of Small Navbar Title Heading Based on Screen Width
      if (w >= 601 && w <= 992) {
        smallMedNav.style.opacity = "1";
      } else {
        smallMedNav.style.opacity = "0";
      }

  };




  // Functionality of Adding and Removing Favourites – Application Section 

  // Define Counter
  let counter = 0;

  // Recipe Class - Will Handle the Addition of Recipes to Favourites
  class Recipe {
    constructor(title, image) {
        this.title = title;
        this.image = image;
    }
  }


  // UI Class - Will Handle the Creation/Removal of DOM Elements 
  class UI {

    // Add Recipe to Favourites List
    addRecipeToList(recipe) {

        // Get Favourites List Element
        const list = document.getElementById('favourites-list');

        // Create Column & Add Classes
        const entry = document.createElement('div');
        // Add Sizes – Using Materialize Grid Columns
        entry.classList = "col s4 m4";

        // Insert HTML Data to New Favourite Recipe from Recipe Class Instance
        entry.innerHTML = `
        <h5 class="center futura small-spaced-letters button favourites-recipe-headings">${recipe.title}</h5>
          <img src="${recipe.image}" class="responsive-img favourites-image z-depth-2">
          <a class="btn-floating btn-small deep-orange fav-image-bottom-right z-depth-1"><i class="material-icons" id="delete-btn">favorite</i></a>
        `

        // Append Entry to Favourites List Section
        list.appendChild(entry); 
    }

    // Delete Recipe from Favourites List
    deleteRecipe(target) {

        if(target.id == 'delete-btn') {

            // Remove from DOM
            target.innerText = 'favorite_border';
            target.parentElement.parentElement.remove();

            // Notify the User 
            M.toast({html: 'Favourite removed.'});

            // Decrement favCounter & Change DOM Values on Zero
            favCounter--;

        if (favCounter === 0) {

            // Reset Favourites Text to Default
            let favTextParent = document.getElementById("favourites-content");
            let favText = document.createElement('div');
            favText.innerHTML = `<span id="favourites-text" class="right black-text right-align p-text-spacing" style="font-size: 20px;"><br>You haven't picked any favourites yet. You can choose some by clicking on the heart icons next to my <a href="#recipes" class="black-text button" style="text-decoration: underline;">recipe cards</a>.</span>`
            favTextParent.appendChild(favText);
            document.getElementById('favourites-content').style.bottom = "190px";
            document.getElementById('favourites-heading').style.marginTop = "";
            document.getElementById('favourites-heading').style.paddingBottom = "";

            }
          }
      }
  }


  // Local Storage Class
  class Store {

      // Retrieve Data from Local Storage Method
      static getRecipes() {
        let recipes;

        if(localStorage.getItem('recipes') === null) {
            // Return Empty Array if Nothing in LS
            recipes = [];        
        } else {          
            // Add Data to 'recipes' if Data Available
            recipes = JSON.parse(localStorage.getItem('recipes'));
        }

        return recipes;
      }

      // Display Recipes
      static displayRecipes() {
        
        // Retrieve LS Data and Create Array
        const recipes = Store.getRecipes();
        
        // Create UI Object for Each LS Recipe Instance
        recipes.forEach(function(recipe){

            // Instantiate UI
            const ui = new UI;

            // Add recipe to UI
            ui.addRecipeToList(recipe);

        });

        // Set Fav Counter Value
        favCounter = recipes.length;
        
        // Reformat UI 'Favourites' Section Elements to Make Space for Favourited Recipes
         if (favCounter > 0) {
            let favText = document.getElementById('favourites-text');
            favText.remove();
            document.getElementById('favourites-content').style.bottom = "50px";
            document.getElementById('favourites-heading').style.marginTop = "20px";
            document.getElementById('favourites-heading').style.paddingBottom = "10px";
        }
      }

      // Add Recipe
      static addRecipe(recipe) {
        
        // Link Variable/Array to LS Data
        const recipes = Store.getRecipes();

        // Add Selected Instance to LS
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
      }

      // Remove Recipe
      static removeRecipe(imgTitle) {
        const recipes = Store.getRecipes(); 
        
        // Compares Image Data and Removes Matching Recipe        
        recipes.forEach(function(recipe, index){
            if(recipe.image === imgTitle) {
                recipes.splice(index, 1);
            }
        });

        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }

  // Display Favourites from Local Storage on Page Load – Using Store.displayRecipes Method as Event Handler
  document.addEventListener('DOMContentLoaded', Store.displayRecipes);




  // Add Functionality to Recipe Card Favourite Buttons

  // Grab all Favourite Buttons – From Recipe cards
  const favouriteBtns = document.querySelectorAll('#favourite-button');  
  // Track Number of Favourites Added
  let favCounter = 0;
  // Create Array of Favourites Added
  let favsAddedArray = [];

  // Favourite Btn Event Listener (for each recipe card in the recipes section)
  favouriteBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        
        // Get Selected Recipe Card Title and Image – to Display as Recipe in the Favourites Section
        const title = btn.parentElement.parentElement.parentElement.previousElementSibling.innerText,
              image = btn.parentElement.previousElementSibling.getAttribute('src')
        
        // Instantiate new Recipe
        const recipe = new Recipe(title, image);

        // Instantiate new UI
        const ui = new UI();

        // Change Icons and Notify User
        if (btn.innerText === 'favorite') {
            M.toast({html: 'Favourite already added. Go to the Favourites section to remove this.'});

        } else if (btn.innerText === 'favorite_border' && favCounter < 3) {
            btn.innerText = 'favorite'
            M.toast({html: 'Favourite added. Great choice!'});  
            favCounter++
            setTimeout(function() { btn.innerText = 'favorite_border' }, 5000);
            ui.addRecipeToList(recipe);
            favsAddedArray.push(recipe);
            Store.addRecipe(recipe);

            if (favCounter >= 1) {
                    let favText = document.getElementById('favourites-text');
                    favText.remove();
                    document.getElementById('favourites-content').style.bottom = "50px";
                    document.getElementById('favourites-heading').style.marginTop = "20px";
                    document.getElementById('favourites-heading').style.paddingBottom = "10px";
             } 
        } else {
            M.toast({html: 'Sorry, you have too many favourites!'});  
         }  
    });
  });


    // Event Listener for Deleting a Favourite
    document.getElementById('favourites-list').addEventListener('click', function(e){

    // Instantiate UI 
    const ui = new UI();
    // Delete Recipe Using Prototype Method
    ui.deleteRecipe(e.target);
    // Remove from LS
    Store.removeRecipe(e.target.parentElement.previousElementSibling.getAttribute("src"));

    e.preventDefault();
});
