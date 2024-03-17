import {useCookie} from "nuxt/app";
import Swal from 'sweetalert2'

export const useCart = defineStore("cartStore", () => {
    const {
        addToCart: add,
        clearCart: clear,
        fetchCart,
        removeFromCart: remove,
        changeQuantity: update
    } = useCartService()
    const paymentMethod = ref('');
    const items = ref([]);
    const order = useCookie('orderCurrent', {
        watch: true,
        default: () => null,
    })
    const loadingPayment = ref(false);

    const addToCart = async (item, amount = 1) => {
        const result = await add(item, amount)
        if (!result) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Item out of stock',
                showConfirmButton: false,
                timer: 1500
            })
        }
        if (result) {
            await fetch();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Item added to cart',
                showConfirmButton: false,
                timer: 1500
            })

        }
        // let existingItem = getItemFromCart(item);
        // item = {
        //     appid: item.appid,
        //     name: item.name,
        //     price: item.price,
        //     header_image: item.header_image,
        //     quantity: 0,
        //     stock: item.platform.stock,
        //     discount: item.discount,
        //     platform: item.platform
        // };
        // if (item.stock <= 0) {
        //     Swal.fire({
        //         position: 'center',
        //         icon: 'error',
        //         title: 'Item out of stock',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     return;
        // }
        // if (existingItem) {
        //     if (existingItem.quantity === existingItem.stock) {
        //         Swal.fire({
        //             position: 'center',
        //             icon: 'warning',
        //             title: `Out of stock, `,
        //             showCloseButton: true
        //         })
        //         return;
        //     }
        //     if (existingItem.quantity + amount > existingItem.stock) {
        //         Swal.fire({
        //             position: 'center',
        //             icon: 'warning',
        //             title: `Amount exceeds for ${amount} items in stock.`,
        //             html:
        //                 `Amount exceeds for <strong>${amount}</strong> items in stock. Can only add <strong>${existingItem.stock - existingItem.quantity}</strong> items to cart. ` +
        //                 `<br>Total in cart: <strong>${existingItem.quantity}</strong> items. ` +
        //                 `<br>Total in stock: <strong>${existingItem.stock}</strong> items`,
        //             showCloseButton: true,
        //
        //
        //         })
        //         existingItem.quantity = existingItem.stock;
        //
        //         return;
        //     }
        //     existingItem.quantity += amount;
        //
        // } else {
        //     item.quantity = amount;
        //     items.value.push(item);
        // }
        //
        // Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: 'Item added to cart',
        //     showConfirmButton: false,
        //     timer: 1500
        // })


    }
    const fetch = async () => {
       return  await fetchCart().then((data) => {
            if (data) {
                items.value = data;
                return data;
            }else {
                items.value = [];
            }

        });

    }
    const changeQuantity = async (cartId, quantity) => {
        const result = await update(cartId, quantity)
        if (result) {
            const index = items.value.findIndex((cartItem) => {
                return cartItem?.id === cartId;
            })
            if (index > -1) {

                items.value[index] = result;
            }
        }
    }
    const removeFromCart =async (item, isSwal = true) => {
        if (!isSwal) {
            await remove(item.id)
            await fetch();
            return;
        }
        Swal.fire({
            title: 'Are you sure you want to remove this item from cart?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Remove from cart'
        }).then(async (result) => {
            if (result.isConfirmed) {

                const result = await remove(item.id)
                if (result) {
                    await remove(item.id)
                    await fetch();
                    Swal.fire(
                        'Deleted!',
                        'Your item has been removed from cart.',
                        'success'
                    )
                }
            }
        })

    }
    const clearCart = () => {

    }


    const getCartTotalOriginal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.game.price * item.quantity;
        }, 0);
    })
    const getCartTotal = computed(() => {
        return items.value.reduce((total, item) => {
            return total + (item.game.discount ? item.game.price * (100 - item.game.discount) / 100 * item.quantity : item.game.price * item.game.quantity);
        }, 0);
    })
    const isItemInCart = (item) => {
        return items.value.indexOf(cartItem => cartItem.id === item.id) > -1;
    }
    // const getItemFromCart = (item) => {
    //     if (!item) return;
    //     console.log(item)
    //     return items.value.find((cartItem) => {
    //         return cartItem?.game.appid === item.game.appid && cartItem?.platform.id === item.platform.id;
    //     })
    // }
    const getCartItemCount = computed(() => {
        return items.value.length;
    })
    const getTotalDiscount = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.game.price * item.quantity * item.game.discount / 100;
        }, 0);
    })
    const amtOf = (item) => {
        return item.game.discount ? item.quantity * item.game.price * (100 - item.game.discount) / 100 : item.game.price * item.quantity;
    }
    const setOrder = (order) => {
        order.value = order;
    }
    const getOrder = computed(() => order.value)
    const getItems = computed(() => items.value)
    const clearItems = () => {
        items.value = [];
    }
    const placeOrder = async (paymentMethod, promo = 0) => {
        loadingPayment.value = true;
        order.value = {
            account: {
                id: useAuthStore().userProfile.id
            },
            totalPrice: promo > 0 ? getCartTotal.value - promo : getCartTotal.value,
            ordersDetails: items.value.map(item => ({
                game: {

                    appid: item.game.appid,
                },
                discount: item.game.discount || 0,
                platform: item.platform,
                quantity: item.quantity,
                price: item.game.discount ? item.game.price * (100 - item.game.discount) / 100 * item.game.quantity : item.game.price * item.quantity,
            })),
            paymentmethod: paymentMethod,
        }
        const {data} = await useFetch(`/api/server/v1/checkout/placeorder`, {
            method: 'POST',
            body: order.value,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer`
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
                } = await useFetch(`/api/server/v1/payment/paypal/init`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer`
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
                const result = await sendOneLamportToRandomAddress(order.value.totalPrice).then(() => {
                    return order.value.id;
                })
                    .catch((error) => {
                        console.log(error)
                        return false;
                    })
                if (result !== false) {

                    await useFetch(`/api/server/v1/checkout/callback`, {
                        method: "GET",
                        query: {
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
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Payment failed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    await useFetch(`/api/server/v1/checkout/failed`, {
                        method: "GET",
                        query: {
                            orderId: order.value.id,
                            status: "FAILED"
                        }
                    })

                }
                loadingPayment.value = false;
                return result;
            case "FREE":
                order.value = {
                    ...order.value,
                    id: data.value.orderId
                }
                const {data: dataCallBack} = await useFetch(`/api/server/v1/checkout/callback/client`, {
                    method: "GET",
                    query: {
                        orderId: order.value.id
                    }
                })
                window.location.href = dataCallBack.value
                break
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
        isItemInCart,
        getCartItemCount,
        amtOf,
        getCartTotalOriginal,
        getTotalDiscount,
        paymentMethod,
        order,
        fetch,
        loadingPayment,
        setOrder, getOrder, placeOrder,
        changeQuantity,
        clearItems
    }
})