import { use } from 'react';
import {Repository} from "@/models/repository";
import {RepositoryCard} from "@/components/RepositoryCard";


async function getRepositories() {
    const res = await fetch('https://api.github.com/orgs/contributors-company/repos');
    if (!res.ok) {
        throw new Error('Failed to fetch repositories');
    }
    const repositories: Repository[] = await res.json();
    return repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export default function Home() {
    const repositories = use(getRepositories());

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">GitHub Repositories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                    <RepositoryCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
}