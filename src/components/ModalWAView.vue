<template>
    <ModalView :show="ShowModal">
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
                    <button type="button" @click="closeModal()"
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
                            <input type="radio" :name="key" @click="checkboxClick(key, $event)" :id="key + '-' + col.value"
                                class="hidden" :value="col.value">
                            <label :for="key + '-' + col.value"
                                class="text-xs border border-gray-200 rounded-sm h-full w-full flex items-center justify-center cursor-pointer shadow-sm text-gray-600 px-2 py-1.5 ">{{
                                    col.value }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3 sm:space-x-4">
                    <button  type="button"
                        class="text-white inline-flex bg-primary items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                        <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
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
</template>

<script>

import ModalView from './ModalView.vue';
export default {
    components: {
        ModalView,
    },
    props: ['show', 'WaProduct'],
    data(){
        return {
            checkboxItem :[],
            resultItem:[],
            ShowModal : this.show
        }
    },
  
    methods:{
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
        checkboxClick(named, e) {
            this.checkboxItem.push({name:named,value:e.target.value})
            this.resultItem = this.checkboxItem.reduce(function(r,a){
                r[a.name] = [];
                r[a.name] = a.value;
                return r;
            },Object.create(null))
        },
        closeModal(){
           this.ShowModal = false
           console.log(this.ShowModal)
        }
    }
}
</script>