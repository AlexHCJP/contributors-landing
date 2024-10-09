import React from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string; // Опциональная ссылка
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex space-x-2 text-gray-500">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {item.href ? (
                            <a
                                href={item.href}
                                className="text-blue-600 hover:underline"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className="mx-2">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
