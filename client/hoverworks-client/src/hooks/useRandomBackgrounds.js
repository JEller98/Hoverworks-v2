import {useMemo} from "react";

export default function useRandomBackground() {
    const background = useMemo(() => {
        const backgrounds = [
            "#1a1a1a",
            "#2d1b4e",
            "#1a2f1a",
            "#4e1b1b",
            "#1b3a4e",
            "#4e3d1b",
            "#2d2d2d"
        ];

        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        return backgrounds[randomIndex];
    }, []);

    return background;
}