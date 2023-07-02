<template>
    <div class="col-span-9 grid-cols-12">
        <!-- transaction -->
        <div class="col-span-12 flex justify-center">
            <div class="shadow-lg w-full">
                <table class=" table-auto w-full">
                    <tr>
                        <th class="py-1 bg-gray-800 text-white font-semibold border">No</th>
                        <th class="px-2 py-1 bg-gray-800 text-white font-semibold border">Nama</th>
                        <th class="px-2 py-1 bg-gray-800 text-white font-semibold border">Harga Barang</th>
                        <th class="px-1.5 py-1 bg-gray-800 text-white font-semibold border">Jumlah Barang</th>
                        <th class="px-2 py-1 bg-gray-800 text-white font-semibold border">Status Transaksi</th>
                        <th class="px-2 py-1 bg-gray-800 text-white font-semibold border">Detail</th>
                    </tr>
                    <tbody v-for="(item, idx) in Transaction.data" :key="item.id" :index="idx">
                        <tr v-for="(detail, idx2) in item.details" :key="detail.id" :index="idx2">
                            <td class="px-2 text-sm py-1.5 border font-semibold leading-6 tracking-wide text-center"> {{
                                item.uuid }} </td>
                            <td class="px-2 text-sm py-1.5 border font-normal text-left capitalize"> {{ detail.name }} </td>
                            <td class="px-2 text-sm py-1.5 border font-normal text-left"> {{ rupiah(detail.price) }} </td>
                            <td class="px-2 text-sm py-1.5 border font-normal text-left"> {{ detail.quantity }} </td>
                            <td class="px-2 text-sm py-1.5 border font-normal text-center">
                                <span :class="item.transaction_status == 'PENDING' ? 'bg-error' : 'bg-success'"
                                    class="text-white px-2 py-1.5 rounded-lg select-none">{{ item.transaction_status }}
                                </span>
                            </td>
                            <td class="px-1.5 py-1.5 border font-normal text-center">
                                <button type="button" class="bg-primary text-white px-2 py-1.5 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="Transaction">
                    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation">
                        <span class="text-sm font-normal text-gray-500">
                            Showing
                            <span class="font-semibold text-gray-900">{{ Transaction.from }}</span>
                            of
                            <span class="font-semibold text-gray-900">{{ Transaction.total }}</span>
                        </span>
                        <ul class="inline-flex items-stretch -space-x-px rounded-lg gap-1">

                            <li v-for="(link, idx) in Transaction.links" :key="link">

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
        </div>
        <!-- ./transaction -->

    </div>
</template>


<script>

import axios from 'axios';
export default {
    data() {
        return {
            User: [],
            access_token: localStorage.getItem("token"),
            loggedIn: localStorage.getItem("loggedIn"),
            Transaction: [],
            Next: 1,
            before: 1,
            next_page_url: null,
            last_page_url: null,
        };
    },
    created() {
        // Get User Account
        // this.GetTransaction();
    },
    methods: {
        rupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        },
        GetTransaction(url) {
            if (this.loggedIn) {
                axios.get("http://temancoret.admin.oraclesip.my.id/api/user", {
                    headers: { Authorization: "Bearer " + this.access_token }
                })
                    .then(res => {
                        this.User = res.data;
                        // Get Transaction Data
                        axios.get(url, {
                            params: {
                                user_id: res.data.id,
                            }
                        }).then((res) => {
                            this.Transaction = res.data.data;
                            this.next_page_url = res.data.data.next_page_url;
                            this.last_page_url = res.data.data.last_page_url;

                        }).catch(err => console.log(err));
                        // End Transaction
                    }).catch(error => console.log(error));
            }
        },
        GetPage(url) {
            this.GetTransaction(url)

        }
    },
    mounted() {
        this.GetTransaction("http://temancoret.admin.oraclesip.my.id/api/transactions")
    },
    // components: { PaginationView }
}
</script>