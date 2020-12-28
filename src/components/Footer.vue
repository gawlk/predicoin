<template>
    <footer class="space-y-4 opacity-75">
        <div
            class="flex justify-center text-center font-semibold space-x-2 sm:space-x-4 text-xs xs:text-sm sm:text-base"
        >
            <a
                href="https://github.com/gawlk/predicoin"
                rel="noopener noreferrer"
                target="_blank"
                class="outline-none opacity-50 hover:opacity-75"
            >
                Source code
            </a>
            <span class="opacity-25">·</span>
            <a
                href="https://www.buymeacoffee.com/gawlk"
                rel="noopener noreferrer"
                target="_blank"
                class="outline-none opacity-50 hover:opacity-75"
            >
                Buy me a coffee
            </a>
        </div>
        <p class="p-4 text-center text-xs font-semibold opacity-50">
            © {{ new Date().getFullYear() }} Predicoin, Maybe half of the rights
            may be reserved.
        </p>
    </footer>
</template>
