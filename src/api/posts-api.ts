import axios from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export class PostsApi {
    private static BASE_URL = 'https://jsonplaceholder.typicode.com';

    static async getPosts(): Promise<Post[]> {
        const { data } = await axios.get<Post[]>(`${this.BASE_URL}/posts`);
        return data;
    }

    static async getCommentsByPostId(postId: number): Promise<Comment[]> {
        const { data } = await axios.get<Comment[]>(`${this.BASE_URL}/comments`, { params: { postId } });
        return data;
    }

    static async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
        const { data } = await axios.post<Post>(`${this.BASE_URL}/posts`, postData);
        return data;
    }
}
