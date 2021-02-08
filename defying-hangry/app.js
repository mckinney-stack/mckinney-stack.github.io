var elem = document.querySelector('.sidenav');
    var instance = new M.Sidenav(elem);

    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
  });


  // SMALL SCREEN NAVBAR HEADING 
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


  // ADD IN NAVBAR TITLE ON SMALL-MED SCREENS AFTER SCROLLING 
  // Create element

  const smallMedNav = document.createElement("a");
  const medNavStrong = document.createElement("strong");
  const nav = document.getElementById("nav");

  nav.appendChild(smallMedNav);
  smallMedNav.appendChild(medNavStrong);
  medNavStrong.innerHTML = "Defying Hangry.";
  smallMedNav.setAttribute("href", "#");
  smallMedNav.setAttribute("class", "small-med-nav-heading black-text spaced-letters section scrollspy");
  smallMedNav.setAttribute("id", "smallMedNav");
  smallMedNav.setAttribute("style", "opacity: 0;"); 

  var resizeFunction = function (event) {

      var smallMedNav = document.getElementById('smallMedNav');
      var w = window.innerWidth;

      if (w >= 601 && w <= 992) {
        smallMedNav.style.opacity = "1";
      } else {
        smallMedNav.style.opacity = "0";
      }

    };

  window.addEventListener('resize', resizeFunction);



  /////////////////


  let counter = 0;

  class Recipe {
    constructor(title, image) {
        this.title = title;
        this.image = image;
    }
  }

  class Favourite {
    constructor(title, image, favourite) {
        this.title = title;
        this.image = image; 
        this.favourite = favourite;
    }
  }

  class UI {

    // Add Recipe To List
    addRecipeToList(recipe) {

        const list = document.getElementById('favourites-list');
        // Create column 
        const entry = document.createElement('div');
        entry.classList = "col s4 m4";
        // Insert data 
        entry.innerHTML = `
        <h5 class="center futura small-spaced-letters button favourites-recipe-headings">${recipe.title}</h5>
          <img src="${recipe.image}" class="responsive-img favourites-image z-depth-2">
          <a class="btn-floating btn-small deep-orange fav-image-bottom-right z-depth-1"><i class="material-icons" id="delete-btn">favorite</i></a>
        `
        list.appendChild(entry); 
    }

    deleteRecipe(target) {

        if(target.id == 'delete-btn') {

            // Remove from DOM
            target.innerText = 'favorite_border';

            target.parentElement.parentElement.remove();

            M.toast({html: 'Favourite removed.'});

            // Decrement favCounter & change DOM values on zero
            favCounter--;

        if (favCounter === 0) {
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

      static getRecipes() {
        let recipes;
        if(localStorage.getItem('recipes') === null) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes'));
        }

        return recipes;
      }

      static displayRecipes() {
        const recipes = Store.getRecipes();

        recipes.forEach(function(recipe){
            // Instantiate UI
            const ui = new UI;

            // Add recipe to UI
            ui.addRecipeToList(recipe);
        });

        // Set fav counter value
        favCounter = recipes.length;
        
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
        const recipes = Store.getRecipes();

        recipes.push(recipe);

        localStorage.setItem('recipes', JSON.stringify(recipes));
      }

      // Remove Recipe
      static removeRecipe(imgTitle) {
        const recipes = Store.getRecipes(); 
                
        recipes.forEach(function(recipe, index){
            if(recipe.image === imgTitle) {
                recipes.splice(index, 1);
            }
        });

        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }

  // Register class – Note and Manipulate Changes to recipe cards


  // DOM LOAD EVENT – TO SET FAVOURITES FROM LOCAL STORAGE
  document.addEventListener('DOMContentLoaded', Store.displayRecipes);

  // ADD DISPLAY FAVOURITE ICONS ON RECIPE CARDS FROM LOCAL STORAGE HERE? 




  // Grab all favourite buttons
  const favouriteBtns = document.querySelectorAll('#favourite-button');  
  // Track number of favourites
  let favCounter = 0;
  // Create array of favourites added
  let favsAddedArray = [];

  // FAVOURITE BTN EVENT LISTENER (for recipes section)
  favouriteBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        
        // Get form values
        const title = btn.parentElement.parentElement.parentElement.previousElementSibling.innerText,
              image = btn.parentElement.previousElementSibling.getAttribute('src'),
              favourite = btn.innerText;
        
        // Instantiate Recipe and add to favs array
        const recipe = new Recipe(title, image);

        // Instantiate Favourite
        const fav = new Favourite(title, image, favourite);

        // Instantiate UI
        const ui = new UI();

        console.log(favsAddedArray);

        // Change icon and notify 
        if (btn.innerText === 'favorite') {
            M.toast({html: 'Favourite removed.'});
            // Change icon of recipe card to empty heart
            btn.innerText = 'favorite_border'
            console.log(btn.parentElement.previousElementSibling);
            favsAddedArray.splice(recipe);


        } else if (btn.innerText === 'favorite_border' && favCounter < 3) {
            btn.innerText = 'favorite'
            M.toast({html: 'Favourite added. Great choice!'});  
            favCounter++
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


    // EVENT LISTENER FOR DELETE 
    document.getElementById('favourites-list').addEventListener('click', function(e){

    // Instantiate UI 
    const ui = new UI();
    // Delete recipe
    ui.deleteRecipe(e.target);
    // Remove from LS
    Store.removeRecipe(e.target.parentElement.previousElementSibling.getAttribute("src"));

    e.preventDefault();
});













  





