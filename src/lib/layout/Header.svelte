<script>
  import Nav from "$lib/layout/nav/index.svelte"
</script>

<!-- Top nav-->
<header class="flex-shrink-0 relative h-16 bg-white flex items-center">
  
  <!-- Logo area -->
  <div class="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
    <a href="#" class="flex items-center justify-center h-16 w-16 bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20">
      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow">
    </a>
  </div>

  <Nav/>

  
</header>