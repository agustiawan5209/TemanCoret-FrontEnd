<template>
    <div>
        <!-- breadcrumb -->
        <div class="container py-4 flex items-center gap-3">
            <router-link to="/" class="text-primary text-base">
                <i class="fa-solid fa-house"></i>
            </router-link>
            <span class="text-sm text-gray-400">
                <i class="fa-solid fa-chevron-right"></i>
            </span>
            <p class="text-gray-600 font-medium">Product</p>
        </div>
        <!-- ./breadcrumb -->

        <!-- product-detail -->
        <div class="container grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class=" col-span-1 relative box-border overflow-hidden flex items-center flex-col ">
                <img :src="photoDefault" alt="product" class="thumbnail-galleries object-cover">
                <div class="grid grid-cols-5 gap-4 mt-4">
                    <!-- <img :src="'/../assets/images/products/product2.jpg'" alt="product2"
                    class="w-full cursor-pointer border border-primary"> -->
                    <transition-group name="fade" v-if="product.galleries !== null">
                        <img v-for="gallerisitem in product.galleries" :key="gallerisitem.id" :src="gallerisitem.photo"
                            :class="gallerisitem.id == gallerisitemId ? 'border-primary' : ''" alt="product2"
                            class="w-full cursor-pointer object-cover box-border border"
                            @click="changePhoto(gallerisitem.photo, gallerisitem.id)">
                    </transition-group>
                </div>
            </div>

            <div>
                <h2 class="text-3xl font-medium uppercase mb-2">{{ product.name }}</h2>
                <div class="flex items-center mb-4">
                    <div class="flex gap-1 text-sm text-yellow-400">
                        <span><i class="fa-solid fa-star"></i></span>
                        <span><i class="fa-solid fa-star"></i></span>
                        <span><i class="fa-solid fa-star"></i></span>
                        <span><i class="fa-solid fa-star"></i></span>
                        <span><i class="fa-solid fa-star"></i></span>
                    </div>
                    <div class="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                </div>
                <div class="space-y-2">
                    <p class="text-gray-800 font-semibold space-x-2">
                        <span>Availability: </span>
                        <span class="text-green-600" v-if="product.stock > 0">In Stock</span>
                        <span class="text-red-600" v-else>out of stock</span>
                    </p>
                    <p class="space-x-2">
                        <span class="text-gray-800 font-semibold">Brand: </span>
                        <span class="text-gray-600">{{ product.brand }}</span>
                    </p>
                    <p class="space-x-2">
                        <span class="text-gray-800 font-semibold">Category: </span>
                        <span class="text-gray-600">{{ product.category }}</span>
                    </p>
                    <p class="space-x-2">
                        <span class="text-gray-800 font-semibold">SKU: </span>
                        <span class="text-gray-600">BE45VGRT</span>
                    </p>
                </div>
                <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                    <p class="text-xl text-primary font-semibold">{{ rupiah(product.price) }}</p>
                    <!-- <p class="text-base text-gray-400 line-through">$55.00</p> -->
                </div>

                <p class="mt-4 text-gray-600" v-html="product.description"></p>

                <div class="pt-4" v-for="(item, key) in detailproducts" :key="item" :index="key">
                    <div>
                        <h3 class="text-sm text-gray-800 mb-3 uppercase font-medium">{{ key }}</h3>
                        <div class="flex items-center gap-2">
                            <div class="size-selector" v-for="col in item" :key="col">
                                <input type="radio" @click="checkboxCek($event, key, col.product_id)" :name="key"
                                    :id="key + '-' + col.value" class="hidden" :value="col.value">
                                <label :for="key + '-' + col.value"
                                    class="text-xs border border-gray-200 rounded-sm h-full w-full flex items-center justify-center cursor-pointer shadow-sm text-gray-600 px-2 py-1.5 ">{{
                                        col.value }}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4" v-if="config.cart || config.wishlist">
                    <h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                    <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                        <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                            @click="quantityMin">-</div>
                        <div class="h-8 w-8 text-base flex items-center justify-center">{{ quantity }}</div>
                        <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                            @click="quantityPlus">+</div>
                    </div>
                </div>

                <div class="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                    <a href="#" @click="addToCart(product.id, product.price)" v-if="product.stock > 0 && config.cart"
                        class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                        <i class="fa-solid fa-bag-shopping"></i> Add to cart
                    </a>
                    <a href="#" @click="addWishlist(product.id)" v-if="config.wishlist"
                        class="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                        <i class="fa-solid fa-heart"></i> Wishlist
                    </a>
                </div>

                <div class="flex gap-3 mt-4">
                    <a href="#"
                        class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#"
                        class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#"
                        class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
        <!-- ./product-detail -->

        <!-- description -->
        <div class="container pb-16">
            <h3 class="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">Product details</h3>
            <div class="w-3/5 pt-6">
                <div class="text-gray-600">
                    <p v-html="product.description"></p>
                </div>

                <table class="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                    <tr v-for="(item, key) in detailproducts" :key="item.id" :index="key">
                        <th class="py-2 px-4 border border-gray-300 w-40 font-medium">{{ key }}</th>
                        <th class="py-2 px-4 border border-gray-300 ">
                            <span v-for="col in item" :key="col.value">{{ col.value }}, </span>
                        </th>

                    </tr>
                </table>
            </div>
        </div>
        <!-- ./description -->

        <!-- related product -->
        <div class="container pb-16">
            <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Related products</h2>

            <ProductView :product="relateProduct" :listOrBarItemShop="'BAR'" :grid="'grid-cols-4'" />

        </div>
        <!-- ./related product -->

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductView from '../components/ProductView.vue';

export default {
    components: {
        ProductView
    },
    data() {
        return {
            productId: this.$route.params.id,
            product: [],
            detailproducts: [],
            product_details: [],
            relateProduct: [],
            quantity: 1,
            photoDefault: null,
            gallerisitemId: null,
            access_token: localStorage.getItem('token'),
            loggedIn: localStorage.getItem('loggedIn'),
            checkboxDetail: [],
            checkboxDetailValue: [],
            config: { cart: true, wishlist: true }
        }
    },
    beforeCreate() {
        axios.get('http://temancoret.admin.oraclesip.my.id/api/config/product',)
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
                }

            }).catch(error => {
                console.log(error)
            })
    },
    created() {
        axios.get('http://temancoret.admin.oraclesip.my.id/api/products', {
            params: {
                id: this.productId
            }
        }).then((res) => {
            this.product = res.data.data;
            this.detailproducts = this.parseJ(this.product.productdetails);

            this.photoDefault = this.product.galleriesdefault.photo;
            this.gallerisitemId = this.product.galleriesdefault.id;
            // Get Relate Product From API
            axios.get('http://temancoret.admin.oraclesip.my.id/api/products', {
                params: {
                    category: this.product.category
                }
            }).then((response) => {
                this.relateProduct = response.data.data.data;
            }).catch((err) => {
                console.log(err)
            })
            // End Related Product
        }).catch((err) => {
            console.log(err)
        })

    },
    updated() {
        // console.log(this.detailproducts)
    },
    methods: {
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        quantityMin() {
            this.quantity--;
            if (this.quantity < 1) {
                this.quantity = 1
            }
        },
        quantityPlus() {
            this.quantity++;
            if (this.quantity > this.product.stock) {
                this.quantity = this.product.stock
            }

        },
        changePhoto(photo, id) {
            this.photoDefault = photo;
            this.gallerisitemId = id;
        },
        // Add To Cart
        addToCart(productID, priceProduct) {
            if (this.loggedIn) {
                axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
                    headers: { Authorization: 'Bearer ' + this.access_token }
                })
                    .then(res => {
                        // Get Data User
                        const UserData = res.data;

                        // Send Data To Cart Database
                        axios.post('http://temancoret.admin.oraclesip.my.id/api/Cart/store', {
                            user_id: UserData.id,
                            product_id: productID,
                            price: priceProduct,
                            quantity: 1,
                        }).then((res) => {
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
                            console.log(err)
                        })

                    }).catch(error => console.log(error))


            } else {
                this.$router.push({ name: 'login' })
            }
        },
        addWishlist(productID) {
            if (this.loggedIn) {
                axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
                    headers: { Authorization: 'Bearer ' + this.access_token }
                })
                    .then(res => {
                        // Get Data User
                        const UserData = res.data;

                        // Send Data To Cart Database
                        axios.post('http://temancoret.admin.oraclesip.my.id/api/Wishlist/store', {
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
        async checkboxCek(event, named) {
            this.checkboxDetail = named
            this.checkboxDetailValue = event.target.value
            var paramsData = {
                product_id: this.productId,
                value: this.checkboxDetailValue,
                name: this.checkboxDetail,
            }
            axios({
                method: 'get',
                url: 'http://temancoret.admin.oraclesip.my.id/api/subgaleri',
                params: paramsData,
                responseType: 'json',
            }).then((res) => {
                // console.log(res.data.galeri)
                var data = res.data.data;
                this.photoDefault = data.photo;
                this.gallerisitemId = data.id;
            }).catch((err) => {
                console.log(err)
            })

        }

    }
}
</script>

<style>
.thumbnail-galleries {
    width: 450px !important;
    height: 333px;
    box-sizing: border-box;
    position: relative;
}

.img-product img {
    height: 217.77px !important;
    overflow: hidden;
}
</style>