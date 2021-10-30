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

export async function getLastAudit(organization, repo) {
	const response = await request(endpoint, queryLastAudit, { organization, repo }, requestHeaders);
	return response.audit[0].id;
}
