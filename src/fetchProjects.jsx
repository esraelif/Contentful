import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
    space: 'npms0r9on6ib',
    environment: 'master',
    accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProjects = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    const getData = async () => {
        try {
            const response = await client.getEntries({ content_type: 'cms' });
            const projects = response.items.map((item) => {
                const { title, url, image } = item.fields;
                const id = item.sys.id;
                const img = image?.fields?.file?.url;
                return { title, url, id, img };
            });
            setProjects(projects);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return { loading, projects };
};





