import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/images/experts-logo.png" alt="Experts Coaching Hub Logo" {...props} />
    );
}
