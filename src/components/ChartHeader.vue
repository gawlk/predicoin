<template>
    <div class="space-y-2">
        <p class="text-6xl font-extrabold">Predicoin</p>
        <p class="font-bold text-2xl opacity-75">
            A fallacious website for cryptoprophecies
        </p>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        title: String,
        start: Number,
        end: Number,
    })
</script>
