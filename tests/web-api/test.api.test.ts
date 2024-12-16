import { test, expect } from '@playwright/test';

test('API should respond with 200', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
});
