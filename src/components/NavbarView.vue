<template>
  <header class="w-full hidden h-14 bg-primary-black sm:flex flex-wrap justify-start items-center gap-7">
    <img :src="'img/logofeed.png'" alt="banner" class="w-auto h-10 object-cover">
    <ul class="h-full py-0 px-4 flex items-center space-x-7">
      <li class=" group h-full flex items-center relative gap-2 overflow-hidden px-2">
        <div class="absolute w-full h-1 top-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <div class="absolute w-full h-1 bottom-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 text-white">
          <path class="font-bold" stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <router-link to="/" class="text-white text-lg font-semibold">Home</router-link>
      </li>
      <li class=" group h-full flex items-center relative gap-2 overflow-hidden px-2">
        <div class="absolute w-full h-1 top-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <div class="absolute w-full h-1 bottom-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 text-white">
          <path class="font-bold" stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        <router-link :to="{name: 'about'}" class="text-white text-lg font-semibold">Tentang Kami</router-link>
      </li>
      <li class=" group h-full flex items-center relative gap-2 overflow-hidden px-2">
        <div class="absolute w-full h-1 top-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <div class="absolute w-full h-1 bottom-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 text-white">
          <path class="font-bold" stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>

        <a href="#home" class="text-white text-lg font-semibold">Produk</a>
      </li>
      <li class=" group h-full flex items-center relative gap-2 overflow-hidden px-2">
        <div class="absolute w-full h-1 top-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <div class="absolute w-full h-1 bottom-0 group-hover:bg-white transition-all ease-in ">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 text-white">
          <path class="font-bold" stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>

        <a href="#home" class="text-white text-lg font-semibold">Kontak</a>
      </li>
    </ul>
  </header>
</template>