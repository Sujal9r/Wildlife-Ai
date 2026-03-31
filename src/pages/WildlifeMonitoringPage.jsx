import { SectionHeader } from '../components/SectionHeader';
import { SpeciesCard } from '../components/SpeciesCard';
import { wildlifeSpecies } from '../data/mockData';

export function WildlifeMonitoringPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Wildlife Monitoring"
        title="Species tracking, movement logs, and habitat visibility"
        description="Static mock monitoring cards show how a modern conservation interface can bring together GPS activity, camera traps, ranger verification, and health trends in one place."
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {wildlifeSpecies.map((species, index) => (
          <SpeciesCard key={species.id} species={species} index={index} />
        ))}
      </section>
    </div>
  );
}
