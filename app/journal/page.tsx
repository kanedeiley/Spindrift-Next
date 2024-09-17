import { fetchJournalsAction } from "@/utils/actions"
import { SessionChart } from "@/components/charts/SessionChart";
import JournalCard from "@/components/journal/JournalCard";
async function Journalpage() {
  const journals = await fetchJournalsAction();
  const sessionDetails = journals.map(session => ({
    sessionStart: session.sessionStart,
    sessionLength: session.sessionLength,
  }));
  return (
    <section className="flex-col">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10 gap-6 p-4">
    {journals.map((j) => 
    <JournalCard key={j.id} journal={j} />
    )
    }
    </div>
    <SessionChart chartTitle="Sessions Chart" chartDescription="Showing Session Data from the Last 6 Months" journals={sessionDetails} />
    </section>
  )
}

export default Journalpage