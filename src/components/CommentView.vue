<template>
    <section class="bg-white  py-8 lg:pb-16">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-900">Komentar ({{ comment.length }})</h2>
            </div>
            <form class="" @submit.prevent="addComment">
                <div class="py-2 px-4 mb-4 bg-transparent grid grid-cols-2 gap-7">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Nama</label>
                        <input type="text" v-model="author" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5"
                            placeholder="nama" required />
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email@</label>
                        <input type="email" v-model="author_email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary focus:border-prring-primary block w-full p-2.5"
                            placeholder="email" required />
                    </div>
                </div>
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label for="comment" class="sr-only">Komentar</label>
                    <textarea id="comment" rows="6" v-model="text"
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                        placeholder="Write a comment..." required></textarea>
                </div>
                <button type="submit"
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary">
                    posting komentar
                </button>
            </form>
            <article v-for="comment in dataComment.comment" :key="comment.id"
                class="p-6 mb-6 text-base bg-white rounded-lg ">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900"><img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough">{{
                                    comment.author }}</p>
                        <p class="text-sm text-gray-600 "><time pubdate datetime="2022-02-08" title="February 8th, 2022">{{
                            comment.date_add }}</time></p>
                    </div>
                </footer>
                <p class="text-gray-500 " v-html="comment.text"></p>
                <div class="flex items-center mt-4 space-x-4">
                    <button type="button" class="flex items-center text-sm text-gray-500 hover:underline ">
                        <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg>
                        Reply
                    </button>
                </div>
            </article>
        </div>
        <ModalView :show="showModal">

            <div class="flex items-center justify-center w-full max-w-full p-4 text-gray-500 bg-white rounded-lg shadow ">
                <div
                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
                    </svg>
                    <span class="sr-only"></span>
                </div>
                <div class="ml-3 text-sm font-normal">{{ flashMessage }}</div>
                <button type="button" @click="showModal = false"
                    class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
                    data-dismiss-target="#toast-default" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>

        </ModalView>
    </section>
</template>

<script>
import axios from 'axios';
import ModalView from './ModalView.vue';
export default {
    components: {
        ModalView,
    },
    props: {
        // commentText: {
        //     type: String,
        //     default: null,
        // },
        dataComment: {
            type: Object,
            default: () => ({}),
        },
        comment: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            text: null,
            author: null,
            author_email: null,
            showModal: false,
            flashMessage: null,
        }
    },
    mounted() {
        console.log(this.dataComment)
    },
    methods: {
        addComment() {
            const params = {
                author: this.author,
                author_email: this.author_email,
                product_id: this.dataComment.id,
                article_id: null,
                user_id: null,
                text: this.text,
                likes: 5,
            };
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/Comment/store',
                data: params,
                responseType: 'json',
            }).then((res) => {
                this.showModal = true;
                this.flashMessage = res.data.meta.message;
            }).catch(err => {
                this.showModal = true;
                this.flashMessage = err.response.data;
            })
        }
    }

}
</script>