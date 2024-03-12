import type { Cart,Game } from "~/types";

export default function  () {
    const {userProfile,getAuthenticated}=useAuthStore();
    const fetchCart = async (): Promise<Cart[] | false> => {


        const { data, pending, error }: any = await useLazyFetch(
            "/api/server/v1/cart/items",

            {
                method: "get",
                headers:{
                    "Authorization": "Bearer "
                },
                key:"cartItems",

            }
        );

        if (error.value) {
            return false;
        }

        if (data.value) {
            return data.value as Cart[]; // Cast data.value to type Cart[]
        }

        // Handle cases where there's neither error nor data
        return []; // Or return an empty array or throw an error
    };
    const addToCart = async (item: any,quantity: number): Promise<Cart | false> => {

        // if(!getAuthenticated) {
        //     navigateTo(`/login?redirect=/game/appid/${item.appid}&message=Please login to add to cart&type=warning`)
        //     return false
        // }
        const { data, pending, error }: any = await useLazyFetch(
            "/api/server/v1/cart/add",
            {
                method: "post",
                headers: {
                    "Authorization": "Bearer "
                },

                body: JSON.stringify({
                   ... mapItemToCart(item),
                    quantity: quantity,
                }),
            }
        );

        if (error.value) {
            return false;
        }

        if (data.value) {
            return data.value as Cart;
        }

        return false;
    }
    const removeFromCart = async (cartId: number): Promise<boolean> => {
        const { data, pending, error }: any = await useLazyFetch(
            `/api/server/v1/cart/delete/${cartId}`,
            {
                method: "delete",
                headers: {
                    "Authorization": "Bearer "
                },
            }
        );
        console.log(error)
        console.log(data)
        if (error.value) {
            return false;
        }

        if (data.value) {
            return true;
        }

        return false;
    }
    const changeQuantity = async (cartId: number, quantity: number): Promise<Cart | false> => {
        const { data, pending, error }: any = await useLazyFetch(
            `/api/server/v1/cart/adjust-quantity`,
            {
                method: "put",
                headers: {
                    "Authorization": "Bearer "
                },
                query:{
                    id:cartId,
                    quantity
                }
            }
        );

        if (error.value) {
            return false;
        }

        if (data.value) {
          return   data.value as Cart;
        }

        return false;
    }
    const clearCart = async (): Promise<boolean> => {
        const { data, pending, error }: any = await useLazyFetch(
            "/api/server/v1/cart/delete/all",
            {
                method: "delete",
                headers:{
                    "Authorization": "Bearer "
                }
            }
        );

        if (error.value) {
            return false;
        }

        return !!data.value;


    }


    const mapItemToCart = (item: any): Cart => {
        return {
            game:{
                appid: item.appid,
            },
            platform:{
                id: item.platform.id,

            },

        }as Cart;
    }
    return { fetchCart, addToCart, removeFromCart, changeQuantity, clearCart};
};