<template>
    <div class="pb-10">
        <ProductView :product="product" :list-or-bar-item-shop="'BAR'" :grid="'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'" />
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductView from './ProductView.vue'
export default {
    name: 'NewProductView',
    components:{
        ProductView
    },
    data() {
        return {
            product: null,
            access_token: localStorage.getItem('token'),
            loggedIn: localStorage.getItem('loggedIn'),
        }
    },
    mounted() {
        axios.get('http://temancoret.admin.oraclesip.my.id/api/products', {
            params: {
                order_by: 'desc',
                limit: 4,
            }
        })
            .then((res) => {
                this.product = res.data.data.data;
            })
    },
    methods: {
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
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
                                    this.$router.push({ name: 'cart' }).then(() => { this.$router.go() })
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
    }

}
</script>

<style>
.img-product img {
    height: 217.77px !important;
    overflow: hidden;
}
</style>