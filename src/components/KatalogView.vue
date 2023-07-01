<template>
    <section class="w-full mx-auto bg-white pt-4 pb-10 lg:pt-6 overflow-hidden">
        <div class="sm:-mx-4 flex flex-row items-center justify-center gap-2 lg:gap-7 relative">
          <div class=" w-1/3 md:w-1/4 px-0 xl:w-3/12 relative h-max sm:shadow-lg sm:mb-20">
            <div class=" rounded-lg relative block h-max sm:h-72" >
              <img :src=" pathImg+'katalog1.png'" alt="image" class="w-full h-full object-cover" data-aos="fade-down" data-duration="1000" />
              <div data-aos="flip-left" data-aos-easing="linear" data-aos-delay="500" class="md:absolute w-full h-max sm:top-[80%]  flex justify-center">
                <div class=" max-w-md w-full sm:w-3/4 bg-secondary text-white shadow-lg p-4 text-center sm:p-6">
                  <h3>
                    <a href="javascript:void(0)"
                      class="text-dark hover:text-gray-200 block text-base font-semibold sm:text-[18px] md:text-xl lg:text-[20px] xl:text-xl 2xl:text-[22px]">
                      50+ Best
                    </a>
                  </h3>
                  <p class="text-body-color text-[10px] sm:text-xs leading-relaxed">
                    Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
                    Lorem consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class=" w-1/3 md:w-1/4 px-0 xl:w-3/12 relative h-max sm:shadow-lg sm:mb-20">
            <div class=" rounded-lg relative block h-max sm:h-72" >
              <img :src=" pathImg+'katalog1.png'" alt="image" class="w-full h-full object-cover" data-aos="fade-down" data-duration="1000" />
              <div data-aos="flip-left" data-aos-easing="linear" data-aos-delay="500" class="md:absolute w-full h-max sm:top-[80%]  flex justify-center">
                <div class=" max-w-md w-full sm:w-3/4 bg-secondary text-white shadow-lg p-4 text-center sm:p-6">
                  <h3>
                    <a href="javascript:void(0)"
                      class="text-dark hover:text-gray-200 block text-base font-semibold sm:text-[18px] md:text-xl lg:text-[20px] xl:text-xl 2xl:text-[22px]">
                      50+ Best
                    </a>
                  </h3>
                  <p class="text-body-color text-[10px] sm:text-xs leading-relaxed">
                    Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
                    Lorem consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class=" w-1/3 md:w-1/4 px-0 xl:w-3/12 relative h-max sm:shadow-lg sm:mb-20">
            <div class=" rounded-lg relative block h-max sm:h-72" >
              <img :src=" pathImg+'katalog1.png'" alt="image" class="w-full h-full object-cover" data-aos="fade-down" data-duration="1000" />
              <div data-aos="flip-left" data-aos-easing="linear" data-aos-delay="500" class="md:absolute w-full h-max sm:top-[80%]  flex justify-center">
                <div class=" max-w-md w-full sm:w-3/4 bg-secondary text-white shadow-lg p-4 text-center sm:p-6">
                  <h3>
                    <a href="javascript:void(0)"
                      class="text-dark hover:text-gray-200 block text-base font-semibold sm:text-[18px] md:text-xl lg:text-[20px] xl:text-xl 2xl:text-[22px]">
                      50+ Best
                    </a>
                  </h3>
                  <p class="text-body-color text-[10px] sm:text-xs leading-relaxed">
                    Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
                    Lorem consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </section>
</template>


<script>
export default {
 
  data() {
    return {
      pathImg: '/img/',
    }
  }
}
</script>