'use client'

import {useRouter} from "next/navigation";
import {FaCodeBranch, FaExclamationCircle, FaStar} from "react-icons/fa";
import {Repository} from "@/models/repository";



export function RepositoryCard({ repo }: { repo: Repository }) {
    const router = useRouter()

    return (
        <div className="bg-gray-800 text-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">
                <a onClick={() => router.push(`/repository/${repo.name}`)} className="text-blue-400 hover:underline">

                    {repo.name}
                </a>
            </h2>
            <p className="text-base mb-2 line-clamp-3">{repo.description}</p>
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center">
                    <FaCodeBranch className="text-green-400 mr-1" />
                    <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center">
                    <FaExclamationCircle className="text-red-400 mr-1" />
                    <span>{repo.open_issues_count}</span>
                </div>
            </div>
        </div>
    );
}