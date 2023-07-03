<template>
    <div>


        <!-- shop wrapper -->
        <div class="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <!-- sidebar -->
            <!-- drawer init and toggle -->
            <div class="text-center  md:hidden">
                <button @click="drawer($event)"
                    class="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none block md:hidden"
                    type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                    aria-controls="drawer-example">
                    <i class="fa-solid fa-bars text-white"></i>
                </button>
            </div>

            <!-- drawer component -->
            <div id="drawer-example"
                class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-secondary w-80 "
                tabindex="-1" aria-labelledby="drawer-label">
                <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-800 "><svg
                        class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"></path>
                    </svg>Info</h5>
                <button type="button" @click="closeDrawer" data-drawer-hide="drawer-example" aria-controls="drawer-example"
                    class="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center ">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Close menu</span>
                </button>
                <div class="divide-y divide-gray-200 space-y-5">
                    <div>
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Kategori</h3>
                        <div class="space-y-2">
                            <div class="flex items-center" v-for="item in categories" :key="item.id">
                                <input type="checkbox" :value="item.name" v-bind:name="item.name" v-bind:id="item.name"
                                    v-model="categoryName" class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    @change="changeCheckboxCategory()">
                                <label :for="item.name" class="text-gray-700 ml-3 cusror-pointer">{{ item.name }}</label>
                                <div class="ml-auto text-gray-600 text-sm">({{ item.product.length }})</div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4">
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Harga</h3>
                        <div class="mt-4 flex items-center">
                            <input type="text" name="min" id="min" v-model="priceMaxMin.min"
                                class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="min">
                            <span class="mx-3 text-gray-500">-</span>
                            <input type="text" name="max" id="max" v-model="priceMaxMin.max"
                                class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="max">
                        </div>
                    </div>

                    <!-- <div class="pt-4">
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
                        <div class="flex items-center gap-2">
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-xs" class="hidden">
                                <label for="size-xs"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-sm" class="hidden">
                                <label for="size-sm"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-m" class="hidden">
                                <label for="size-m"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-l" class="hidden">
                                <label for="size-l"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-xl" class="hidden">
                                <label for="size-xl"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4">
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                        <div class="flex items-center gap-2">
                            <div class="color-selector">
                                <input type="radio" name="color" id="red" class="hidden">
                                <label for="red"
                                    class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                    style="background-color: #fc3d57;"></label>
                            </div>
                            <div class="color-selector">
                                <input type="radio" name="color" id="black" class="hidden">
                                <label for="black"
                                    class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                    style="background-color: #000;"></label>
                            </div>
                            <div class="color-selector">
                                <input type="radio" name="color" id="white" class="hidden">
                                <label for="white"
                                    class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                    style="background-color: #fff;"></label>
                            </div>

                        </div>
                    </div> -->

                </div>
            </div>

            <!-- ./sidebar -->
            <div class="col-span-1 bg-secondary px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
                <div class="divide-y divide-gray-200 space-y-5">
                    <div>
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Kategori</h3>
                        <div class="space-y-2">
                            <div class="flex items-center" v-for="item in categories" :key="item.id">
                                <input type="checkbox" :value="item.name" v-bind:name="item.name" v-bind:id="item.name"
                                    v-model="categoryName" class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    @change="changeCheckboxCategory()">
                                <label :for="item.name" class="text-gray-600 ml-3 cusror-pointer">{{ item.name }}</label>
                                <div class="ml-auto text-gray-600 text-sm">({{ item.product.length }})</div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4">
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                        <div class="mt-4 flex items-center">
                            <input type="text" name="min" id="min" v-model="priceMaxMin.min"
                                class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="min">
                            <span class="mx-3 text-gray-500">-</span>
                            <input type="text" name="max" id="max" v-model="priceMaxMin.max"
                                class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="max">
                        </div>
                    </div>
                    <!-- Size -->
                    <!-- <div class="pt-4">
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
                        <div class="flex items-center gap-2">
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-xs" class="hidden">
                                <label for="size-xs"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-sm" class="hidden">
                                <label for="size-sm"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-m" class="hidden">
                                <label for="size-m"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-l" class="hidden">
                                <label for="size-l"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>
                            </div>
                            <div class="size-selector">
                                <input type="radio" name="size" id="size-xl" class="hidden">
                                <label for="size-xl"
                                    class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>
                            </div>
                        </div>
                    </div> -->
                    <!-- Color -->
                    <!-- <div class="pt-4">
                        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                        <div class="flex items-center gap-2">
                            <div class="color-selector">
                                <input type="radio" name="color" id="red" class="hidden">
                                <label for="red"
                                    class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                    style="background-color: #fc3d57;"></label>
                            </div>
                            <div class="color-selector">
                                <input type="radio" name="color" id="black" class="hidden">
                                <label for="black"
                                    class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                    style="background-color: #000;"></label>
                            </div>
                            <div class="color-selector">
                                <input type="radio" name="color" id="white" class="hidden">
                                <label for="white"
                                    class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                    style="background-color: #fff;"></label>
                            </div>

                        </div>
                    </div> -->

                </div>
            </div>
            <!-- products -->
            <div class="col-span-3">
                <!-- View Product -->
                <div class="flex items-center mb-4">
                    <select name="sort" id="sort" @change="sorting($event)"
                        class="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                        <option value="">Default</option>
                        <option value="price_low_to_high">Harga Murah ke Tinggi</option>
                        <option value="price_high_to_low">Harga Tinggi ke Murah</option>
                        <option value="latest">Terbaru</option>
                    </select>

                    <div class="flex gap-2 ml-auto">
                        <div @click="listOrBarItemShopFunc('BAR')"
                            :class="listOrBarItemShop == 'BAR' ? 'border-primary text-white bg-primary' : 'border-gray-300 text-gray-600 bg-transparent'"
                            class="border  w-10 h-9 flex items-center justify-center  rounded cursor-pointer transition ease-in">
                            <i class="fa-solid fa-grip-vertical"></i>
                        </div>
                        <div @click="listOrBarItemShopFunc('LIST')"
                            :class="listOrBarItemShop == 'LIST' ? 'border-primary text-white bg-primary' : 'border-gray-300 text-gray-600 bg-transparent'"
                            class="border w-10 h-9 flex items-center justify-center  rounded cursor-pointer transition ease-in">
                            <i class="fa-solid fa-list"></i>
                        </div>
                    </div>
                </div>

                <ProductView :product="product.data" :listOrBarItemShop="listOrBarItemShop"
                    :grid="'grid-cols-2 md:grid-cols-3'" />
                <div v-if="product.length > 10">
                    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation">
                        <span class="text-sm font-normal text-gray-500">
                            Showing
                            <span class="font-semibold text-gray-900">{{ product.from }}</span>
                            of
                            <span class="font-semibold text-gray-900">{{ product.total }}</span>
                        </span>
                        <ul class="inline-flex items-stretch -space-x-px rounded-lg gap-1">

                            <li v-for="(link, idx) in product.links" :key="link">

                                <a href="#" v-if="link.url === null" :key="idx"
                                    class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                    v-html="link.label" />
                                <a href="#" v-else :key="`link-${idx}`"
                                    :class="link.active ? 'bg-white border-info text-black' : 'border-gray-300'"
                                    @click="GetPage(link.url)"
                                    class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700"
                                    v-html="link.label" />
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>

            <!-- ./products -->
        </div>
        <!-- ./shop wrapper -->

    </div>
</template>

<script>
import axios from 'axios';
import querystring from 'qs'
import { useRoute } from 'vue-router';
// import Swal from 'sweetalert2';
import ProductView from '../components/ProductView.vue';

export default {
    components: {
        ProductView,
    },
    data() {
        return {
            slug: null,
            product: [],
            params: null,
            categories: null,
            categoryName: [],
            sortingPrice: null,
            priceMaxMin: {
                max: 0,
                min: 0,
            },
            User: [],
            access_token: localStorage.getItem('token'),
            loggedIn: localStorage.getItem('loggedIn'),
            listOrBarItemShop: localStorage.getItem('listOrBarItemShop')
        }
    },
    watch: {
        priceMaxMin: {
            handler: function (value) {
                console.log(value.min);
                if (value.min > 0 || value.max > 0) {
                    this.init()
                }
            },
            deep: true,
        }
    },
    beforeCreate() {
        // Mengirim Kondisi apabila slug kosong
        axios.get('http://temancoret.admin.oraclesip.my.id/api/categories')
            .then((res) => {
                this.categories = res.data.data.data;
            })
            .catch(error => console.log(error))
        if (this.listOrBarItemShop == null) {
            localStorage.setItem('listOrBarItemShop', 'BAR')
        }
    },
    created() {
        const route = useRoute();
        this.params = route.params;

        if (this.loggedIn) {
            // User
            axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
                headers: { Authorization: 'Bearer ' + this.access_token }
            })
                .then(res => {
                    this.User = res.data;
                }).catch(error => console.log(error))

        }
        // Bar List Item
        if (this.listOrBarItemShop == null) {
            localStorage.setItem('listOrBarItemShop', 'BAR');
        }
    },

    mounted() {
        this.slug = this.$route.params.slug;
        this.getProductApi('http://temancoret.admin.oraclesip.my.id/api/products')
        // View Product

    },
    methods: {
        // rupiah(number) {
        //     return new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR"
        //     }).format(number);
        // },
        getProductApi(url) {
           
            if (this.slug == null || this.categoryName.length < 1) {
                axios.get(url,{
                    params:{
                        limit: 10,
                    }
                })
                    .then((res) => {
                        this.product = res.data.data;
                    })
                    .catch(error => console.log(error))

            } else {
                this.categoryName.push(this.slug);
                axios.get(url+'?categories=' + this.slug)
                    .then((res) => {
                        this.product = res.data.data;

                    })
                    .catch(error => console.log(error))

            }
        },
        GetPage(url) {
            this.getProductApi(url)

        },
        drawer() {
            var drawer = document.getElementById('drawer-example');
            drawer.classList.replace('-translate-x-full', 'translate-x-0');
        },
        closeDrawer() {
            var drawer = document.querySelector('[data-drawer-hide="drawer-example"]');
            var target = document.getElementById(drawer.getAttribute('data-drawer-hide'));
            target.classList.replace('translate-x-0', '-translate-x-full')
        },
        init() {
            axios.get('http://temancoret.admin.oraclesip.my.id/api/products', {
                params: {
                    price_max: this.priceMaxMin.max,
                    price_min: this.priceMaxMin.min,
                    categories_array: this.categoryName,
                    order_by_value: this.sortingPrice,
                },
                paramsSerializer: function (params) {
                    return querystring.stringify(params);
                }
            })
                .then((res) => {
                    this.product = res.data.data.data;
                })
                .catch(error => console.log(error))
        },
        // Change Category Checkbox
        changeCheckboxCategory() {

            if (this.categoryName.length > 0) {
                this.init()
            } else {
                axios.get('http://temancoret.admin.oraclesip.my.id/api/products')
                    .then((res) => {
                        this.product = res.data.data.data;
                    })
                    .catch(error => console.log(error))

            }
        },

        // Change Sorting Select
        sorting(event) {
            this.sortingPrice = event.target.value;
            this.init()
        },
        // End Sorting Price

        // Add To Cart
        // addToCart(productID, priceProduct) {
        //     if (this.loggedIn) {
        //         axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
        //             headers: { Authorization: 'Bearer ' + this.access_token }
        //         })
        //             .then(res => {
        //                 // Get Data User
        //                 const UserData = res.data;

        //                 // Send Data To Cart Database
        //                 axios.post('http://temancoret.admin.oraclesip.my.id/api/Cart/store', {
        //                     user_id: UserData.id,
        //                     product_id: productID,
        //                     price: priceProduct,
        //                     quantity: 1,
        //                 }).then((res) => {
        //                     // // Modal Notification
        //                     Swal.fire({
        //                         title: res.data.meta.message,
        //                         confirmButtonText: 'Save',
        //                     }).then((result) => {
        //                         /* Read more about isConfirmed, isDenied below */
        //                         if (result.isConfirmed) {

        //                             this.$router.push({ name: 'cart' }).then(() => { this.$router.go() })
        //                         }
        //                     })
        //                 }).catch((err) => {
        //                     console.log(err)
        //                 })

        //             }).catch(error => console.log(error))


        //     } else {
        //         this.$router.push({ name: 'login' })
        //     }
        // },
        // addWishlist(productID) {
        //     if (this.loggedIn) {
        //         axios.get('http://temancoret.admin.oraclesip.my.id/api/user', {
        //             headers: { Authorization: 'Bearer ' + this.access_token }
        //         })
        //             .then(res => {
        //                 // Get Data User
        //                 const UserData = res.data;

        //                 // Send Data To Cart Database
        //                 axios.post('http://temancoret.admin.oraclesip.my.id/api/Wishlist/store', {
        //                     user_id: UserData.id,
        //                     product_id: productID,
        //                 }).then((res) => {
        //                     // // Modal Notification
        //                     Swal.fire({
        //                         title: res.data.meta.message,
        //                         confirmButtonText: 'Save',
        //                     }).then((result) => {
        //                         /* Read more about isConfirmed, isDenied below */
        //                         if (result.isConfirmed) {
        //                             this.$router.push({ name: 'account.wishlist' }).then(() => { this.$router.go() })
        //                         }
        //                     })
        //                 }).catch((err) => {
        //                     console.log(err)
        //                 })

        //             }).catch(error => console.log(error))


        //     } else {
        //         this.$router.push({ name: 'login' })
        //     }
        // },
        listOrBarItemShopFunc(list) {
            localStorage.setItem('listOrBarItemShop', list);
            this.listOrBarItemShop = list;

        }
    }

}
</script>


<style>
.img-product img {
    height: 217.77px !important;
    overflow: hidden;
}
</style>