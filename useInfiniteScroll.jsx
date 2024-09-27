import { useEffect, useState } from 'react';

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
                isFetching
            ) return;
            setIsFetching(true);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching, callback]);

    useEffect(() => {
        if (!isFetching) return;
        setIsFetching(false);
    }, [isFetching]);

    return [isFetching];
};

export default useInfiniteScroll;
