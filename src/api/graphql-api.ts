import { gql, request } from 'graphql-request';

interface Episode {
    id: string;
    name: string;
}

interface EpisodesResponse {
    episodes: {
        results: Episode[];
    };
}

export class GraphqlApi {
    private static BASE_URL = 'https://rickandmortyapi.com/graphql';

    static async getEpisodesWithRick(): Promise<Episode[]> {
        const query = gql`
            query {
                episodes(filter: { name: "Rick" }) {
                    results {
                        id
                        name
                    }
                }
            }
        `;
        const data: EpisodesResponse = await request(this.BASE_URL, query);
        if (!data || !data.episodes || !Array.isArray(data.episodes.results)) {
            throw new Error('Unexpected response format or missing data');
        }
        return data.episodes.results;
    }
}
