<!-- Desktop nav area -->
<div class="hidden md:min-w-0 md:flex-1 md:flex ml-20 lg:ml-6 mt-6">
	<!-- Title -->
	<div class="flex-1 flex items-center  border-l-2 pl-4 border-purple-900">
		<div class="  flex flex-col">
			<h1 class="text-gray-900 text-4xl font-extrabold leading-7 sm:text-3xl sm:truncate">Project X</h1>
			<h2 class="text-gray-500 text-base">Throughput</h2>
		</div>
	</div>
	<!-- Search -->
	<div class="min-w-0 w-96 flex-none px-4 bg-white rounded-full drop-shadow my-4">
		<div class="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
			<input
				id="desktop-search"
				type="search"
				placeholder="Search for an org, team or repo"
				class="block w-full border-transparent pl-8 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0"
			/>
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-1">
				<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</div>
	</div>
	<!-- Right Profile Menu -->
	<div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
		<div class="flex items-center space-x-8">
			<span class="inline-flex">
				<a href="#" class="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
					<span class="sr-only">View notifications</span>
					<!-- Heroicon name: outline/bell -->
					<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</a>
			</span>

			<div class="relative inline-block text-left">
				<button
					type="button"
					class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
					id="menu-1-button"
					aria-expanded="false"
					aria-haspopup="true"
				>
					<span class="sr-only">Open user menu</span>
					<img
						class="h-8 w-8 rounded-full"
						src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</button>

				<!--
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
				<!-- <div class="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-1-button" tabindex="-1">
          <div class="py-1" role="none"> -->
				<!-- Active: "bg-gray-100", Not Active: "" -->
				<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-1-item-0">
              Your Profile
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-1-item-0">
              Settings
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-1-item-1">
              Sign Out
            </a>
          </div>
        </div> -->
			</div>
		</div>
	</div>
</div>
