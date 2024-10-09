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
      <p className="text-lg text-gray-700">{participants.length} Participantes</p>
    </div>
  );
};

export default LectureParticipants;
