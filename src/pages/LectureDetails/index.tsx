import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLectureById } from "../../api/lecture";
import { ILectureDetail } from "../../domain/models/lectureDetail.model";
import Navbar from "../../components/Navbar/Navbar.component";
import Footer from "../../components/Footer/Footer.component";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";

function LectureDetails () {
  const { id } = useParams(); 
  const { data: lecture, isLoading, isError } = useQuery<ILectureDetail>({
    queryKey: ["lecture", id],
    queryFn: () => fetchLectureById(id as string),
    enabled: !!id, 
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading lecture details...</p>;
  if (isError) return <ErrorNotification error="Erro ao carregar detalhes de palestra" />;;


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 bg-gray-100">
        <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{lecture?.title}</h1>
          <p className="text-lg text-gray-700 mb-2"><strong>Palestrante:</strong> {lecture?.lecturer}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Descrição:</strong> {lecture?.description}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Começo:</strong> {lecture?.startsAt}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Termino:</strong> {lecture?.endsAt}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Tipo da palestra:</strong> {lecture?.type}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Status:</strong> {lecture?.status}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>URL:</strong> {lecture?.url}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Address:</strong> {lecture?.address}</p>
          <ul className="list-disc list-inside mb-4">
            <strong>Tags:</strong>
            {lecture?.tags.map((tag, index) => (
              <li key={index} className="text-lg text-gray-700">{tag}</li>
            ))}
          </ul>
          <p className="text-lg text-gray-700"><strong>Organizer:</strong> {lecture?.organizer.email}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LectureDetails;
