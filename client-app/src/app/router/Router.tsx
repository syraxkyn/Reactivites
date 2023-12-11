import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";
import PostDetails from "../../features/posts/details/PostDetails";
import PostForm from "../../features/posts/form/PostForm";
import TeamDashboard from "../../features/teams/dashboard/TeamDashboard";
import TeamDetails from "../../features/teams/details/TeamDetails";
import TeamForm from "../../features/teams/form/TeamForm";
import PlayerDashboard from "../../features/players/dashboard/PlayerDashboard";
import PlayerDetails from "../../features/players/details/PlayerDetails";
import PlayerForm from "../../features/players/form/PlayerForm";
import MatchDashboard from "../../features/matches/dashboard/MatchDashboard";
import MatchDetails from "../../features/matches/details/MatchDetails";
import MatchForm from "../../features/matches/form/MatchForm";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: 'posts', element: <PostDashboard /> },
            { path: 'posts/:id', element: <PostDetails /> },
            { path: 'createPost', element: <PostForm key='create' /> },
            { path: 'players', element: <PlayerDashboard /> },
            { path: 'players/:id', element: <PlayerDetails /> },
            { path: 'createPlayer', element: <PlayerForm key='create' /> },
            { path: 'matches', element: <MatchDashboard /> },
            { path: 'matches/:id', element: <MatchDetails /> },
            { path: 'createMatch', element: <MatchForm key='create' /> },
            { path: 'teams', element: <TeamDashboard /> },
            { path: 'teams/:id', element: <TeamDetails /> },
            { path: 'createTeam', element: <TeamForm key='create' /> },
            { path: 'managePost/:id', element: <PostForm key='manage' /> },
            { path: 'login', element: <LoginForm/> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },


        ]
    }
]

export const router = createBrowserRouter(routes)