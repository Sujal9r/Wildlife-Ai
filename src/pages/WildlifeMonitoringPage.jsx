import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { SpeciesCard } from '../components/SpeciesCard';
import { wildlifeSpecies } from '../data/mockData';
import { matchesSearch } from '../utils/search';

export function WildlifeMonitoringPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const filteredSpecies = useMemo(
    () =>
      wildlifeSpecies.filter((species) =>
        matchesSearch(searchQuery, [
          species.name,
          species.status,
          species.tracking,
          species.zone,
          species.cameraActivity,
          ...species.movementLogs,
        ])
      ),
    [searchQuery]
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Wildlife Monitoring"
        title="Species tracking, movement logs, and habitat visibility"
        description={
          searchQuery
            ? `Showing wildlife monitoring matches for "${searchQuery}".`
            : 'Static mock monitoring cards show how a modern conservation interface can bring together GPS activity, camera traps, ranger verification, and health trends in one place.'
        }
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {filteredSpecies.map((species, index) => (
          <SpeciesCard key={species.id} species={species} index={index} />
        ))}
      </section>
    </div>
  );
}
