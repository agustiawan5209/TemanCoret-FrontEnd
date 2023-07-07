<template>
    <div class="container py-6" v-if="categoris.length > 0">
        <h1 class=" text-sm sm:text-base md:text-2xl font-medium text-gray-800 uppercase mb-6">Kategori produk TemanCoret</h1>
        <div class="grid  gap-3 h-max" :class="categoris.length <= 5 ? 'grid-cols-3 md:grid-cols-5' :'grid-cols-3 md:grid-cols-7'">
            <div class="relative rounded-sm overflow-hidden group flex items-center justify-center" v-for="item in categoris" :key="item.id">
                <img :src="item.thumbnail" alt="category 1" class="w-full object-cover relative">
                <router-link :to="{name: 'shop', params: {slug: item.name } }" title="temancoret-shop"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center  group-hover:bg-opacity-60 transition">
                <h4 class="text-xs sm:text-sm md:text-xl text-center text-white font-roboto font-medium">{{ item.name }}</h4>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: 'CategoriesView',
    data() {
        return {
            categoris: [],
        }
    },
    mounted() {
        axios.get('http://temancoret.admin.oraclesip.my.id/api/categories?limit=6')
            .then((res) => {
                this.categoris = res.data.data.data;
            })
            .catch(err => console.log(err));
    },
}
</script>