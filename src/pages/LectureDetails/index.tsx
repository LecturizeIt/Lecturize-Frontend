import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLectureDetail } from "../../api/lecture";
import { ILectureDetail } from "../../domain/models/lectureDetail.model";


function LectureDetails () {
  const { id } = useParams(); 
  const { data: lecture, isLoading, isError } = useQuery<ILectureDetail>({
    queryKey: ["lecture", id],
    queryFn: () => fetchLectureDetail(id as string),
    enabled: !!id, 
  });

  if (isLoading) return <p>Loading lecture details...</p>;
  if (isError) return <p>Error loading lecture details.</p>;

  return (
    <div>
      <h1>titulo: {lecture?.title}</h1>
      <p>Lecturer: {lecture?.lecturer}</p>
      <p>Description: {lecture?.description}</p>
      <p>Starts At: {lecture?.startsAt}</p>
      <p>Ends At: {lecture?.endsAt}</p>
      <p>Type: {lecture?.type}</p>
      <p>Status: {lecture?.status}</p>
      <p>URL: {lecture?.url}</p>
      <p>Endereço: {lecture?.address}</p>
      <ul>
        Tags:
        {lecture?.tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <p>Organizer: {lecture?.organizer.email}</p>
    </div>
  );
}

export default LectureDetails;
