<template>
    <button
        :class="[
            props.big ? 'text-lg' : 'text-base',
            props.active
                ? props.green
                    ? 'bg-green-500 text-gray-900'
                    : 'bg-red-500 text-gray-900'
                : props.green
                ? 'text-green-500 hover:bg-green-500 hover:text-gray-900'
                : 'text-red-500 hover:bg-red-500 hover:text-gray-900',
        ]"
        class="font-bold px-4 py-1.5 rounded-lg flex items-center space-x-1.5 focus:outline-none focus:shadow-outline-none transform duration-200 ease-in-out hover:-translate-y-1"
        @click="emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script setup>
    import { defineEmit, defineProps } from 'vue'

    const emit = defineEmit()

    const props = defineProps({
        active: Boolean,
        big: Boolean,
        green: Boolean,
        // red: Boolean,
    })
</script>
