import { request, gql } from 'graphql-request';

// TODO: move to ENV
const endpoint = 'http://localhost:8080/v1/graphql';
const requestHeaders = {
	'x-hasura-admin-secret': 'mylongsecretkey',
	'Content-Type': 'application/json'
};

const queryLastAudit = gql`
	query latestAuditByRepoOrg($organization: String!, $repo: String!) {
		audit(where: { repo: { _eq: $repo }, organization: { _eq: $organization } }) {
			id
		}
	}
`;

const queryWeeklyPrsByTeam = gql`
	query weekly_prs_by_team($organization: String!, $team: String!) {
		weekly_prs_by_org_team(where: { organization: { _eq: $organization }, team: { _eq: $team } }) {
			week
			prs_count
			pr_types
		}
	}
`;

const queryTeamThroughput = gql`
	query throughput($organization: String!, $team: String!) {
		historic: weekly_teams_prs_stats_aggregate(where: { organization: { _eq: $organization }, team: { _eq: $team } }) {
			aggregate {
				avg {
					prs
				}
				min {
					prs
				}
				max {
					prs
				}
				stddev {
					prs
				}
			}
		}
		last_three_weeks: weekly_teams_prs_stats_aggregate(where: { organization: { _eq: $organization }, team: { _eq: $team } }, limit: 3) {
			aggregate {
				avg {
					prs
				}
			}
		}
		weekly_prs_by_org_team(where: { organization: { _eq: $organization }, team: { _eq: $team } }, order_by: {week: asc}) {
			week
			prs_count
			pr_types
		}
	}
`;

export async function getLastAudit(organization, repo) {
	try {
		const response = await request(endpoint, queryLastAudit, { organization, repo }, requestHeaders);
		return response.audit[0].id;
	} catch (error) {
		console.error(error);
	}
}

export async function getWeeklyPrsByTeam(organization, team) {
	try {
		const response = await request(endpoint, queryWeeklyPrsByTeam, { organization, team }, requestHeaders);
		return response.weekly_prs_by_org_team;
	} catch (error) {
		console.error(error);
	}
}

export async function getTeamThrouput(organization, team) {
	try {
		const response = await request(endpoint, queryTeamThroughput, { organization, team }, requestHeaders);
		return response;
	} catch (error) {
		console.error(error);
	}
}
