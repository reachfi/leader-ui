<div class="lg:grid lg:grid-cols-12 lg:gap-x-5 mt-10">
	<div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
		<form action="#" method="POST">
			<div class="shadow sm:rounded-md sm:overflow-hidden">
				<div class="bg-white py-6 px-4 space-y-6 sm:p-6">
					<div>
						<h3 class="text-lg leading-6 font-medium text-gray-900">New Repository</h3>
						<p class="mt-1 text-sm text-gray-500">
							All information except for the token can be extracted from the github repo's url, for example https://github.com/owner/projectname
						</p>
					</div>

					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<label for="repository" class="block text-sm font-medium text-gray-700">Repository</label>
							<input
								type="text"
								name="repository"
								id="repository"
								placeholder="e.g. pr-ui"
								autocomplete="repository"
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>

						<div class="col-span-6 sm:col-span-3">
							<label for="team" class="block text-sm font-medium text-gray-700">Team</label>
							<input
								type="text"
								name="team"
								id="team"
								placeholder="e.g. pr-ui"
								autocomplete="team"
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>

						<div class="col-span-6 sm:col-span-3">
							<label for="owner" class="block text-sm font-medium text-gray-700">Owner </label>
							<input
								type="text"
								name="owner"
								id="owner"
								placeholder="e.g. copmanyhq"
								autocomplete="owner"
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>

						<div class="col-span-6 sm:col-span-3">
							<label for="org" class="block text-sm font-medium text-gray-700">Organization / Business Unit</label>
							<input
								type="text"
								name="org"
								id="org"
								placeholder="e.g. ecommerce or architecture"
								autocomplete="org"
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>

						<div class="col-span-6 sm:col-span-4">
							<label for="api-key" class="block text-sm font-medium text-gray-700">API read-only key</label>
							<input
								type="text"
								name="api-key"
								id="api-key"
								autocomplete="api-key"
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>
				</div>
				<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						type="submit"
						class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
