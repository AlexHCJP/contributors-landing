import React, { use } from 'react';
import { FaBook, FaUsers, FaMapMarkerAlt, FaEnvelope, FaTwitter } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
import { FormA } from "@/components/FormA";
import {Organization} from "@/models/organization";

async function getOrganizationStats() {
    const res = await fetch('https://api.github.com/orgs/contributors-company');
    if (!res.ok) {
        throw new Error('Failed to fetch organization stats');
    }

    const stats: Organization = await res.json();
    return stats;
}

export default function Home() {
    const stats = use(getOrganizationStats());

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <div className="container mx-auto p-4 flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-4xl">
                    <div className="flex flex-col items-center">
                        <img src={stats.avatar_url} alt="Organization Avatar" className="w-24 h-24 rounded-full mb-4" />
                        <h1 className="text-3xl font-bold mb-2">{stats.name}</h1>
                        <p className="text-center text-lg mb-4">{stats.description}</p>
                        <div className="flex space-x-4 mb-4">
                            {stats.location && (
                                <div className="flex items-center space-x-2">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    <span>{stats.location}</span>
                                </div>
                            )}
                            {stats.email && (
                                <div className="flex items-center space-x-2">
                                    <FaEnvelope className="text-blue-500" />
                                    <span>{stats.email}</span>
                                </div>
                            )}
                            {stats.twitter_username && (
                                <div className="flex items-center space-x-2">
                                    <FaTwitter className="text-blue-400" />
                                    <span>@{stats.twitter_username}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <FaBook className="text-green-500" />
                                <span>{stats.public_repos} Repositories</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaUsers className="text-purple-500" />
                                <span>{stats.followers} Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FormA />
        </div>
    );
}