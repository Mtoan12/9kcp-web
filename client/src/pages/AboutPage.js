import { useEffect } from 'react';

const AboutPage = () => {
    useEffect(() => {
        document.title = 'About';
    }, []);

    return <div>AboutPage</div>;
};
export default AboutPage;
