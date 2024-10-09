'use client';

import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import {generateIdFromTitle} from "@/utils/generateIdFromTitle";

interface Header {
    title: string;
    level: number;
    id: string;
}

export interface TreeViewProps {
    markdown: string;
}


export const TreeView = ({ markdown }: TreeViewProps) => {
    const [headers, setHeaders] = useState<Header[]>([]);

    // Парсим Markdown на заголовки с id
    useEffect(() => {
        const parseMarkdown = async () => {
            const processor = unified()
                .use(remarkParse)
                .use(rehypeSlug);

            const parsed = processor.parse(markdown);

            const foundHeaders: Header[] = [];

            // Итерируем по дереву и извлекаем заголовки с id
            visit(parsed, 'heading', (node) => {
                const level = node.depth; // уровень заголовка
                const title = node.children.map((child: any) => child.value).join('');
                const id = generateIdFromTitle(title);
                foundHeaders.push({ title, level, id });
            });

            setHeaders(foundHeaders);
        };

        parseMarkdown();
    }, [markdown]);

    // Функция для определения отступов
    const getIndentation = (level: number) => {
        switch (level) {
            case 1:
                return 'ml-0';
            case 2:
                return 'ml-4';
            case 3:
                return 'ml-8';
            case 4:
                return 'ml-12';
            default:
                return 'ml-0';
        }
    };

    return (
        <div>
            <ul>
                {headers.map((header, index) => (
                    <li key={index} className={`text-base ${getIndentation(header.level)}`}>
                        {/* Ссылка на id, сгенерированный rehypeSlug */}
                        <a href={`#${header.id}`} className="text-blue-500 hover:underline">
                            {header.title}
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    );
};
