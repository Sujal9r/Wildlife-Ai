import { motion } from 'framer-motion';
import { Activity, Camera, MapPinned } from 'lucide-react';
import { liveAnimalFeed } from '../data/mockData';
import { StatusBadge } from './StatusBadge';

export function LiveAnimalPanel() {
  return (
    <section className="surface-panel overflow-hidden p-5 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss/80">
            Live Animal Watch
          </p>
          <h3 className="mt-2 font-display text-3xl font-semibold text-white">
            Live count of animals with visual feed
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/60 md:text-base">
            Frontend-only live-style panel showing active animal count, latest image feed,
            monitored zone, and detection source using mock real-time data.
          </p>
        </div>

        <div className="rounded-2xl border border-moss/15 bg-moss/10 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-moss">
            <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-moss" />
            Live monitoring simulation
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {liveAnimalFeed.map((animal, index) => (
          <motion.article
            key={animal.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-soft"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={animal.image}
                alt={animal.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                  {animal.lastSeen}
                </div>
                <StatusBadge value={animal.status} />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Live Count</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <h4 className="font-display text-4xl font-semibold text-white">{animal.liveCount}</h4>
                  <span className="rounded-full border border-moss/15 bg-moss/15 px-3 py-1 text-xs font-semibold text-moss">
                    Active feed
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <h4 className="font-display text-2xl font-semibold text-white">{animal.name}</h4>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  Current monitored presence in the selected wildlife zone.
                </p>
              </div>

              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
                  <MapPinned className="h-4 w-4 text-cyan-300" />
                  <span>{animal.zone}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
                  <Camera className="h-4 w-4 text-amber-300" />
                  <span>{animal.source}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
                  <Activity className="h-4 w-4 text-moss" />
                  <span>Live movement and count stream active</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
