import { writable, derived } from 'svelte/store';
import { getTeamThrouput } from './api';
const Status = {
	Idle: 'idle',
	Loading: 'loading',
	Success: 'success',
	Error: 'error'
};
export const dashboardStore = writable({ status: Status.Idle, response: {} });

export async function fetchDashboardData(organization, team) {
	dashboardStore.set({ status: Status.Loading, response: {} });
	const response = await getTeamThrouput(organization, team);
	dashboardStore.set({ status: Status.Success, response });
}

export const status = derived(dashboardStore, ($dashboardStore) => $dashboardStore.status);
export const historic_min = derived(dashboardStore, ($dashboardStore) => $dashboardStore.response.historic?.aggregate.min.prs);
export const historic_max = derived(dashboardStore, ($dashboardStore) => $dashboardStore.response.historic?.aggregate.max.prs);
export const historic_mean = derived(dashboardStore, ($dashboardStore) => $dashboardStore.response.historic?.aggregate.avg.prs);
export const historic_stddev = derived(dashboardStore, ($dashboardStore) => $dashboardStore.response.historic?.aggregate.stddev.prs);
export const recent_throughput = derived(dashboardStore, ($dashboardStore) => $dashboardStore.response.last_three_weeks?.aggregate.avg.prs);
export const weekly_prs_by_org_team = derived(dashboardStore, ($dashboardStore) => $dashboardStore.response.weekly_prs_by_org_team);

function calculateTrend(a, b) {
	if (a < b)
		return {
			direction: 0,
			percentage: 100 - (a / b) * 100,
			a,
			b
		};
	return {
		direction: 1,
		percentage: (b / a) * 100,
		a,
		b
	};
}

export const trend = derived(dashboardStore, ($dashboardStore) => {
	const lastWeekPrsCount = $dashboardStore.response.weekly_prs_by_org_team?.slice(-1)[0].prs_count;
	const twoWeeksAgoPrsCount = $dashboardStore.response.weekly_prs_by_org_team?.slice(-2)[0].prs_count;
	return calculateTrend(lastWeekPrsCount, twoWeeksAgoPrsCount);
});
