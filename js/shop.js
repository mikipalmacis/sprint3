// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    // Ejercicio 8
    addToCart(id);
    /*
    for(n=0; n< products.length; n++)
    {
        if(id==products[n].id) cartList.push(id);
    }
    let elementosDiferentes = new Set(cartList);
    document.getElementById("count_product").innerHTML = elementosDiferentes.size;
    console.log(cartList);
    */
}

// Exercise 2
function cleanCart() {
    //cartList = []; Modificado Ejercicio 8
    cart = [];
    document.getElementById("count_product").innerHTML = 0;
    document.getElementById("total_price").innerHTML = 0;
    noVisibleCarrito();
    console.log(cartList);
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let precioTotal = 0;
    for(n=0; n < cartList.length; n++)
    {
        precioTotal += products[cartList[n]-1].price;
    }
    console.log(precioTotal);
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart = [];
    let valor;
    let encontrado = false;
    for(n=0; n < cartList.length; n++)
    {
        encontrado = false;
        for(i=0; i < cart.length; i++)
        {
            if(cartList[n]==cart[i].id&&!encontrado)
            {
                console.log("encontrado:"+cart[i].id);
                // Encontrado Sumamos cantidad
                encontrado = true;
                cart[i].quantity ++;
                cart[i].subtotal = cart[i].quantity * cart[i].price;
            } 
        }
        if(!encontrado)
        {
            valor = {
                'id': products[cartList[n]-1].id,
                'name': products[cartList[n]-1].name,
                'price': products[cartList[n]-1].price,
                'type': products[cartList[n]-1].type,
                'quantity': 1,
                'subtotal': products[cartList[n]-1].price,
            };
            cart.push(valor);
        }
    }
    applyPromotionsCart();
    console.log(cart);
}


// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for(i=0; i < cart.length; i++)
    {
        if(cart[i].id==1&&cart[i].quantity>=3)
        {
            // Aplicamos promoción aceite
            cart[i].price = 10;
            cart[i].subtotal = cart[i].quantity * cart[i].price;
        }
        if(cart[i].id==3&&cart[i].quantity>=10)
        {
            // Aplicamos promoción pasteles
            cart[i].price = ((2/3) * cart[i].price).toFixed(2);
            cart[i].subtotal = (cart[i].quantity * cart[i].price).toFixed(2);
        } 
    }
}
function visibleCarrito()
{
    document.getElementById("vacio").style.display = "none";
    document.getElementById("lleno").style.display = "block";
}
function noVisibleCarrito()
{
    document.getElementById("vacio").style.display = "block";
    document.getElementById("lleno").style.display = "none";
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    //generateCart(); Modificado Ejercicio 8
    let carrito = '';
    let total = 0;
    if(cart.length==0) // Si esta vacío
    {
        noVisibleCarrito();
        document.getElementById("total_price").innerHTML = 0;
    }
    else
    {
        visibleCarrito();
        for(i=0; i < cart.length; i++)
        {
            carrito += '<tr><th scope="row">'+cart[i].name+'</th><td>$'+cart[i].price+'</td><td>'+cart[i].quantity+'</td><td>$'+cart[i].subtotal+'</td><td><button class="btn btn-sm btn-primary" onclick="removeFromCart('+cart[i].id+')">-</button></td></tr>';
            total += cart[i].subtotal;
        }
        document.getElementById("cart_list").innerHTML = carrito;
        document.getElementById("total_price").innerHTML = total;
    }
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    encontrado = false;
    for(i=0; i < cart.length; i++)
    {
        if(id==cart[i].id&&!encontrado)
        {
            console.log("encontrado:"+cart[i].id);
            // Encontrado Sumamos cantidad
            encontrado = true;
            cart[i].quantity ++;
            cart[i].subtotal = cart[i].quantity * cart[i].price;
        } 
    }
    if(!encontrado)
    {
        valor = {
            'id': products[id-1].id,
            'name': products[id-1].name,
            'price': products[id-1].price,
            'type': products[id-1].type,
            'quantity': 1,
            'subtotal': products[id-1].price,
        };
        cart.push(valor);
    }
    document.getElementById("count_product").innerHTML = cart.length;
    applyPromotionsCart();
    console.log(cart);
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    console.log("entro: "+id);
    encontrado = false;
    for(i=0; i < cart.length; i++)
    {
        if(id==cart[i].id&&!encontrado)
        {
            console.log("encontrado:"+cart[i].id);
            // Encontrado Sumamos cantidad
            encontrado = true;
            cart[i].quantity --;
            cart[i].subtotal = cart[i].quantity * cart[i].price;
            if(cart[i].quantity==0) cart.splice(i, 1);
        }
    }
    document.getElementById("count_product").innerHTML = cart.length;
    applyPromotionsCart();
    printCart();
    console.log(cart);
}

function open_modal(){
	console.log("Open Modal");
	printCart();
}