import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLectureById } from "../../api/lecture";
import { ILectureDetail } from "../../domain/models/lectureDetail.model";
import Navbar from "../../components/Navbar/Navbar.component";
import Footer from "../../components/Footer/Footer.component";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import { dateFormatted } from "../../utils/date.utils";
import { renderIfNotEmpty } from "../../utils/renderIfNotEmpty.utils";

function LectureDetails () {
  const { id } = useParams();
  const { data: lecture, isLoading, isError } = useQuery<ILectureDetail>({
    queryKey: ["lecture", id],
    queryFn: () => fetchLectureById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading lecture details...</p>;
  if (isError) return <ErrorNotification error="Erro ao carregar detalhes de palestra" />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 bg-gray-100">
        <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{lecture?.title}</h1>
          
          {renderIfNotEmpty(lecture?.lecturer, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Palestrante:</strong> {lecture?.lecturer}</p>
          ))}

          {renderIfNotEmpty(lecture?.description, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Descrição:</strong> {lecture?.description}</p>
          ))}

          {renderIfNotEmpty(lecture?.startsAt, () => (
            <p className="text-lg text-gray-700 mb-2">
              <strong>Começo: </strong>
              <time title={dateFormatted(lecture?.startsAt)} dateTime={lecture?.startsAt || ""}>
                {dateFormatted(lecture?.startsAt)}
              </time>
            </p>
          ))}

          {renderIfNotEmpty(lecture?.endsAt, () => (
            <p className="text-lg text-gray-700 mb-2">
              <strong>Término: </strong>
              <time title={dateFormatted(lecture?.endsAt)} dateTime={lecture?.endsAt || ""}>
                {dateFormatted(lecture?.endsAt)}
              </time>
            </p>
          ))}

          {renderIfNotEmpty(lecture?.type, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Tipo da palestra:</strong> {lecture?.type}</p>
          ))}

          {renderIfNotEmpty(lecture?.status, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Status:</strong> {lecture?.status}</p>
          ))}

          {renderIfNotEmpty(lecture?.url, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>URL:</strong> {lecture?.url}</p>
          ))}

          {renderIfNotEmpty(lecture?.address, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Endereço:</strong> {lecture?.address}</p>
          ))}

          {renderIfNotEmpty(lecture?.tags?.length, () => (
            <ul className="list-disc list-inside mb-4">
              <strong>Tags:</strong>
              {lecture?.tags.map((tag, index) => (
                <li key={index} className="text-lg text-gray-700">{tag}</li>
              ))}
            </ul>
          ))}

          {renderIfNotEmpty(lecture?.organizer.email, () => (
            <p className="text-lg text-gray-700"><strong>Organizador:</strong> {lecture?.organizer.email}</p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LectureDetails;
