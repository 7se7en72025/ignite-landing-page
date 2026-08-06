"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * LogoSlider Component
 *
 * A simple infinite marquee for showcasing logos, partners, or any content.
 * The track is duplicated so the CSS keyframe can loop seamlessly at -50%.
 */

export const LogoSlider = ({
    logos,
    speed = 40,
    direction = "left",
    className,
    pauseOnHover = false
}) => {
    return (
        <div
            className={cn("logo-slider w-full overflow-hidden", className)}
            style={{ "--speed": speed }}>
            <div
                className="logo-slider__container relative w-full min-h-[80px]"
                data-direction={direction}
                data-pause-on-hover={pauseOnHover}>
                <ul className="logo-slider__track flex items-center h-full w-fit m-0 p-0 list-none">
                    {[...logos, ...logos].map((logo, index) => (
                        <li
                            key={index}
                            aria-hidden={index >= logos.length}
                            className="logo-slider__item h-4/5 w-[120px] sm:w-[140px] lg:w-[160px] aspect-video grid place-items-center shrink-0">
                            <div className="w-full h-full flex items-center justify-center [&>img]:h-[65%] [&>img]:w-auto [&>img]:object-contain [&>img]:grayscale [&>img]:opacity-60 hover:[&>img]:grayscale-0 hover:[&>img]:opacity-100 [&>img]:transition-all [&>img]:duration-300">
                                {logo}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

LogoSlider.displayName = "LogoSlider";

export default LogoSlider;
