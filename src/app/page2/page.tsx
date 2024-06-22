import { cn } from "@/utils/cn";
import GridPattern from "../components/magicui/animated-grid-pattern";
import Globe from "../components/magicui/globe";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";
import TextRevealByWord from "../components/magicui/text-reveal";

export default function Home2() {
  return (
    <main className="">
      <div className="h-screen">
        <h2 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 w-full">
          Hello! Let's get some fun
        </h2>
        <Globe className="top-28" />
        <div className="pointer-events-none absolute inset-0 h-full )]" />
      </div>
      <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
        <TextRevealByWord text="As you can probably imagine, this is the best way to improve things" />
      </div>
      <VelocityScroll
        text="So fucking easy"
        default_velocity={5}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
      />
      <div className="h-24"></div>
      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
          Also put this
        </p>
        <GridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
    </main>
  );
}
