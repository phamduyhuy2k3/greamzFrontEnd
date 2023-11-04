<template>
  <div class="mx-auto w-[80%] text-white">

    <h1 class="font-bold text-[2.5rem] mt-3 flex items-center justify-center">
      Reset Password
    </h1>
    <div class="mt-5 ">
      <h4>Check your email</h4>
      <div class="mt-8">
        <p>
          Thanks. If there's an account associated with this email address, we'll send the password reset instructions.
        </p>
        <p>
          - This link is valid for the next 24 hours.
        </p>
        <p>
          - If you don't receive an email within 10 minutes, check your spam folder first and then <NuxtLink to="/reset-password-step-1" class="text-red-500">try again</NuxtLink>.

        </p>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

</style>