<template>
    <KeepAlive >
        <div class="w-full">
            <transition-group :key="listOrBarItemShop" name="slide-fade" tag="div" :class="grid"
                class="grid grid-cols-1 gap-6" v-if="listOrBarItemShop == 'BAR'">
                <div class="bg-white  rounded h-full overflow-hidden group img-product transition-all ease-in"
                    v-for="(item, index) in product" :key="item.id" :index="index">
                    <div class="relative" :class="item.stock > 0 ? '' : 'opacity-70 cursor-not-allowed'">
                        <img :src="item.galleriesdefault.photo" v-if="item.galleries.length > 0" :alt="item.name"
                            class="w-full object-cover">
                        <img :src="'/../img/logofeed.png'" v-else :alt="item.name"
                            class="w-full object-cover drop-shadow-2xl">
                        <div
                            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a href="#" @click="addToDetail(item)"
                                class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="Detail">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </a>
                            <a href="#" @click="addWishlist(item.id)" v-if="config.wishlist"
                                class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="Wishlist">
                                <i class="fa-solid fa-heart"></i>
                            </a>
                        </div>
                    </div>
                    <div class="pt-4 pb-3 px-4 h-max md:h-[140px] shadow-lg shadow-black border"
                        :class="item.stock > 0 ? '' : 'opacity-70 cursor-not-allowed'">
                        <router-link :to="{ name: 'detailproduct', params: { name: item.name, id: item.id } }">
                            <h1
                                class="uppercase font-medium text-[0.6rem] sm:text-sm md:mb-2 border-b md:border-b-0 text-gray-800 hover:text-primary transition">
                                {{ item.name }}</h1>
                        </router-link>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-[0.6rem] sm:text-sm text-primary font-semibold">{{ rupiah(item.price) }}</p>
                            <!-- <p class="text-xs sm:text-sm text-gray-400 line-through">$55.90</p> -->
                        </div>
                        <table class="table-auto border-collapse w-full text-left text-gray-600 text-xs ">
                            <tr v-for="(item, key) in parseJ(item.productdetails)" :key="item.id" :index="key">
                                <th class="text-[0.6rem] sm:text-sm border border-gray-300">{{ key }}</th>
                                <td class="text-[0.6rem] sm:text-sm border border-gray-300 ">
                                    <span v-for="col in item" :key="col.value">{{ col.value }}, </span>
                                </td>
                            </tr>
                        </table>
                        <!-- <div class="flex items-center">
            <div class="flex gap-1 text-sm text-yellow-400">
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
            </div>
            <div class="text-xs text-gray-500 ml-3">({{ item.stock }})</div>
        </div> -->
                    </div>
                    <div class="flex ">
                        <button type="button" @click="ModalCart(item)" v-if="item.stock > 0 && config.cart"
                            class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                            <i class="fa-solid fa-cart-plus"></i>Keranjang</button>
                        <a href="#" @click="ModalWA(item)" v-if="config.WA"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-base whitespace-nowrap">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            </transition-group>
            <transition-group :key="listOrBarItemShop" name="slide-fade" tag="div" class="grid  grid-cols-1 gap-6"
                v-if="listOrBarItemShop == 'LIST'">
                <div class="bg-white shadow border rounded overflow-hidden group transition-all ease-in flex flex-col md:flex-row justify-between"
                    v-for="(item, index) in product" :key="item.id" :index="index">
                    <div class="flex items-center justify-start"
                        :class="item.stock > 0 ? '' : 'opacity-70 cursor-not-allowed'">
                        <img :src="item.galleriesdefault.photo" :alt="item.name" class="w-auto h-36 object-cover">
                        <div class="pt-4 pb-3 px-4">
                            <a href="#">
                                <h1
                                    class="uppercase font-medium text-xs sm:text-sm md:text-base mb-2 text-gray-800 hover:text-primary transition">
                                    {{ item.name }}</h1>
                            </a>
                            <div class="flex flex-col md:flex-row items-baseline mb-1 space-x-2">
                                <p class="text-xs sm:text-sm md:text-xl text-primary font-semibold">{{
                                    rupiah(item.price) }}
                                </p>
                                <!-- <p class="text-xs sm:text-sm  text-gray-400 line-through">$55.90</p> -->
                            </div>

                            <!-- <div class="flex flex-col md:flex-row items-center">
                <div class="flex gap-1 text-xs sm:text-sm text-yellow-400">
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                </div>
                <div class="text-xs text-gray-500 ml-3">({{ item.stock }})</div>
            </div> -->
                        </div>
                    </div>
                    <table class="table-auto border-collapse  text-left text-gray-600 text-xs ">
                        <tr v-for="(item, key) in parseJ(item.productdetails)" :key="item.id" :index="key">
                            <th class=" border-b border-gray-300">{{ key }} </th>
                            <td class=" border-b border-gray-300 ">
                                :<span v-for="col in item" :key="col.value">{{ col.value }}, </span>
                            </td>

                        </tr>
                    </table>
                    <div v-if="item.stock > 0"
                        class="relative inset-0 flex flex-row md:flex-col items-center justify-center gap-2 px-10 transition">
                        <router-link :to="{ name: 'detailproduct', params: { name: item.name, id: item.id } }"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs sm:text-sm md:text-base whitespace-nowrap"
                            title="view product">
                            Detail
                        </router-link>
                        <a href="#" @click="addWishlist(item.id)" v-if="config.wishlist"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs sm:text-sm md:text-base whitespace-nowrap"
                            title="add to wishlist">
                            Wishlist
                        </a>
                        <a href="#" @click="ModalCart(item.id, item.price)" v-if="config.cart"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-base whitespace-nowrap">
                            Keranjang</a>
                        <a href="#" @click="ModalWA(item)" v-if="config.WA"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-base whitespace-nowrap">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>

                    <div v-else
                        class="relative inset-0 flex flex-row md:flex-col items-center justify-center gap-2 px-10 transition">
                        <a href="#"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs sm:text-sm md:text-base whitespace-nowrap opacity-70 cursor-not-allowed"
                            title="view product">
                            Detail
                        </a>
                        <a href="#" v-if="config.wishlist"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs sm:text-sm md:text-base whitespace-nowrap opacity-70 cursor-not-allowed"
                            title="add to wishlist">
                            Wishlist
                        </a>
                        <a href="#" v-if="config.cart"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-base whitespace-nowrap opacity-70 cursor-not-allowed">Keranjang
                        </a>
                        <a href="#" @click="ModalWA(item)" v-if="config.WA"
                            class="block w-full py-1.5 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-base whitespace-nowrap">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>

                </div>
            </transition-group>



            <ModalView :show="showModal">
                <div class="relative p-4 bg-white rounded-lg shadow sm:p-5 overflow-auto">
                    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                        <div class="text-lg text-gray-900 md:text-xl ">
                            <h3 class="font-semibold ">
                                {{ productDetail.name }}
                            </h3>
                            <p class="font-bold">
                                {{ rupiah(productDetail.price) }}
                            </p>
                        </div>
                        <div>
                            <button type="button" @click="showModal = false"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex "
                                data-modal-toggle="readProductModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>
                    <dl>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 ">Details</dt>
                        <dd class="mb-4 font-light text-gray-500 sm:mb-5 ">{{ productDetail.description }}.</dd>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 ">Category</dt>
                        <dd class="mb-4 font-light text-gray-500 sm:mb-5 ">{{ productDetail.category }}</dd>
                    </dl>

                    <div class="pb-4" v-for="(item, key) in parseJ(productDetail.productdetails)" :key="item"
                        :index="key">
                        <div>
                            <h3 class="text-sm text-gray-800 mb-3 uppercase font-medium">{{ key }}</h3>
                            <div class="flex items-center gap-2">
                                <div class="size-selector" v-for="col in item" :key="col">
                                    <input type="radio" :name="key" @click="checkboxClick(key, $event)"
                                        :id="key + '-' + col.value" class="hidden" :value="col.value">
                                    <label :for="key + '-' + col.value"
                                        class="text-xs border border-gray-200 rounded-sm h-full w-full flex items-center justify-center cursor-pointer shadow-sm text-gray-600 px-2 py-1.5 ">{{
                                            col.value }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-3 sm:space-x-4">
                            <button @click="addToCart(productDetail.id, productDetail.price)" type="button"
                                class="text-white inline-flex bg-primary items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                    </path>
                                    <path fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Tambah
                            </button>
                        </div>
                    </div>
                </div>
            </ModalView>
            <ModalView :show="WaModal">
                <div class="relative p-4 bg-white rounded-lg shadow sm:p-5 overflow-auto">
                    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                        <div class="text-lg text-gray-900 md:text-xl ">
                            <h3 class="font-semibold ">
                                {{ WaProduct.name }}
                            </h3>
                            <p class="font-bold">
                                {{ rupiah(WaProduct.price) }}
                            </p>
                        </div>
                        <div>
                            <button type="button" @click="WaModal = false"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex "
                                data-modal-toggle="readWaProductModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>
                    <dl>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 ">Details</dt>
                        <dd class="mb-4 font-light text-gray-500 sm:mb-5 ">{{ WaProduct.description }}.</dd>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 ">Category</dt>
                        <dd class="mb-4 font-light text-gray-500 sm:mb-5 ">{{ WaProduct.category }}</dd>
                    </dl>

                    <div class="pb-4" v-for="(item, key) in parseJ(WaProduct.productdetails)" :key="item" :index="key">
                        <div>
                            <h3 class="text-sm text-gray-800 mb-3 uppercase font-medium">{{ key }}</h3>
                            <div class="flex items-center gap-2">
                                <div class="size-selector" v-for="col in item" :key="col">
                                    <input type="radio" :name="key" @click="checkboxClick(key, $event)"
                                        :id="key + '-' + col.value" class="hidden" :value="col.value">
                                    <label :for="key + '-' + col.value"
                                        class="text-xs border border-gray-200 rounded-sm h-full w-full flex items-center justify-center cursor-pointer shadow-sm text-gray-600 px-2 py-1.5 ">{{
                                            col.value }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-3 sm:space-x-4">
                            <button type="button" @click="addToWa(WaProduct)"
                                class="text-white inline-flex bg-primary items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                    </path>
                                    <path fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            </ModalView>
        </div>
    </KeepAlive>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalView from './ModalView.vue';
export default {
    name: 'ProductView',
    components: {
        ModalView,
    },
    data() {
        return {
            access_token: localStorage.getItem('token'),
            loggedIn: localStorage.getItem('loggedIn'),
            showModal: false,
            WaModal: false,
            WaProduct: [],
            productDetail: [],
            checkboxItem: new Array,
            resultItem: {},
            config: {
                cart: true,
                wishlist: true,
                WA: false
            }
        }
    },
    props: {
        product: Object,
        grid: {
            type: String,
            default: 'md:grid-cols-3'
        },
        listOrBarItemShop: {
            type: String,
            default: 'BAR',
        }
    },
    beforeCreate() {
        axios.get('http://127.0.0.1:8000/api/config/product')
            .then(res => {
                const configApp = res.data.data
                for (let i = 0; i < configApp.length; i++) {
                    const element = configApp[i];
                    if (element.name === "Cart") {
                        this.config.cart = element.value;
                    }
                    if (element.name === "Wishlist") {
                        this.config.wishlist = element.value;
                    }
                    if (element.name === "User") {
                        this.config.user = element.value;
                    }
                    if (element.name === "WA") {
                        this.config.WA = element.value;
                    }
                }

            })
    },
    mounted() {
        // console.log(this.$route)
    },
    methods: {

        parseJ(data) {
            var arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i])
            }
            var result = arr.reduce(function (r, a) {
                r[a.name] = r[a.name] || [];
                r[a.name].push(a);
                return r;
            }, Object.create(null))
            return result;
        },
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        ModalCart(item) {
            this.showModal = true;
            this.productDetail = item;
            // this.checkboxItem.push(item.productdetails);
        },

        checkboxClick(named, e) {
            this.checkboxItem.push({ name: named, value: e.target.value })
            this.resultItem = this.checkboxItem.reduce(function (r, a) {
                r[a.name] = [];
                r[a.name] = a.value;
                return r;
            }, Object.create(null))
        },
        // Add To Cart
        async addToCart(productID, priceProduct) {

            if (this.loggedIn) {
                axios.get('http://127.0.0.1:8000/api/user', {
                    headers: { Authorization: 'Bearer ' + this.access_token }
                })
                    .then(res => {
                        // Get Data User
                        const UserData = res.data;
                        const params = {
                            user_id: UserData.id,
                            product_id: productID,
                            price: priceProduct,
                            quantity: 1,
                            detail: this.resultItem,
                        }
                        // Send Data To Cart Database
                        axios({
                            url: 'http://127.0.0.1:8000/api/Cart/store',
                            method: 'post',
                            data: params,
                            responseType: 'json',
                        }).then((res) => {
                            // // Modal Notification
                            Swal.fire({
                                title: res.data.meta.message,
                                confirmButtonText: 'Save',
                            })
                                .then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                        this.$router.push({ name: 'cart' }).then(() => { this.$router.go() })
                                    }
                                })
                        }).catch((err) => {
                            Swal.fire({
                                title: err.response.data.message,
                                icon: 'error'
                            })
                        })

                    }).catch(error => console.log(error))


            } else {
                this.$router.push({ name: 'login' })
            }
        },
        addWishlist(productID) {
            if (this.loggedIn) {
                axios.get('http://127.0.0.1:8000/api/user', {
                    headers: { Authorization: 'Bearer ' + this.access_token }
                })
                    .then(res => {
                        // Get Data User
                        const UserData = res.data;

                        // Send Data To Cart Database
                        axios.post('http://127.0.0.1:8000/api/Wishlist/store', {
                            user_id: UserData.id,
                            product_id: productID,
                        }).then((res) => {
                            // // Modal Notification
                            Swal.fire({
                                title: res.data.meta.message,
                                confirmButtonText: 'Save',
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.$router.push({ name: 'account.wishlist' }).then(() => { this.$router.go() })

                                }
                            })
                        }).catch((err) => {
                            console.log(err)
                        })

                    }).catch(error => console.log(error))


            } else {
                this.$router.push({ name: 'login' })
            }
        },
        ModalWA(item) {
            this.WaModal = true;
            this.WaProduct = item;
        },
        addToWa(item) {
            console.log(this.resultItem)
            const enter = '%3A%0A';
            const spasi = '%20';
            // const koma = '%3A';
            const link = 'http://temancoret.oraclesip.my.id/View/' + item.name + '/' + item.id
            var text = `Produk${enter + spasi} Nama${spasi}Produk=${item.name}`
            text += `${enter + spasi} Harga${spasi}Produk=${item.price}`
            text += `${enter + spasi} Detail${enter}`

            for (var key in this.resultItem) {
                text += spasi + spasi + key + '=' + this.resultItem[key] + '%0A'
            }
            text += `${link}`


            const wa = "https://api.whatsapp.com/send?phone=6281222311396&text=" + text + "";
            window.location.href = wa;
        },
        addToDetail(item){
            console.log(item)
            // window.location.reload()
            this.$router.push({ name: 'detailproduct', params: { name: item.name, id: item.id } })
        },

    },

}
</script>

<style>
.img-product img {
    height: 217.77px !important;
    overflow: hidden;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}</style>