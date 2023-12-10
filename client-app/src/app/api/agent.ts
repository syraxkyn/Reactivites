import axios, { AxiosError, AxiosResponse } from 'axios';
import { Post, PostFormValues } from '../models/post';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Team, TeamFormValues } from '../models/team';
import { Player, PlayerFormValues } from '../models/player';
import { Match, MatchFormValues } from '../models/match';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found')
            toast.error('not found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        default:
            break;
    }
    return Promise.reject(error)
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Posts = {
    list: () => requests.get<Post[]>('/posts'),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (post: PostFormValues) => requests.post<void>('posts', post),
    update: (post: PostFormValues) => requests.put<void>(`/posts/${post.id}`, post),
    delete: (id: string) => requests.del<void>(`/posts/${id}`)
}

const Teams = {
    list: () => requests.get<Team[]>('/teams'),
    details: (id: string) => requests.get<Team>(`/teams/${id}`),
    create: (team: TeamFormValues) => requests.post<void>('teams', team),
    update: (team: TeamFormValues) => requests.put<void>(`/teams/${team.id}`, team),
    delete: (id: string) => requests.del<void>(`/teams/${id}`)
}

const Matches = {
    list: () => requests.get<Match[]>('/matches'),
    details: (id: string) => requests.get<Match>(`/matches/${id}`),
    create: (match: MatchFormValues) => requests.post<void>('matches', match),
    update: (match: MatchFormValues) => requests.put<void>(`/v/${match.id}`, match),
    delete: (id: string) => requests.del<void>(`/matches/${id}`)
}

const Players = {
    list: () => requests.get<Player[]>('/players'),
    details: (id: string) => requests.get<Player>(`/players/${id}`),
    create: (player: PlayerFormValues) => requests.post<void>('players', player),
    update: (player: PlayerFormValues) => requests.put<void>(`/players/${player.id}`, player),
    delete: (id: string) => requests.del<void>(`/players/${id}`)
}


const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Posts,
    Account,
    Teams,
    Players,
    Matches
}

export default agent;