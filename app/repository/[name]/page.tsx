import {LegacyRef, use} from 'react';
import { FaStar, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Repository } from '@/models/repository';
import remarkBreaks from 'remark-breaks';
import { TreeView } from '@/components/TreeView';
import Breadcrumbs from "@/components/Breadcrumbs";

async function getRepository(name: string) {
    const res = await fetch(`https://api.github.com/repos/contributors-company/${name}`);
    if (!res.ok) {
        throw new Error('Failed to fetch repository');
    }
    const repository: Repository = await res.json();
    return repository;
}

async function getReadme(name: string) {
    const res = await fetch(`https://api.github.com/repos/contributors-company/${name}/readme`, {
        headers: {
            Accept: 'application/vnd.github.v3.raw',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch README');
    }
    const readme = await res.text();
    return readme;
}

interface RepositoryPageProps {
    params: {
        name: string;
    };
}

export default function RepositoryPage({ params: { name } }: RepositoryPageProps) {
    const repository = use(getRepository(name));
    const readme = use(getReadme(name));


    return (
        <div>
            <div className="container mx-auto p-4 ">
                <Breadcrumbs items={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    {
                        label: repository.name,
                    }
                ]}/>
            </div>
            <div className="container mx-auto p-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">


                <div className="w-full lg:w-1/4 pr-4 space-y-4">
                    <h1 className="text-2xl font-bold">{repository.name}</h1>
                    <p className="text-base">{repository.description}</p>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <FaStar className="text-yellow-400"/>
                            <span>{repository.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaCodeBranch className="text-green-400"/>
                            <span>{repository.forks_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaExclamationCircle className="text-red-400"/>
                            <span>{repository.open_issues_count}</span>
                        </div>
                    </div>
                    <a href={repository.html_url} className="text-blue-400 hover:underline">
                        View on GitHub
                    </a>
                    <TreeView markdown={readme}/>
                </div>
                <div className="w-full lg:w-3/4 pl-4 space-y-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">README</h2>
                    <ReactMarkdown
                        remarkPlugins={[remarkBreaks, remarkGfm]}
                        rehypePlugins={[rehypeSlug, rehypeRaw]}
                        components={{
                            code({ className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <SyntaxHighlighter
                                        language={match[1]}
                                        PreTag="div"
                                        ref={props.ref as LegacyRef<SyntaxHighlighter>}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            table({children}) {
                                return <table className="border-collapse w-full mb-4">{children}</table>;
                            },
                            th({children}) {
                                return <th className="border p-2 bg-gray-700 text-left">{children}</th>;
                            },
                            td({children}) {
                                return <td className="border p-2">{children}</td>;
                            },
                            li({children}) {
                                return <li className="list-disc ml-4">{children}</li>;
                            },
                        }}
                    >
                        {readme}
                    </ReactMarkdown>
                </div>
            </div>
        </div>

    );
}