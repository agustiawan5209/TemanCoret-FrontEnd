<template>
    <div class="about">
        <!-- breadcrumb -->
        <div class="container py-4 flex items-center gap-3">
            <router-link to="/" class="text-primary text-base">
                <i class="fa-solid fa-house"></i>
            </router-link>
            <span class="text-sm text-gray-400">
                <i class="fa-solid fa-chevron-right"></i>
            </span>
            <p class="text-gray-600 font-medium">Account</p>
            <span class="text-sm text-gray-400">
                <i class="fa-solid fa-chevron-right"></i>
            </span>
            <p class="text-gray-600 font-medium">{{ this.$route.meta.title }}</p>
        </div>
        <!-- ./breadcrumb -->

        <!-- account wrapper -->
        <div class="container grid grid-cols-12 items-start gap-6 pt-4 pb-16 ">

            <!-- sidebar -->
            <div class="col-span-3 hidden md:block">
                <div class="px-4 py-3 shadow flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img src="assets/images/avatar.png" alt="profile"
                            class="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover">
                    </div>
                    <div class="flex-grow">
                        <p class="text-gray-600">Hello,</p>
                        <h4 class="text-gray-800 font-medium">John Doe</h4>
                    </div>
                </div>

                <div class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                    <div class="space-y-1 pl-8">
                        <a href="#" class="relative text-primary block font-medium capitalize transition">
                            <span class="absolute -left-8 top-0 text-base">
                                <i class="fa-regular fa-address-card"></i>
                            </span>
                            Manage account
                        </a>
                        <router-link :to="{ name: 'account.info' }"
                            class="relative hover:text-primary block capitalize transition">
                            Profile information
                        </router-link>
                        <a href="#" class="relative hover:text-primary block capitalize transition">
                            Manage addresses
                        </a>
                        <a href="#" class="relative hover:text-primary block capitalize transition">
                            Change password
                        </a>
                    </div>

                    <div class="space-y-1 pl-8 pt-4">
                        <router-link :to="{ name: 'account.order' }"
                            class="relative hover:text-primary block font-medium capitalize transition">
                            <span class="absolute -left-8 top-0 text-base">
                                <i class="fa-solid fa-box-archive"></i>
                            </span>
                            My order history
                        </router-link>
                        <a href="#" class="relative hover:text-primary block capitalize transition">
                            My returns
                        </a>
                        <a href="#" class="relative hover:text-primary block capitalize transition">
                            My Cancellations
                        </a>
                        <a href="#" class="relative hover:text-primary block capitalize transition">
                            My reviews
                        </a>
                    </div>

                    <div class="space-y-1 pl-8 pt-4">
                        <a href="#" class="relative hover:text-primary block font-medium capitalize transition">
                            <span class="absolute -left-8 top-0 text-base">
                                <i class="fa-regular fa-credit-card"></i>
                            </span>
                            Payment methods
                        </a>
                        <a href="#" class="relative hover:text-primary block capitalize transition">
                            voucher
                        </a>
                    </div>

                    <div class="space-y-1 pl-8 pt-4">
                        <router-link :to="{ name: 'account.wishlist' }"
                            class="relative hover:text-primary block font-medium capitalize transition">
                            <span class="absolute -left-8 top-0 text-base">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                            My wishlist
                        </router-link>
                    </div>

                    <div class="space-y-1 pl-8 pt-4">
                        <a href="#" class="relative hover:text-primary block font-medium capitalize transition">
                            <span class="absolute -left-8 top-0 text-base">
                                <i class="fa-regular fa-arrow-right-from-bracket"></i>
                            </span>
                            Logout
                        </a>
                    </div>

                </div>
            </div>
            <div class="col-span-12 block md:hidden ">
                <div class="px-4 py-3 shadow flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img src="assets/images/avatar.png" alt="profile"
                            class="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover">
                    </div>
                    <div class="flex-grow">
                        <p class="text-gray-600">Hello,</p>
                        <h4 class="text-gray-800 font-medium">John Doe</h4>
                    </div>
                    <div class="mr-2 flex items-center sm:hidden">
                        <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path :class="{
                                    hidden: showingNavigationDropdown,
                                    'inline-flex': !showingNavigationDropdown,
                                }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                                <path :class="{
                                    hidden: !showingNavigationDropdown,
                                    'inline-flex': showingNavigationDropdown,
                                }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div v-if="showingNavigationDropdown">
                    <div class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                        <div class="space-y-1 pl-8">
                            <a href="#" class="relative text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-regular fa-address-card"></i>
                                </span>
                                Manage account
                            </a>
                            <router-link :to="{ name: 'account.info' }"
                                class="relative hover:text-primary block capitalize transition">
                                Profile information
                            </router-link>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                Manage addresses
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                Change password
                            </a>
                        </div>

                        <div class="space-y-1 pl-8 pt-4">
                            <router-link :to="{ name: 'account.order' }"
                                class="relative hover:text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-solid fa-box-archive"></i>
                                </span>
                                My order history
                            </router-link>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                My returns
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                My Cancellations
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                My reviews
                            </a>
                        </div>

                        <div class="space-y-1 pl-8 pt-4">
                            <a href="#" class="relative hover:text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-regular fa-credit-card"></i>
                                </span>
                                Payment methods
                            </a>
                            <a href="#" class="relative hover:text-primary block capitalize transition">
                                voucher
                            </a>
                        </div>

                        <div class="space-y-1 pl-8 pt-4">
                            <router-link :to="{ name: 'account.wishlist' }"
                                class="relative hover:text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                                My wishlist
                            </router-link>
                        </div>

                        <div class="space-y-1 pl-8 pt-4">
                            <a href="#" class="relative hover:text-primary block font-medium capitalize transition">
                                <span class="absolute -left-8 top-0 text-base">
                                    <i class="fa-regular fa-arrow-right-from-bracket"></i>
                                </span>
                                Logout
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <!-- ./sidebar -->

            <!-- Content Account -->
            <div class="col-span-12 md:col-span-9">
                <router-view class="us__content" />
                <router-view name="viewaccount"></router-view>
            </div>
            <!-- ./Content Account -->

        </div>
        <!-- ./account wrapper -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            showingNavigationDropdown: false,
        }
    }
}
</script>
  