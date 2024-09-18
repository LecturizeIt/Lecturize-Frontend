import { useQuery } from "@tanstack/react-query";
import { fetchLectureParticipants } from "../../api/lecture"; 

interface ILectureParticipantsProps {
  lectureId: number;
}

const LectureParticipants: React.FC<ILectureParticipantsProps> = ({ lectureId }) => {
  const { data: participants, isLoading, isError } = useQuery({
    queryKey: ["lectureParticipants", lectureId],
    queryFn: () => fetchLectureParticipants(lectureId),
    enabled: !!lectureId,
  });

  if (isLoading) return <p>Loading participants...</p>;
  if (isError) return <p>Error loading participants.</p>;

  if (!participants || participants.length === 0) return <p>sem participantes</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Participantes da palestra:</h2>
      <ul className="list-disc list-inside">
        {participants.map((participant) => (
          <li key={participant.id} className="text-lg text-gray-700">{participant.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default LectureParticipants;
