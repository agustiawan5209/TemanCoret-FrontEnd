<template>
    <div class="w-full">
       
        <div class="w-full relative flex">
            <span class="absolute left-4 top-2 text-lg text-gray-400">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" ref="search" id="search" v-model="search"
                class="w-full border border-primary md:border-r-0 pl-12 md:py-2 md:pr-3 md:rounded-l-md focus:outline-none"
                placeholder="Cari Produk">
            <button @click="searchClick()"
                class="bg-primary border border-primary text-white px-8 md:rounded-r-md hover:bg-transparent hover:text-primary transition md:items-center">Search</button>
        </div>
        <teleport to="body">
            <transition>
                <div class="fixed bottom-0 left-0 inset-0 bg-gray-800 opacity-75" v-show="modalSearch"></div>
            </transition>
            <transition name="custom-classes" enter-active-class="animate__animated animate__bounceInLeft"
                leave-active-class="animate__animated animate__bounceOutRight">
                <div class="max-w-full h-screen w-full flex inset-0 justify-center items-start pt-20 fixed z-50"  @focus="modalSearch = false" @focusout="modalSearch = false"
                    v-show="modalSearch">
                    <div :class="maxWidthClass"
                        class="bg-secondary w-full mx-auto rounded-lg shadow transform transition-all relative overflow-y-auto">
                        <div class="w-full max-w-full relative flex">
                            <span class="absolute left-4 top-2 md:top-2 text-lg text-gray-400">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input type="text" ref="input" id="input" v-model="dataSearch"
                                class="w-full border border-primary border-r-0 pl-12 py-2 pr-3 rounded-l-md focus:outline-none flex"
                                placeholder="Cari Produk">
                                <button @click="closeModal()"
                class="bg-error border border-primary text-white px-8 md:rounded-r-md hover:bg-transparent hover:text-primary transition md:items-center">Tutup</button>
                        </div>
                        <div class="px-2 py-3">
                            <h4 class="text-sm text-gray-600 capitalize">Hasil Pencarian</h4>
                            <ul class="list-item pt-2 " v-if="product.length > 0">
                                <li class="w-full grid grid-cols-12" v-for="(item,idx) in product" :key="item.id" :index="idx">
                                    <a href="#" @click="pushToDetail(item)"
                                        class="col-span-12 pl-3 py-1.5 text-sm md:text-base rounded-lg group bg-white flex flex-wrap justify-between">
                                        <dl>
                                            <dt class="text-sm sm:text-base md:text-lg">{{ item.name }}</dt>
                                            <dd class="text-xs sm:text-sm text-gray-700">Harga : {{ item.price }} </dd>
                                            <dd class="text-xs sm:text-sm text-gray-700">brand  : {{ item.brand }} </dd>
                                        </dl>
                                        <table class="table-auto border-collapse w-full max-w-sm text-left text-gray-600 text-sm">
                                            <tr v-for="(item, key) in parseJ(item.productdetails)" :key="item.id" :index="key">
                                                <th class="py-2 px-4 border border-gray-300 w-40 font-medium">{{ key }}</th>
                                                <th class="py-2 px-4 border border-gray-300 ">
                                                    <span v-for="col in item" :key="col.value">{{ col.value }}, </span>
                                                </th>
                        
                                            </tr>
                                        </table>
                                    </a>
                                </li>
                            </ul>
                            <ul class="list-item pt-2 " v-else>
                                <li class="w-full grid grid-cols-12" >
                                    <a href="#"
                                        class="col-span-12 pl-3 py-1.5 text-sm md:text-base rounded-lg group bg-white text-center">
                                        <h6 class="text-sm sm:text-base md:text-xl text-gray-600 text-center">
                                            Maaf Pencarian Kosong    
                                        </h6>
                                        
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ModalView',
    data() {
        return {
            dataSearch: null,
            search: null,
            modalSearch: false,
            search2: null,
            product: [],
        }
    },
    emits: ['customChange'],
    props: {
        maxWidth: {
            type: String,
            default: '2xl',
        },
        className: {
            type: String,
            default: '' ,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        maxWidthClass: function () {
            return {
                sm: 'md:max-w-sm',
                md: 'md:max-w-md',
                lg: 'md:max-w-lg',
                xl: 'md:max-w-xl',
                '2xl': 'md:max-w-2xl',
                '3xl': 'md:max-w-3xl',
                '4xl': 'md:max-w-4xl',
            }[this.maxWidth]
        },
    },
    watch: {
        dataSearch(value) {
            if (value !== null) {
                this.findProduct(value)
            }
        }
    },
    methods: {
        sendChange(event) {
            // this.$refs.search.focus()
            this.$emit('customChange', event)
        },
        showModal() {
            this.modalSearch = true;
            this.$refs.input.focus()

        },
        searchClick() {
            this.showModal()
            this.dataSearch = this.search
            this.findProduct(this.search)
        },
        findProduct(valueSearch) {
            axios.get('http://temancoret.admin.oraclesip.my.id/api/products', {
                params: {
                    slug: valueSearch,
                }
            }).then((res) => {
                this.product = res.data.data;
            }).catch(err => console.log(err))
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
        pushToDetail(item){
            this.modalSearch = false;
            this.product = [];
            this.$router.push({ name: 'detailproduct', params: { name: item.name, id: item.id } })
        },
        closeModal(){
            this.modalSearch = false;
            this.product = [];
        }

    },
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>