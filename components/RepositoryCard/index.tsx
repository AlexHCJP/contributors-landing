'use client'

import {useRouter} from "next/navigation";
import {FaCodeBranch, FaExclamationCircle, FaStar } from "react-icons/fa";
import {Repository} from "@/models/repository";
import styles from "./styles.module.css";
import {Icon} from "@/components/Icon";


export function Index({ repo }: { repo: Repository }) {
    const router = useRouter()

    const onClick = () => router.push(`/repository/${repo.name}`)

    return (
        <div className={`${styles.card} w-full`} onClick={onClick}>
            <h2 className="text-lg font-semibold mb-2 flex gap-2">
                <Icon name={repo.language} />
                <span className="text-blue-400 ">
                    {repo.name}
                </span>
            </h2>
            <p className="text-black mb-2 line-clamp-3">{repo.description}</p>
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className='text-black'>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center">
                    <FaCodeBranch className="text-green-400 mr-1" />
                    <span className='text-black'>{repo.forks_count}</span>
                </div>
                <div className="flex items-center">
                    <FaExclamationCircle className="text-red-400 mr-1" />
                    <span className='text-black'>{repo.open_issues_count}</span>
                </div>
            </div>
        </div>
    );
}