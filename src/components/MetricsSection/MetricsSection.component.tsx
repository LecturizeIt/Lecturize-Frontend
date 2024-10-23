import { useQuery } from "@tanstack/react-query";
import { fetchLectureParticipants } from "../../api/lecture"; 

import React from "react";
import { IUser } from "../../domain/models/user.model";
import { ILectureDetail } from "../../domain/models/lecture.model";
import { Metric } from "../../ui/Metric/Metric.ui";
import { EyeIcon, ShareIcon, UserIcon } from "@heroicons/react/16/solid";

type MectricsSectionProps = {
  user: IUser;
  lecture: ILectureDetail;
}

const MectricsSection: React.FC<MectricsSectionProps> = ({ user, lecture }) => {
  const { data: participants, isLoading, isError } = useQuery({
    queryKey: ["lectureParticipants", lecture.id],
    queryFn: () => fetchLectureParticipants(lecture.id),
    enabled: !!lecture.id,
  });

  if (isLoading) return <p>Loading participants...</p>;
  if (isError) return <p>Error loading participants.</p>;

  const participantCount = participants ? participants.length : 0;

  return (
    <div className="w-[60%] md:w-[30%] mt-4 flex flex-col gap-5"> 
      {user?.email === lecture?.organizer.email && (
        <>
          <h2 className="font-bold text-2xl">Métricas da Palestra</h2>
          <Metric 
            icon={<UserIcon className="h-6 w-6 text-[#861efd]"/>} 
            metric={participantCount}
            text="Participantes" 
            className="h-[128px] w-full"
          />
          <Metric 
            icon={<ShareIcon className="h-6 w-6 text-[#861efd]"/>} 
            metric={lecture.metrics.timesShared}
            text="Compartilhamentos em redes sociais" 
            className="h-[128px] w-full"
          /> <Metric 
            icon={<EyeIcon className="h-6 w-6 text-[#861efd]"/>} 
            metric={lecture.metrics.timesVisited}
            text="Visualizações" 
            className="h-[128px] w-full"
          />
        </>
      )}
    </div>
  );
};

export default MectricsSection;
