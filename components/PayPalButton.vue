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
   const {data:data1,status,error}=await useFetch(`/api/server/v1/payment/paypal/capture`,
      {
        method: "post",
        headers: {
          "Authorization": `Bearer`
        },
        query:{
          paypalOrderId:data.orderID,
          orderId:useCart().getOrder.id
        }
      })

  if(error.value){
    navigateTo(error.value.redirectURL)
    return;
  }
  if(data1.value){

    navigateTo(data1.value.redirectURL)
  }

}
const onError = async (err) => {
  console.log(err)
  const{status,data}= await useFetch(`/api/server/v1/checkout/failed`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer`
    },
    query:{
      orderId:useCart().getOrder.id,
      status: "FAILED"
    }
  })

  // window.location.href = "/your-error-page-here";
}
const onCancel= async (data)=> {
  await useFetch(`/api/server/v1/checkout/failed`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer`
    },
    query:{
      orderId:useCart().getOrder.id,
      status: "CANCELLED"
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