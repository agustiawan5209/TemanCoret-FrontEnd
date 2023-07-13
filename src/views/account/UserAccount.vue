<template>
    <div class="col-span-9 grid grid-cols-3 gap-4">

        <div class="shadow rounded bg-white px-4 pt-6 pb-8">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium text-gray-800 text-lg">Personal Profile</h3>
                <a href="#" class="text-primary">Edit</a>
            </div>
            <div class="space-y-1">
                <h4 class="text-gray-700 font-medium">{{ User.name }}</h4>
                <p class="text-gray-800">{{ User.email }}</p>
                <p class="text-gray-800">0811 8877 988</p>
            </div>
        </div>

        <div class="shadow rounded bg-white px-4 pt-6 pb-8">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium text-gray-800 text-lg">Shipping address</h3>
                <a href="#" class="text-primary">Edit</a>
            </div>
            <div class="space-y-1">
                <h4 class="text-gray-700 font-medium">{{ User.name }}</h4>
                <p class="text-gray-800">Medan, North Sumatera</p>
                <p class="text-gray-800">20371</p>
                <p class="text-gray-800">0811 8877 988</p>
            </div>
        </div>

        <div class="shadow rounded bg-white px-4 pt-6 pb-8">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium text-gray-800 text-lg">Billing address</h3>
                <a href="#" class="text-primary">Edit</a>
            </div>
            <div class="space-y-1">
                <h4 class="text-gray-700 font-medium">{{ User.name }}</h4>
                <p class="text-gray-800">Medan, North Sumatera</p>
                <p class="text-gray-800">20317</p>
                <p class="text-gray-800">0811 8877 988</p>
            </div>
        </div>

    </div>
  </template>

  <script>
import axios from 'axios';
export default {
  data() {
    return {
      User: [],
      access_token: localStorage.getItem('token'),
      loggedIn: localStorage.getItem('loggedIn'),
      CartLength: null
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: 'Bearer ' + this.access_token }
    })
      .then(res => {
        this.User = res.data;
      }).catch(error => console.log(error))
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: 'Bearer ' + this.access_token }
    })
      .then(res => {
        this.CartLength = res.data.cart.length;
      }).catch(error => console.log(error))

  }
}
</script>
  