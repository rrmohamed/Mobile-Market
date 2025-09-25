
let productNameInput = document.getElementById("productNameInput") ;
let productPriceInput = document.getElementById("productPriceInput") ; 
let productCategory = document.getElementById("productCategory") ; 
let productDescription = document.getElementById("productDescription") ; 
let productsContainer ;

//this codition works if we use this application before then close it and open it after a period of time  
//check if this array of productscontainer not empty, convert it from string to object and display it 
if(localStorage.getItem("myproducts") != null){
    productsContainer =JSON.parse(localStorage.getItem("myproducts"));
    displayProducts(productsContainer) ;
// else if this array of productscontainer is empty , set the array as empty array
} else{
    productsContainer = [] ;
};
document.querySelector("#addProduct").addEventListener("click" , ()=>{
    if(validationName() == true && validationPrice() == true){
        //products object
        let products = {
            name : productNameInput.value ,
            price : productPriceInput.value ,
            category : productCategory.value ,
            desc : productDescription.value ,
        } ;
        productsContainer.push(products) ;
        //to store the data of the array in localstorage after covert its from java script object notation to string
        localStorage.setItem("myproducts" , JSON.stringify(productsContainer)) ;
        clearForm() ;
        displayProducts(productsContainer);

        productNameInput.classList.remove("is-valid");
        productPriceInput.classList.remove("is-valid");
        productCategory.classList.remove("is-valid");
    }
    else{
        alert(`
            Product Name must start with capital letter
            Product Price must be numbers
            Product Category must start with capital letter`)
    }
}) ;

// function to clear this inputs after write in them by overwride on the value inputs and equel them to "" [empty] ;  
function clearForm() {
    productNameInput.value = "" ;
    productPriceInput.value = "" ;
    productCategory.value = "" ;
    productDescription.value = "" ;
} ;

// display function of array products
function displayProducts(productsList){
    let box =`` ;
    for(let i = 0 ; i< productsList.length ; i++){
        box += `
        <tr>
            <td>${[i + 1]}</td>
            <td>${productsList[i].name}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].category}</td>
            <td>${productsList[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-success btn-sm">update</button></td>
            <td><button onclick="deleteProducts(${[i]})" id="delete" class="btn btn-danger btn-sm">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = box ;
};

// search input
function searchProducts(text){
    let searchResult = [] ;
    for(let i = 0 ; i<productsContainer.length ; i++){
        if(productsContainer[i].name.toLowerCase().includes(text.toLowerCase()) == true){
            searchResult.push(productsContainer[i]) ;
        };
    };
    displayProducts(searchResult); 
};
document.getElementById("search").oninput = function(){
    searchProducts(this.value);
};

// delete button
function deleteProducts(deletedIndex){
    productsContainer.splice(deletedIndex , 1) ;
    localStorage.setItem("myproducts" , JSON.stringify(productsContainer));
    displayProducts(productsContainer) ;
};

// update button
function updateProduct(updatedIndex){
    productNameInput.value = productsContainer[updatedIndex].name ;
    productPriceInput.value = productsContainer[updatedIndex].price ;
    productCategory.value = productsContainer[updatedIndex].category ;
    productDescription.value = productsContainer[updatedIndex].desc ;

    document.getElementById("addProduct").classList.toggle("d-none");
    document.getElementById("update").classList.toggle("d-none");

    productsContainer.splice(updatedIndex , 1) ;
    localStorage.setItem("myproducts" , JSON.stringify(productsContainer));
    displayProducts(productsContainer) ;

    window.scrollBy(0 , -90000000000000) ;
};


// update product button
document.querySelector("#update").addEventListener("click" , ()=>{
    let products = {
        name : productNameInput.value ,
        price : productPriceInput.value ,
        category : productCategory.value ,
        desc : productDescription.value ,
    } ;
    productsContainer.push(products) ;

    localStorage.setItem("myproducts" , JSON.stringify(productsContainer)) ;
    clearForm() ;
    displayProducts(productsContainer);

    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");

    document.getElementById("addProduct").classList.toggle("d-none");
    document.getElementById("update").classList.toggle("d-none");
});


// validation inputs with regular expresion
function validationName(){
    let reg = /^[A-Z][a-z]{3,}$/;
    if(reg.test(productNameInput.value) == true){
        productNameInput.classList.replace("is-invalid" , "is-valid") ;
        return true ;
    }else{
        productNameInput.classList.add("is-invalid") ;
        return false ;
    };
};
function validationPrice(){
    let reg =/^[0-9]{4,}$/;
    if(reg.test(productPriceInput.value) == true){
        productPriceInput.classList.replace("is-invalid" , "is-valid") ;
        return true ;
    }else{
        productPriceInput.classList.add("is-invalid") ;
        return false ;
    };
};
function validationCategory(){
    let reg =/^[A-Z][a-z]{3,}$/;
    if(reg.test(productCategory.value) == true){
        productCategory.classList.replace("is-invalid" , "is-valid") ;
        return true ;
    }else{
        productCategory.classList.add("is-invalid") ;
        return false ;
    };
};





