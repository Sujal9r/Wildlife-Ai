import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, MapPinned, ShieldCheck, Trees, Users } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { ZoneCard } from '../components/ZoneCard';
import { protectedZones } from '../data/mockData';
import { matchesSearch, normalizeSearchValue } from '../utils/search';

export function ProtectedAreasPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const visibleZones = useMemo(
    () =>
      protectedZones.filter((zone) =>
        matchesSearch(searchQuery, [zone.id, zone.name, zone.state, zone.status, zone.riskLevel, zone.focus, zone.area])
      ),
    [searchQuery]
  );

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    const matchedIndex = protectedZones.findIndex((zone) =>
      matchesSearch(searchQuery, [zone.id, zone.name, zone.state, zone.status, zone.riskLevel, zone.focus, zone.area])
    );

    if (matchedIndex >= 0) {
      setActiveIndex(matchedIndex);
    }
  }, [searchQuery]);

  const selectedZone = useMemo(() => {
    const activeZone = protectedZones[activeIndex];

    return visibleZones.find((zone) => zone.id === activeZone?.id) ?? visibleZones[0] ?? null;
  }, [activeIndex, visibleZones]);

  function goToNext() {
    if (!visibleZones.length || !selectedZone) {
      return;
    }

    const currentVisibleIndex = visibleZones.findIndex((zone) => zone.id === selectedZone.id);
    const nextZone = visibleZones[(currentVisibleIndex + 1) % visibleZones.length];
    const nextIndex = protectedZones.findIndex((zone) => zone.id === nextZone.id);

    setActiveIndex(nextIndex);
  }

  function goToPrevious() {
    if (!visibleZones.length || !selectedZone) {
      return;
    }

    const currentVisibleIndex = visibleZones.findIndex((zone) => zone.id === selectedZone.id);
    const previousZone = visibleZones[(currentVisibleIndex - 1 + visibleZones.length) % visibleZones.length];
    const previousIndex = protectedZones.findIndex((zone) => zone.id === previousZone.id);

    setActiveIndex(previousIndex);
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Protected Areas"
        title="High-priority forest zones and conservation progress"
        description="Each protected area card presents risk levels, assigned teams, current operational posture, and progress toward conservation objectives using realistic mock data."
      />

      <section className="surface-panel overflow-hidden p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss/80">
              Protected Area Maps
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-white">
              Premium reserve map slider
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/60 md:text-base">
              Slide through reserves one by one with a focused map, cleaner layout, and a more
              attractive monitoring card that keeps attention on a single protected zone.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="inline-flex items-center gap-2 rounded-full border border-moss/20 bg-moss/15 px-4 py-2.5 text-sm font-semibold text-moss transition hover:bg-moss/20"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {visibleZones.map((zone) => {
            const index = protectedZones.findIndex((item) => item.id === zone.id);
            const isSelected = normalizeSearchValue(selectedZone?.id) === normalizeSearchValue(zone.id);

            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isSelected
                    ? 'border-moss/25 bg-moss/15 text-moss'
                    : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08]'
                }`}
              >
                {zone.name}
              </button>
            );
          })}
        </div>

        {selectedZone ? (
          <motion.div
            key={selectedZone.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] shadow-soft"
          >
            <div className="grid gap-0 xl:grid-cols-[0.82fr,1.18fr]">
              <div className="relative overflow-hidden border-b border-white/10 p-6 xl:border-b-0 xl:border-r xl:p-7">
                <div className="absolute inset-0 bg-gradient-to-br from-moss/10 via-transparent to-cyan-400/10" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-white/45">
                          {selectedZone.state}
                        </p>
                        <h4 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
                          {selectedZone.name}
                        </h4>
                      </div>
                      <StatusBadge value={selectedZone.riskLevel} variant="severity" />
                    </div>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                      {selectedZone.focus}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                        <div className="mb-3 flex items-center gap-2 text-moss">
                          <Trees className="h-4 w-4" />
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                            Area
                          </span>
                        </div>
                        <p className="text-base font-semibold text-white">{selectedZone.area}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                        <div className="mb-3 flex items-center gap-2 text-cyan-300">
                          <Users className="h-4 w-4" />
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                            Officers
                          </span>
                        </div>
                        <p className="text-base font-semibold text-white">
                          {selectedZone.assignedOfficers} active
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl border border-moss/15 bg-moss/10 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-moss">
                        <MapPinned className="h-4 w-4" />
                        Featured reserve
                      </div>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        This slider keeps one reserve in focus so the map card looks cleaner,
                        feels premium, and is easier to inspect on both tablet and desktop.
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Slide Position
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {String(visibleZones.findIndex((zone) => zone.id === selectedZone.id) + 1).padStart(2, '0')} /{' '}
                          {String(visibleZones.length).padStart(2, '0')}
                        </p>
                      </div>
                      <ShieldCheck className="h-5 w-5 text-moss" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden p-3 md:p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-moss/10" />
                <iframe
                  src={selectedZone.mapEmbed}
                  title={`${selectedZone.name} map`}
                  className="relative h-[320px] w-full rounded-[24px] border-0 md:h-[540px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="mt-6 rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/35">No protected area matches</p>
            <p className="mt-3 text-sm leading-6 text-white/60">Try another search term to find a reserve, state, or focus area.</p>
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {visibleZones.map((zone, index) => (
          <ZoneCard key={zone.id} zone={zone} index={index} />
        ))}
      </section>
    </div>
  );
}
