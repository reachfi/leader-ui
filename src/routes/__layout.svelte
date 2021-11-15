<script>
	import Header from "$lib/layout/Header.svelte"
	import Sidebar from "$lib/layout/Sidebar.svelte"
	import '../app.css';
</script>

<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
-->

<div class="h-full flex flex-col">
  <Header/>

  <!-- Bottom section -->
  <div class="min-h-0 flex-1 flex overflow-hidden">
    <Sidebar/>

    <!-- Main area -->
    <main class="min-w-0 flex-1 border-t border-gray-200 xl:flex">
      <section aria-labelledby="message-heading" class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
        <slot/>
      </section>   
    </main>
  </div>
</div>

