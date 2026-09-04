import { API } from "./api";

interface getUserParams {
  user: string;
}
export interface IUserData {
  name: string | null;
  login: string;
  avatar_url: string;
  bio: string | null;
}
export interface IRepo {
  id: string;
  name: string | null;
  html_url: string;
  description: string | null;
  language: string | null;
  visibility: string;
}

export async function getUser({ user }: getUserParams) {
  try {
    const response = await API.get<IUserData>(`/${user}`);
    return {
      name: response.data.name ?? null,
      login: response.data.login,
      avatar_url: response.data.avatar_url,
      bio: response.data.bio ?? null,
    };
  } catch (error) {
    console.log(error);
  }
}

type Repo = Pick<
  IRepo,
  "id" | "name" | "html_url" | "description" | "language" | "visibility"
>;

export async function getRepos({ user }: getUserParams) {
  try {
    const response = await API.get<IRepo[]>(`/${user}/repos`);
    return response.data.map((repo: Repo) => ({
      id: repo?.id,
      name: repo?.name ?? null,
      html_url: repo?.html_url,
      description: repo?.description ?? null,
      language: repo?.language ?? null,
      visibility: repo?.visibility,
    }));
  } catch (error) {
    console.log(error);
  }
}
