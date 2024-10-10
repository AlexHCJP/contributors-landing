'use client';

import React, { useEffect} from "react";
import {Repository} from "@/models/repository";
import {Index} from "@/components/RepositoryCard";
import {Tag} from "@/components/Tag";
import {useDebounce} from "@/utils/useDebounce";

async function getRepositories() {
    const res = await fetch('https://api.github.com/orgs/contributors-company/repos');
    if (!res.ok) {
        throw new Error('Failed to fetch repositories');
    }
    const repositories: Repository[] = await res.json();
    return repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
}


async function searchRepositories({topics, language, search}: {topics: string[], language: string[], search: string}) {
    const topicQuery = topics.map(topic => `topic:${topic}`).join('+');
    const languageQuery = language.map(language => `language:${language}`).join('+');

    const res = await fetch(`https://api.github.com/search/repositories?q=${search}+${topicQuery}+${languageQuery}+org:contributors-company`);
    if (!res.ok) {
        throw new Error('Failed to fetch repositories');
    }

    const repositories: Repository[] = (await res.json()).items;

    return repositories;
}

export const FormA = () => {
    const [disable, setDisable] = React.useState<boolean>(false);
    const [repositories, setRepositories] = React.useState<Repository[]>([]);
    const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = React.useState<string[]>([]);
    const [search, setSearch] = React.useState<string>('');
    const debouncedSearch = useDebounce(search, 500);
    const debouncedTopics = useDebounce(selectedTopics, 500);
    const debounceLanguage = useDebounce(selectedLanguage, 500);



    useEffect(() => {
        getRepositories().then((value) => {
            setRepositories(value);
        })
    }, [])

    useEffect(() => {
        if (hasFilter) {
            searchRepositories({ topics: selectedTopics, language: selectedLanguage, search }).then((value) => {
                setRepositories(value);
            }).finally(() => {
                setDisable(false);
            });
        } else {
            getRepositories().then((value) => {
                setRepositories(value);
            }).finally(() => {
                setDisable(false);
            })
        }

    }, [debouncedTopics, debouncedSearch, debounceLanguage])

    useEffect(() => {
        setDisable(true);
    }, [selectedTopics, selectedLanguage, search])


    const topics = repositories.map(repo => repo.topics).flat().filter((value, index, self) => self.indexOf(value) === index);
    const language = repositories.map(repo => repo.language).filter((value, index, self) => self.indexOf(value) === index);

    const hasFilter = selectedTopics.length > 0 || search.length > 0 || selectedLanguage.length > 0;

    const handleTopicClick = (get: string[], set: (arg0: string[]) => void,) => (topic: string) => {
        if (get.includes(topic)) {
            set(get.filter((t) => t !== topic));
        } else {
            set([...get, topic]);
        }
    }


    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onClear = () => {
        setSelectedTopics([]);
        setSelectedLanguage([]);
        setSearch('');
    }

    return (
        <div>
            <div className="container p-4 mx-auto">
                <h2 className="text-2xl font-bold mb-4" >Repositories</h2>
                <input onInput={onInput} type="text" placeholder="Search Repositories" className="w-full p-2 rounded-lg mb-4 border-2" value={search}/>
                <div>
                    {topics.map((topic, index) => (
                        <Tag disable={disable}  label={topic} selected={selectedTopics.includes(topic)} key={index} onClick={handleTopicClick(selectedTopics, setSelectedTopics)}/>
                    ))}
                </div>
                <div>
                    {language.map((topic, index) => (
                        <Tag disable={disable} label={topic} selected={selectedLanguage.includes(topic)} key={index} onClick={handleTopicClick(selectedLanguage, setSelectedLanguage)}/>
                    ))}
                </div>
                <div className="grid sm:grid-rows-6 md:grid-rows-3 grid-rows-12 grid-flow-col gap-4 mt-2">
                    {repositories.map((repo) => (
                        <Index repo={repo}  key={repo.id}/>
                    ))}
                </div>
                {repositories.length === 0 &&
                    <div>
                        <h1>No repositories found</h1>
                        <button onClick={onClear}>Clear filters</button>
                    </div>
                }
            </div>

        </div>

    )
}