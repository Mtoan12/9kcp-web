import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);
    const location = useLocation();
    useEffect(() => {
        const loadContent = () => {
            setProgress(0);

            window.addEventListener('load', handleLoad);

            try {
                setTimeout(() => {
                    handleLoad();
                }, 500);
            } catch (error) {
                console.error(error);
                handleLoad();
            }
        };

        const handleLoad = () => {
            setProgress(100);
            window.removeEventListener('load', handleLoad);
        };

        loadContent();
    }, [location]);
    return <LoadingBar color="#f11946" progress={progress} />;
};
export default LoadingPage;
