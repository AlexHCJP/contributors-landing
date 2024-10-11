import React, { use } from 'react';
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
                <div className=" max-w-4xl">
                    <div className="text-3xl font-medium flex flex-col text-center gap-10">
                        <span className="text-5xl font-bold">
                            <span translate="no">✨Contributors✨</span><br/>
                            ✨this is Open Source organization✨</span>
                        <span>
                            that is dedicated to developing and maintaining open source projects and packages aimed at assisting developers worldwide.🌸
                        </span>
                        <span className="font-bold">
                            Our mission is to contribute to the community by creating high-quality, reliable, and
                            innovative software solutions.🔥🌪
                        </span>

                    </div>

                </div>

            </div>
            <FormA/>
        </div>
    );
}