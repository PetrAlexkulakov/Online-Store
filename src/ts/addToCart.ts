interface productInLocal{
    id: string,
    count: string,
    price: string
}
export interface ourProduct{
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export function addToCart(product: ourProduct){
    let cartProducts = [];
    const localStore = localStorage.getItem('cartProducts');
    if (localStore){
        cartProducts = JSON.parse(localStore);
    }
    const productInCart = cartProducts.find((item: productInLocal) => String(item.id) === String(product.id));
    cartProducts.splice(cartProducts.indexOf(productInCart),1);

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}