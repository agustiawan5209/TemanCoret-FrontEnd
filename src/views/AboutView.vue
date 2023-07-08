<template>
 <div class="container mx-auto py-6 relative overflow-hidden">
      <div
        class="w-full bg-gradient-to-tr from-secondary to-yellow-400 rounded-lg h-max flex flex-col items-center justify-center gap-4 py-10 shadow-lg relative -z-0">
        <div class="absolute w-full top-0 left-0 h-full -z-0 flex justify-center items-center opacity-10">
          <img :src="pathImg + 'logofeed.png'" alt="Logo TemanCoret" srcset=""
            class=" drop-shadow-xl w-full relative object-cover" >
        </div>
        <div class=" max-w-xs sm:max-w-md flex flex-col items-center justify-start h-full z-10"  >
          <img :src="pathImg + 'logofeed.png'" alt="Logo TemanCoret" srcset="" class=" drop-shadow-lg shadow-white">
        </div>
        <div class=" w-full sm:max-w-4xl px-3 z-10">
          <p  
            class=" text-justify text-xs md:text-base text-slate-800 font-medium">
            <strong class=" capitalize"> Temancoret studio</strong> ialah studio yang di dalamnya para pekerja kreatif
            dengan memperhatikan perkembangan teknologi
            sekarang. Bediri Sejak tahun 2018, <strong class=" capitalize"> Temancoret studio</strong> aktif berkesenian
            dan
            mengerjakan proyek dengan keahlian
            yang memiliki latar belakang <b class="capitalize">ilmu pengetahuan pendidikan seni dan desain di</b>
            <q><strong>Universitas Negeri Makassar</strong></q>.
            <br>

          </p>
          <p 
            class=" text-justify text-xs md:text-base text-slate-800 font-medium">
            Sejak dilanda Covid-19 dan saat ini sudah mulai kembali normal tapi tetap memperhatikan protokol kesehatan.
            Karena sudah mulai di longgrakan untuk melakukan aktivitas, saat ini banyak kegiatan yang sudah mulai normal,
            salah satunya event kebudayaan.
            Oleh kerena itu,<strong class="capitalize"> temancoret studio</strong> juga
            kembali mendapatkan kepercayaan untuk
            mengerjakan beberapa proyek. Selain itu, Temancoret juga mengeluarkan produk terbaru dalam bentuk pakaian dan
            dengan <q><b>konsep desain Sulawesi-Selatan</b></q>.
          </p>
          <p 
            class="sm:pl-40 text-justify text-xs md:text-base text-slate-800 font-medium">
            Mengangkat <strong>budaya lokal</strong> dalam pakaian
            merupakan <q>salah satu cara kami
              untuk mengangkat budaya dengan perkembangan saat ini.</q>
          </p>
          <p 
            class="sm:pl-40 text-justify text-xs md:text-base text-slate-800 font-medium">
            Dengan melihat potensi yang ada di Sulawesi-Selatan khususnya di segi kebudayaannya, kami selaku pekerja seni
            mengangkat <q><strong class=" capitalize">tema budaya Sul-Sel</strong></q> untuk memperkenalkan <strong>budaya
              lokal</strong> ke kanca <strong class="capitalize">Nasional</strong> maupun <strong
              class="capitalize">Internasional</strong> dengan
            bentuk <q><strong class="capitalize">Kaos dan desain ilustrasi yang kami buat sendiri</strong></q>.
            <br>
            Dengan pengalaman dan latar belakang pendidikan dari Seni dan Desain, Kami siap membantu dan mempromosikan
            <strong>budaya lokal</strong> melalui karya seni.

          </p>
        </div>
        <div
          class="absolute w-24  -bottom-20 left-0   md:top-[24rem]  md:w-28 md:h-auto  md:-bottom-10 lg:w-96 lg:right-3 lg:top-[24rem] lg:-bottom-60 lg:max-w-md  z-[99] box-border"
          >
          <img :src="pathImg + 'design/mechapakarena blakng.png'" alt="mechapakarena blakng"
            class="w-full h-full object-cover">
        </div>
      </div>


      <section class="relative h-max lg:h-[450px] z-[51] border-b-8 mt-10">
        <div class="w-full relative flex">
          <div class="grid grid-cols-12 cols-2">
            <div
              class=" col-span-12 sm:col-start-2 sm:col-span-8 md:col-start-3 md:col-span-8 lg:col-start-5 lg:col-span-4"  >
              <h1 class="text-3xl font-semibold text-primary text-center "  >VISI & MISI</h1>
            </div>
            <div
              class=" col-span-12  sm:col-span-9 sm:col-start-2 md:col-span-10 md:col-start-2 row-start-2 lg:col-start-5 lg:col-span-4">
              <div class="bg-transparent border-l-4 border-b-4 rounded-lg p-1.5" 
               >
                <h2 class="text-2xl font-semibold text-primary">VISI</h2>
                <p class=" text-justify">
                  Menjadi wadah berkarya seni rupa dan desain serta memenuhi kebutuhan masyarakat di era digital.
                  Memperkenalkan dan Memasarkan budaya melalui karya seni dan desain
                </p>
              </div>
            </div>
            <div
              class="absolute w-32 top-[18rem] -right-16 sm:max-w-xs md:max-w-sm  md:-right-10 md:top-12 lg:w-72 lg:right-40 z-[99] box-border"
             >
              <img :src="pathImg + 'design/PARAGA.11-convert.png'" alt="PARAGA.11-convert"
                class="w-full h-full object-cover">
            </div>
            <div
              class=" col-span-12 sm:col-start-2 sm:col-span-9 md:col-start-2 md:col-span-10 row-start-3 lg:col-start-4 lg:col-span-4 "
              >
              <div class="w-full bg-transparent border-l-4 border-b-4 border-r-2 rounded-lg p-1.5">
                <h2 class="text-2xl font-semibold text-primary">MISI</h2>
                <ul class=" list-decimal pl-4 ">
                  <li>Berkarya dan mempelajari berbagai seni dan budaya Sulawesi-Selatan</li>
                  <li>Melestarikan budaya melalui karya seni dan desain</li>
                  <li>Memasarkan hasil karya seni dan desain sesuai minat masyarakat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pathImg: '/img/'
    }
  },
}
</script>
