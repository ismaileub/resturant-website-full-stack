import { Parallax } from "react-parallax";


const Cover = ({ img, title }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[700px]">
                <div className="hero-overlay "></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 cinzel text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5 inter">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;