let cart =[];
let modalKey = 0;
let modalQt = 1;
const c = (el) =>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);




const url = "https://fakestoreapi.com/products"


async function get(){

    const response = await fetch(url);
    let data = await response.json();

    data.map((item, index)=>{
        
        let productItem = c('.models .product-item').cloneNode(true);
        

        productItem.setAttribute('data-key',index);
 
        productItem.querySelector('.product--img img').src = item.image;
        productItem.querySelector('.product-title').innerHTML = item.title;
        productItem.querySelector('.product-price').innerHTML = `R$ ${item.price.toFixed(2)}`
        productItem.querySelector('.product-item .addTocart').addEventListener('click',(e) => {

            e.preventDefault();
            let key =  e.target.closest('.product-item').getAttribute('data-key');
            modalKey = key;

            c('.productBig img').src = data[key].image;
            c('.productInfo h1').innerHTML = data[key].title;
            c('.productInfo--desc').innerHTML = data[key].description;
            c('.productInfo--actualPrice').innerHTML = `R$ ${data[key].price.toFixed(2)}`



            c('.productWindowArea').style.opacity = 0;
            c('.productWindowArea').style.display = 'flex';
            setTimeout(()=>{
                c('.productWindowArea').style.opacity = 1;  
            },250)

        });

        
       



        c('.products-area').append(productItem);


        
 
    });


    c('.productInfo--addButton').addEventListener('click',()=>{
        
        let identifier = data[modalKey].id;
        let key = cart.findIndex((item)=>item.identifier==identifier);
        console.log(key);
        if(key>-1){
            cart[key].qt += modalQt;
        } else {
            cart.push({
                identifier,
                id: data[modalKey].id,
                qt:modalQt
            });
        }
        
        
        
        
        updateCart();
        closeModal();
    });

    c('.menu-openner').addEventListener('click',()=>{

        if(cart.length>0){
            c('aside').style.left = '0';
        }
    
    
    });

    c('.menu-closer').addEventListener('click',()=>{
        c('aside').style.left = '100vw';
    })

    function updateCart(){

        
        c('.menu-openner span').innerHTML = cart.length;
        if(cart.length>0){
            c('aside').style.display='block'
            c('aside').classList.add('show');
            c('.cart').innerHTML = '';
            
            let subtotal = 0;
            let desconto = 0;
            let total = 0;
    
            for(let i in cart){
                let productItem = data.find((item)=>item.id == cart[i].id);
                subtotal += productItem.price*cart[i].qt;
                
                
                let cartItem = c('.models .cart--item').cloneNode(true);
               
                
    
                
    
    
                cartItem.querySelector('img').src = productItem.image;
                cartItem.querySelector('.cart--item-nome').innerHTML = productItem.title;
    
                cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
                cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                    if(cart[i].qt>1){
                        cart[i].qt--;
                    } else{
                        cart.splice(i,1);
                       
                    }
    
                    updateCart();
                })
                cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                    cart[i].qt++;
                    updateCart();
                })
    
                c('.cart').append(cartItem);
            }
            desconto = subtotal*0.1;
            total = subtotal- desconto;
    
            c('.subtotal span:last-child').innerHTML =  `R$ ${subtotal.toFixed(2)}`;
            c('.desconto span:last-child').innerHTML =  `R$ ${desconto.toFixed(2)}`;
            c('.total span:last-child').innerHTML =  `R$ ${total.toFixed(2)}`;
        } else{
            c('aside').classList.remove('show');
            c('aside').style.display = 'none'
            
        }
    
    
    }

}

function closeModal() {
    c('.productWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.productWindowArea').style.display = 'none'  
    },500);

}

cs('.productInfo--cancelButton, .productInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.productInfo--qtmenos').addEventListener('click',()=>{
    
    if(modalQt>1){
        modalQt--;
        c('.productInfo--qt').innerHTML = modalQt;
    }
    
});

c('.productInfo--qtmais').addEventListener('click',()=>{
    
    modalQt++;
    c('.productInfo--qt').innerHTML = modalQt;
    
});














get();





