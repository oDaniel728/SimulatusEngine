enum Easing {
    Linear = "linear",
    EaseIn = "ease-in",
    EaseOut = "ease-out",
    EaseInOut = "ease-in-out",

    ExponentialIn = "cubic-bezier(0.7, 0, 0.84, 0)", 
    ExponentialOut = "cubic-bezier(0.16, 1, 0.3, 1)",
    ExponentialInOut = "cubic-bezier(0.87, 0, 0.13, 1)",

    QuadraticIn = "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
    QuadraticOut = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    QuadraticInOut = "cubic-bezier(0.455, 0.03, 0.515, 0.955)",

    CubicIn = "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    CubicOut = "cubic-bezier(0.215, 0.61, 0.355, 1)",
    CubicInOut = "cubic-bezier(0.645, 0.045, 0.355, 1)",

    QuarticIn = "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
    QuarticOut = "cubic-bezier(0.165, 0.845, 0.44, 1)",
    QuarticInOut = "cubic-bezier(0.77, 0, 0.175, 1)",

    QuinticIn = "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    QuinticOut = "cubic-bezier(0.23, 1, 0.32, 1)",
    QuinticInOut = "cubic-bezier(0.86, 0, 0.07, 1)",

    SineIn = "cubic-bezier(0.47, 0, 0.745, 0.715)",
    SineOut = "cubic-bezier(0.39, 0.575, 0.565, 1)",
    SineInOut = "cubic-bezier(0.445, 0.05, 0.55, 0.95)",

    BackIn = "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
    BackOut = "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    BackInOut = "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}
export default Easing;