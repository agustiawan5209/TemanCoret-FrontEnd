<template>
    <div class="container py-16" v-if="categoris.length > 0">
        <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
        <div class="grid grid-cols-3 gap-3">
            <div class="relative rounded-sm overflow-hidden group" v-for="item in categoris" :key="item.id">
                <img :src="item.thumbnail" alt="category 1" class="w-full">
                <router-link :to="{name: 'shop', params: {slug: item.name } }"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{{ item.name }}</router-link>
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
        axios.get('http://127.0.0.1:8000/api/categories?limit=6')
            .then((res) => {
                this.categoris = res.data.data.data;
            })
            .catch(err => console.log(err));
    },
}
</script>