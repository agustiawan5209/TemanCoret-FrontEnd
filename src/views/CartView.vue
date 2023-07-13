<template>
    <div class="container mx-auto">
        <!-- breadcrumb -->
        <div class="container py-4 flex items-center gap-3">
            <router-link to="/" class="text-primary text-base">
                <i class="fa-solid fa-house"></i>
            </router-link>
            <span class="text-sm text-gray-400">
                <i class="fa-solid fa-chevron-right"></i>
            </span>
            <p class="text-gray-600 font-medium">Cart</p>
        </div>
        <!-- ./breadcrumb -->

        <!-- wrapper -->
        <div class="container grid grid-cols-12 items-start gap-4 pt-4 pb-16">

            <!-- wishlist -->
            <div class="col-span-12 space-y-4">
                <transition-group name="fade" v-if="Cart.length > 0">
                    <div  class="grid grid-cols-2 md:grid-cols-6 justify-items-stretch items-center border gap-6 p-4 border-gray-200 rounded"
                        v-for="(item, index) in Cart" :key="item.id" :index="index">
                        <div class="w-auto md:w-28">
                            <img :src="item.product.galleriesdefault.photo" alt="product 6" class="w-full">
                        </div>
                        <div class="w-1/3">
                            <h2 class="text-gray-800 text-sm md:text-xl font-medium uppercase">{{ item.product.name }}</h2>
                            <p class="text-gray-500 text-sm">Stok: <span class="text-green-600">{{
                                item.product.stock }}</span></p>
                        </div>
                        <div class="text-primary text-xs sm:text-base md:text-lg font-semibold">{{ rupiah(item.product.price) }}</div>
                        <div class="w-max">
                            <ul class="list-item">
                                <li v-for="(col,index) in parseJ(item.product_details)" :key="col" :data-index="index" class="text-gray-500 text-sm">
                                    {{ index +":"+ col }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="w-auto grid grid-cols-3 items-center justify-items-center relative col-span-1 md:col-span-1">
                            <div @click="updateMinQuantity(index, item.product.price)"
                                class="icon bg-red-400 text-white rounded-l-lg w-full h-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </div>
                            <div class="input-quantity">
                                <input type="number" class="w-full h-full border-red-400 text-center "
                                    :value="quantityItem[index].quantity" :disabled="true" v-bind="inputObject">
                            </div>
                            <div @click="updatePlusQuantity(index, item.product.price, item.product.stock)"
                                class="icon bg-red-400 text-white rounded-r-lg w-full h-full flex items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>

                        <div
                            class="text-gray-600 cursor-pointer hover:text-primary w-full flex justify-center items-center">
                            <button type="button" @click="clearIDCart(item.id)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>

                </transition-group>

                <section class="bg-white dark:bg-gray-900" v-else>
                    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                        <h1
                            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                            {{ messageCartNull }}</h1>
                        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                            Keranjang Belanja Anda Masih Kosong</p>
                        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <router-link to="shop"
                                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary dark:focus:ring-primary">
                                Belanja
                                <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </router-link>
                        </div>
                    </div>
                </section>

            </div>
            <!-- ./wishlist -->
            <!-- Payment Method -->
            <div class="col-span-12" v-if="Cart.length > 0">

                <div class="bg-white shadow rounded p-4 divide-y divide-gray-200 text-gray-600 flex justify-end">
                    <ul class="w-full md:w-96 py-2 md:py-6 px-4 md:px-8">
                        <li class="border-b py-2 px-3">
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 items-start">
                                <span>Total</span> : <span>{{ rupiah(total) }}</span>
                            </div>
                        </li>
                        <li class="border-b py-2 px-3">
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 items-start">
                                <span>Diskon</span> : <span>{{ discount }}</span>
                            </div>
                        </li>
                        <li class="border-b py-2 px-3">
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 items-start">
                                <span>Pajak</span> : <span>{{ rupiah(tax * total )}}</span>
                            </div>
                        </li>
                        <li class="border-b py-2 px-3">
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 items-start">
                                <span>Sub Total</span> : <span>{{ rupiah(subtotal) }}</span>
                            </div>
                        </li>
                        <li class="border-b py-2 px-3 flex justify-center">
                            <button type="button" @click="checkout()"
                                class="bg-red-500 border border-primary text-white px-8 rounded-lg hover:bg-transparent hover:text-primary transition hidden md:flex">
                                Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- ./wrapper -->

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
export default {
    data() {
        return {
            User: [],
            quantityItem: [],
            priceItem: [],
            access_token: localStorage.getItem('token'),
            loggedIn: localStorage.getItem('loggedIn'),
            Cart: [],
            messageCartNull: null,
            total: null,
            discount: null,
            subtotal: null,
            piece: null,
            tax: 0.010,
            inputObject: {
                min: 0,
                max: 100,
            }
        }
    },
    created() {
     if(this.loggedIn){
        axios.get('http://127.0.0.1:8000/api/user', {
            headers: { Authorization: 'Bearer ' + this.access_token }
        })
            .then(res => {
                this.User = res.data;

                // Get Cart User
                axios.get('http://127.0.0.1:8000/api/Cart/show', {
                    params: {
                        slug: res.data.id
                    }
                })
                    .then(response => {
                        this.Cart = response.data.data.query;
                        console.log(this.Cart)
                        for (let i = 0; i < this.Cart.length; i++) {
                            this.quantityItem[i] = { quantity: Number(this.Cart[i].quantity), price: Number(this.Cart[i].price) };
                        }
                        this.CartPieces(response.data.data.total)
                    }).catch(error => this.messageCartNull = error.response.data.meta.message)
            })

     }
        // 

    },
    mounted() {

    },
    methods: {
        CartPieces(total) {
            this.total = total;
            this.subtotal = (total - this.discount) + (total * this.tax);
        },
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        async clearIDCart(id) {
            axios.delete('http://127.0.0.1:8000/api/Cart/delete', {
                data: {
                    slug: id,
                }
            }).then((res) => {
                Swal.fire(res.data.meta.message);
                window.location.reload();
            }).catch(err => console.log(err))
        },
        async checkout() {
            if (this.loggedIn) {
                const CartData = JSON.stringify(this.Cart);
                const encrypted = CryptoJS.AES.encrypt(CartData, '12');
                const QuantityItem = JSON.stringify(this.quantityItem);
                const encryptedQuantityItem = CryptoJS.AES.encrypt(QuantityItem, '12');
                localStorage.setItem('cart', encrypted);
                localStorage.setItem('subtotal', this.subtotal);
                localStorage.setItem('quantityItem', encryptedQuantityItem);

                this.$router.push({ name: 'checkout' })
            } else {
                Swal.fire('User Not Found');
            }
        },
        // Update Quantity Chart
        updateMinQuantity(index, price) {
            var item = this.quantityItem[index].quantity;
            if (item <= 1) {
                this.quantityItem[index].quantity = 1
            } else {
                this.quantityItem[index].quantity = this.quantityItem[index].quantity - 1;
                this.quantityItem[index].price = price * this.quantityItem[index].quantity;
                let total_array = null;
                for (let i = 0; i < this.quantityItem.length; i++) {
                    total_array += this.quantityItem[i].price
                }
                this.CartPieces(total_array)
            }
            // console.log(this.quantityItem[index])
        },
        updatePlusQuantity(index, price, stock) {
            var item = this.quantityItem[index].quantity;
            if (item >= stock) {
                this.quantityItem[index].quantity = 1
            } else {
                this.quantityItem[index].quantity = this.quantityItem[index].quantity + 1;
                this.quantityItem[index].price = price * this.quantityItem[index].quantity;
                let total_array = null;
                for (let i = 0; i < this.quantityItem.length; i++) {
                    total_array += this.quantityItem[i].price
                }
                this.CartPieces(total_array)
            }
        },
        parseJ(value){
            return JSON.parse(value);
        }
    }
}
</script>