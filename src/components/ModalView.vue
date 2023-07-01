<template>
    <teleport to='body'>
        <transition>
            <div class="fixed bottom-0 left-0 inset-0 bg-gray-800 opacity-75" v-if="show" ></div>
        </transition>
        <transition
        name="custom-classes"
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceOutRight"
        >
            <div class="max-w-full h-screen w-full flex inset-0 justify-center items-center fixed z-50"
                v-if="show">
                <div :class="maxWidthClass"
                    class="bg-white sm:w-full sm:mx-auto rounded-lg shadow transform transition-all relative overflow-y-auto">
                   <slot/>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    name: 'ModalView',
    data() {
        return {
        }
    },
    emit: ['close'],
    props: {
        maxWidth: {
            type: String,
            default: '2xl',
        },
        show: {
            type: Boolean,
            default: false,
        },
        closeable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        maxWidthClass: function () {
            return {
                sm: 'sm:max-w-sm',
                md: 'sm:max-w-md',
                lg: 'sm:max-w-lg',
                xl: 'sm:max-w-xl',
                '2xl': 'sm:max-w-2xl',
                '3xl': 'sm:max-w-3xl',
                '4xl': 'sm:max-w-4xl',
            }[this.maxWidth]
        },
    },
    methods: {
        close() {
            if (this.show) {
               this.$emit('close',false)
               console.log(this.$emit('close'))
            }
        },
        closeOnEscape: (e) => {
            if (e.key == 'Escape') {
                this.close();
            }
        }
    },
    mounted() {
        document.addEventListener('keydown', this.closeOnEscape)
    },
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>