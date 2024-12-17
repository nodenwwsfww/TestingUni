import { describe, it, expect } from 'vitest';
import { GraphqlApi } from '../src/api/graphql-api';

describe('GraphQLAPI', () => {
    it('should fetch episodes containing "Rick" in the name', async () => {
        const episodes = await GraphqlApi.getEpisodesWithRick();
        expect(episodes.length).toBeGreaterThan(0);
        episodes.forEach((episode) => {
            expect(episode.name.toLowerCase()).toContain('rick');
        });
    });
});
