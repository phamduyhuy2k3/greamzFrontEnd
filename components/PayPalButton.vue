<template>
  <div id="paypalButton">
  </div>
</template>

<script setup>
import {loadScript} from "@paypal/paypal-js";

onMounted(async () => {
  let paypal;

  try {
    paypal = await loadScript({
      clientId: "Ac6OunOSZY2Kv9TCwJRad598Rsi_pmPmKjEsQzRcvAb2vAAixdEEIlH6m6QliVM1Glv393bh3Iw0SUbQ",
      disableFunding: 'card'
    });
  } catch (error) {
    console.error("failed to load the PayPal JS SDK script", error);
  }

  if (paypal) {
    try {
      await paypal.Buttons({

        createOrder: createOrder,
        onApprove: onApprove,
        onError: onError,
        onCancel: onCancel,
      }).render("#paypalButton");
    } catch (error) {
      console.error("failed to render the PayPal Buttons", error);
    }
  }
});

const createOrder = (data, actions) => {
  const payPalOrderId = useCart().placeOrder('PAYPAL').then((res) => {
    return res
  })
  return payPalOrderId;

}
const onApprove =async  (data, actions) => {
   const {data:data1,status}=await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/payment/paypal/capture`,
      {
        method: "post",
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        },
        query:{
          paypalOrderId:data.orderID,
          orderId:useCart().getOrder.id
        }
      })
  if(status===201){
    window.location.href=data1.value.redirectURL
  }else {
    window.location.href =useRuntimeConfig().public.apiUrl+ data1.value.redirectURL;
  }
}
const onError = async (err) => {
  const{status,data}= await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/checkout/failed`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${useAuthStore().token}`
    },
    query:{
      orderId:useCart().getOrder.id
    }
  })

  // window.location.href = "/your-error-page-here";
}
const onCancel= async (data)=> {
  await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/checkout/failed`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${useAuthStore().token}`
    },
    query:{
      orderId:useCart().getOrder.id
    }
  })
}
const style = () => {
  return {
    shape: 'pill',
    color: 'gold',
    layout: 'horizontal',
    label: 'paypal',
    tagline: false,
  }
}
</script>

<style scoped>

</style>