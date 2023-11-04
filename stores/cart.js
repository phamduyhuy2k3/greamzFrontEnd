import {useCookie} from "nuxt/app";
import Swal from 'sweetalert2'

export const useCart = defineStore("cartStore", () => {
    const config = useRuntimeConfig();
    const paymentMethod = ref('');
    const items = useCookie('cartItems', {
        watch: true,
        default: () => [],
    })
    const order = useCookie('orderCurrent', {
        watch: true,
        default: () => null,
    })
    const loadingPayment = ref(false);
    const countItemIsInCart = (item) => {
        let existingItem = getItemFromCart(item);
        if (existingItem) {
            return existingItem.quantity;
        }
        return 0;
    }
    const countItemIsInCartByPlatFormId = (id) => {
        let existingItem = items.value.filter(item => item.platform.id === id);
        if (existingItem) {
            return existingItem.reduce((total, item) => total + item.quantity, 0);
        }
        return 0;
    }
    const addToCart = (item, amount = 1) => {
        let existingItem = getItemFromCart(item);
        item = {
            appid: item.appid,
            name: item.name,
            price: item.price,
            header_image: item.header_image,
            quantity: 0,
            stock: item.platform.stock,
            discount: item.discount,
            platform: item.platform
        };
        if (item.stock <= 0) {
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
            if (existingItem.quantity === existingItem.stock) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Out of stock, `,
                    showCloseButton: true
                })
                return;
            }
            if (existingItem.quantity + amount > existingItem.stock) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Amount exceeds for ${amount} items in stock.`,
                    html:
                        `Amount exceeds for <strong>${amount}</strong> items in stock. Can only add <strong>${existingItem.stock - existingItem.quantity}</strong> items to cart. ` +
                        `<br>Total in cart: <strong>${existingItem.quantity}</strong> items. ` +
                        `<br>Total in stock: <strong>${existingItem.stock}</strong> items`,
                    showCloseButton: true,


                })
                existingItem.quantity = existingItem.stock;

                return;
            }
            existingItem.quantity += amount;

        } else {
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
    const removeFromCart = (item, isSwal = true) => {
        const index = items.value.indexOf(item);
        if (isSwal) {
            Swal.fire({
                title: "Remove this item?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (index > -1) {
                        items.value.splice(index, 1);
                    }

                }
            });
        } else {
            if (index > -1) {
                items.value.splice(index, 1);
            }
        }


    }
    const clearCart = () => {
        items.value = [];
    }
    const isOutOfStock = (item) => {
        let existingItem = getItemFromCart(item);
        if (existingItem) {
            return existingItem.quantity >= existingItem.stock;
        }
    }
    // const updateCartFromDatabase = async () => {
    //     if (items.value.length > 0) {
    //         const ids = items.value.map(item => item.appid).join(',')
    //         await useFetch(`${config.public.apiUrl}/api/v1/game/ids/${ids}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //
    //             },
    //             transform: (data) => {
    //                 console.log(data)
    //                 items.value = items.value.map(item => {
    //                     const game = data.find(game => game.appid === item.appid)
    //                     return {
    //                         ...item,
    //                         header_image: game.header_image,
    //                         name: game.name,
    //                         price: game.price,
    //                         stock: game.stock,
    //                         discount: game.discount,
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     return items.value;
    // }
    const getCartTotalOriginal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    })
    const getCartTotal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + (item.discount ? item.price * (100 - item.discount) / 100 * item.quantity : item.price * item.quantity);
        }, 0);
    })
    const isItemInCart = (item) => {
        return items.value.indexOf(item) > -1;
    }
    const getItemFromCart = (item) => {
        if (!item) return;
        console.log(item)
        return items.value.find((cartItem) => {
            return cartItem?.appid === item.appid && cartItem?.platform.id === item.platform.id;
        })
    }
    const getCartItemCount = computed(() => {
        return items.value.length;
    })
    const getTotalDiscount = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.price * item.quantity * item.discount / 100;
        }, 0);
    })
    const amtOf = (item) => {
        return item.discount ? item.quantity * item.price * (100 - item.discount) / 100 : item.price * item.quantity;
    }
    const setOrder = (order) => {
        order.value = order;
    }
    const getOrder = computed(() => order.value)
    const getItems = computed(() => items.value)
    const placeOrder = async (paymentMethod, promo = 0) => {
        loadingPayment.value = true;
        order.value = {
            account: {
                id: useAuthStore().userProfile.id
            },
            totalPrice: promo > 0 ? getCartTotal.value - promo : getCartTotal.value,
            ordersDetails: items.value.map(item => ({
                game: {

                    appid: item.appid,
                },
                discount: item.discount || 0,
                platform: item.platform,
                quantity: item.quantity,
                price: item.discount ? item.price * (100 - item.discount) / 100 * item.quantity : item.price * item.quantity,
            })),
            paymentmethod: paymentMethod,
        }
        const {data} = await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/checkout/placeorder`, {
            method: 'POST',
            body: order.value,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore().token}`
            }
        });
        order.value = {
            ...order.value,
            id: data.value.orderId
        }
        switch (paymentMethod) {
            case 'PAYPAL':

                const {
                    data: paypalCreateOrder,
                    error
                } = await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/payment/paypal/init`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useAuthStore().token}`
                    },
                    body: JSON.stringify({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: (order.value.totalPrice / 24.325).toFixed(2),

                            },
                        }]
                    })
                })
                if (error.value) {
                    console.log(error)
                    return;
                }
                console.log(paypalCreateOrder.value)
                loadingPayment.value = false;
                return paypalCreateOrder.value.id
            case 'VNPAY':
                order.value = {
                    ...order.value,
                    id: data.value.orderId
                }
                window.location.href = data.value.payUrl;
                loadingPayment.value = false;
                break;
            case "MOMO":

                order.value = {
                    ...order.value,
                    id: data.value.orderId
                }
                window.location.href = data.value.payUrl
                loadingPayment.value = false;
                break;
            case "SOLANA":
                const result= await sendOneLamportToRandomAddress(order.value.totalPrice).then(() => {
                    return order.value.id;
                })
                    .catch( (error) => {
                        return false;
                    })
                if(result!==false){

                    await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/checkout/callback`,{
                        method: "GET",
                        query:{
                            orderId: order.value.id
                        }
                    })
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Payment successful',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Payment failed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/checkout/failed`,{
                        method: "GET",
                        query:{
                            orderId: order.value.id
                        }
                    })

                }
                loadingPayment.value = false;
                return result;

            default:
                loadingPayment.value = false;
                alert('Payment method not supported')

        }

    }
    return {
        addToCart,
        removeFromCart,
        clearCart,
        items,
        getItems,
        getCartTotal,
        countItemIsInCart,
        isItemInCart,
        getCartItemCount,
        getItemFromCart,
        amtOf,
        getCartTotalOriginal,
        getTotalDiscount,
        paymentMethod,
        order,
        isOutOfStock,
        countItemIsInCartByPlatFormId,
        loadingPayment,
        // updateCartFromDatabase,
        setOrder, getOrder, placeOrder
    }
})