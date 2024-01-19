


const url = "https://fakestoreapi.com/products"


async function get() {
    
    const response = await fetch(url)

    console.log(response);

    const data =await response.json();
    console.log(data);

    data.map((item)=>{

        const mainContent = document.getElementById("main-content");
        
        const container =  document.createElement("div");
        container.className = "container"
        
        const product = document.createElement("div");
        product.className = "product"
        
        const image = document.createElement("div");
        image.className = "image"

        const productImage = document.createElement("img");
        productImage.className = "product-image"
        productImage.src=item.image;

        const title = document.createElement("div");
        title.className = "title"
        title.innerText = item.title;

        const detail = document.createElement("div");
        detail.className = "detail"

        const price = document.createElement("p");
        price.innerText = "$"
        

        const valor = document.createElement("span");
        valor.innerText = item.price;
        

        const botaoCart = document.createElement("a");
        botaoCart.innerText = "add to cart"
        botaoCart.href = "#"

        price.appendChild(valor)
        
        detail.appendChild(price)
        detail.appendChild(botaoCart)

        image.appendChild(productImage)

        product.appendChild(image)
        product.appendChild(title)
        product.appendChild(detail)
        
        container.appendChild(product)

        mainContent.appendChild(container)

        
        




        
    
    
    })

}


get();


