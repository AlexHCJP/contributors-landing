
import React, {use} from 'react';
import { FaBook, FaUsers } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
import {FormA} from "@/components/FormA";

async function getOrganizationStats() {
    const res = await fetch('https://api.github.com/orgs/contributors-company');
    if (!res.ok) {
        throw new Error('Failed to fetch organization stats');
    }

    const stats: Organization = await res.json();
    return stats;
}


interface Organization {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    twitter_username: string | null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    type: string;
}

export default function Home() {
    const stats = use(getOrganizationStats());

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="p-6 rounded-lg shadow-md mb-6">
                    <h1 className="text-3xl font-bold mb-2">Contributors</h1>
                    <p className="text-lg">Welcome to our Contributors!

                        We are dedicated to developing and maintaining open source projects and packages aimed at assisting developers worldwide. Our mission is to contribute to the community by creating high-quality, reliable, and innovative software solutions.

                        If you find our projects useful and would like to support our work, please consider becoming our patron on Patreon: Patreon link

                        Your support will allow us to continue improving existing projects and creating new ones.

                        Thank you for visiting our page, and we hope our projects will be beneficial to you!
                    </p>
                    <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                            <FaBook className="text-green-500"/>
                            <span>{stats.public_repos} Repositories</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUsers className="text-purple-500"/>
                            <span>{stats.followers} Followers</span>
                        </div>
                    </div>
                </div>
            </div>
            <FormA/>

        </div>
    );
}