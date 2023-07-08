<template>
    <teleport to='body'>
        <transition>
            <div v-if="show" class=" fixed top-0 left-0 inset-0 z-[99] opacity-60 bg-gray-800 flex justify-center items-center">
            </div>
        </transition>
        <transition>

            <div v-if="show" class="fixed top-0 inset-0 z-[100] w-full h-screen flex justify-center items-center bg-transparent">
                <div class="battery bg-white"></div>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
<style>
/**
  * battery
  * a stepped battery indicator
  * @author jh3y
*/
.battery {
    height: 60px;
    width: 40px;
    border-radius: 2px;
    border: 5px solid #fcbf49;
    position: relative;
    z-index: 10000;
}

.battery:before {
    content: '';
    height: 12px;
    width: 20px;
    background: #fcbf49;
    position: absolute;
    bottom: 100%;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    border-radius: 2px;
}

.battery:after {
    -webkit-animation: battery-charge 1s infinite steps(6);
    animation: battery-charge 1s infinite steps(6);
    background: -webkit-gradient(linear, left bottom, left top, from(transparent), color-stop(5%, transparent), color-stop(5%, #fcbf49), color-stop(19%, #fcbf49), color-stop(19%, transparent), color-stop(24%, transparent), color-stop(24%, #fcbf49), color-stop(38%, #fcbf49), color-stop(38%, transparent), color-stop(43%, transparent), color-stop(43%, #fcbf49), color-stop(57%, #fcbf49), color-stop(57%, transparent), color-stop(62%, transparent), color-stop(62%, #fcbf49), color-stop(76%, #fcbf49), color-stop(76%, transparent), color-stop(81%, transparent), color-stop(81%, #fcbf49), color-stop(95%, #fcbf49), color-stop(95%, transparent));
    background: linear-gradient(0deg, transparent, transparent 5%, #fcbf49 5%, #fcbf49 19%, transparent 19%, transparent 24%, #fcbf49 24%, #fcbf49 38%, transparent 38%, transparent 43%, #fcbf49 43%, #fcbf49 57%, transparent 57%, transparent 62%, #fcbf49 62%, #fcbf49 76%, transparent 76%, transparent 81%, #fcbf49 81%, #fcbf49 95%, transparent 95%);
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 24px;
}

@-webkit-keyframes battery-charge {
    0% {
        -webkit-clip-path: inset(100% 0 0 0);
        clip-path: inset(100% 0 0 0);
    }

    100% {
        -webkit-clip-path: inset(-18% 0 0 0);
        clip-path: inset(-18% 0 0 0);
    }
}

@keyframes battery-charge {
    0% {
        -webkit-clip-path: inset(100% 0 0 0);
        clip-path: inset(100% 0 0 0);
    }

    100% {
        -webkit-clip-path: inset(-18% 0 0 0);
        clip-path: inset(-18% 0 0 0);
    }
}
</style>