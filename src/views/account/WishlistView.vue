<template>
    <div class="col-span-9">
        <!-- wishlist -->
        <div class="col-span-9 space-y-4">
            <div v-for="(item, index) in wishlist" :key="item.id" :index="index"
                class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                <div class="w-28">
                    <img :src="item.product.galleriesdefault.photo" alt="product 6" class="w-full">
                </div>
                <div class="w-1/3">
                    <h2 class="text-gray-800 text-xl font-medium uppercase">{{ item.product.name }}</h2>
                    <p class="text-gray-500 text-sm">Stok: <span class="text-green-600">In Stock</span></p>
                </div>
                <div class="text-primary text-lg font-semibold">{{ rupiah(item.product.price) }}</div>
                <a href="#" @click="ModalCart(item.product)"
                    :class="item.product.stock < 2 ? 'cursor-not-allowed bg-red-400' : 'bg-primary cursor-pointer'"
                    class="px-6 py-2 text-center text-sm text-white  border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">add
                    to cart</a>

                <div class="text-gray-600 cursor-pointer hover:text-primary">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>

        </div>
        <!-- ./wishlist -->
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

                <div class="pb-4" v-for="(item, key) in parseJ(productDetail.productdetails)" :key="item" :index="key">
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
                            <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
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
    </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2'
import ModalView from '@/components/ModalView.vue'

export default {
    data() {
        return {
            User: [],
            access_token: localStorage.getItem('token'),
            loggedIn: localStorage.getItem('loggedIn'),
            wishlist: [],
            showModal: false,
            productDetail: [],
            checkboxItem: new Array,
            resultItem: {},
        }
    },
    components: {
        ModalView,
    },
    created() {
        // Get User Account
        if (this.loggedIn) {
            axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
                headers: { Authorization: 'Bearer ' + this.access_token }
            })
                .then(res => {
                    this.User = res.data;

                    // Get Wishlist Data
                    axios.get('http://temancoret.admin.oraclesip.my.id/api/Wishlist/show', {
                        params: {
                            slug: res.data.id,
                        }
                    }).then((res) => {
                        this.wishlist = res.data.data;
                        console.log(res.data.data)
                    }).catch(err => console.log(err))
                    // End Wishlist
                }).catch(error => console.log(error))
        }
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
            console.log(this.resultItem)
        },
        addToCart(productID, priceProduct) {
            if (this.loggedIn) {
                axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
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
                        axios.post('http://temancoret.admin.oraclesip.my.id/api/Cart/store', params)
                            .then((res) => {
                                // // Modal Notification
                                Swal.fire({
                                    title: res.data.meta.message,
                                    confirmButtonText: 'Save',
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                        this.$router.push({ name: 'cart' })
                                    }
                                })
                            }).catch((err) => {
                                Swal.fire({
                                title:err.response.data.message,
                                icon: 'error'
                            })
                            })

                    }).catch((err) =>{
                        Swal.fire({
                                title:err.response.data.message,
                                icon: 'error'
                            })
                    })


            } else {
                this.$router.push({ name: 'login' })
            }
        },
    }
}
</script>