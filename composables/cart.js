import Cookies from 'js-cookie'
import {useCookie} from "nuxt/app";
import Swal from 'sweetalert2'
export const useCart = defineStore("cartStore", () => {
    const config = useRuntimeConfig();

    const items = useCookie('cartItems',{
        watch: true,
        default: () => [],
    })
    const countItemIsInCart =(item) => {
        let existingItem = getItemFromCart(item);
        if (existingItem) {
            return existingItem.quantity;
        }
        return 0;
    }
    const addToCart = (item,amount=1) => {
        let existingItem = getItemFromCart(item);
        item= {
            appid: item.appid,
            name: item.name,
            price: item.price,
            header_image: item.header_image,
            quantity: 0,
            stock: item.stock,
            discount: item.discount,
        };
        if(item.stock <= 0){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Item out of stock',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        if (existingItem) {
            if(existingItem.quantity + amount > existingItem.stock){
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Amount exceeds for ${amount} items in stock.`,
                    html:
                        `Amount exceeds for <strong>${amount}</strong> items in stock. Can only add <strong>${existingItem.stock - existingItem.quantity}</strong> items to cart. ` +
                        `<br>Total in cart: <strong>${existingItem.quantity}</strong> items. `+
                        `<br>Total in stock: <strong>${existingItem.stock}</strong> items`,
                    showCloseButton: true,


                })
                existingItem.quantity = existingItem.stock;

                return;
            }
            existingItem.quantity += amount;

        }else {
            item.quantity = amount;
            items.value.push(item);
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item added to cart',
            showConfirmButton: false,
            timer: 1500
        })


    }
    const removeFromCart = (item) => {
        const index = items.value.indexOf(item);
        if (index > -1) {
            items.value.splice(index, 1);
        }

    }
    const clearCart = () => {
        items.value = [];
    }

    const getCartTotal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    })
    const isItemInCart = (item) => {
        return items.value.indexOf(item) > -1;
    }
    const getItemFromCart = (item) => {
        if(!item) return;
        return items.value.find((cartItem) => {
            return cartItem?.appid === item.appid;
        })
    }
    const getCartItemCount = computed(() => {
        return items.value.length;
    })


    return {
        addToCart,
        removeFromCart,
        clearCart,
        items,
        getCartTotal,
        countItemIsInCart,
        isItemInCart,
        getCartItemCount,
        getItemFromCart

    }
})