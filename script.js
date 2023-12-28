
const url = "https://fakestoreapi.com/products"


async function get() {
    const response = await fetch(url)

    console.log(response);

    const data =await response.json();
    console.log(data);
}


get();


